# HIVEMOOT_INSTALL.md — تثبيت Hivemoot

**التاريخ:** 2026-09-14
**الحالة:** ✅ مكتمل (جزئياً — CLI يعمل، GitHub App معيق)

## ما تم تنفيذه:

### 1. تثبيت Hivemoot CLI:
- الإصدار: v0.3.8
- الموقع: `/usr/local/bin/hivemoot`
- الأمر: `npm install -g @hivemoot-dev/cli`
- الحالة: **يعمل ✅**

### 2. التحقق من العمل:
```
$ hivemoot --version
0.3.8

$ hivemoot buzz --github-token <TOKEN>
✅ نجح — يتصل بالمستودع ويعرض صحته
```

### 3. ملف `.github/hivemoot.yml`:
- تم إنشاؤه في: `/tmp/aurora-hivemoot/.github/hivemoot.yml`
- يحتوي على 5 أدوار: Queen, Builder, Reviewer, Researcher, Guard
- تم رفعه إلى GitHub ✅

### 4. GitHub App (Hivemoot):
- **الحالة:** ⛔ معيق
- السبب: تثبيت GitHub App يتطلب جلسة متصفح OAuth (لا يمكن تنفيذها عبر API/CLI)
- الرابط: https://github.com/apps/hivemoot
- ما يمكن فعله يدوياً: افتح الرابط → اضغط "Install" → اختر `aurora-hivemoot`

## ملاحظات:
- `hivemoot roles` و `hivemoot role` لا يعثران على الملف رغم وجوده
- `hivemoot buzz` يعمل بشكل صحيح
- السبب: خطأ في مسار البحث في CLI (يبحث في مسار مختلف عن `.github/hivemoot.yml`)
