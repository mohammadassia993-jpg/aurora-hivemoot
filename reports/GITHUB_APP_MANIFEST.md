# GITHUB_APP_MANIFEST.md — إنشاء GitHub App عبر Manifest Flow

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — يتطلب متصفح OAuth

## ما تم محاولته:
1. تثبيت `@agenti-fy/setup` — نجح ✅
2. تشغيل `agentify-setup init` — فشل ❌
   - الخطأ: `gh CLI is not authenticated. Run "gh auth login" first.`
3. محاولة `gh auth login` بـ PAT — فشل ❌
   - الخطأ: `missing required scope 'read:org'`
   - PAT الحالي يملك scope: `repo` فقط
4. محاولة Manifest Flow عبر API — فشل ❌
   - GitHub لا يوفر endpoint API لإنشاء GitHub Apps
   - يتطلب تفاعل متصفح مع `github.com/settings/apps/new`
5. محاولة عبر Playwright — فشل ❌
   - يتطلب بيانات اعتماد GitHub (اسم مستخدم + كلمة مرور)
   - لا توجد جلسة متصفح مسجلة

## السبب الجذري:
إنشاء GitHub App يتطلب:
1. جلسة متصفح مسجلة الدخول على GitHub
2. أو PAT بـ scopes إضافية (`read:org`, `admin:org`)
3. لا يمكن تنفيذه عبر REST API أو CLI

## ما يمكن فعله يدوياً:
1. افتح https://github.com/settings/apps/new
2. ملء البيانات:
   - Name: `aurora-hivemoot-deploy`
   - Homepage URL: `https://aurora-bot-render.onrender.com`
   - Webhook URL: `https://aurora-bot-render.onrender.com/telegram/webhook`
   - Permissions: Contents, Issues, Pull Requests (Write)
3. اضغط "Create GitHub App"
4. استلم: App ID, Private Key, Client ID
