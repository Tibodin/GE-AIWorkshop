
import React, { useState, useEffect } from 'react';
import { Dumbbell, ArrowRight, Zap, Target, Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import CategorySection from './components/CategorySection';
import ScheduleSection from './components/ScheduleSection';
import ChatbotUI from './components/ChatbotUI';
import LoginForm from './components/LoginForm';
import { ViewState, DaySchedule, Exercise, AuthUser } from './types';
import { INITIAL_SCHEDULE } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('Home');
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);

  // Persistence (Optional for demo)
  useEffect(() => {
    const savedAuth = localStorage.getItem('neonfit_auth');
    if (savedAuth) {
      const userData = JSON.parse(savedAuth);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, pass: string): boolean => {
    if (username === 'admin' && pass === 'admin1234') {
      const userData = { username: 'Admin', role: 'Elite Athlete' };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('neonfit_auth', JSON.stringify(userData));
      setCurrentView('Home');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('neonfit_auth');
    setCurrentView('Home');
  };

  const handleAddExercise = (exercise: Exercise, day: string) => {
    setSchedule(prev => prev.map(d => {
      if (d.day === day) {
        // Prevent adding exactly same instance twice in same day
        const uniqueId = `${exercise.id}-${Date.now()}`;
        return {
          ...d,
          exercises: [...d.exercises, { ...exercise, completed: false, id: uniqueId }]
        };
      }
      return d;
    }));
  };

  const handleToggleComplete = (day: string, exerciseId: string) => {
    setSchedule(prev => prev.map(d => {
      if (d.day === day) {
        return {
          ...d,
          exercises: d.exercises.map(ex => 
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
          )
        };
      }
      return d;
    }));
  };

  const handleRemoveExercise = (day: string, exerciseId: string) => {
    setSchedule(prev => prev.map(d => {
      if (d.day === day) {
        return {
          ...d,
          exercises: d.exercises.filter(ex => ex.id !== exerciseId)
        };
      }
      return d;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'Categories':
        return <CategorySection onAddExercise={handleAddExercise} />;
      case 'Schedule':
        return (
          <ScheduleSection 
            schedule={schedule} 
            onToggleComplete={handleToggleComplete} 
            onRemoveExercise={handleRemoveExercise} 
          />
        );
      case 'AI Coach':
        return (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 neon-glow border border-orange-500/20">
               <Zap className="text-orange-500 w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold font-orbitron mb-4">Meet your <span className="text-orange-500">AI Mentor</span></h2>
            <p className="text-zinc-400 max-w-lg mb-12 leading-relaxed">
              Your personal coach is active and ready. Access the chat widget in the bottom right corner for real-time strategy, recovery tips, and nutritional protocols.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {[
                { icon: <Target className="w-8 h-8" />, title: 'Hypertrophy Goals', desc: 'Optimize muscle growth with targeted training volume.' },
                { icon: <Activity className="w-8 h-8" />, title: 'Metabolic Tracking', desc: 'Monitor your caloric burn and metabolic rate.' },
                { icon: <Dumbbell className="w-8 h-8" />, title: 'Biomechanics', desc: 'Analyze joint angles and force vectors for safety.' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 transition-all hover:border-orange-500/30">
                  <div className="text-orange-500 mb-4 flex justify-center">{item.icon}</div>
                  <h4 className="font-bold mb-3 font-orbitron text-sm">{item.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="py-8 md:py-20 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                  <Zap className="w-3 h-3 fill-orange-500" /> SYSTEM ONLINE
                </div>
                <h1 className="text-6xl md:text-8xl font-black font-orbitron leading-tight tracking-tighter">
                  EVOLVE <br /> <span className="text-orange-500">BEYOND</span>
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
                  Welcome back, <span className="text-white font-bold">{user?.username}</span>. Your data is synchronized. 
                  Ready to optimize your physiological performance today?
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <button 
                    onClick={() => setCurrentView('Categories')}
                    className="px-10 py-5 bg-orange-500 hover:bg-orange-600 rounded-2xl font-black text-lg flex items-center gap-3 transition-all neon-glow active:scale-95"
                  >
                    ENTER TRAINING <ArrowRight className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentView('Schedule')}
                    className="px-10 py-5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-bold text-lg border border-zinc-800 transition-all hover:border-zinc-700 active:scale-95"
                  >
                    DASHBOARD
                  </button>
                </div>
              </div>
              <div className="flex-1 relative group">
                <div className="absolute -inset-10 bg-orange-500/10 blur-[100px] rounded-full group-hover:bg-orange-500/20 transition-all duration-1000"></div>
                <img 
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1000" 
                  alt="Fitness Hero" 
                  className="relative rounded-[2rem] border border-zinc-800 shadow-2xl z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl z-20 shadow-2xl animate-bounce duration-[3s]">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Activity className="text-green-500 w-6 h-6" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-500 font-bold uppercase">Training Load</span>
                        <span className="block text-xl font-black text-white">OPTIMAL</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-orange-500/30">
      <Navbar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        user={user} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full">
        {renderView()}
      </main>

      <ChatbotUI />

      <footer className="py-16 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center neon-glow">
                  <Dumbbell className="text-white w-5 h-5" />
                </div>
                <span className="font-orbitron font-bold text-2xl text-orange-500 tracking-tighter">NEONFIT</span>
              </div>
              <p className="text-zinc-600 text-sm max-w-xs text-center md:text-left leading-relaxed">
                Empowering humanity through data-driven exercise science and artificial intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div className="space-y-4">
                <h5 className="text-zinc-200 font-bold text-sm uppercase tracking-widest">Platform</h5>
                <ul className="text-zinc-500 text-sm space-y-2">
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Neural Coaching</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Smart Schedule</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Video Vault</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-zinc-200 font-bold text-sm uppercase tracking-widest">Company</h5>
                <ul className="text-zinc-500 text-sm space-y-2">
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Our Vision</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Protocol</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Terminal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest">© 2024 NEONFIT OPERATIONAL SYSTEMS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Global Node: Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
