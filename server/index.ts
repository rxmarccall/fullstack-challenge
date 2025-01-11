import express from "express";
import cors from "cors";
import initializeDatabase from "./db";
const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉", rows });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/organizations", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json(rows);
});

app.get("/api/deals/:organization_id", (req, res) => {
    const organizationId = req.params.organization_id;

    const selectStatement = `
    SELECT 
        deals.id AS deal_id,
        deals.name AS deal_name,
        deals.created_at AS deal_created_at,
        deals.updated_at AS deal_updated_at,
        accounts.id AS account_id,
        accounts.name AS account_name,
        accounts.created_at AS account_created_at,
        accounts.updated_at AS account_updated_at
    FROM 
        deals
    JOIN 
        accounts ON deals.account_id = accounts.id
    JOIN 
        organizations ON accounts.organization_id = organizations.id
    WHERE 
        organizations.id = ?;
  `;


    const rows = db.prepare(selectStatement).all(organizationId);
    res.json(rows);
});