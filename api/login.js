import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "users.json");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    let users = JSON.parse(fs.readFileSync(dataFilePath));

    const user = users.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      res.status(200).json({ loggedIn: true, name: user.name, bmr: user.bmr });
    } else {
      res.status(401).json({ loggedIn: false });
    }
  }
}
