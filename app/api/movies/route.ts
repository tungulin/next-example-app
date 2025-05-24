import { NextRequest } from "next/server";
import db from "app/server/database";

import { Movie } from "@/entities/movie";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);

  let page = Number(searchParams.get("page"));
  let search = searchParams.get("search");

  if (!page) page = 1;

  const limit = 10;
  const offset = (page * limit) | limit;

  const movies = await db<Movie>("movies")
    .limit(limit)
    .where((builder) => {
      search && builder.where("title", "like", `%${search}%`);
    })
    .offset(offset)
    .select("*");

  const countPage = await db("movies")
    .count("id")
    .first()
    .then((resp: any) => Math.ceil(resp.count / limit) - 2);

  return new Response(JSON.stringify({ movies, countPage }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
