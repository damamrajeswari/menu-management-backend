# Menu Management — backend



## Overview
Backend API for the Menu Management application. Provides endpoints to manage categories,sub categories and items. 

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| Backend Framework | Node.js + Express.js |
| Database | MongoDB (Mongoose ODM) |
| Testing | Postman |
| Hosting | Localhost (for demo) |

---

## Prerequisites
- Git
- Node.js & npm (or pnpm)
- MongoDB (local installation or hosted Atlas)

## Setup Instructions

1. Clone repository
```bash
git clone <repo-url> .
```

2. Install dependencies
```bash
# npm
npm install

```

3. Create environment file
Copy `.env.example` to `.env` and update values:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/menuDb

```


4. Start development server
```bash

npm run dev

# or build + start
npm run build
npm start
```

Server should be reachable at http://localhost:${PORT}

