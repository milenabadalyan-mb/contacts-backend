console.log("APP STARTING...");
const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// --------------------
// In-memory storage
// --------------------
const users = []; // { username, password, contacts: [] }
const sessions = {}; // { token: username }

// --------------------
// Root route - server test
// --------------------
app.get("/", (req, res) => {
  res.send("Contacts API is running");
});

// --------------------
// Auth middleware
// --------------------
function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token || !sessions[token]) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  req.username = sessions[token];
  next();
}

// --------------------
// Auth Routes
// --------------------

// Register
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password are required" });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  users.push({ username, password, contacts: [] });
  res.status(201).json({ msg: "User registered successfully" });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = crypto.randomBytes(16).toString("hex");
  sessions[token] = username;

  res.json({ token });
});

// --------------------
// Contacts Routes (require token)
// --------------------

// Get all contacts for logged-in user
app.get("/api/contacts", authMiddleware, (req, res) => {
  const user = users.find(u => u.username === req.username);
  res.json(user.contacts);
});

// Create a new contact
app.post("/api/contacts", authMiddleware, (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) return res.status(400).json({ msg: "Contact name is required" });

  const user = users.find(u => u.username === req.username);

  const newContact = {
    id: crypto.randomBytes(8).toString("hex"),
    name,
    email: email || "",
    phone: phone || "",
  };

  user.contacts.push(newContact);
  res.status(201).json(newContact);
});

// Edit an existing contact
app.put("/api/contacts/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const user = users.find(u => u.username === req.username);
  const contact = user.contacts.find(c => c.id === id);

  if (!contact) return res.status(404).json({ msg: "Contact not found" });

  if (name !== undefined) contact.name = name;
  if (email !== undefined) contact.email = email;
  if (phone !== undefined) contact.phone = phone;

  res.json(contact);
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
