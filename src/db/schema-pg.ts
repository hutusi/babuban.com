import { pgTable, text, integer, real } from "drizzle-orm/pg-core";

export const directors = pgTable("directors", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	birthYear: integer("birth_year").notNull(),
	deathYear: integer("death_year"),
	nationality: text("nationality").notNull(),
	biography: text("biography").notNull(),
	photoUrl: text("photo_url").notNull(),
});

export const movies = pgTable("movies", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	year: integer("year").notNull(),
	directorId: text("director_id")
		.notNull()
		.references(() => directors.id),
	genre: text("genre").notNull(), // JSON string, parsed in app
	synopsis: text("synopsis").notNull(),
	posterUrl: text("poster_url").notNull(),
	runtime: integer("runtime").notNull(),
	rating: real("rating"),
	language: text("language").notNull(),
	country: text("country").notNull(),
});
