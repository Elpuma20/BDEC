import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login: saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        // Fetch user info from Google using the access token
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        // Send user info to our backend to create/verify session
        // We'll use a simplified endpoint for this demonstration
        const response = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: tokenResponse.access_token, // In implicit flow it's access_token
            isImplicit: true,
            email: userInfo.email,
            name: userInfo.name
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error en Google Login');

        saveAuth(data);
        navigate('/');
      } catch (err: any) {
        setError('Error al conectar con Google: ' + err.message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Error al iniciar sesión con Google');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la operación');
      }

      if (isLogin || data.token) {
        saveAuth(data);
        navigate('/');
      } else {
        // Fallback (though backend now returns token)
        setIsLogin(true);
        setError('Registro exitoso. Por favor inicia sesión.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-view container">
      <div className="auth-card-wrapper">
        <motion.div
          className="auth-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h2>{isLogin ? 'Bienvenido' : 'Crear cuenta'}</h2>
            <p>{isLogin ? 'Ingresa tus credenciales para acceder' : 'Regístrate para publicar o buscar empleos'}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Nombre Completo</label>
                <div className="input-wrapper">
                  <UserIcon className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <UserIcon className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
              {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarse'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>O continuar con</span>
          </div>

          <div className="social-auth">
            <button
              type="button"
              className="google-auth-btn"
              title="Continuar con Google"
              onClick={() => handleGoogleLogin()}
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </button>
          </div>

          <div className="auth-footer">
            <p>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .login-view {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - var(--header-height) - 100px);
          padding: 40px 0;
        }
        
        .auth-card-wrapper {
          width: 100%;
          max-width: 440px;
        }
        
        .auth-card {
          padding: 48px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .auth-header h2 { 
          font-size: 2rem; 
          font-weight: 800;
          margin-bottom: 10px;
          background: linear-gradient(135deg, var(--primary), #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .auth-header p { color: var(--text-muted); font-size: 1rem; }
        
        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.9rem;
          text-align: center;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .auth-form label {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-main);
          margin-bottom: 8px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .input-wrapper {
          position: relative;
          transition: transform 0.2s;
        }

        .input-wrapper:focus-within {
          transform: translateY(-2px);
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }

        .input-wrapper input:focus {
          background: white;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          transition: color 0.3s;
        }

        input:focus + .input-icon, .input-wrapper:focus-within .input-icon {
          color: var(--primary);
        }
        
        .btn-primary {
          padding: 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 102, 255, 0.3);
          transition: all 0.3s;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 102, 255, 0.4);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 32px 0;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border);
        }
        
        .auth-divider span { padding: 0 16px; }

        .social-auth {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        .google-auth-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: white;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
        }

        .google-auth-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }

        .google-auth-btn svg {
          display: block;
        }
        
        .auth-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 1rem;
          color: var(--text-muted);
        }
        
        .auth-footer button {
          color: var(--primary);
          font-weight: 700;
          margin-left: 8px;
          transition: opacity 0.2s;
        }
        
        .auth-footer button:hover { opacity: 0.8; text-decoration: underline; }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 24px;
            border-radius: 16px;
          }
          
          .auth-header h2 {
            font-size: 1.6rem;
          }

          .auth-header p {
            font-size: 0.9rem;
          }
          
          .login-view {
            padding: 20px 16px;
          }

          .input-wrapper input {
            padding: 12px 16px 12px 40px;
            font-size: 0.95rem;
          }

          .btn-primary {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
