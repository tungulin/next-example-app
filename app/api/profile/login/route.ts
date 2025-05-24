import { NextRequest, NextResponse } from "next/server";
import db from "app/server/database";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "app/server/constants";

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

  if (!user) {
    return NextResponse.json(
      { message: "User with this login does not exist" },
      { status: 401 }
    );
  }

  //TODO: enc
  if (user.password !== password) {
    return NextResponse.json({ message: "Wrong password" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id, login: user.login }, JWT_TOKEN, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24,
  });

  return response;
}
