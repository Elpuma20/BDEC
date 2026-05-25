import React from 'react';
import { Target, Eye, ShieldCheck, TrendingUp, Heart, Sparkles, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="about-view container">
            <header className="page-header text-center">
                <h1>Sobre ProLinker</h1>
                <p className="lead">Conectando el talento local con el corazón del comercio y la industria comunitaria.</p>
            </header>

            <div className="about-content">
                {/* Mission & Vision Section */}
                <div className="mission-vision-grid">
                    <section className="about-section glass">
                        <div className="section-head">
                            <Target className="text-primary icon-glow" size={32} />
                            <h2>Nuestra Misión</h2>
                        </div>
                        <p>
                            Nuestra misión es descentralizar y democratizar el acceso al empleo local, conectando de manera transparente e instantánea a las personas talentosas de la zona con comercios y empresas comunitarias, fomentando así un ecosistema económico local sostenible y justo.
                        </p>
                    </section>

                    <section className="about-section glass">
                        <div className="section-head">
                            <Eye className="text-primary icon-glow" size={32} />
                            <h2>Nuestra Visión</h2>
                        </div>
                        <p>
                            Aspiramos a convertirnos en la red de vinculación laboral y comunitaria líder de la región, promoviendo la reducción de la brecha laboral mediante tecnología moderna y humana que demuestre que las mejores oportunidades de crecimiento siempre están a la vuelta de la esquina.
                        </p>
                    </section>
                </div>

                {/* Values Section */}
                <section className="values-section">
                    <h2 className="section-title text-center">Nuestros Valores</h2>
                    <p className="section-subtitle text-center">Los principios fundamentales que guían cada postulación y conexión dentro de la plataforma.</p>
                    
                    <div className="values-grid">
                        <div className="value-card glass">
                            <ShieldCheck className="value-icon text-primary" size={28} />
                            <h3>Transparencia</h3>
                            <p>Creemos en la claridad absoluta. Todas nuestras ofertas detallan requisitos, salarios y condiciones desde el primer día.</p>
                        </div>

                        <div className="value-card glass">
                            <TrendingUp className="value-icon text-primary" size={28} />
                            <h3>Impacto Local</h3>
                            <p>Apoyamos el crecimiento del comercio de la zona, ayudándolos a encontrar el personal idóneo que reside en su propia comunidad.</p>
                        </div>

                        <div className="value-card glass">
                            <Heart className="value-icon text-primary" size={28} />
                            <h3>Inclusión</h3>
                            <p>Una plataforma diseñada para todos. Facilitamos el acceso directo a oportunidades dignas sin barreras de entrada artificiales.</p>
                        </div>

                        <div className="value-card glass">
                            <Sparkles className="value-icon text-primary" size={28} />
                            <h3>Innovación Social</h3>
                            <p>Aprovechamos la tecnología moderna y el diseño intuitivo para resolver problemáticas de desempleo y asimetrías de información.</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="about-section glass pillars-highlight">
                    <div className="section-head">
                        <h2>¿Por qué elegir ProLinker?</h2>
                    </div>
                    <p className="mb-6">Hemos diseñado una plataforma que elimina intermediarios innecesarios y optimiza los tiempos de búsqueda:</p>
                    <div className="pillars-list">
                        <div className="pillar-item">
                            <CheckCircle className="text-primary" size={20} />
                            <div>
                                <strong>Geolocalización Inteligente:</strong> Encuentra vacantes dentro de tu propio sector o zona geográfica, reduciendo tiempos y costes de transporte.
                            </div>
                        </div>
                        <div className="pillar-item">
                            <CheckCircle className="text-primary" size={20} />
                            <div>
                                <strong>Publicación Express:</strong> Las empresas locales pueden subir sus ofertas en segundos y recibir currículums directamente organizados.
                            </div>
                        </div>
                        <div className="pillar-item">
                            <CheckCircle className="text-primary" size={20} />
                            <div>
                                <strong>Monetización Justa (Premium):</strong> Opciones de destaque para que los negocios que necesitan personal con urgencia maximicen su alcance rápidamente.
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .about-view {
                    padding-top: 40px;
                }
                
                .page-header {
                    margin-bottom: 50px;
                }
                
                .page-header h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 12px;
                    background: linear-gradient(135deg, var(--primary), #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .lead {
                    font-size: 1.25rem;
                    color: var(--text-muted);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .text-center {
                    text-align: center;
                }

                .about-content {
                    display: flex;
                    flex-direction: column;
                    gap: 60px;
                    padding-bottom: 80px;
                }

                .mission-vision-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 32px;
                }

                .about-section {
                    padding: 40px;
                    border-radius: var(--radius-lg);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: var(--shadow-sm);
                }

                .section-head {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 20px;
                }

                .section-head h2 {
                    font-size: 1.8rem;
                    font-weight: 7550;
                    color: var(--text-main);
                }

                .about-section p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.75;
                }

                .icon-glow {
                    filter: drop-shadow(0 4px 10px rgba(0, 102, 255, 0.2));
                }

                /* Values */
                .values-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .section-title {
                    font-size: 2.2rem;
                    font-weight: 800;
                }

                .section-subtitle {
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto 24px;
                    line-height: 1.5;
                }

                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                }

                .value-card {
                    padding: 32px;
                    border-radius: var(--radius-md);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .value-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }

                .value-icon {
                    margin-bottom: 20px;
                }

                .value-card h3 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: var(--text-main);
                }

                .value-card p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--text-muted);
                }

                /* Pillars Highlight */
                .pillars-highlight {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
                }

                .pillars-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-top: 16px;
                }

                .pillar-item {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }

                .pillar-item svg {
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .pillar-item div {
                    font-size: 1.05rem;
                    line-height: 1.6;
                    color: var(--text-muted);
                }

                .pillar-item strong {
                    color: var(--text-main);
                }

                .mb-6 {
                    margin-bottom: 24px;
                }

                @media (max-width: 768px) {
                    .page-header h1 {
                        font-size: 2.3rem;
                    }
                    .about-section {
                        padding: 24px;
                    }
                    .value-card {
                        padding: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;
