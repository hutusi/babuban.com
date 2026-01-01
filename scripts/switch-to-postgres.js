const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (process.env.VERCEL) {
  console.log('🚀 Detected Vercel environment. Switching Prisma schema to PostgreSQL...');
  
  let schema = fs.readFileSync(schemaPath, 'utf8');
  
  // Replace provider
  schema = schema.replace(
    'provider = "sqlite"',
    'provider = "postgresql"'
  );

  // Replace URL config for Vercel Postgres
  // Vercel Postgres provides POSTGRES_PRISMA_URL (pooling) and POSTGRES_URL_NON_POOLING (direct)
  schema = schema.replace(
    'url      = env("DATABASE_URL")',
    'url      = env("POSTGRES_PRISMA_URL")\n  directUrl = env("POSTGRES_URL_NON_POOLING")'
  );

  fs.writeFileSync(schemaPath, schema);
  console.log('✅ schema.prisma updated for PostgreSQL.');
} else {
  console.log('💻 Local environment detected. Keeping SQLite schema.');
}
