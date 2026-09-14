# UPTIMEROBOT.md — إعداد UptimeRobot

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — يتطلب تسجيل يدوي (reCAPTCHA)

## السبب:
UptimeRobot يتطلب:
1. فتح https://uptimerobot.com/signup في المتصفح
2. إكمال reCAPTCHA
3. تسجيل حساب جديد
4. تفعيل عبر رابط البريد الإلكتروني

لا يمكن تنفيذ هذه الخطوات عبر:
- API (UptimeRobot API يتطلب حساباً مسجلاً أولاً)
- CLI (لا يوجد)
- سكربت (reCAPTCHA لا يمكن تجاوزه)

## ما يمكن فعله يدوياً:
1. افتح https://uptimerobot.com/signup
2. سجّل بـ: `auroraalmada4@gmail.com`
3. أضف Monitor جديد:
   - النوع: HTTP(s)
   - الرابط: `https://aurora-bot-render.onrender.com/health`
   - الفاصل: كل 5 دقائق
4. فعّل عبر رابط التفعيل في البريد

## alternatives:
- Self-Ping في الكود (يعمل حالياً — كل 10 دقائق)
- cron-job.org (مجاني، يتطلب تسجيل)
- crontab hosted services
