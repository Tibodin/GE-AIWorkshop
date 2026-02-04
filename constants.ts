
import { Exercise, DaySchedule } from './types';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const EXERCISE_LIBRARY: Exercise[] = [
  // Weight Training
  {
    id: 'wt1',
    name: 'Dumbbell Bench Press',
    description: 'A classic chest builder focusing on the pectorals and triceps.',
    videoUrl: 'https://www.youtube.com/embed/VmB1G1K7v94',
    category: 'Weight Training'
  },
  {
    id: 'wt2',
    name: 'Barbell Squat',
    description: 'The king of all leg exercises for building strength and mass.',
    videoUrl: 'https://www.youtube.com/embed/SW_C1A-rejs',
    category: 'Weight Training'
  },
  {
    id: 'wt3',
    name: 'Bent Over Rows',
    description: 'Target your lats, traps, and rhomboids for a thicker back.',
    videoUrl: 'https://www.youtube.com/embed/9efgcAjQe7E',
    category: 'Weight Training'
  },
  // Cardio
  {
    id: 'c1',
    name: 'HIIT Sprints',
    description: 'High-intensity interval training to maximize calorie burn.',
    videoUrl: 'https://www.youtube.com/embed/vO-e_N6z_g8',
    category: 'Cardio'
  },
  {
    id: 'c2',
    name: 'Burpees',
    description: 'Full body explosive movement for endurance and fat loss.',
    videoUrl: 'https://www.youtube.com/embed/auBLPXO8Fww',
    category: 'Cardio'
  },
  // Yoga
  {
    id: 'y1',
    name: 'Sun Salutation',
    description: 'A flow sequence of yoga poses to energize the whole body.',
    videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
    category: 'Yoga & Flexibility'
  },
  {
    id: 'y2',
    name: 'Downward Dog',
    description: 'Essential pose for stretching the hamstrings and spine.',
    videoUrl: 'https://www.youtube.com/embed/j97Z98-C434',
    category: 'Yoga & Flexibility'
  }
];

export const INITIAL_SCHEDULE: DaySchedule[] = DAYS.map(day => ({
  day,
  exercises: []
}));
