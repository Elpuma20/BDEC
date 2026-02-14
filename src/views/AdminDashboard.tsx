import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, FileText, Clock, Trash2, Plus, X, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Stats {
    users: number;
    jobs: number;
    applications: number;
}

interface Application {
    id: number;
    job_title: string;
    company: string;
    user_name: string;
    user_email: string;
    applied_at: string;
}

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    category: string;
    posted_at: string;
}

const AdminDashboard: React.FC = () => {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState<'applications' | 'jobs'>('applications');
    const [stats, setStats] = useState<Stats | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [statsRes, appsRes, jobsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/applications/stats', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5000/api/applications', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5000/api/jobs')
                ]);

                const statsData = await statsRes.json();
                const appsData = await appsRes.json();
                const jobsData = await jobsRes.json();

                setStats(statsData.stats);
                setApplications(appsData);
                setJobs(jobsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [token]);

    const handleDeleteApplication = async (id: number) => {
        if (!window.confirm('¿Estás seguro de eliminar esta postulación?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/applications/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setApplications(applications.filter(a => a.id !== id));
                if (stats) setStats({ ...stats, applications: stats.applications - 1 });
            } else {
                alert('Error al eliminar la postulación');
            }
        } catch (error) {
            console.error('Delete application error:', error);
        }
    };

    const handleDeleteJob = async (id: number) => {
        if (!window.confirm('¿Estás seguro de eliminar este empleo? Se borrarán también las postulaciones asociadas.')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setJobs(jobs.filter(j => j.id !== id));
                // Update stats
                if (stats) setStats({ ...stats, jobs: stats.jobs - 1 });
            } else {
                alert('Error al eliminar el empleo');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) return <div className="container py-20">Cargando panel de administrador...</div>;

    return (
        <div className="admin-dashboard container py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
                <p className="text-muted">Monitoreo global de la plataforma BDEC</p>
            </header>

            <div className="stats-grid">
                <motion.div
                    className="stat-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Users className="icon-blue" size={24} />
                    <div className="stat-content">
                        <span className="label">Usuarios</span>
                        <span className="value">{stats?.users}</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Briefcase className="icon-purple" size={24} />
                    <div className="stat-content">
                        <span className="label">Empleos</span>
                        <span className="value">{stats?.jobs}</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <FileText className="icon-green" size={24} />
                    <div className="stat-content">
                        <span className="label">Postulaciones</span>
                        <span className="value">{stats?.applications}</span>
                    </div>
                </motion.div>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    <FileText size={18} /> Postulaciones
                </button>
                <button
                    className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    <Briefcase size={18} /> Gestionar Empleos
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'applications' ? (
                    <motion.section
                        key="apps-tab"
                        className="recent-activity py-6"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                    >
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Clock size={20} /> Todas las Postulaciones
                        </h2>

                        <div className="table-responsive glass">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Empleo</th>
                                        <th>Empresa</th>
                                        <th>Fecha</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="user-info">
                                                    <span className="name">{app.user_name}</span>
                                                    <span className="email">{app.user_email}</span>
                                                </div>
                                            </td>
                                            <td>{app.job_title}</td>
                                            <td>{app.company}</td>
                                            <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`mailto:${app.user_email}?subject=Sobre tu postulación para ${app.job_title}`}
                                                        className="btn-icon"
                                                        title="Contactar por correo"
                                                    >
                                                        <Mail size={16} />
                                                    </a>
                                                    <button
                                                        className="btn-icon danger"
                                                        onClick={() => handleDeleteApplication(app.id)}
                                                        title="Eliminar postulación"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key="jobs-tab"
                        className="recent-activity py-6"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Briefcase size={20} /> Listado de Empleos
                            </h2>
                            <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowAddModal(true)}>
                                <Plus size={18} /> Nuevo Empleo
                            </button>
                        </div>

                        <div className="table-responsive glass">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Empresa</th>
                                        <th>Categoría</th>
                                        <th>Publicado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job.id}>
                                            <td className="font-semibold">{job.title}</td>
                                            <td>{job.company}</td>
                                            <td><span className="job-tag-small">{job.category}</span></td>
                                            <td>{new Date(job.posted_at).toLocaleDateString()}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="btn-icon danger" onClick={() => handleDeleteJob(job.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Simple Add Modal Overlay */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <motion.div
                        className="admin-modal glass"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3>Añadir Nuevo Empleo</h3>
                            <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
                        </div>
                        <p className="mb-6">Para mantener la consistencia, usa el formulario de publicación estándar.</p>
                        <div className="flex gap-4">
                            <button className="btn btn-primary" onClick={() => window.location.href = '/post'}>Ir al formulario</button>
                            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cerrar</button>
                        </div>
                    </motion.div>
                </div>
            )}

            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                    margin-bottom: 40px;
                }

                .admin-tabs {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                    padding-bottom: 1px;
                }

                .tab-btn {
                    padding: 12px 24px;
                    background: none;
                    border: none;
                    border-bottom: 2px solid transparent;
                    color: var(--text-muted);
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    margin-bottom: -1px;
                }

                .tab-btn:hover {
                    color: var(--primary);
                }

                .tab-btn.active {
                    color: var(--primary);
                    border-bottom-color: var(--primary);
                }

                .stat-card {
                    padding: 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .stat-content {
                    display: flex;
                    flex-direction: column;
                }

                .stat-content .label {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-muted);
                }

                .stat-content .value {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: var(--text-main);
                }

                .icon-blue { color: #3b82f6; }
                .icon-purple { color: #a855f7; }
                .icon-green { color: #10b981; }

                .table-responsive {
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid var(--border);
                }

                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .admin-table th {
                    padding: 16px 24px;
                    background: rgba(0,0,0,0.02);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    font-weight: 700;
                }

                .admin-table td {
                    padding: 16px 24px;
                    border-top: 1px solid var(--border);
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                }

                .user-info .name {
                    font-weight: 600;
                    color: var(--text-main);
                }

                .user-info .email {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .btn-icon {
                    background: none;
                    border: none;
                    color: var(--primary);
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 8px;
                    transition: background 0.2s;
                }

                .btn-icon:hover {
                    background: rgba(0, 102, 255, 0.1);
                }

                .btn-icon.danger { color: #ef4444; }
                .btn-icon.danger:hover { background: rgba(239, 68, 68, 0.1); }

                .job-tag-small {
                    font-size: 0.75rem;
                    padding: 4px 8px;
                    background: rgba(0, 102, 255, 0.05);
                    color: var(--primary);
                    border-radius: 6px;
                    font-weight: 600;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .admin-modal {
                    background: white;
                    padding: 32px;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 450px;
                }

                @media (max-width: 768px) {
                    .admin-table {
                        font-size: 0.9rem;
                    }
                    .admin-table th:nth-child(3),
                    .admin-table td:nth-child(3) {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
