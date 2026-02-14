import React from 'react';
import { motion } from 'framer-motion';
import { Search, Building2, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-view">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="hero-title">
                            Impulsando el Talento <span className="highlight">Local</span>
                        </h1>
                        <p className="hero-subtitle">
                            BDEC: La plataforma centralizada para conectar ofertas comunitarias con el talento de nuestra zona. Reduciendo la brecha laboral paso a paso.
                        </p>
                        <div className="hero-cta">
                            <button onClick={() => navigate('/jobs')} className="btn btn-primary btn-lg">
                                Ver Empleos <ArrowRight size={20} />
                            </button>
                            <button onClick={() => navigate('/post')} className="btn btn-outline btn-lg">
                                Publicar Vacante
                            </button>
                        </div>
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-value">100+</span>
                                <span className="stat-label">Ofertas Iniciales</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">2026</span>
                                <span className="stat-label">Año de Inicio</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-image-placeholder"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="image-card glass">
                            <div className="card-header">
                                <CheckCircle className="text-primary" size={24} />
                                <span>Impacto Comunitario</span>
                            </div>
                            <div className="card-body">
                                <p>Nuestra meta: Reducir el desempleo local (15-20%) mediante información centralizada.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured">
                <div className="container">
                    <h2 className="section-title text-center">Nuestros Pilares</h2>
                    <div className="pillars-grid">
                        <div className="pillar-card">
                            <div className="pillar-icon"><Search size={32} /></div>
                            <h3>Búsqueda Local</h3>
                            <p>Filtra por sectores comunitarios y encuentra lo más cercano a ti.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon"><Building2 size={32} /></div>
                            <h3>Empresas de la Zona</h3>
                            <p>Conecta directamente con negocios que valoran el talento local.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon"><Briefcase size={32} /></div>
                            <h3>Gestión Transparente</h3>
                            <p>Información clara sobre requisitos y salarios desde el inicio.</p>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        .hero {
          padding: 80px 0;
          background: radial-gradient(circle at top right, rgba(0, 102, 255, 0.05), transparent);
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 24px;
          color: var(--text-main);
        }
        
        .highlight {
          color: var(--primary);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          max-width: 540px;
        }
        
        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }
        
        .btn-lg {
          padding: 14px 28px;
          font-size: 1.1rem;
        }
        
        .stats-row {
          display: flex;
          gap: 40px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
        }
        
        .stat-label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .image-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 16px;
        }
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 48px;
        }
        
        .text-center { text-align: center; }
        
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .pillar-card {
          padding: 32px;
          background: var(--surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          transition: transform 0.2s;
        }
        
        .pillar-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
        }
        
        .pillar-icon {
          color: var(--primary);
          margin-bottom: 24px;
        }
        
        .pillar-card h3 {
          margin-bottom: 16px;
        }
        
        .pillar-card p {
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.5rem; }
          .pillars-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default Home;
