# 🧾 SPA User Register

This is a SPA project for register users with name and age. The data is saved using `json-server` (a fake REST API) and showed dynamically in the page. The app also have a session counter for interactions.

---

## 🚀 Technologies

- HTML, CSS and JavaScript  
- [Axios](https://axios-http.com/) for HTTP request  
- [JSON Server](https://github.com/typicode/json-server) for fake API REST

---

## 📦 Install

1. Clone the repo:

```bash
git clone https://github.com/your-username/spa-user-register.git
cd spa-user-register
```

2. Install dependencies (if needed):

```bash
npm install
```

> This will install `axios` and `json-server` if you have `package.json`.

---

## ▶️ How to run the project

### 1. Start json-server

```bash
npx json-server --watch db.json --port 3000
```

This will create the API on:

```
http://localhost:3000/users
```

### 2. Open the project

You can open `index.html` with the browser or use **Live Server** in VS Code.

> Make sure the browser allow requests to `localhost:3000`. You can also use a CORS extension if needed.

---

## ⚙️ Features

- Save users (name and age)
- Validate if the user already exists
- Show users saved
- Delete all users
- Show last user saved
- Session counter with `sessionStorage`
- Restart interaction counter

---

## 📁 Project structure

```
.
├── index.html
├── main.js
├── db.json
├── README.md
└── package.json (optional)
```

---

## 📌 Requirements

- Node.js installed  
- Browser  
- Terminal or console access

---

## 🧠 Author

Made by **Daniel Fernando Rojas** as part of a DOM practice and data persistence project.
