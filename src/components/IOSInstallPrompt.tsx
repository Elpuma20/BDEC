import React, { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';

const IOSInstallPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Detect if the device is iOS (iPhone/iPad/iPod)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // 2. Check if the app is already running in standalone (installed) mode
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (navigator as any).standalone === true;

    // 3. Check if the user has dismissed this prompt before
    const isDismissed = localStorage.getItem('ios-pwa-prompt-dismissed') === 'true';

    // Only show if it is iOS, not already standalone, and not dismissed
    if (isIOS && !isStandalone && !isDismissed) {
      // Show prompt with a small delay for a smoother, premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Persist user dismissal to localStorage so it doesn't prompt again
    localStorage.setItem('ios-pwa-prompt-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="ios-prompt-overlay" onClick={handleDismiss}>
      <div className="ios-prompt-card glass" onClick={(e) => e.stopPropagation()}>
        <button className="ios-prompt-close" onClick={handleDismiss} aria-label="Cerrar">
          <X size={20} />
        </button>

        <div className="ios-prompt-header">
          <div className="ios-prompt-icon-container">
            <img src="/apple-touch-icon.png" alt="ProLinker" className="ios-prompt-app-icon" />
          </div>
          <div className="ios-prompt-title-container">
            <span className="ios-prompt-badge">PWA DISPONIBLE</span>
            <h3>Instala ProLinker</h3>
            <p>Acceso rápido y sin conexión</p>
          </div>
        </div>

        <div className="ios-prompt-body">
          <p className="ios-prompt-description">
            Agrega **ProLinker** a tu pantalla de inicio para disfrutar de una experiencia fluida como una aplicación nativa.
          </p>

          <div className="ios-steps">
            <div className="ios-step">
              <div className="ios-step-icon">
                {/* Safari Share Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
              <div className="ios-step-text">
                1. Presiona el botón de <strong>Compartir</strong> en la barra inferior de Safari.
              </div>
            </div>

            <div className="ios-step">
              <div className="ios-step-icon">
                {/* Apple Add to Home Screen Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <div className="ios-step-text">
                2. Selecciona <strong>"Agregar a Inicio"</strong> en la lista de opciones.
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleDismiss} className="btn btn-primary w-full ios-prompt-btn">
          <Smartphone size={16} /> Entendido
        </button>
      </div>

      <style>{`
        .ios-prompt-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background-color: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 16px;
          animation: iosFadeIn 0.3s ease-out forwards;
        }

        .ios-prompt-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          border-radius: 24px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
          padding: 24px;
          position: relative;
          margin-bottom: max(16px, env(safe-area-inset-bottom));
          transform: translateY(100px);
          opacity: 0;
          animation: iosSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ios-prompt-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.05);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ios-prompt-close:hover {
          background: rgba(15, 23, 42, 0.1);
          color: var(--text-main);
        }

        .ios-prompt-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
        }

        .ios-prompt-app-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          box-shadow: var(--shadow-md);
        }

        .ios-prompt-title-container h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 2px 0;
        }

        .ios-prompt-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          background: rgba(0, 102, 255, 0.1);
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          display: inline-block;
        }

        .ios-prompt-title-container p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
        }

        .ios-prompt-description {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          line-height: 1.45;
        }

        .ios-steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid rgba(15, 23, 42, 0.05);
          padding: 16px;
          border-radius: 16px;
        }

        .ios-step {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .ios-step-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: white;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .ios-step-text {
          font-size: 0.9rem;
          color: var(--text-main);
          line-height: 1.4;
        }

        .ios-prompt-btn {
          height: 48px;
          font-size: 1rem;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.2);
        }

        @keyframes iosFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes iosSlideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default IOSInstallPrompt;
