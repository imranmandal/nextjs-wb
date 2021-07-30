// auth/signin
import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { phone, password } = req.body;

    const loginRes = await fetch(`${API_URL}/auth/v2/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    });

    const data = await loginRes.json();

    if (loginRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 30, //1 month
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ token: data.accessToken });
    } else {
      res.status(data.statusCode).json({
        message: data.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
