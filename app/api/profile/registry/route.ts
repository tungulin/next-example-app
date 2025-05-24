import { NextRequest, NextResponse } from "next/server";
import db from "app/server/database";
import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json();

  if (!data.login || !data.password) {
    return NextResponse.json(
      { message: "Login and password are required" },
      { status: 400 }
    );
  }

  const { login, password } = data;

  const user = await db("users").where({ login }).first();

  if (user) {
    return NextResponse.json(
      { message: "User with this login already exists" },
      { status: 401 }
    );
  }

  const newUser = await db("users")
    .insert({
      login,
      password,
    })
    .returning("*")
    .then((val) => val[0]);

  console.log("newUser", newUser);

  const token = jwt.sign(
    { userId: newUser.id, login: newUser.login },
    JWT_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  const response = NextResponse.json({ message: "Registry successful" });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 24, // 1 час
  });

  return response;
}
