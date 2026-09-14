# GITHUB_APP_FIELD.md — إنشاء GitHub App عبر Field Manager

**التاريخ:** 2026-09-14
**الحالة:** ⚠️ جزئياً مكتمل — يحتاج بيانات اعتماد

## ما تم محاولته:
1. Field Manager شغّل Chromium وفتح GitHub
2. وصل لصفحة تسجيل الدخول تلقائياً
3. لاحظ: لا يوجد `GITHUB_USERNAME` / `GITHUB_PASSWORD` في المتغيرات البيئية
4. أخذ screenshot: `/tmp/gh-app-login.png`

## للإكمال يدوياً:
1. افتح https://github.com/settings/apps/new
2. استخدم Manifest:
```json
{
  "name": "aurora-hivemoot-deploy",
  "url": "https://aurora-bot-render.onrender.com",
  "hook_attributes": {"url": "https://aurora-bot-render.onrender.com/telegram/webhook", "active": true},
  "public": true,
  "default_permissions": {"contents": "write", "issues": "write", "pull_requests": "write", "metadata": "read"},
  "events": ["push", "pull_request", "issues"]
}
```
3. اضغط "Create GitHub App"
4. استلم App ID + Private Key
