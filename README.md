# 🔐 Password Generator & Secure Vault

A **Password Generator + Secure Vault** web application that allows users to **generate strong passwords**, **save them securely** in their personal vault, and **manage stored credentials** easily.  
Built with a **Next.js (TypeScript)** frontend and **Node.js + MongoDB** backend, this MVP focuses on **simplicity, security, and speed**.

---

## 🚀 Features

### 🧠 Password Generator
- Generate **strong and random passwords** with customizable length.
- Include **uppercase, lowercase, numbers, and special characters**.
- One-click **copy to clipboard**.

### 🔐 Secure Vault
- **Save generated passwords** with labels (e.g., website name, username).
- **View, edit, or delete** saved passwords.
- Passwords are **encrypted** before storing in MongoDB.
- **JWT-based authentication** for user security.

### 🧭 User Interface
- Clean, minimal, and responsive UI built with **Tailwind CSS**.
- Dashboard for managing all saved passwords.
- Modal for **adding/editing** password entries.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 15 (TypeScript) |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JSON Web Tokens (JWT) |
| Encryption | bcryptjs |

---