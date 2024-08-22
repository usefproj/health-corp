export default async function handler(req, res) {
  // Handle only POST requests for logout
  if (req.method === "POST") {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Unable to log out." });
      }
      // Redirect to the home page after logout
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
