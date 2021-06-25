import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { uuid } = req.body;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("uuid", uuid, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 30, //1 Month
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ uuid: uuid, message: "uuid saved." });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
