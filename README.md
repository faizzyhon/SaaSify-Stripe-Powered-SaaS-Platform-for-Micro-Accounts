# 💼 SaaSify — Stripe-Powered SaaS Platform for Micro Accounts

[SaaSify](https://saasified.vercel.app/) is a powerful Stripe-based SaaS platform built with **Next.js** and **Firebase**, designed to let companies onboard users who can create micro Stripe accounts, connect their banks, sell products, and receive payouts. This is perfect for creators, platforms, and services who want to build revenue-sharing marketplaces, product hosting platforms, or financial tools with Stripe Connect.

---

## 🚀 Live Demo

👉 **[Try SaaSify Now](https://saasified.vercel.app/)**  
💰 **[Donate $1 to Support the Developer](https://faizzyhon.pocketsflow.com/checkout?subscriptionId=67fcd87c61a4fff7863721e3)**

---

## ⚙️ Features

### 👑 Super Admin
- Upload Firebase API keys
- Add Mailgun API for global notifications
- View/manage all companies and their users
- Monitor usage, rate limits, status flags
- Auto-suspend companies if Stripe disconnects or fails
- View webhook logs, errors, and email trigger reports
- Global language, email preferences, and API token generator for third-party integrations

### 🧑‍💼 Company Admin
- Add Stripe & Mailgun API keys to onboard users
- Onboard and manage users with micro Stripe accounts
- View payout history, connect logs, Stripe status
- View and manage products posted by users
- Enable/disable user accounts or suspend flagged ones
- Access localized language settings, email triggers, and analytics

### 👤 End Users
- Sign up/login and get micro Stripe account connected
- Add bank details through Stripe Connect
- Host digital/physical products
- View payout summaries, product stats, and account status
- Get automated emails (e.g. onboarding, payout, suspension)

### 📩 Mailgun Integration
- Triggered emails for:
  - User signups
  - Stripe connection success/failure
  - Payouts & product status
  - Admin actions
- Super Admin or Company Admin can configure their Mailgun keys
- Email preferences per user/company

### 🧠 Smart Features
- Stripe Connect Express integration
- Webhook automation and status logging
- Role-based Firebase subcollections for scale
- Review system, status flags, and account health scores
- Auto-suspend on webhook failure or Stripe disconnection
- API token support for external apps
- Localization (multi-language) support

---

## 🔐 Tech Stack

- ⚛️ Next.js (Frontend & Serverless APIs)
- 🔥 Firebase (Auth, Firestore, Storage)
- 💳 Stripe Connect
- 📬 Mailgun Email API
- 🎨 Tailwind CSS (UI & Animations)
- ☁️ Vercel (Hosting)

---

## 📦 Installation

```bash
git clone https://github.com/faizzyhon/saasify.git
cd saasify
npm install
firebase login
firebase init
firebase deploy
