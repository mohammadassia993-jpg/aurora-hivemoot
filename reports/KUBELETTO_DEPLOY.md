# KUBELETTO_DEPLOY.md — نشر على Kubeletto

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — Turnstile CAPTCHA + GitHub OAuth

## السبب:
Kubeletto (kubeletto.dev) يتطلب:
1. تسجيل دخول عبر GitHub OAuth (يتطلب متصفح)
2. إكمال Cloudflare Turnstile CAPTCHA (يتطلب متصفح)
3. لا يمكن تنفيذها عبر API أو CLI

## ما يمكن فعله يدوياً:
1. افتح https://kubeletto.dev
2. سجّل الدخول بحساب GitHub
3. أكمل CAPTCHA
4. اربط مستودع `aurora-hivemoot`
5. اضغط "Deploy"

## ملاحظات:
- Kubeletto مجاني للمشاريع المفتوحة المصدر
- قد يكون بديلاً جيداً عن Render
