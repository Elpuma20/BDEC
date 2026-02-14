import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-shell">
      <header className="main-header glass sticky">
        <div className="container header-content">
          <NavLink to="/" className="logo">
            <span className="logo-icon">B</span>
            <span className="logo-text">BDEC</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
            <NavLink to="/jobs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Empleos</NavLink>
            <NavLink to="/post" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Publicar</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Nosotros</NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Panel Admin</NavLink>
            )}
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu desktop-only">
                <span className="user-name">Hola, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <LogOut size={16} /> Salir
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-outline desktop-only">Ingresar</NavLink>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="mobile-nav-content" onClick={e => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <span className="logo-text">Menú</span>
            <button onClick={toggleMenu}><X size={24} /></button>
          </div>

          <nav className="mobile-nav-links">
            <NavLink to="/" className="mobile-nav-link">
              <span className="mobile-nav-icon">🏠</span> Inicio
            </NavLink>
            <NavLink to="/jobs" className="mobile-nav-link">
              <span className="mobile-nav-icon">💼</span> Empleos
            </NavLink>
            <NavLink to="/post" className="mobile-nav-link">
              <span className="mobile-nav-icon">📝</span> Publicar
            </NavLink>
            <NavLink to="/about" className="mobile-nav-link">
              <span className="mobile-nav-icon">ℹ️</span> Nosotros
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className="mobile-nav-link">
                <span className="mobile-nav-icon">⚙️</span> Panel Admin
              </NavLink>
            )}
          </nav>

          <div className="mobile-nav-footer">
            {user ? (
              <div className="mobile-user-info">
                <div className="user-details">
                  <UserIcon size={20} />
                  <span>{user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-primary w-full mart-20">
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary w-full">Ingresar</NavLink>
            )}
          </div>
        </div>
      </div>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h3>BDEC</h3>
            <p>Banco de Datos de Empleos Comunitarios.</p>
            <p className="copyright">&copy; 2026 Proyectos Universitarios.</p>
          </div>
          <div className="footer-links">
            <h4>Secciones</h4>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/jobs">Bolsa de Empleo</NavLink>
            <NavLink to="/about">Propósito</NavLink>
          </div>
        </div>
      </footer>

      <style>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .main-header {
          height: var(--header-height);
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .main-header.glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--primary);
        }
        
        .logo-icon {
          background: var(--primary);
          color: white;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 8px;
        }
        
        .desktop-nav {
          display: flex;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .desktop-nav, .desktop-only {
            display: none !important;
          }
        }
        
        .nav-link {
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        
        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }
        
        .main-content {
          margin-top: var(--header-height);
          flex: 1;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .mobile-toggle {
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          display: none;
          padding: 4px;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
        }

        /* Mobile Nav */
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
        }

        .mobile-nav-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-content {
          position: absolute;
          right: 0;
          top: 0;
          width: 280px;
          height: 100%;
          background: white;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .mobile-nav-overlay.open .mobile-nav-content {
          transform: translateX(0);
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .mobile-nav-header .logo-text {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-nav-link {
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-main);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.2s;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: rgba(0, 102, 255, 0.05);
          color: var(--primary);
        }

        .mobile-nav-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .mobile-user-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-details {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: var(--text-main);
        }

        .mart-20 { margin-top: 20px; }

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.85rem;
        }

        .main-footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 60px 0 40px;
          margin-top: 80px;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        @media (max-width: 640px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
        
        .footer-info h3 {
          margin-bottom: 16px;
          color: var(--primary);
        }
        
        .footer-info p {
          color: var(--text-muted);
          max-width: 300px;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-links h4 {
          margin-bottom: 8px;
        }
        
        .footer-links a {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .copyright {
          margin-top: 24px;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;
