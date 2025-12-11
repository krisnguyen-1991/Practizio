import { initializeDatabase } from '../database/db.js';
import { seedDatabase } from '../database/seed.js';

// Initialize and seed the database
console.log('🚀 Initializing database...\n');
initializeDatabase();

console.log('\n🌱 Seeding data...\n');
seedDatabase();

console.log('\n✨ All done!');
process.exit(0);
