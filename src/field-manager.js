#!/usr/bin/env node
import pw from '/tmp/fm-deps/node_modules/playwright-core/index.js';
const { chromium } = pw;
import https from 'node:https';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const CHROMIUM_PATH = (() => {
  const cacheDir = (process.env.HOME || '/root') + '/.cache/ms-playwright';
  if (!fs.existsSync(cacheDir)) return null;
  for (const d of fs.readdirSync(cacheDir).filter(f => f.startsWith('chromium-') && !f.includes('headless')).sort().reverse()) {
    for (const sub of ['chrome-linux64', 'chrome-linux', 'chrome-linux-arm64']) {
      const chromeDir = cacheDir + '/' + d + '/' + sub;
      if (fs.existsSync(chromeDir)) {
        const chromeBin = fs.readdirSync(chromeDir).find(f => f === 'chrome');
        if (chromeBin) return chromeDir + '/' + chromeBin;
      }
    }
  }
  return null;
})();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || 'mohammadassia993-jpg/aurora-hivemoot';

class FieldManager {
  constructor() { this.browser = null; this.context = null; }

  async launch() {
    if (this.browser) return;
    const execPath = CHROMIUM_PATH;
    if (!execPath) throw new Error('Chromium not found in playwright cache');
    this.browser = await chromium.launch({
      executablePath: execPath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    });
    console.log('[FM] Browser launched');
  }

  async close() { if (this.browser) { await this.browser.close(); this.browser = null; } }

  async githubApi(method, endpoint, body = null) {
    return new Promise((resolve, reject) => {
      const data = body ? JSON.stringify(body) : null;
      const req = https.request({
        hostname: 'api.github.com', path: endpoint, method,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'aurora-field-manager',
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      }, res => {
        let b = ''; res.on('data', c => b += c);
        res.on('end', () => { try { resolve(JSON.parse(b)); } catch { resolve(b); } });
      });
      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }

  async createGitHubApp() {
    console.log('[FM] Creating GitHub App via Manifest Flow...');
    const page = await this.context.newPage();
    const state = crypto.randomBytes(16).toString('hex');
    const manifest = {
      name: 'aurora-hivemoot-deploy', url: 'https://aurora-bot-render.onrender.com',
      hook_attributes: { url: 'https://aurora-bot-render.onrender.com/telegram/webhook', active: true },
      redirect_url: 'https://github.com/settings/apps',
      public: true,
      default_permissions: { contents: 'write', issues: 'write', pull_requests: 'write', metadata: 'read' },
      events: ['push', 'pull_request', 'issues']
    };
    const url = `https://github.com/settings/apps/new?state=${state}&manifest=${encodeURIComponent(JSON.stringify(manifest))}`;
    console.log(`[FM] Navigating to GitHub...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const currentUrl = page.url();
    console.log(`[FM] URL: ${currentUrl}`);

    if (currentUrl.includes('/login')) {
      const ghUser = process.env.GITHUB_USERNAME;
      const ghPass = process.env.GITHUB_PASSWORD;
      if (!ghUser || !ghPass) {
        console.log('[FM] No GITHUB_USERNAME/PASSWORD — cannot login');
        await page.screenshot({ path: '/tmp/gh-app-login.png' });
        await page.close();
        return { success: false, error: 'GitHub login required, no credentials', screenshot: '/tmp/gh-app-login.png' };
      }
      await page.fill('input[name="login"]', ghUser);
      await page.fill('input[name="password"]', ghPass);
      await page.click('input[type="submit"]');
      await page.waitForTimeout(3000);
      const tfa = await page.isVisible('input[name="otp"]', { timeout: 2000 }).catch(() => false);
      if (tfa) {
        console.log('[FM] 2FA required');
        await page.screenshot({ path: '/tmp/gh-app-2fa.png' });
        await page.close();
        return { success: false, error: '2FA required', screenshot: '/tmp/gh-app-2fa.png' };
      }
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }

    await page.screenshot({ path: '/tmp/gh-app-form.png' });
    const createBtn = page.locator('button:has-text("Create GitHub App"), input[type="submit"]');
    if (await createBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
      await createBtn.first().click();
      await page.waitForTimeout(5000);
      await page.screenshot({ path: '/tmp/gh-app-result.png' });
      const content = await page.content();
      const appId = content.match(/App ID[:\s]*(\d+)/i);
      const clientId = content.match(/Client ID[:\s]*([a-f0-9]+)/i);
      await page.close();
      return { success: !!(appId || clientId), appId: appId?.[1], clientId: clientId?.[1], screenshot: '/tmp/gh-app-result.png' };
    }
    await page.close();
    return { success: false, error: 'Create button not found', screenshot: '/tmp/gh-app-form.png' };
  }

  async deployOnPlatform(platform) {
    console.log(`[FM] Deploying on ${platform}...`);
    const page = await this.context.newPage();
    const urls = { suga: 'https://suga.app', witchly: 'https://dash.witchly.host', kubeletto: 'https://kubeletto.com' };
    const baseUrl = urls[platform];
    if (!baseUrl) { await page.close(); return { success: false, error: `Unknown: ${platform}` }; }
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.screenshot({ path: `/tmp/${platform}-page.png` });
    const loginLink = await page.isVisible('a:has-text("Login"), a:has-text("Sign"), button:has-text("Login")', { timeout: 3000 }).catch(() => false);
    if (loginLink) {
      const ghBtn = await page.isVisible('a:has-text("GitHub"), button:has-text("GitHub")', { timeout: 2000 }).catch(() => false);
      const dcBtn = await page.isVisible('a:has-text("Discord"), button:has-text("Discord")', { timeout: 2000 }).catch(() => false);
      console.log(`[FM] Login required. GitHub: ${ghBtn}, Discord: ${dcBtn}`);
    }
    await page.close();
    return { success: false, error: `${platform} requires browser login`, screenshot: `/tmp/${platform}-page.png` };
  }

  async checkUptimeRobot() {
    console.log('[FM] Checking UptimeRobot...');
    const page = await this.context.newPage();
    await page.goto('https://uptimerobot.com/api', { waitUntil: 'domcontentloaded', timeout: 30000 });
    const content = await page.content();
    const hasApiDocs = content.includes('api_key') || content.includes('apiKey');
    await page.screenshot({ path: '/tmp/uptimerobot-api.png' });
    await page.close();
    return { success: false, error: 'UptimeRobot requires account + API key', screenshot: '/tmp/uptimerobot-api.png' };
  }
}

const cmd = process.argv[2];
const fm = new FieldManager();

try {
  switch (cmd) {
    case 'create-github-app':
      await fm.launch(); console.log(JSON.stringify(await fm.createGitHubApp(), null, 2)); break;
    case 'deploy':
      await fm.launch(); console.log(JSON.stringify(await fm.deployOnPlatform(process.argv[3]), null, 2)); break;
    case 'heartbeat':
      console.log(JSON.stringify(await fm.checkUptimeRobot(), null, 2)); break;
    case 'github-api':
      console.log(JSON.stringify(await fm.githubApi(process.argv[3] || 'GET', process.argv[4] || '/user'), null, 2)); break;
    default:
      console.log('Usage: node field-manager.js <create-github-app|deploy|heartbeat|github-api>');
  }
} catch (e) {
  console.error('[FM] Error:', e.message);
} finally {
  await fm.close();
}
