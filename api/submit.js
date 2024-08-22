import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "users.json");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, password, age, height, weight } = req.body;
    const bmr = Math.floor(10 * weight + 6.25 * height - 5 * age + 5);

    let users = JSON.parse(fs.readFileSync(dataFilePath));
    users.push({ name, password, age, height, weight, bmr });
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    res.status(200).send(`
      <h1>Form Submitted</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Height:</strong> ${height} cm</p>
      <p><strong>Weight:</strong> ${weight} kg</p>
      <p><strong>Daily calories:</strong> ${bmr}</p>
    `);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
