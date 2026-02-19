import { initDB } from './server/config/db';

async function checkJobs() {
    try {
        const db = await initDB();
        const count = await db.get('SELECT COUNT(*) as count FROM jobs');
        console.log(`Current jobs count: ${count.count}`);
        const jobs = await db.all('SELECT * FROM jobs LIMIT 5');
        console.log('Sample jobs:', JSON.stringify(jobs, null, 2));
    } catch (error) {
        console.error('Error checking jobs:', error);
    }
}

checkJobs();
