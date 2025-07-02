
# 📦 Termékkezelő Alkalmazás

Egyszerű webes alkalmazás termékek rögzítésére és keresésére.

---

## 📁 Mappa struktúra

```
projektgyökér/
├── backend/
│   ├── server.js              # Node.js szerver
│   ├── models/
│   │   └── Product.js         # Mongoose modell (cikkszám, név, darabszám)
│   └── routes/
│       └── products.js        # REST API végpontok
└── frontend/
    ├── login.component.html   # Bejelentkezési oldal (AngularJS)
    ├── login.js               # Login logika
    ├── dashboard.html         # Terméktábla oldal (AngularJS + Material)
    └── dashboard.js           # Termék CRUD + szűrés logika
```

---

## 🚀 Futtatás lépései

### 1. MongoDB indítása lokálisan

- Windows: `mongod`
- Linux/macOS: `sudo service mongod start` vagy `brew services start mongodb-community`

### 2. Backend indítása

```bash
cd backend
npm install
node server.js
# vagy:
# nodemon server.js
```

A szerver a következő címen érhető el:  
[http://localhost:5000](http://localhost:5000)

---

### 3. Frontend indítása

```bash
cd frontend
npx http-server .
```

A frontend például itt fut majd:  
[http://localhost:8080/login.component.html](http://localhost:8080/login.component.html)

---

## 🧩 Fontos függvények (összefoglalva)

### Backend oldalon:

- **GET /api/products** – Termékek lekérése szűrési lehetőségekkel (`sku`, `name`, `qmin`, `qmax`)
- **POST /api/products** – Új termék felvitele (egyedi cikkszám, egész szám darabszám)
- **MongoDB modell** – `Product.js`: cikkszám, név, darabszám, dátum

### Frontend oldalon:

- `add()` – Új termék hozzáadása
- `search()` – Szűrés név, cikkszám és darabszám alapján
- `filter` objektum – keresési mezők (részleges illesztés)
- Angular Material UI – reszponzív űrlap, táblázat, gombok

---

ℹ️ Fejlesztéshez ajánlott:
- `nodemon` a szerver automatikus újraindításához
- `http-server` a frontend gyors kiszolgálásához

