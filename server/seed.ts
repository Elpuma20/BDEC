import { initDB } from './config/db';

async function seed() {
    const db = await initDB();

    const jobsCount = await db.get('SELECT COUNT(*) as count FROM jobs');

    if (jobsCount.count === 0) {
        console.log('Seeding initial jobs...');

        const vacancies = [
            {
                title: 'Asistente Administrativo',
                company: 'Cooperativa El Futuro',
                location: 'Sector Centro',
                category: 'Servicios',
                salary: '$450 - $550',
                modality: 'Presencial',
                requirements: '• Título de bachiller o técnico en administración\n• Manejo intermedio de Excel\n• Experiencia de 1 año en tareas de oficina',
                description: 'Buscamos una persona organizada para apoyar en la gestión documental y atención al cliente de nuestra cooperativa.'
            },
            {
                title: 'Vendedor de Piso',
                company: 'Tiendas La Economía',
                location: 'Zona Norte',
                category: 'Comercio',
                salary: '$380 - $420 + Comisiones',
                modality: 'Presencial',
                requirements: '• Excelente trato al público\n• Dinamismo y proactividad\n• Disponibilidad para turnos rotativos',
                description: 'Únete a nuestro equipo de ventas para brindar la mejor experiencia de compra a nuestros clientes.'
            },
            {
                title: 'Repartidor en Moto',
                company: 'Express Comunitario',
                location: 'Pueblo Viejo',
                category: 'Logística',
                salary: '$400 - $600',
                modality: 'Presencial',
                requirements: '• Moto propia en buen estado\n• Licencia de conducir vigente\n• Conocimiento de las rutas locales',
                description: 'Encárgate de entregar pedidos a domicilio de manera rápida y segura dentro de la comunidad.'
            },
            {
                title: 'Técnico de Mantenimiento',
                company: 'Residencias El Parque',
                location: 'Sector Centro',
                category: 'Servicios',
                salary: '$500 - $650',
                modality: 'Presencial',
                requirements: '• Conocimientos básicos de electricidad y plomería\n• Experiencia previa comprobable\n• Responsabilidad y puntualidad',
                description: 'Realizar labores de mantenimiento preventivo y correctivo en las instalaciones del conjunto residencial.'
            },
            {
                title: 'Recepcionista',
                company: 'Hotel Plaza Central',
                location: 'Sector Centro',
                category: 'Turismo',
                salary: '$480 - $520',
                modality: 'Presencial',
                requirements: '• Dominio de inglés (básico/intermedio)\n• Manejo de sistemas de reserva\n• Buena presencia y atención al cliente',
                description: 'Serás el primer punto de contacto para nuestros huéspedes, gestionando check-ins, check-outs y consultas.'
            },
            {
                title: 'Mesero/a',
                company: 'Restaurante Sabor de Casa',
                location: 'Zona Norte',
                category: 'Servicios',
                salary: '$350 + Propinas',
                modality: 'Presencial',
                requirements: '• Experiencia mínima de 6 meses\n• Rapidez y eficiencia\n• Certificado de manipulación de alimentos',
                description: 'Buscamos personal atento y amable para brindar un excelente servicio de mesa en nuestro restaurante familiar.'
            },
            {
                title: 'Auxiliar de Almacén',
                company: 'Logística San Juan',
                location: 'La Esperanza',
                category: 'Logística',
                salary: '$420 - $480',
                modality: 'Presencial',
                requirements: '• Buena condición física\n• Capacidad de trabajar en equipo\n• Orden y disciplina',
                description: 'Apoyo en la carga, descarga y organización de mercancía en nuestro centro de distribución.'
            },
            {
                title: 'Programador Junior (React)',
                company: 'TechSoluciones',
                location: 'Remoto',
                category: 'Tecnología',
                salary: '$800 - $1200',
                modality: 'Remoto',
                requirements: '• Conocimientos sólidos en React y TypeScript\n• Capacidad de aprendizaje rápido\n• Inglés técnico',
                description: 'Participa en el desarrollo de aplicaciones web innovadoras trabajando desde la comodidad de tu casa.'
            },
            {
                title: 'Cajero/a',
                company: 'Supermercado El Vecino',
                location: 'San Vicente',
                category: 'Comercio',
                salary: '$400 - $450',
                modality: 'Presencial',
                requirements: '• Habilidad para el cálculo numérico\n• Experiencia en manejo de efectivo\n• Honestidad comprobada',
                description: 'Gestión de cobros en caja, atención directa al cliente y arqueo diario.'
            },
            {
                title: 'Personal de Limpieza',
                company: 'Servicios Integrales',
                location: 'Varios Sectores',
                category: 'Servicios',
                salary: '$350 - $400',
                modality: 'Presencial',
                requirements: '• Disponibilidad inmediata\n• Experiencia en limpieza de oficinas\n• Certificado de salud vigente',
                description: 'Buscamos personal para realizar labores de limpieza profunda en diferentes sedes de nuestros clientes.'
            }
        ];

        for (const job of vacancies) {
            await db.run(
                'INSERT INTO jobs (title, company, location, category, salary, modality, requirements, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [job.title, job.company, job.location, job.category, job.salary, job.modality, job.requirements, job.description]
            );
        }
        console.log(`${vacancies.length} realistic jobs seeded.`);
    }
}

seed().catch(console.error);

