# HIVEMOOT_CONFIG.md — تكوين Hivemoot

**التاريخ:** 2026-09-14
**الحالة:** ✅ مكتمل

## ملفات التكوين:

### `.env.hivemoot` (محلي فقط — غير مرفوع):
```
GITHUB_TOKEN=<PAT>
GITHUB_REPO=mohammadassia993-jpg/aurora-hivemoot
LOGFARE_API_KEY=<key>
LLM7_API_KEY=<key>
AGNES_API_KEY=<key>
```

### `.github/hivemoot.yml` (مرفوع):
- يعرّف 5 أدوار للفريق
- يعرّف مسؤوليات كل دور
- يحدد نموذج AI لكل دور

### المفاتيح المستخدمة:
| المفتاح | الخدمة | الحالة |
|---------|--------|--------|
| LOGFARE_API_KEY | Logfare AI | ✅ مفعّل |
| LLM7_API_KEY | LLM7 | ✅ مفعّل |
| AGNES_API_KEY | Agnes AI | ⚠️ متقطع |
| GITHUB_TOKEN | GitHub PAT | ✅ مفعّل (scope: repo) |

## ملاحظات:
- `GITHUB_TOKEN` يفتقد scope `workflow` (لا يمكن إنشاء GitHub Actions)
- لا يمكن إنشاء GitHub App عبر PAT (يتطلب متصفح)
