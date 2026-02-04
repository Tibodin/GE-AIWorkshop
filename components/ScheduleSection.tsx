
import React from 'react';
import { CheckCircle, Circle, Trash2, Calendar, ChevronRight } from 'lucide-react';
import { DaySchedule, Exercise } from '../types';

interface ScheduleSectionProps {
  schedule: DaySchedule[];
  onToggleComplete: (day: string, exerciseId: string) => void;
  onRemoveExercise: (day: string, exerciseId: string) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedule, onToggleComplete, onRemoveExercise }) => {
  const [activeDay, setActiveDay] = React.useState(schedule[0].day);

  const currentDayData = schedule.find(d => d.day === activeDay);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 font-orbitron tracking-tight">Weekly <span className="text-orange-500">Dashboard</span></h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Days Selector */}
        <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {schedule.map((dayData) => (
            <button
              key={dayData.day}
              onClick={() => setActiveDay(dayData.day)}
              className={`flex items-center justify-between min-w-[140px] p-4 rounded-xl border transition-all ${
                activeDay === dayData.day 
                  ? 'bg-orange-500 border-orange-500 text-white neon-glow' 
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-orange-500/50'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">{dayData.day.substring(0, 3)}</span>
                <span className="text-lg font-bold">{dayData.day}</span>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-sm font-medium">{dayData.exercises.length}</span>
                 <ChevronRight className={`w-4 h-4 ${activeDay === dayData.day ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Day Details */}
        <div className="lg:col-span-8">
          <div className="glass-panel border border-zinc-800 rounded-2xl overflow-hidden min-h-[400px]">
            <div className="bg-zinc-900/80 p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Calendar className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-orbitron">{activeDay}</h3>
                  <p className="text-zinc-500 text-sm">
                    {currentDayData?.exercises.length === 0 
                      ? "Rest day. Enjoy your recovery!" 
                      : `${currentDayData?.exercises.filter(e => e.completed).length} of ${currentDayData?.exercises.length} completed`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {currentDayData?.exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="text-zinc-600 w-8 h-8" />
                  </div>
                  <p className="text-zinc-500 text-lg">No exercises added for this day yet.</p>
                  <p className="text-zinc-600 text-sm mt-2">Go to Categories to start building your plan.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentDayData?.exercises.map((ex) => (
                    <div 
                      key={ex.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        ex.completed 
                          ? 'bg-zinc-950/40 border-green-500/20 opacity-60' 
                          : 'bg-zinc-900/50 border-zinc-800'
                      }`}
                    >
                      <button 
                        onClick={() => onToggleComplete(activeDay, ex.id)}
                        className={`transition-colors ${ex.completed ? 'text-green-500' : 'text-zinc-600 hover:text-orange-500'}`}
                      >
                        {ex.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={`font-bold ${ex.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                          {ex.name}
                        </h4>
                        <span className="text-xs text-orange-500 uppercase font-bold tracking-widest">{ex.category}</span>
                      </div>

                      <button 
                        onClick={() => onRemoveExercise(activeDay, ex.id)}
                        className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
