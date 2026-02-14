import { initDB } from './config/db';

async function seed() {
    const db = await initDB();

    const jobsCount = await db.get('SELECT COUNT(*) as count FROM jobs');

    if (jobsCount.count === 0) {
        console.log('Seeding initial jobs...');
        const categories = ['Tecnología', 'Comercio', 'Servicios', 'Logística', 'Educación'];
        const locations = ['Sector Centro', 'Zona Norte', 'Pueblo Viejo', 'San Vicente', 'La Esperanza'];
        const modalities = ['Presencial', 'Remoto', 'Híbrido'];

        for (let i = 1; i <= 100; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const modality = modalities[Math.floor(Math.random() * modalities.length)];

            await db.run(
                'INSERT INTO jobs (title, company, location, category, salary, modality, requirements, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    `Puesto de ${category} #${i}`,
                    `Empresa Local ${String.fromCharCode(65 + (i % 26))}`,
                    locations[Math.floor(Math.random() * locations.length)],
                    category,
                    `$${500 + (i * 10)} - $${800 + (i * 15)}`,
                    modality,
                    '• Experiencia mínima de 1 año\n• Disponibilidad inmediata\n• Título de bachiller o técnico',
                    `Esta es una descripción detallada para el puesto de ${category} número ${i}. Buscamos personas comprometidas con el desarrollo comunitario.`
                ]
            );
        }
        console.log('100 initial jobs seeded.');
    }
}

seed().catch(console.error);
