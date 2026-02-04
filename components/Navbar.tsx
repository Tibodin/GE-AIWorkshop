
import React from 'react';
import { User, Menu, X, Dumbbell, Calendar, Layout, MessageSquare, LogOut } from 'lucide-react';
import { ViewState, AuthUser } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  user: AuthUser | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', icon: <Layout className="w-5 h-5" />, value: 'Home' as ViewState },
    { label: 'Categories', icon: <Dumbbell className="w-5 h-5" />, value: 'Categories' as ViewState },
    { label: 'Schedule', icon: <Calendar className="w-5 h-5" />, value: 'Schedule' as ViewState },
    { label: 'AI Coach', icon: <MessageSquare className="w-5 h-5" />, value: 'AI Coach' as ViewState },
  ];

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('Home')}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center neon-glow">
              <Dumbbell className="text-white w-5 h-5" />
            </div>
            <span className="font-orbitron text-xl font-bold tracking-tighter text-orange-500">NEONFIT</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onViewChange(item.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === item.value 
                    ? 'text-orange-500 bg-orange-500/10' 
                    : 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="h-6 w-px bg-zinc-800 mx-2" />
            
            <div className="flex items-center gap-3 pl-2">
               <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-zinc-100 uppercase tracking-tighter">{user.username}</span>
                  <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{user.role}</span>
               </div>
               <button 
                onClick={onLogout}
                className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-all cursor-pointer group"
                title="Logout"
               >
                 <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
               </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onViewChange(item.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium ${
                  currentView === item.value 
                    ? 'text-orange-500 bg-orange-500/10' 
                    : 'text-zinc-400'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium text-red-500"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
