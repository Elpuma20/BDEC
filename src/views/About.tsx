import React from 'react';
import { Target, Users, AlertTriangle } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="about-view container">
            <header className="page-header">
                <h1>Acerca del Proyecto BDEC</h1>
                <p>Banco de Datos de Empleos Comunitarios - Código BCEC-2025-001</p>
            </header>

            <div className="about-content">
                <section className="about-section glass">
                    <div className="section-head">
                        <Target className="text-primary" size={24} />
                        <h2>Definición del Problema</h2>
                    </div>
                    <p>Existe una desconexión estructural entre la oferta y la demanda laboral local. Con un índice de desempleo local del 15-20% y asimetría de información, el BDEC nace para centralizar y facilitar el acceso a oportunidades laborales.</p>
                </section>

                <section className="about-section glass">
                    <div className="section-head">
                        <Users className="text-primary" size={24} />
                        <h2>Partes Interesadas</h2>
                        <p className="subtitle">Stakeholders clave del proyecto</p>
                    </div>
                    <div className="stakeholders-list">
                        <div className="stakeholder">
                            <strong>Dr. Juan Pérez</strong>
                            <span>Patrocinador y Tutor (Influencia Alta)</span>
                        </div>
                        <div className="stakeholder">
                            <strong>Comunidad</strong>
                            <span>Usuarios finales / Buscadores de empleo</span>
                        </div>
                        <div className="stakeholder">
                            <strong>Empresas Locales</strong>
                            <span>Proveedores de datos y ofertas</span>
                        </div>
                        <div className="stakeholder">
                            <strong>Equipo Universitario</strong>
                            <span>Desarrolladores y gestores (Ana, Carlos, María, Pedro)</span>
                        </div>
                    </div>
                </section>

                <section className="about-section glass">
                    <div className="section-head">
                        <AlertTriangle className="text-primary" size={24} />
                        <h2>Riesgos y Mitigación</h2>
                    </div>
                    <ul className="risks-list">
                        <li><strong>Retraso en recopilación:</strong> Mitigado mediante inicio de contactos desde la semana 1.</li>
                        <li><strong>Problemas de Hosting:</strong> Uso de plataformas robustas como GitHub Pages o similares.</li>
                        <li><strong>Bajo engagement:</strong> Realización de encuestas e incentivos comunitarios.</li>
                    </ul>
                </section>
            </div>

            <style>{`
        .about-view { padding-top: 40px; }
        .about-content { display: flex; flex-direction: column; gap: 32px; padding-bottom: 80px; }
        
        .about-section { padding: 40px; border-radius: var(--radius-lg); }
        .section-head { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .section-head h2 { font-size: 1.8rem; }
        .subtitle { width: 100%; color: var(--text-muted); font-size: 0.9rem; margin-top: -8px; }
        
        .about-section p { color: var(--text-muted); font-size: 1.1rem; line-height: 1.7; }
        
        .stakeholders-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 16px; }
        .stakeholder { padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; display: flex; flex-direction: column; gap: 4px; }
        .stakeholder strong { color: var(--text-main); }
        .stakeholder span { color: var(--text-muted); font-size: 0.85rem; }
        
        .risks-list { color: var(--text-muted); line-height: 1.8; padding-left: 20px; }
        .risks-list li strong { color: var(--text-main); }
      `}</style>
        </div>
    );
};

export default About;
