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
}

export async function down(knex: Knex): Promise<void> {}
