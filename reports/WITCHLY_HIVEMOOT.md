# WITCHLY_HIVEMOOT.md — نشر على Witchly

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — Discord OAuth مطلوب

## ما تم محاولته:
1. فحص Witchly API — فشل ❌
   - `dash.witchly.host` واجهة ويب فقط (Next.js)
   - لا يوجد REST API متاح
2. فحص Discord OAuth — فشل ❌
   - Witchly يستخدم Discord OAuth حصرياً
   - لا يوجد تسجيل بالبريد الإلكتروني
   - يتطلب حساب Discord فعال + متصفح

## السبب الجذري:
Witchly يتطلب:
1. حساب Discord فعال
2. متصفح لعملية OAuth
3. لا يمكن أتمتته عبر API أو CLI

## ما يمكن فعله يدوياً:
1. افتح https://dash.witchly.host
2. سجّل الدخول بحساب Discord
3. اضغط "New Project" → Language: Node.js
4. اربط مستودع: `mohammadassia993-jpg/aurora-hivemoot`
5. أضف متغيرات البيئة
6. اضغط "Deploy"
