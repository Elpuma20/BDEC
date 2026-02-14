import { Request, Response } from 'express';
import { initDB } from '../config/db';

export const applyToJob = async (req: any, res: Response) => {
    const { jobId } = req.body;
    const userId = req.user.id;

    if (!jobId) {
        return res.status(400).json({ message: 'El ID del empleo es requerido' });
    }

    try {
        const db = await initDB();

        // Check if job exists
        const job = await db.get('SELECT * FROM jobs WHERE id = ?', [jobId]);
        if (!job) {
            return res.status(404).json({ message: 'El empleo no existe' });
        }

        // Check if already applied
        const existingApplication = await db.get(
            'SELECT * FROM applications WHERE user_id = ? AND job_id = ?',
            [userId, jobId]
        );

        if (existingApplication) {
            return res.status(400).json({ message: 'Ya te has postulado a este empleo' });
        }

        // Create application
        await db.run(
            'INSERT INTO applications (user_id, job_id, status) VALUES (?, ?, ?)',
            [userId, jobId, 'pending']
        );

        res.status(201).json({ message: 'Postulación enviada exitosamente' });
    } catch (error) {
        console.error('Application error:', error);
        res.status(500).json({ message: 'Error al procesar la postulación', error });
    }
};

export const getMyApplications = async (req: any, res: Response) => {
    const userId = req.user.id;

    try {
        const db = await initDB();
        const applications = await db.all(`
            SELECT a.*, j.title, j.company, j.location, j.category 
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            WHERE a.user_id = ?
            ORDER BY a.applied_at DESC
        `, [userId]);

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus postulaciones', error });
    }
};

export const getAllApplications = async (req: any, res: Response) => {
    // Basic role check
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: Se requieren permisos de administrador' });
    }

    try {
        const db = await initDB();
        const applications = await db.all(`
            SELECT a.*, j.title as job_title, j.company, u.name as user_name, u.email as user_email
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            JOIN users u ON a.user_id = u.id
            ORDER BY a.applied_at DESC
        `);

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todas las postulaciones', error });
    }
};

export const getAdminStats = async (req: any, res: Response) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    try {
        const db = await initDB();
        const totalUsers = await db.get('SELECT COUNT(*) as count FROM users');
        const totalJobs = await db.get('SELECT COUNT(*) as count FROM jobs');
        const totalApps = await db.get('SELECT COUNT(*) as count FROM applications');

        const recentApps = await db.all(`
            SELECT a.applied_at, u.name as user_name, j.title as job_title
            FROM applications a
            JOIN users u ON a.user_id = u.id
            JOIN jobs j ON a.job_id = j.id
            ORDER BY a.applied_at DESC
            LIMIT 5
        `);

        res.json({
            stats: {
                users: totalUsers.count,
                jobs: totalJobs.count,
                applications: totalApps.count
            },
            recentApps
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error });
    }
};

export const deleteApplication = async (req: any, res: Response) => {
    const { id } = req.params;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    try {
        const db = await initDB();
        const result = await db.run('DELETE FROM applications WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Postulación no encontrada' });
        }

        res.json({ message: 'Postulación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la postulación', error });
    }
};
