# GITHUB_ACTIONS.md — تفعيل Heartbeat عبر GitHub Actions

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — PAT يفتقد `workflow` scope

## السبب:
GitHub Actions يتطلب:
1. PAT بـ `workflow` scope (لإنشاء/تعديل workflow files)
2. PAT الحالي يملك scope: `repo` فقط
3. لا يمكن إنشاء workflow بدون `workflow` scope

## ما يمكن فعله يدوياً:
1. افتح https://github.com/settings/tokens
2. أنشئ PAT جديد بـ scopes: `repo` + `workflow`
3. احفظه في `.env.hivemoot`
4. أنشئ ملف `.github/workflows/heartbeat.yml`:

```yaml
name: Heartbeat
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - run: curl -s https://aurora-bot-render.onrender.com/health
```

5. ادفع الملف

## alternatives:
- Self-Ping في الكود (يعمل حالياً — كل 10 دقائق في `index.js`)
- UptimeRobot (يتطلب تسجيل يدوي)
