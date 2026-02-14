export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    salary: string;
    postedAt: string;
    description: string;
    requirements: string[];
    category: string;
}

export const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Desarrollador Web Junior',
        company: 'TechSoluciones Locales',
        location: 'Centro Comunitario',
        type: 'Full-time',
        salary: '$800 - $1200',
        postedAt: '2026-02-10',
        description: 'Buscamos un desarrollador entusiasta para integrarse a nuestro equipo de soluciones locales.',
        requirements: ['HTML/CSS/JS', 'PHP básico', 'Ganas de aprender'],
        category: 'Tecnología'
    },
    {
        id: '2',
        title: 'Administrador de Almacén',
        company: 'Distribuidora del Norte',
        location: 'Zona Industrial Sur',
        type: 'Full-time',
        salary: '$600 - $900',
        postedAt: '2026-02-12',
        description: 'Gestión de inventarios y logística para empresa líder en la comunidad.',
        requirements: ['Experiencia en Excel', 'Residencia cercana', 'Bachiller completo'],
        category: 'Logística'
    },
    // ... Se generarán 100 en la implementación final
];

for (let i = 3; i <= 100; i++) {
    mockJobs.push({
        id: i.toString(),
        title: `Puesto Comunitario ${i}`,
        company: `Empresa Local ${Math.floor(Math.random() * 20) + 1}`,
        location: `Sector ${Math.floor(Math.random() * 10) + 1}`,
        type: i % 3 === 0 ? 'Part-time' : 'Full-time',
        salary: `$${400 + Math.floor(Math.random() * 1000)}`,
        postedAt: '2026-02-13',
        description: 'Esta es una vacante generada para cumplir con el banco de datos inicial del BDEC.',
        requirements: ['Certificado de salud', 'Carta de residencia'],
        category: i % 2 === 0 ? 'Servicios' : 'Comercio'
    });
}
