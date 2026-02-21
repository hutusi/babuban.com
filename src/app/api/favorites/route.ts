import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { movies, directors } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
	const ids = request.nextUrl.searchParams.get("ids");
	if (!ids) return NextResponse.json([]);

	const idList = ids.split(",").filter(Boolean);
	if (idList.length === 0) return NextResponse.json([]);

	const rows = db
		.select({
			id: movies.id,
			title: movies.title,
			year: movies.year,
			posterUrl: movies.posterUrl,
			genre: movies.genre,
			directorName: directors.name,
		})
		.from(movies)
		.innerJoin(directors, eq(movies.directorId, directors.id))
		.where(inArray(movies.id, idList))
		.all();

	return NextResponse.json(rows);
}
