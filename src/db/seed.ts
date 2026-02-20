import { db } from "./bun-db";
import { directors, movies } from "./schema";

const directorsData = [
	{
		id: "fellini",
		name: "Federico Fellini",
		birthYear: 1920,
		deathYear: 1993,
		nationality: "Italian",
		biography:
			"Federico Fellini was an Italian film director and screenwriter known for his distinct style blending fantasy and baroque imagery. He is recognized as one of the greatest and most influential filmmakers of all time, winning four Academy Awards for Best Foreign Language Film.",
		photoUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop",
	},
	{
		id: "kurosawa",
		name: "Akira Kurosawa",
		birthYear: 1910,
		deathYear: 1998,
		nationality: "Japanese",
		biography:
			"Akira Kurosawa was a Japanese filmmaker and painter who directed 30 films in a career spanning 57 years. He is regarded as one of the most important and influential filmmakers in cinema history, known for his bold visual style and humanistic themes.",
		photoUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=500&fit=crop",
	},
	{
		id: "bergman",
		name: "Ingmar Bergman",
		birthYear: 1918,
		deathYear: 2007,
		nationality: "Swedish",
		biography:
			"Ernst Ingmar Bergman was a Swedish film and theatre director, writer, and producer. He is considered one of the most accomplished and influential filmmakers of all time, exploring themes of mortality, faith, and the human psyche.",
		photoUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=500&fit=crop",
	},
	{
		id: "tarkovsky",
		name: "Andrei Tarkovsky",
		birthYear: 1932,
		deathYear: 1986,
		nationality: "Russian",
		biography:
			"Andrei Arsenyevich Tarkovsky was a Soviet filmmaker, theatre director, writer, and film theorist. He is widely considered one of the greatest directors in film history, known for his poetic and metaphysical approach to cinema.",
		photoUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=500&fit=crop",
	},
	{
		id: "godard",
		name: "Jean-Luc Godard",
		birthYear: 1930,
		deathYear: 2022,
		nationality: "French-Swiss",
		biography:
			"Jean-Luc Godard was a French-Swiss film director, screenwriter, and film critic. He was a pioneer of the French New Wave, challenging conventions of traditional Hollywood cinema with innovative narrative structures and visual techniques.",
		photoUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=500&fit=crop",
	},
	{
		id: "kubrick",
		name: "Stanley Kubrick",
		birthYear: 1928,
		deathYear: 1999,
		nationality: "American-British",
		biography:
			"Stanley Kubrick was an American-born British film director, screenwriter, and producer. He is frequently cited as one of the greatest filmmakers of all time, known for his meticulous perfectionism, innovative cinematography, and wide-ranging genre work.",
		photoUrl: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a3aaf?w=400&h=500&fit=crop",
	},
	{
		id: "hitchcock",
		name: "Alfred Hitchcock",
		birthYear: 1899,
		deathYear: 1980,
		nationality: "British-American",
		biography:
			'Sir Alfred Joseph Hitchcock was a British-American film director and producer, widely regarded as one of the most influential figures in the history of cinema. Known as the "Master of Suspense," he directed more than 50 feature films.',
		photoUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=500&fit=crop",
	},
	{
		id: "ozu",
		name: "Yasujirō Ozu",
		birthYear: 1903,
		deathYear: 1963,
		nationality: "Japanese",
		biography:
			"Yasujirō Ozu was a Japanese film director and screenwriter. He is regarded as one of the most influential directors in the history of cinema, known for his distinctive low-angle shots and contemplative explorations of family dynamics.",
		photoUrl: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=400&h=500&fit=crop",
	},
];

const moviesData = [
	{
		id: "la-dolce-vita",
		title: "La Dolce Vita",
		year: 1960,
		directorId: "fellini",
		genre: ["Drama", "Comedy"],
		synopsis:
			"A journalist explores Rome's decadent high society in this sprawling episodic masterpiece that examines the search for meaning in a world of excess and spectacle.",
		posterUrl: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a3aaf?w=400&h=600&fit=crop",
		runtime: 174,
		rating: 8.0,
		language: "Italian",
		country: "Italy",
	},
	{
		id: "eight-and-half",
		title: "8½",
		year: 1963,
		directorId: "fellini",
		genre: ["Drama", "Fantasy"],
		synopsis:
			"A harried Italian film director struggles to find creative inspiration amidst personal turmoil, blending reality and fantasy in this groundbreaking exploration of the artistic process.",
		posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
		runtime: 138,
		rating: 8.0,
		language: "Italian",
		country: "Italy",
	},
	{
		id: "seven-samurai",
		title: "Seven Samurai",
		year: 1954,
		directorId: "kurosawa",
		genre: ["Action", "Drama"],
		synopsis:
			"A poor village hires seven samurai to protect them from bandits in this epic, influential masterpiece that defined the modern action film and ensemble storytelling.",
		posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
		runtime: 207,
		rating: 8.6,
		language: "Japanese",
		country: "Japan",
	},
	{
		id: "rashomon",
		title: "Rashomon",
		year: 1950,
		directorId: "kurosawa",
		genre: ["Crime", "Drama", "Mystery"],
		synopsis:
			"The rape of a bride and the murder of her samurai husband are recalled from the perspectives of a bandit, the bride, the samurai's ghost, and a woodcutter, questioning the nature of truth itself.",
		posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
		runtime: 88,
		rating: 8.2,
		language: "Japanese",
		country: "Japan",
	},
	{
		id: "seventh-seal",
		title: "The Seventh Seal",
		year: 1957,
		directorId: "bergman",
		genre: ["Drama", "Fantasy"],
		synopsis:
			"A medieval knight returning from the Crusades plays a game of chess with Death while seeking answers about life, death, and the existence of God.",
		posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
		runtime: 96,
		rating: 8.1,
		language: "Swedish",
		country: "Sweden",
	},
	{
		id: "persona",
		title: "Persona",
		year: 1966,
		directorId: "bergman",
		genre: ["Drama", "Thriller"],
		synopsis:
			"A nurse is put in charge of a mute actress and finds that their personalities begin to merge in this psychologically intense examination of identity and the nature of performance.",
		posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
		runtime: 83,
		rating: 8.1,
		language: "Swedish",
		country: "Sweden",
	},
	{
		id: "stalker",
		title: "Stalker",
		year: 1979,
		directorId: "tarkovsky",
		genre: ["Drama", "Sci-Fi"],
		synopsis:
			"A guide leads a writer and a professor through the Zone, a mysterious restricted area where the innermost desires of a person are said to come true, in this profound meditation on faith and human longing.",
		posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
		runtime: 163,
		rating: 8.1,
		language: "Russian",
		country: "Soviet Union",
	},
	{
		id: "solaris",
		title: "Solaris",
		year: 1972,
		directorId: "tarkovsky",
		genre: ["Drama", "Mystery", "Sci-Fi"],
		synopsis:
			"A psychologist is sent to a space station orbiting a mysterious planet that manifests physical embodiments of visitors' deepest memories, confronting the limits of human understanding.",
		posterUrl: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=400&h=600&fit=crop",
		runtime: 167,
		rating: 8.0,
		language: "Russian",
		country: "Soviet Union",
	},
	{
		id: "breathless",
		title: "Breathless",
		year: 1960,
		directorId: "godard",
		genre: ["Crime", "Drama"],
		synopsis:
			"A small-time thief who models himself on Humphrey Bogart steals a car and kills a policeman, then persuades a young American journalist to hide with him in Paris in this revolutionary New Wave classic.",
		posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
		runtime: 90,
		rating: 7.8,
		language: "French",
		country: "France",
	},
	{
		id: "contempt",
		title: "Contempt",
		year: 1963,
		directorId: "godard",
		genre: ["Drama"],
		synopsis:
			"A screenwriter is hired to rework a script for a film adaptation of Homer's Odyssey, while his marriage begins to disintegrate in this gorgeous meditation on cinema, art, and relationships.",
		posterUrl: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a3aaf?w=300&h=450&fit=crop",
		runtime: 103,
		rating: 7.6,
		language: "French",
		country: "France",
	},
	{
		id: "2001-space-odyssey",
		title: "2001: A Space Odyssey",
		year: 1968,
		directorId: "kubrick",
		genre: ["Sci-Fi", "Adventure"],
		synopsis:
			"After discovering a mysterious artifact buried beneath the lunar surface, humanity sets off on a quest to find its origins with help from HAL 9000, the world's most advanced supercomputer.",
		posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
		runtime: 149,
		rating: 8.3,
		language: "English",
		country: "United Kingdom",
	},
	{
		id: "clockwork-orange",
		title: "A Clockwork Orange",
		year: 1971,
		directorId: "kubrick",
		genre: ["Crime", "Sci-Fi"],
		synopsis:
			"In a dystopian future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, raising questions about free will, morality, and the nature of evil.",
		posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
		runtime: 136,
		rating: 8.3,
		language: "English",
		country: "United Kingdom",
	},
	{
		id: "vertigo",
		title: "Vertigo",
		year: 1958,
		directorId: "hitchcock",
		genre: ["Mystery", "Romance", "Thriller"],
		synopsis:
			"A former San Francisco police detective juggles his fear of heights and an obsessive fascination with a beautiful woman in this hypnotic exploration of obsession and identity.",
		posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
		runtime: 128,
		rating: 8.3,
		language: "English",
		country: "United States",
	},
	{
		id: "psycho",
		title: "Psycho",
		year: 1960,
		directorId: "hitchcock",
		genre: ["Horror", "Mystery", "Thriller"],
		synopsis:
			"A secretary on the run checks into a remote motel run by a young man under the domination of his mother in this groundbreaking thriller that redefined the horror genre.",
		posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
		runtime: 109,
		rating: 8.5,
		language: "English",
		country: "United States",
	},
	{
		id: "tokyo-story",
		title: "Tokyo Story",
		year: 1953,
		directorId: "ozu",
		genre: ["Drama"],
		synopsis:
			"An aging couple visits their grown children in Tokyo, only to find them too busy to spend time with their parents, in this quietly devastating masterpiece about family, generational change, and loneliness.",
		posterUrl: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=300&h=450&fit=crop",
		runtime: 136,
		rating: 8.2,
		language: "Japanese",
		country: "Japan",
	},
	{
		id: "late-spring",
		title: "Late Spring",
		year: 1949,
		directorId: "ozu",
		genre: ["Drama"],
		synopsis:
			"A widowed father feels compelled to fabricate a story about remarrying in order to encourage his devoted daughter to wed in this tender exploration of the bonds between parent and child.",
		posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop",
		runtime: 108,
		rating: 8.0,
		language: "Japanese",
		country: "Japan",
	},
];

async function seed() {
	console.log("🌱 Seeding database...");

	// Clear existing data
	db.delete(movies).run();
	db.delete(directors).run();

	// Insert directors
	for (const director of directorsData) {
		db.insert(directors).values(director).run();
	}
	console.log(`  ✓ Inserted ${directorsData.length} directors`);

	// Insert movies
	for (const movie of moviesData) {
		db.insert(movies).values(movie).run();
	}
	console.log(`  ✓ Inserted ${moviesData.length} movies`);

	console.log("✅ Seeding complete!");
}

seed();
