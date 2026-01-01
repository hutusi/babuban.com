import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const movies = [
  {
    id: "8-1-2",
    title: "8 ½",
    year: 1963,
    director: "Federico Fellini",
    genres: ["Drama", "Avant-garde"],
    duration: "2h 18m",
    synopsis: "A harried film director retreats into his memories and fantasies.",
    rating: "Not Rated",
    posterUrl: "https://placehold.co/600x900/1c1917/d4af37?text=8+%C2%BD&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/d4af37?text=8+%C2%BD+Still",
  },
  {
    id: "vertigo",
    title: "Vertigo",
    year: 1958,
    director: "Alfred Hitchcock",
    genres: ["Noir", "Thriller", "Romance"],
    duration: "2h 8m",
    synopsis: "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
    rating: "PG",
    posterUrl: "https://placehold.co/600x900/1c1917/e11d48?text=Vertigo&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/e11d48?text=Vertigo+Still",
  },
  {
    id: "seven-samurai",
    title: "Seven Samurai",
    year: 1954,
    director: "Akira Kurosawa",
    genres: ["Action", "Drama"],
    duration: "3h 27m",
    synopsis: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    rating: "Not Rated",
    posterUrl: "https://placehold.co/600x900/1c1917/f5f5f4?text=Seven+Samurai&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/f5f5f4?text=Seven+Samurai+Still",
  },
  {
    id: "2001-space-odyssey",
    title: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    genres: ["Sci-Fi", "Adventure"],
    duration: "2h 29m",
    synopsis: "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000.",
    rating: "G",
    posterUrl: "https://placehold.co/600x900/1c1917/3b82f6?text=2001&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/3b82f6?text=2001+Still",
  },
  {
    id: "citizen-kane",
    title: "Citizen Kane",
    year: 1941,
    director: "Orson Welles",
    genres: ["Drama", "Mystery"],
    duration: "1h 59m",
    synopsis: "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance; 'Rosebud'.",
    rating: "PG",
    posterUrl: "https://placehold.co/600x900/1c1917/d4af37?text=Citizen+Kane&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/d4af37?text=Citizen+Kane+Still",
  },
  {
    id: "breathless",
    title: "Breathless",
    year: 1960,
    director: "Jean-Luc Godard",
    genres: ["Crime", "Drama"],
    duration: "1h 30m",
    synopsis: "A small-time thief steals a car and impulsively murders a motorcycle policeman. Wanted by the authorities, he reunites with a hip American journalism student and attempts to persuade her to run away with him to Italy.",
    rating: "Not Rated",
    posterUrl: "https://placehold.co/600x900/1c1917/9ca3af?text=Breathless&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/9ca3af?text=Breathless+Still",
  },
  {
    id: "tokyo-story",
    title: "Tokyo Story",
    year: 1953,
    director: "Yasujirō Ozu",
    genres: ["Drama"],
    duration: "2h 16m",
    synopsis: "An old couple visit their children and grandchildren in the city, but their children have little time for them.",
    rating: "Not Rated",
    posterUrl: "https://placehold.co/600x900/1c1917/d4af37?text=Tokyo+Story&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/d4af37?text=Tokyo+Story+Still",
  },
  {
    id: "lawrence-of-arabia",
    title: "Lawrence of Arabia",
    year: 1962,
    director: "David Lean",
    genres: ["Adventure", "Biography", "Drama"],
    duration: "3h 38m",
    synopsis: "The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.",
    rating: "PG",
    posterUrl: "https://placehold.co/600x900/1c1917/ea580c?text=Lawrence&font=playfair",
    backdropUrl: "https://placehold.co/1920x1080/1c1917/ea580c?text=Lawrence+Still",
  }
]

async function main() {
  console.log('Start seeding...')
  
  for (const movie of movies) {
    const { genres, ...movieData } = movie
    
    // Create or connect genres
    const genreConnect = []
    for (const g of genres) {
      const createdGenre = await prisma.genre.upsert({
        where: { name: g },
        update: {},
        create: { name: g },
      })
      genreConnect.push({ id: createdGenre.id })
    }

    const createdMovie = await prisma.movie.upsert({
      where: { id: movie.id },
      update: {},
      create: {
        ...movieData,
        genres: {
          connect: genreConnect
        }
      },
    })
    console.log(`Created movie with id: ${createdMovie.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
