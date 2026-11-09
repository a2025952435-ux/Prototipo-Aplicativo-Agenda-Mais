export type ScreenId =
  | 'opening' | 'welcome' | 'login' | 'register' | 'recovery' | 'accessibility'
  | 'home' | 'specialty' | 'doctors' | 'doctor' | 'schedule' | 'confirmation' | 'success'
  | 'appointments' | 'appointment-detail' | 'online' | 'notifications' | 'profile'
  | 'edit-profile' | 'settings' | 'help' | 'about';
export type VisitType = 'online' | 'presencial';
export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';
export type Booking = {
  id: string;
  specialty: string;
  provider: string;
  day: string;
  time: string;
  type: VisitType;
  status: BookingStatus;
};
export type Notice = { id: string; title: string; body: string; date: string; read: boolean };
export type Preferences = {
  font: 'normal' | 'grande' | 'extragrande';
  contrast: boolean;
  speed: 'lenta' | 'normal' | 'rápida';
  guidance: boolean;
  reminders: boolean;
  advance: string;
};
export type DemoSnapshot = { bookings: Booking[]; preferences: Preferences; notices: Notice[] };
export type DemoDay = { id: string; label: string; full: string };

