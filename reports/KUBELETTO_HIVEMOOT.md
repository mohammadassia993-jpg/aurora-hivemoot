# KUBELETTO_HIVEMOOT.md — نشر على Kubeletto

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — يتطلب API key أو browser OAuth

## ما تم محاولته:
1. تثبيت Kubeletto CLI — نجح ✅ (v0.1.8)
2. محاولة `kubeletto login --api-key` — فشل ❌
   - لا يوجد API key
3. محاولة `kubeletto login --no-browser` — فشل ❌
   - الخطأ: `API key required in non-interactive environments`
4. محاولة الوصول المباشر لـ API — فشل ❌
   - الخطأ: `UNAUTHORIZED: tenant context required`

## السبب الجذري:
Kubeletto يتطلب أحد التالي:
1. **Device Auth** — فتح متصفح للتوثيق (يتطلب OAuth على kubeletto.com)
2. **API Key** — يتطلب حساباً مسجلاً أولاً
3. لا يمكن إنشاء حساب عبر API (يتطلب متصفح)

## ما يمكن فعله يدوياً:
1. افتح https://kubeletto.com
2. سجّل الدخول بحساب GitHub
3. احصل على API key من Dashboard
4. شغّل: `kubeletto login --api-key kl_xxx`
5. ثم: `kubeletto deploy --repo mohammadassia993-jpg/aurora-hivemoot`
