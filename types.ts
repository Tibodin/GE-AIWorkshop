
export type CategoryType = 'Weight Training' | 'Cardio' | 'Yoga & Flexibility';

export interface AuthUser {
  username: string;
  role: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  category: CategoryType;
  completed?: boolean;
}

export interface DaySchedule {
  day: string;
  exercises: Exercise[];
}

export type ViewState = 'Home' | 'Categories' | 'Schedule' | 'AI Coach';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
