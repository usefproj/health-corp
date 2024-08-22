import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "users.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    // Get all users
    const users = JSON.parse(fs.readFileSync(dataFilePath));
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // Handle form submission
    const { name, password, age, height, weight } = req.body;
    const bmr = Math.floor(10 * weight + 6.25 * height - 5 * age + 5);

    // Read existing users from file
    let users = JSON.parse(fs.readFileSync(dataFilePath));

    // Add new user to the array
    users.push({ name, password, age, height, weight, bmr });

    // Write updated users to file
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: "User added", user: { name, bmr } });
  }
}
