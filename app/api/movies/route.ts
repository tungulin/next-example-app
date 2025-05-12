import { NextRequest } from "next/server";
import db from "app/database";

import { Movie } from "@/entities/movie";

type Params = {
  page?: number;
  search?: string;
};

export async function GET(
  req: NextRequest,
  context: { params: Params }
): Promise<Response> {
  let page = context.params?.page;
  let search = context.params?.search;

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
