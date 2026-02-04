
import React from 'react';
import { Play, Plus, X, ArrowRight, Calendar } from 'lucide-react';
import { EXERCISE_LIBRARY, DAYS } from '../constants';
import { CategoryType, Exercise } from '../types';
import VideoPlayer from './VideoPlayer';

interface CategorySectionProps {
  onAddExercise: (exercise: Exercise, day: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onAddExercise }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType | null>(null);
  const [viewingExercise, setViewingExercise] = React.useState<Exercise | null>(null);
  const [targetDay, setTargetDay] = React.useState('Monday');

  const categories = [
    { 
      title: 'Weight Training', 
      desc: 'Build strength and muscle mass', 
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      color: 'from-orange-600/80 to-zinc-950'
    },
    { 
      title: 'Cardio', 
      desc: 'Burn fat and improve endurance', 
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800',
      color: 'from-orange-500/80 to-zinc-950'
    },
    { 
      title: 'Yoga & Flexibility', 
      desc: 'Improve range of motion and core', 
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      color: 'from-orange-400/80 to-zinc-950'
    },
  ];

  const filteredExercises = EXERCISE_LIBRARY.filter(ex => ex.category === selectedCategory);

  return (
    <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 font-orbitron tracking-tight">Browse <span className="text-orange-500">Categories</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.title}
            onClick={() => setSelectedCategory(cat.title as CategoryType)}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer border border-zinc-800 transition-all hover:scale-[1.02] hover:neon-glow hover:border-orange-500/50"
          >
            <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80`} />
            <div className="absolute bottom-0 p-8">
              <h3 className="text-3xl font-bold font-orbitron mb-2">{cat.title}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">{cat.desc}</p>
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                Access Training Library <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exercises List Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCategory(null)} />
          <div className="relative glass-panel border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <div>
                <h3 className="text-3xl font-bold font-orbitron text-orange-500 mb-1">{selectedCategory}</h3>
                <p className="text-zinc-500 text-sm">Select high-performance movements for your routine</p>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="p-3 hover:bg-zinc-800 rounded-2xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredExercises.map((ex) => (
                <div 
                  key={ex.id}
                  className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{ex.name}</h4>
                    <span className="bg-zinc-800 px-2 py-1 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">ID: {ex.id}</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-6 flex-1 leading-relaxed">{ex.description}</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setViewingExercise(ex)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Play className="w-4 h-4" /> Analyze Form
                    </button>
                    <button 
                      onClick={() => {
                        onAddExercise(ex, targetDay);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all neon-glow"
                    >
                      <Plus className="w-4 h-4" /> Add to Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-center gap-4">
               <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Target Training Day:</span>
               <select 
                value={targetDay}
                onChange={(e) => setTargetDay(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-orange-500 font-bold focus:outline-none focus:border-orange-500"
               >
                 {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
               </select>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Detail Modal with Video */}
      {viewingExercise && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setViewingExercise(null)} />
          <div className="relative glass-panel border border-zinc-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <VideoPlayer url={viewingExercise.videoUrl} title={viewingExercise.name} />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded text-[10px] font-black uppercase tracking-widest border border-orange-500/20">{viewingExercise.category}</span>
                    <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Tutorial Mode</span>
                  </div>
                  <h3 className="text-3xl font-bold font-orbitron text-white leading-tight">{viewingExercise.name}</h3>
                </div>
                <button onClick={() => setViewingExercise(null)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-8 text-lg">{viewingExercise.description}</p>
              <div className="flex gap-4">
                 <div className="flex-1 bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800">
                   <div className="flex items-center gap-2 text-orange-500 mb-2">
                     <Calendar className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-widest">Selected Day</span>
                   </div>
                   <span className="text-xl font-bold text-white">{targetDay}</span>
                 </div>
                 <button 
                  onClick={() => {
                    onAddExercise(viewingExercise, targetDay);
                    setViewingExercise(null);
                  }}
                  className="flex-[2] flex items-center justify-center gap-3 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-lg neon-glow transition-all active:scale-95"
                >
                  <Plus className="w-6 h-6" /> CONFIRM ADD TO SCHEDULE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
