const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connectée"))
  .catch(err => console.error(err));

// Modèle message contact
const Message = mongoose.model("Message", new mongoose.Schema({
  name: String,
  email: String,
  message: String
}));

// Route POST contact
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  await Message.create({ name, email, message });
  res.send("Message reçu ✅");
});

app.get("/", (req, res) => res.send("API Portfolio fonctionne 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
