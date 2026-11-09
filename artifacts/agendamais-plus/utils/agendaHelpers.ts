import type { Booking, Notice, Preferences, VisitType, DemoDay } from '@/types/agenda';

export function createDemoDays(): DemoDay[] {
  const days: DemoDay[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < 5) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, '0');
      const day = String(cursor.getDate()).padStart(2, '0');
      const id = `${year}-${month}-${day}`;
      const label = cursor.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '');
      const full = cursor.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
      days.push({ id, label, full: full.charAt(0).toUpperCase() + full.slice(1) });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isBooking(value: unknown): value is Booking {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string' &&
    typeof value.specialty === 'string' &&
    typeof value.provider === 'string' &&
    typeof value.day === 'string' &&
    typeof value.time === 'string' &&
    (value.type === 'online' || value.type === 'presencial') &&
    (value.status === 'upcoming' || value.status === 'completed' || value.status === 'cancelled');
}

export function isNotice(value: unknown): value is Notice {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string' &&
    typeof value.date === 'string' &&
    typeof value.read === 'boolean';
}

export function isPreferences(value: unknown): value is Preferences {
  if (!isRecord(value)) return false;
  return (value.font === 'normal' || value.font === 'grande' || value.font === 'extragrande') &&
    typeof value.contrast === 'boolean' &&
    (value.speed === 'lenta' || value.speed === 'normal' || value.speed === 'rápida') &&
    typeof value.guidance === 'boolean' &&
    typeof value.reminders === 'boolean' &&
    typeof value.advance === 'string';
}

export function formatDay(day: string) {
  const date = new Date(`${day}T12:00:00`);
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
}

export function visitLabel(type: VisitType) {
  return type === 'online' ? 'Consulta online (demonstração)' : 'Consulta presencial (demonstração)';
}

