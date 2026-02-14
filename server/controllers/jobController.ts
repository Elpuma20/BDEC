import { Request, Response } from 'express';
import { initDB } from '../config/db';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const db = await initDB();
        const jobs = await db.all('SELECT * FROM jobs ORDER BY posted_at DESC');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleos', error });
    }
};

export const createJob = async (req: Request, res: Response) => {
    const { title, company, location, category, salary, modality, requirements, description } = req.body;

    try {
        const db = await initDB();
        const result = await db.run(
            'INSERT INTO jobs (title, company, location, category, salary, modality, requirements, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, company, location, category, salary, modality, requirements, description]
        );

        const newJob = await db.get('SELECT * FROM jobs WHERE id = ?', [result.lastID]);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear empleo', error });
    }
};

export const deleteJob = async (req: any, res: Response) => {
    const { id } = req.params;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    try {
        const db = await initDB();

        // Check if job has applications
        const applications = await db.get('SELECT COUNT(*) as count FROM applications WHERE job_id = ?', [id]);
        if (applications.count > 0) {
            // Delete applications first or prevent deletion? Let's delete them for simplicity in this community app
            await db.run('DELETE FROM applications WHERE job_id = ?', [id]);
        }

        const result = await db.run('DELETE FROM jobs WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Empleo no encontrado' });
        }

        res.json({ message: 'Empleo eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleo', error });
    }
};
