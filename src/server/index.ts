import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/save-rules", (req, res) => {
  const rules = req.body;
  const filePath = path.join(process.cwd(), "rules.json");

  fs.writeFile(filePath, JSON.stringify(rules, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Failed to save file");
    }
    return res.status(200).send("Succcess");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
