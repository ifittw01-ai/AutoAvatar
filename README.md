# AutoAvatar — AI 分身課程銷售網站

繁體中文長頁式課程銷售頁（React + Vite + TypeScript + Tailwind CSS + React Router）。  
網站為**直接購買課程**，不收集免費報名資料。

## Repository

https://github.com/ifittw01-ai/AutoAvatar.git

## GitHub Pages 正式網址

https://ifittw01-ai.github.io/AutoAvatar/

子頁面（HashRouter）：

- 結帳：https://ifittw01-ai.github.io/AutoAvatar/#/checkout
- 付款成功：https://ifittw01-ai.github.io/AutoAvatar/#/payment-success
- 付款取消：https://ifittw01-ai.github.io/AutoAvatar/#/payment-cancelled

## 本機啟動

```bash
npm install
npm run dev
```

## production build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

正式 build 的 Vite `base` 為 `/AutoAvatar/`（僅 production）。  
本機 `npm run dev` 仍使用 `/`。

## GitHub Pages 部署方式

- 使用 **GitHub Actions** 官方 Pages 部署（非 Vercel、非 `gh-pages` 分支）
- 工作流：`.github/workflows/deploy-pages.yml`
- 觸發：推送到 `main` 或手動 `workflow_dispatch`
- Pages Source 請設為 **GitHub Actions**

## 為什麼使用 HashRouter

GitHub Pages 無法把 `/checkout` 等子路徑自動回傳 `index.html`。  
改用 HashRouter 後，重新整理 `#/checkout` 不會 404。

## 路由

| 路徑 | 說明 |
| --- | --- |
| `/` → `#/` | 銷售頁 |
| `/checkout` → `#/checkout` | 結帳頁 |
| `/payment-success` → `#/payment-success` | 付款成功 |
| `/payment-cancelled` → `#/payment-cancelled` | 付款取消／失敗 |

## 購買 CTA

`PurchaseCTA`：

1. `VITE_PAYMENT_LINK` 有值 → 外部安全結帳  
2. 否則 → React Router 前往 `/checkout`（HashRouter 顯示為 `#/checkout`）

## 如何改價格

- `src/config/payment.ts`：`salePrice`、`originalPrice`、`productName`
- `src/content/siteContent.ts`：模組 `valueAmount`、`totalValueAmount`

## 金流

目前為 **mock / internal-checkout**。  
正式金流串接位置：

- `src/config/payment.ts`（含 `paymentSuccessUrl` / `paymentCancelledUrl`）
- `src/lib/payment/paymentService.ts`
- `src/pages/CheckoutPage.tsx` 的 `#payment-element-slot`

**不得將金流私密金鑰、webhook secret 或信用卡資料放在前端／提交到 GitHub。**

## 環境變數範例

見 `.env.example`：

```env
VITE_SITE_URL=https://ifittw01-ai.github.io/AutoAvatar/
VITE_PAYMENT_MODE=internal-checkout
VITE_PAYMENT_PROVIDER=mock
VITE_PAYMENT_LINK=
VITE_COURSE_ACCESS_URL=
VITE_SUPPORT_EMAIL=
```
