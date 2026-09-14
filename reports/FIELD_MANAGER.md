# FIELD_MANAGER.md — المدير الميداني

**التاريخ:** 2026-09-14
**الحالة:** ✅ مبني ويعمل

## ما تم بناؤه:
- `src/field-manager.js` — وكيل ميداني يمتلك:
  - **Playwright + Chromium** — متصفح حقيقي (headless)
  - **GitHub API** — عبر PAT (يعمل ✅)
  - **Render API** — عبر RENDER_API_KEY
  - **डिटect Browser login** — يكتشف صفحات تسجيل الدخول

## الاختبارات:
1. `node src/field-manager.js github-api GET /user` — ✅ نجح (عرض بيانات mohammadassia993-jpg)
2. `node src/field-manager.js create-github-app` — ⚠️ وصل لصفحة تسجيل الدخول (يتطلب GITHUB_USERNAME/PASSWORD)
3. `node src/field-manager.js deploy suga` — ⚠️ اكتشف Discord login (Suga يعرض خطأ حالياً)
4. `node src/field-manager.js deploy witchly` — ⚠️ اكتشف Discord login

## الأدوار المتاحة:
- `github-api` — استدعاء GitHub API مباشرة
- `create-github-app` — إنشاء GitHub App عبر Manifest Flow
- `deploy` — نشر على منصة مستضافة
- `heartbeat` — فحص UptimeRobot

## للتفعيل الكامل:
يحتاج المدير الميداني إلى بيانات اعتماد تسجيل الدخول:
- `GITHUB_USERNAME` + `GITHUB_PASSWORD` (لـ GitHub App)
- أو `UPTIMEROBOT_API_KEY` (لـ Heartbeat)

## الدور في hivemoot.yml:
```yaml
- name: FieldManager
  model: logfare
  tools: [playwright, chrome, github-api, render-api]
  responsibilities:
    - تسجيل الدخول للخدمات
    - تجاوز CAPTCHA
    - رفع workflow
    - نشر على Witchly/Kubeletto/Suga
    - إنشاء GitHub App
```
