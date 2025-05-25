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
      { status: 422 }
    );
  }

  //TODO: enc
  if (user.password !== password) {
    return NextResponse.json({ message: "Wrong password" }, { status: 422 });
  }

  user.favoriteMovies = await db("favoriteMovies")
    .join("movies", "movies.id", "favoriteMovies.movieId")
    .where("favoriteMovies.userId", user.id)
    .select(
      "movies.id",
      "movies.title",
      "movies.year",
      "movies.extract",
      "movies.thumbnail",
      "movies.genres",
      "movies.cast"
    );

  const token = jwt.sign({ userId: user.id, login: user.login }, JWT_TOKEN, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({ user });

  response.cookies.set({
    name: "token",
    value: token,
    maxAge: 7 * 24 * 60,
  });

  return response;
}
