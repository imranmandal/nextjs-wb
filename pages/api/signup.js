import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, phone, otp, password, phoneAuthToken, userSource } =
      req.body;

    const fetchRes = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        phone: phone,
        otp: otp,
        password: password,
        appLanguage: 1,
        phoneAuthToken: phoneAuthToken,
        userSource: userSource,
      }),
    });

    const data = await fetchRes.json();

    if (fetchRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, //1 week
          sameSite: "strict",
          path: "/",
        })
      );
      console.log(data);

      res.status(200).json({ user: data.user });
    } else {
      console.log(data);
      res.status(data.statusCode).json({
        message: data.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
