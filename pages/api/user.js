import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const tokenStatusRes = await fetch(`${API_URL}/auth/is-valid-token`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (token) {
      if (tokenStatusRes.ok) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
