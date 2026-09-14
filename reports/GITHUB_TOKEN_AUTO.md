# GITHUB_TOKEN_AUTO.md — توليد Installation Token تلقائي

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — لا يوجد GitHub App

## السبب:
توليد Installation Token يتطلب:
1. GitHub App (App ID + Private Key)
2. Installation ID (من تثبيت App على مستودع)
3. لا يمكن توليده بدون App

## ما تم إنشاؤه:
تم كتابة سكريبت `generate_gh_token.sh` في:
```
/tmp/aurora-hivemoot/scripts/generate_gh_token.sh
```
لكنه لا يمكن تشغيله بدون GitHub App.

## الوضع الحالي:
- PAT الحالي (`ghp_*`) يكفي للعمل الأساسي
- PAT لا يحتاج JWT
- PAT ينتهي صلاحياته عند انتهاء الصلاحية يدوياً
