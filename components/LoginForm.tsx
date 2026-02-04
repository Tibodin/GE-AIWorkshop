
import React, { useState } from 'react';
import { Lock, User, ShieldAlert, Dumbbell, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string, pass: string) => boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password (Hint: admin/admin1234)');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 neon-glow rotate-3 transition-transform hover:rotate-0">
            <Dumbbell className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold font-orbitron tracking-tight text-white mb-2">NEON<span className="text-orange-500">FIT</span></h1>
          <p className="text-zinc-500">Elite AI Fitness Ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm animate-pulse">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin1234"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-zinc-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all neon-glow flex items-center justify-center gap-3 active:scale-95"
          >
            Access Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        
        <p className="text-center mt-8 text-zinc-600 text-sm">
          Demo Credentials: <span className="text-orange-500/80">admin / admin1234</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
