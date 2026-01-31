# 📇 Contacts Backend API

A simple Express.js REST API for managing user contacts with token-based authentication.

---

## ✨ Features

- 🔐 User registration and login
- 🎫 Token-based authentication
- 📝 CRUD operations for contacts
- 💾 In-memory storage
- ⚡ RESTful API design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Crypto | Token generation |

---

## 💻 Technologies Used

### Backend Framework
- **Express.js** - Fast, unopinionated, minimalist web framework for Node.js
  - Handles routing and middleware
  - Manages HTTP requests and responses
  - Provides REST API structure

### Runtime Environment
- **Node.js** - JavaScript runtime built on Chrome's V8 engine
  - Enables server-side JavaScript execution
  - Provides asynchronous, event-driven architecture
  - Handles I/O operations efficiently

### Authentication
- **Crypto (Node.js built-in)** - Cryptographic functionality
  - Generates secure random tokens for user sessions
  - Creates unique IDs for contacts
  - No external dependencies required

### Data Storage
- **In-Memory Storage** - Lightweight data persistence
  - Uses JavaScript objects and arrays
  - Fast read/write operations
  - Perfect for development and testing

### API Design
- **RESTful Architecture** - Standard API design pattern
  - Clear endpoint structure
  - Standard HTTP methods (GET, POST, PUT)
  - JSON request/response format

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/contacts-backend.git
cd contacts-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
# Default port 5000
node app.js

# Custom port
PORT=5050 node app.js
```

✅ Server runs on `http://localhost:5000` (or your custom PORT)

---

## 🚀 Usage

### Base URL

```
http://localhost:5000
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |

---

## 🔐 Authentication Endpoints

### Register New User

**Endpoint:** `POST /api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

**Response:** `201 Created`
```json
{
  "msg": "User registered successfully"
}
```

---

### Login

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

**Response:** `200 OK`
```json
{
  "token": "a1b2c3d4e5f6789..."
}
```

---

## 📇 Contacts Endpoints

> **Note:** All contacts endpoints require authentication via `x-auth-token` header.

---

### Get All Contacts

**Endpoint:** `GET /api/contacts`

**Headers:**
```
x-auth-token: <your-token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "abc123",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "123-456-7890"
  }
]
```

---

### Create Contact

**Endpoint:** `POST /api/contacts`

**Headers:**
```
x-auth-token: <your-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "123-456-7890"
}
```

**Field Requirements:**

| Field | Required | Default |
|-------|----------|---------|
| `name` | ✅ Yes | - |
| `email` | ❌ No | `""` |
| `phone` | ❌ No | `""` |

**Response:** `201 Created`
```json
{
  "id": "abc123",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "123-456-7890"
}
```

---

### Update Contact

**Endpoint:** `PUT /api/contacts/:id`

**Headers:**
```
x-auth-token: <your-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "111-222-3333"
}
```

**Response:** `200 OK`
```json
{
  "id": "abc123",
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "111-222-3333"
}
```

---

## ⚠️ Error Responses

| Status Code | Description |
|-------------|-------------|
| `400 Bad Request` | Missing required fields or invalid credentials |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Contact not found |

---

## 🧪 Testing with cURL

### 1. Register

```bash
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'
```

### 2. Login (copy the token from response)

```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'
```

### 3. Get all contacts (replace YOUR_TOKEN)

```bash
curl http://localhost:5050/api/contacts \
  -H "x-auth-token: YOUR_TOKEN"
```

### 4. Create a contact

```bash
curl -X POST http://localhost:5050/api/contacts \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_TOKEN" \
  -d '{"name":"Alice","email":"alice@test.com","phone":"123-456"}'
```

### 5. Update a contact (replace CONTACT_ID)

```bash
curl -X PUT http://localhost:5050/api/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_TOKEN" \
  -d '{"name":"Alice Smith"}'
```

---

## 🌐 CORS Setup

For frontend integration, enable CORS:

### 1. Install CORS package

```bash
npm install cors
```

### 2. Add to app.js

```javascript
const cors = require('cors');
app.use(cors());
```

---

## 📂 Project Structure

```
contacts-backend/
├── app.js              # Main application file
├── package.json        # Dependencies
├── package-lock.json   # Lock file
└── README.md          # Documentation
```

