# GITHUB_ACTIONS.md — تفعيل Heartbeat عبر GitHub Actions

**التاريخ:** 2026-09-14
**الحالة:** ⛔ معيق — PAT يفتقد `workflow` scope

## السبب:
- PAT الحالي يملك scope: `repo` فقط
- GitHub يرفض رفع أي ملف في `.github/workflows/` بدون `workflow` scope
- لا يمكن إنشاء أو تعديل Workflows بدون هذا الصلاحية

## ملف Workflow المطلوب (يجب إضافته يدوياً):
```yaml
# .github/workflows/heartbeat.yml
name: Heartbeat
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Render
        run: |
          curl -sf https://aurora-bot-render.onrender.com/health || echo "Health check failed"
          curl -sf https://aurora-bot-render.onrender.com/heartbeat || echo "Heartbeat failed"
```

## خطوات التفعيل اليدوي:
1. أنشئ PAT جديد بـ scopes: `repo` + `workflow`
2. افتح المستودع على GitHub
3. أنشئ الملف `.github/workflows/heartbeat.yml` بالمحتوى أعلاه
4. ادفعه

## البديل الحالي:
Self-Ping في `src/index.js` يعمل كل 10 دقائق ✅
