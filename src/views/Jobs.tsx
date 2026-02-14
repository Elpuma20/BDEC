import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  salary: string;
  modality: string;
  requirements: string;
  description: string;
  posted_at: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalityFilter, setModalityFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { user, token } = useAuth();

  // Application State
  const [applying, setApplying] = useState(false);
  const [appStatus, setAppStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [appMessage, setAppMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(jobs.map(j => j.category));
    return ['All', ...Array.from(cats)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || job.category === categoryFilter;
      const matchesModality = modalityFilter === 'All' || job.modality === modalityFilter;
      return matchesSearch && matchesCategory && matchesModality;
    });
  }, [searchTerm, categoryFilter, modalityFilter, jobs]);

  const handleApply = async () => {
    if (!user) {
      setAppStatus('error');
      setAppMessage('Debes iniciar sesión para postularte.');
      return;
    }

    if (!selectedJob) return;

    setApplying(true);
    setAppStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: selectedJob.id })
      });

      const data = await response.json();

      if (response.ok) {
        setAppStatus('success');
        setAppMessage('¡Postulación enviada correctamente!');
      } else {
        setAppStatus('error');
        setAppMessage(data.message || 'Error al enviar la postulación.');
      }
    } catch (error) {
      setAppStatus('error');
      setAppMessage('Error de conexión con el servidor.');
    } finally {
      setApplying(false);
    }
  };

  // Reset status when modal closes
  useEffect(() => {
    if (!selectedJob) {
      setAppStatus('idle');
      setAppMessage('');
    }
  }, [selectedJob]);

  return (
    <div className="jobs-view container">
      <header className="jobs-header">
        <h1>Bolsa de Empleos</h1>
        <p>Explora {jobs.length} ofertas disponibles en la comunidad.</p>
      </header>

      <div className="jobs-controls">
        <div className="search-refined glass">
          <Search className="icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por puesto o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-refined">
          <div className="filter-group">
            <span className="filter-label">Categoría</span>
            <div className="pills-container">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`pill-btn ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === 'All' ? 'Todas' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Modalidad</span>
            <div className="pills-container">
              {['All', 'Presencial', 'Remoto', 'Híbrido'].map(mod => (
                <button
                  key={mod}
                  className={`pill-btn ${modalityFilter === mod ? 'active' : ''}`}
                  onClick={() => setModalityFilter(mod)}
                >
                  {mod === 'All' ? 'Todas' : mod}
                </button>
              ))}
            </div>
          </div>

          {(categoryFilter !== 'All' || modalityFilter !== 'All' || searchTerm !== '') && (
            <button
              className="clear-filters-btn"
              onClick={() => {
                setCategoryFilter('All');
                setModalityFilter('All');
                setSearchTerm('');
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="jobs-grid">
        <aside className="jobs-sidebar">
          <div className="sidebar-card">
            <h4>Estadísticas Rápidas</h4>
            <div className="stat-row">
              <span>Resultados:</span>
              <strong>{filteredJobs.length}</strong>
            </div>
          </div>
        </aside>

        <section className="jobs-list">
          {loading ? (
            <div className="no-results">Cargando empleos...</div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    className="job-card"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="job-card-main">
                      <div className="job-info">
                        <div className="job-tags">
                          <span className="job-tag category">{job.category}</span>
                          <span className={`job-tag modality ${job.modality.toLowerCase()}`}>{job.modality}</span>
                        </div>
                        <h3>{job.title}</h3>
                        <div className="job-meta">
                          <span><Briefcase size={14} /> {job.company}</span>
                          <span><MapPin size={14} /> {job.location}</span>
                        </div>
                      </div>
                      <div className="job-action">
                        <span className="job-salary">{job.salary}</span>
                        <button
                          className="btn btn-primary"
                          onClick={() => setSelectedJob(job)}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredJobs.length === 0 && (
                <div className="no-results">
                  <p>No se encontraron empleos que coincidan con tu búsqueda.</p>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
            <motion.div
              className="job-modal glass"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedJob(null)}>&times;</button>

              <div className="modal-header">
                <span className="job-tag category">{selectedJob.category}</span>
                <h2>{selectedJob.title}</h2>
                <div className="job-meta">
                  <span><Briefcase size={16} /> {selectedJob.company}</span>
                  <span><MapPin size={16} /> {selectedJob.location}</span>
                  <span className={`modality-badge ${selectedJob.modality.toLowerCase()}`}>{selectedJob.modality}</span>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h4>Sueldo Ofrecido</h4>
                  <p className="salary-text">{selectedJob.salary}</p>
                </div>

                <div className="modal-section">
                  <h4>Descripción</h4>
                  <p>{selectedJob.description}</p>
                </div>

                {selectedJob.requirements && (
                  <div className="modal-section">
                    <h4>Requerimientos</h4>
                    <pre className="requirements-text">{selectedJob.requirements}</pre>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {appStatus === 'idle' ? (
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleApply}
                    disabled={applying}
                  >
                    {applying ? (
                      <><Loader2 className="animate-spin" size={20} /> Enviando...</>
                    ) : (
                      'Postularme ahora'
                    )}
                  </button>
                ) : (
                  <div className={`app-feedback ${appStatus}`}>
                    {appStatus === 'success' ? (
                      <><CheckCircle size={20} /> {appMessage}</>
                    ) : (
                      <><AlertCircle size={20} /> {appMessage}</>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .jobs-view {
          padding-top: 40px;
        }
        
        .jobs-header {
          margin-bottom: 40px;
        }
        
        .jobs-header h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }
        
        .jobs-header p {
          color: var(--text-muted);
        }
        
        .jobs-controls {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 48px;
        }

        .search-refined {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          height: 60px;
          border-radius: 30px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .search-refined:focus-within {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0, 102, 255, 0.2);
          border-color: var(--primary);
        }

        .search-refined input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .filters-refined {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 32px;
          padding-left: 8px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .filter-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .pills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .pill-btn {
          padding: 8px 18px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(0, 102, 255, 0.05);
        }

        .pill-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }

        .clear-filters-btn {
          margin-top: 24px;
          background: none;
          border: none;
          color: var(--primary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        .clear-filters-btn:hover {
          color: #0056e0;
        }

        .icon { color: var(--text-muted); }
        
        .jobs-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
        }
        
        .sidebar-card {
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        
        .stat-row {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          color: var(--text-muted);
        }
        
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .job-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .job-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }
        
        .job-card-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .job-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .job-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .job-tag.category {
          color: var(--primary);
          background: rgba(0, 102, 255, 0.1);
        }

        .job-tag.modality {
          background: #f1f5f9;
          color: var(--text-muted);
        }

        .job-tag.modality.remoto {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 2000;
        }

        .job-modal {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-height: 90vh;
          overflow-y: auto;
        }

        .close-modal {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
        }

        .modal-header h2 {
          font-size: 1.8rem;
          margin: 12px 0;
        }

        .modality-badge {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: #f1f5f9;
        }

        .modality-badge.remoto { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .modal-section {
          margin-top: 32px;
        }

        .modal-section h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .salary-text {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--primary);
        }

        .requirements-text {
          font-family: inherit;
          white-space: pre-wrap;
          color: var(--text-main);
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.6;
          border: 1px solid var(--border);
        }

        .modal-footer {
          margin-top: 40px;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .app-feedback {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          font-weight: 600;
          width: 100%;
        }

        .app-feedback.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .app-feedback.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .job-info h3 {
          margin-bottom: 8px;
        }
        
        .job-meta {
          display: flex;
          gap: 20px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .job-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .job-action {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        
        .job-salary {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-main);
        }
        
        .no-results {
          text-align: center;
          padding: 80px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .jobs-grid { grid-template-columns: 1fr; }
          .jobs-sidebar { display: none; }
          .jobs-controls { flex-direction: column; }
          .job-card-main { flex-direction: column; align-items: flex-start; gap: 20px; }
          .job-action { align-items: flex-start; width: 100%; border-top: 1px solid var(--border); pt: 16px; flex-direction: row; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
};

export default Jobs;
