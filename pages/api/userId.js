import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const data = cookie.parse(req.headers.cookie);

    if (data.uuid) {
      res.status(200).json({ uuid: data.uuid });
    } else {
      res.status(403).json({ message: "Doesn't exists" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
