import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PostJob: React.FC = () => {
    const { token, user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        salary: '',
        modality: 'Presencial',
        requirements: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('Debes iniciar sesión para publicar un empleo.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al publicar empleo');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass"
                    style={{ padding: '40px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}
                >
                    <div style={{ color: 'var(--primary)', marginBottom: '20px' }}>
                        <Send size={48} />
                    </div>
                    <h2>¡Propuesta Enviada!</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>
                        Tu oferta ha sido recibida y será revisada según los estándares del BDEC. Gracias por contribuir al empleo local.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ marginTop: '24px' }}>
                        Publicar otra vacante
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="post-job container">
            <header className="page-header">
                <h1>Publicar Nueva Vacante</h1>
                <p>Completa el formulario para registrar una oportunidad laboral en el banco de datos.</p>
            </header>

            <div className="form-sections">
                <form onSubmit={handleSubmit} className="post-form glass">
                    {error && <div className="auth-error" style={{ marginBottom: '20px' }}>{error}</div>}

                    {!user && (
                        <div className="auth-warning" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                            Nota: Debes ingresar a tu cuenta para poder publicar.
                        </div>
                    )}

                    <div className="form-group">
                        <label>Título del Puesto</label>
                        <div className="input-wrapper">
                            <Briefcase className="input-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Ej. Desarrollador Web, Administrador..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Empresa</label>
                            <input
                                type="text"
                                placeholder="Nombre de la empresa local"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ubicación / Sector</label>
                            <div className="input-wrapper">
                                <MapPin className="input-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="Ej. Sector Centro, Zona Norte..."
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Categoría</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Comercio">Comercio</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Logística">Logística</option>
                                <option value="Educación">Educación</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Modalidad</label>
                            <select
                                value={formData.modality}
                                onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                                required
                            >
                                <option value="Presencial">Presencial</option>
                                <option value="Remoto">Remoto</option>
                                <option value="Híbrido">Híbrido</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Rango Salarial</label>
                            <div className="input-wrapper">
                                <DollarSign className="input-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="Ej. $600 - $800"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Requerimientos (opcional)</label>
                            <input
                                type="text"
                                placeholder="Ej. Bachiller, 2 años exp..."
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción del Puesto</label>
                        <textarea
                            rows={5}
                            placeholder="Describe las responsabilidades y beneficios..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading || !user}>
                        {loading ? 'Publicando...' : 'Publicar Oferta Laboral'}
                    </button>
                </form>

                <aside className="post-info">
                    <div className="info-card">
                        <h4>Importante</h4>
                        <ul>
                            <li>Debe ser una empresa local o comunitaria.</li>
                            <li>Revisión manual en 24-48 horas.</li>
                            <li>Conexión directa con residentes de la zona.</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <style>{`
        .post-job { padding-top: 40px; }
        .page-header { margin-bottom: 40px; }
        .page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
        .page-header p { color: var(--text-muted); }
        
        .form-sections {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
        }
        
        .post-form {
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        
        .post-form input, .post-form select, .post-form textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          background: var(--surface);
          outline: none;
          transition: border-color 0.2s;
        }
        
        .post-form .input-wrapper input { padding-left: 40px; }
        
        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
        }

        .post-form input:focus, .post-form select:focus, .post-form textarea:focus {
          border-color: var(--primary);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .info-card {
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        
        .info-card h4 { margin-bottom: 16px; color: var(--primary); }
        .info-card ul { padding-left: 20px; color: var(--text-muted); font-size: 0.9rem; display: flex; flex-direction: column; gap: 12px; }
        
        .w-full { width: 100%; }

        @media (max-width: 900px) {
          .form-sections { grid-template-columns: 1fr; }
          .post-info { order: -1; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default PostJob;
