import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';
import { Lock, User, Key, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  
  const login = useAdminStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      login();
      navigate('/admin');
    } else {
      setError('Username atau Password salah');
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey === 'ewm.ex2@gmail.com') {
      setForgotMessage('Username: admin | Password: admin123');
    } else {
      setForgotMessage('Kunci rahasia salah.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            ING
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Panel Admin</h2>
        <p className="text-center text-neutral-500 mb-8">PT. INDOS NESOS GEMILANG</p>

        {!showForgot ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgot(true);
                  setError('');
                  setForgotMessage('');
                  setSecretKey('');
                }}
                className="text-sm text-neutral-500 hover:text-red-600 transition"
              >
                Lupa Password?
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center justify-center w-full text-sm text-neutral-500 hover:text-neutral-800 transition"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali ke Beranda
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgot} className="space-y-4">
            <p className="text-sm text-neutral-600 mb-4 text-center">
              Masukkan kunci rahasia untuk melihat kredensial login Anda.
            </p>
            
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Kunci Rahasia"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                required
              />
            </div>

            {forgotMessage && (
              <div className={`p-4 rounded-lg text-sm text-center font-medium ${forgotMessage.includes('Username') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {forgotMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-neutral-800 text-white font-semibold py-3 rounded-lg hover:bg-neutral-900 transition"
            >
              Cek Kunci
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="text-sm text-neutral-500 hover:text-red-600 transition"
              >
                Kembali ke Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
