const express = require("express");
const cors = require("cors");
const sql = require("mssql");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuration MSSQL
const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "YourStrong@Passw0rd",
  server: process.env.DB_HOST || "localhost",
  port: 1433, // Make sure port is a number
  database: process.env.DB_NAME || "AzureHaven",
  // Move encrypt and trustServerCertificate to root level
  encrypt: process.env.DB_ENCRYPT === "true" || true,
  trustServerCertificate:
    process.env.DB_TRUST_SERVER_CERTIFICATE === "true" || true,
  enableArithAbort: true,
  // Connection timeout settings
  connectionTimeout: 60000, // 60 seconds
  requestTimeout: 60000, // 60 seconds
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    // Keep additional options here if needed
    useUTC: true,
    dateFirst: 1,
  },
};

// Test de connexion
sql
  .connect(config)
  .then(() => console.log("Connexion MSSQL réussie"))
  .catch((err) => console.error("Erreur de connexion MSSQL:", err));

// Middleware pour exécuter une requête
const executeQuery = async (res, query, params = []) => {
  try {
    const request = new sql.Request();
    params.forEach(({ name, type, value }) => {
      request.input(name, type, value);
    });
    const result = await request.query(query);
    res.json(result.recordset || result);
  } catch (err) {
    console.error("Erreur SQL:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET - Tous les étudiants
app.get("/api/etudiants", (req, res) => {
  const query = "SELECT * FROM etudiant ORDER BY nom, prenom";
  executeQuery(res, query);
});

// GET - Recherche
app.get("/api/etudiants/search", (req, res) => {
  const { q } = req.query;
  if (!q)
    return res.status(400).json({ error: "Paramètre de recherche requis" });

  const query = `
    SELECT * FROM etudiant
    WHERE nom LIKE @term OR prenom LIKE @term OR email LIKE @term OR tel LIKE @term
    ORDER BY nom, prenom
  `;
  executeQuery(res, query, [
    { name: "term", type: sql.NVarChar, value: `%${q}%` },
  ]);
});

// POST - Ajouter
app.post("/api/etudiants", async (req, res) => {
  const { nom, prenom, email, tel, date_naissance, filiere } = req.body;
  if (!nom || !prenom || !email || !tel || !date_naissance || !filiere)
    return res.status(400).json({ error: "Tous les champs sont requis" });

  const query = `
    INSERT INTO etudiant (nom, prenom, email, tel, date_naissance, filiere)
    VALUES (@nom, @prenom, @email, @tel, @date_naissance, @filiere)
  `;
  try {
    const request = new sql.Request();
    request.input("nom", sql.NVarChar, nom);
    request.input("prenom", sql.NVarChar, prenom);
    request.input("email", sql.NVarChar, email);
    request.input("tel", sql.NVarChar, tel);
    request.input("date_naissance", sql.Date, date_naissance);
    request.input("filiere", sql.NVarChar, filiere);
    const result = await request.query(query);
    res.status(201).json({ message: "Étudiant ajouté avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'ajout:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT - Modifier
app.put("/api/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, tel, date_naissance, filiere } = req.body;
  if (!nom || !prenom || !email || !tel || !date_naissance || !filiere)
    return res.status(400).json({ error: "Tous les champs sont requis" });

  const query = `
    UPDATE etudiant
    SET nom = @nom, prenom = @prenom, email = @email, tel = @tel, date_naissance = @date_naissance, filiere = @filiere
    WHERE id = @id
  `;
  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("nom", sql.NVarChar, nom);
    request.input("prenom", sql.NVarChar, prenom);
    request.input("email", sql.NVarChar, email);
    request.input("tel", sql.NVarChar, tel);
    request.input("date_naissance", sql.Date, date_naissance);
    request.input("filiere", sql.NVarChar, filiere);
    const result = await request.query(query);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    res.json({ message: "Étudiant modifié avec succès" });
  } catch (err) {
    console.error("Erreur modification:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE - Supprimer
app.delete("/api/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM etudiant WHERE id = @id";

  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    const result = await request.query(query);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    res.json({ message: "Étudiant supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Étudiant par ID
app.get("/api/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM etudiant WHERE id = @id";

  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    const result = await request.query(query);
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Erreur récupération:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API MSSQL de gestion des étudiants" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
