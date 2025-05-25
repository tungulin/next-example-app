import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("movies", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.integer("year").notNullable();
    table.text("extract");
    table.string("thumbnail");
    table.specificType("genres", "text[]");
    table.specificType("cast", "text[]");
  });

  await knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("login").notNullable();
    table.string("password").notNullable();
  });

  await knex.schema.createTable("ratings", function (table) {
    table.increments("id").primary();
    table.integer("rating").notNullable();
    table.integer("movieId").references("id").inTable("movies");
    table.integer("userId").references("id").inTable("users");
  });

  await knex.schema.createTable("favoriteMovies", function (table) {
    table.increments("id").primary();
    table.integer("movieId").references("id").inTable("movies");
    table.integer("userId").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("favoriteMovies");
  await knex.schema.dropTable("ratings");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("movies");
}
