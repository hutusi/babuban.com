import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const directors = sqliteTable("directors", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	birthYear: integer("birth_year").notNull(),
	deathYear: integer("death_year"),
	nationality: text("nationality").notNull(),
	biography: text("biography").notNull(),
	photoUrl: text("photo_url").notNull(),
});

export const movies = sqliteTable("movies", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	year: integer("year").notNull(),
	directorId: text("director_id")
		.notNull()
		.references(() => directors.id),
	genre: text("genre", { mode: "json" }).notNull().$type<string[]>(),
	synopsis: text("synopsis").notNull(),
	posterUrl: text("poster_url").notNull(),
	runtime: integer("runtime").notNull(),
	rating: real("rating"),
	language: text("language").notNull(),
	country: text("country").notNull(),
});
