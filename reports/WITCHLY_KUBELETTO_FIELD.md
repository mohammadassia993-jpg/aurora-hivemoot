# WITCHLY_KUBELETTO_FIELD.md — نشر عبر Field Manager

**التاريخ:** 2026-09-14
**الحالة:** ⛔ يحتاج بيانات اعتماد

## Witchly:
- Field Manager وصل لصفحة Discord login
- يتطلب حساب Discord فعال + كلمة مرور
- لا يمكن التجاوز بدون بيانات اعتماد

## Kubeletto:
- Kubeletto CLI مثبت (v0.1.8)
- `kubeletto login` يتطلب API key أو browser OAuth
- لا يمكن التجاوز بدون بيانات اعتماد

## للتفعيل يدوياً:
1. Witchly: افتح dash.witchly.host → سجّل بـ Discord
2. Kubeletto: افتح kubeletto.com → سجّل بـ GitHub

## عبر Field Manager (بعد توفير بيانات الاعتماد):
```bash
GITHUB_USERNAME=user GITHUB_PASSWORD=pass node src/field-manager.js deploy kubeletto
```
