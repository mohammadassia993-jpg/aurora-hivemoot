# GITHUB_APP_CREATED.md — إنشاء GitHub App

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — يتطلب متصفح OAuth

## السبب:
إنشاء GitHub App يتطلب:
1. فتح https://github.com/settings/apps/new في المتصفح
2. تسجيل الدخول بحساب GitHub
3. ملء النموذج والضغط "Create GitHub App"
4. استلام: App ID, Private Key (PEM), Client ID, Client Secret

لا يمكن تنفيذ هذه الخطوات عبر:
- GitHub API (لا يوجد endpoint لإنشاء Apps)
- CLI (لا يوجد أمر `gh app create`)
- PAT (لا يملك صلاحيات Apps)

## ما يمكن فعله يدوياً:
1. افتح https://github.com/settings/apps/new
2. اسم التطبيق: `aurora-hivemoot-deploy`
3. Webhook URL: `https://aurora-bot-render.onrender.com/telegram/webhook`
4. Permissions: Contents (Read/Write), Issues (Read/Write), Pull Requests (Read/Write)
5. اضغط "Create GitHub App"
6. احفظ: App ID, Private Key, Client ID

## alternatives:
- استخدام PAT الحالي (يعمل للقراءة/الكتابة الأساسية)
- إنشاء App يدوياً عند توفر متصفح
