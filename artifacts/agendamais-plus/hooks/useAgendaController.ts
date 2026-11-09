import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';
import { highContrastColors, type ThemeTokens } from '@/constants/colors';
import {
  ActionButton,
  AppText,
  AudioAction,
  BrandLogo,
  DemoNotice,
  FeatureCard,
  LabeledInput,
  SelectionCard,
  UIProvider,
  useAppTheme,
} from '@/components/AgendaMaisUI';

import type { ScreenId, VisitType, BookingStatus, Booking, Notice, Preferences, DemoSnapshot, DemoDay } from '@/types/agenda';
import { STORAGE_KEY, specialties, exampleTimes, initialPreferences, initialNotices, titles, descriptions } from '@/constants/agendaData';
import { createDemoDays, isRecord, isBooking, isNotice, isPreferences, formatDay, visitLabel } from '@/utils/agendaHelpers';

export function useAgendaController() {
  const baseTheme = useColors();
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState<ScreenId>('opening');
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [activeReading, setActiveReading] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [visitType, setVisitType] = useState<VisitType>('online');
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [provider, setProvider] = useState('Profissional A');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [inCall, setInCall] = useState(false);
  const [cancelPrompt, setCancelPrompt] = useState(false);
  const [resetPrompt, setResetPrompt] = useState(false);
  const [search, setSearch] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmation, setRegisterConfirmation] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [profileName, setProfileName] = useState('Usuário AgendaMais');
  const [draftProfileName, setDraftProfileName] = useState('');
  const [draftProfileEmail, setDraftProfileEmail] = useState('');
  const [draftProfilePhone, setDraftProfilePhone] = useState('');
  const [demoDays] = useState(createDemoDays);

  const fontScale = preferences.font === 'extragrande' ? 1.24 : preferences.font === 'grande' ? 1.12 : 1;
  const theme = useMemo(
    () => ({ ...baseTheme, ...(preferences.contrast ? highContrastColors : {}) }) as ThemeTokens,
    [baseTheme, preferences.contrast],
  );
  const selectedBooking = bookings.find((booking) => booking.id === selectedBookingId) ?? null;
  const activeOnlineBooking = bookings.find((booking) => booking.status === 'upcoming' && booking.type === 'online') ?? null;
  const demoProviders = useMemo(
    () => [
      { name: 'Profissional A', specialty },
      { name: 'Profissional B', specialty },
    ],
    [specialty],
  );
  const matchingProviders = demoProviders.filter((item) =>
    `${item.name} ${item.specialty}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')),
  );
  const mainTabs: ScreenId[] = ['home', 'appointments', 'notifications', 'profile'];
  const showBottomNav = mainTabs.includes(screen);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active) return;
        if (raw) {
          try {
            const parsed: unknown = JSON.parse(raw);
            if (isRecord(parsed)) {
              if (Array.isArray(parsed.bookings)) setBookings(parsed.bookings.filter(isBooking));
              if (isPreferences(parsed.preferences)) setPreferences(parsed.preferences);
              if (Array.isArray(parsed.notices)) setNotices(parsed.notices.filter(isNotice));
            }
          } catch {
            setStorageAvailable(false);
          }
        }
        setReady(true);
      })
      .catch(() => {
        if (active) {
          setStorageAvailable(false);
          setReady(true);
        }
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const snapshot: DemoSnapshot = { bookings, preferences, notices };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
      .then(() => setStorageAvailable(true))
      .catch(() => setStorageAvailable(false));
  }, [bookings, preferences, notices, ready]);

  const go = (next: ScreenId) => {
    Keyboard.dismiss();
    setHistory((items) => [...items, screen]);
    setScreen(next);
    setActiveReading(null);
    setFormMessage('');
  };
  const back = () => {
    Keyboard.dismiss();
    const previous = history.length ? history[history.length - 1] : 'home';
    setHistory((items) => items.slice(0, -1));
    setScreen(previous);
    setActiveReading(null);
  };
  const openTab = (next: ScreenId) => {
    setHistory([]);
    setScreen(next);
    setActiveReading(null);
    setFormMessage('');
  };
  const read = (text: string) => setActiveReading(text);
  const resetDemo = () => {
    setBookings([]);
    setNotices(initialNotices);
    setPreferences(initialPreferences);
    setHistory([]);
    setSelectedBookingId(null);
    setReschedulingId(null);
    setResetPrompt(false);
    setScreen('opening');
    setActiveReading(null);
    void AsyncStorage.removeItem(STORAGE_KEY).catch(() => setStorageAvailable(false));
  };

  const proceedToBooking = () => {
    setSelectedDate('');
    setSelectedTime('');
    setReschedulingId(null);
    go('specialty');
  };

  const saveBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const id = reschedulingId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const nextBooking: Booking = {
      id,
      specialty,
      provider,
      day: selectedDate,
      time: selectedTime,
      type: visitType,
      status: 'upcoming',
    };
    setBookings((items) =>
      reschedulingId ? items.map((item) => item.id === reschedulingId ? nextBooking : item) : [nextBooking, ...items],
    );
    setSelectedBookingId(id);
    setReschedulingId(null);
    setNotices((items) => [
      {
        id: `demo-booking-${id}`,
        title: 'Agendamento registrado',
        body: 'Agendamento salvo neste dispositivo. Nenhuma clínica foi contatada.',
        date: 'Agora',
        read: false,
      },
      ...items,
    ]);
    go('success');
  };

  const beginReschedule = (booking: Booking) => {
    setVisitType(booking.type);
    setSpecialty(booking.specialty);
    setProvider(booking.provider);
    setSelectedDate(booking.day);
    setSelectedTime(booking.time);
    setReschedulingId(booking.id);
    setCancelPrompt(false);
    go('specialty');
  };

  const submitLogin = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail) || loginPassword.length < 4) {
      setFormMessage('Digite um e-mail válido e uma senha com pelo menos 4 caracteres.');
      return;
    }
    setLoginEmail('');
    setLoginPassword('');
    setFormMessage('');
    openTab('home');
  };

  const submitRegistration = () => {
    if (!registerName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      setFormMessage('Preencha seu nome e um e-mail em formato válido.');
      return;
    }
    if (registerPassword.length < 6 || registerPassword !== registerConfirmation) {
      setFormMessage('Use uma senha de 6 caracteres ou mais e confirme-a corretamente.');
      return;
    }
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmation('');
    setFormMessage('Cadastro local concluído. Nenhuma conta online foi criada.');
    go('accessibility');
  };

  const submitRecovery = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)) {
      setFormMessage('Digite um e-mail em formato válido.');
      return;
    }
    setRecoveryEmail('');
    setFormMessage('Nenhum e-mail foi enviado. A recuperação de acesso não está disponível.');
  };

  const cancelBooking = () => {
    if (!selectedBooking) return;
    setBookings((items) => items.map((item) =>
      item.id === selectedBooking.id ? { ...item, status: 'cancelled' } : item,
    ));
    setNotices((items) => [
      {
        id: `demo-cancel-${selectedBooking.id}`,
        title: 'Agendamento cancelado',
        body: 'O agendamento foi marcado como cancelado neste dispositivo.',
        date: 'Agora',
        read: false,
      },
      ...items,
    ]);
    setCancelPrompt(false);
    openTab('appointments');
  };

  const changeFont = (font: Preferences['font']) => setPreferences((current) => ({ ...current, font }));
  const togglePreference = (key: 'contrast' | 'guidance' | 'reminders') =>
    setPreferences((current) => ({ ...current, [key]: !current[key] }));

  return { baseTheme, insets, screen, setScreen, history, setHistory, ready, setReady, storageAvailable, setStorageAvailable, activeReading, setActiveReading, bookings, setBookings, preferences, setPreferences, notices, setNotices, visitType, setVisitType, specialty, setSpecialty, provider, setProvider, selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedBookingId, setSelectedBookingId, reschedulingId, setReschedulingId, inCall, setInCall, cancelPrompt, setCancelPrompt, resetPrompt, setResetPrompt, search, setSearch, loginEmail, setLoginEmail, loginPassword, setLoginPassword, registerName, setRegisterName, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, registerConfirmation, setRegisterConfirmation, recoveryEmail, setRecoveryEmail, formMessage, setFormMessage, profileName, setProfileName, draftProfileName, setDraftProfileName, draftProfileEmail, setDraftProfileEmail, draftProfilePhone, setDraftProfilePhone, demoDays, fontScale, theme, selectedBooking, activeOnlineBooking, demoProviders, matchingProviders, mainTabs, showBottomNav, go, back, openTab, read, resetDemo, proceedToBooking, saveBooking, beginReschedule, submitLogin, submitRegistration, submitRecovery, cancelBooking, changeFont, togglePreference };
}

export type AgendaController = ReturnType<typeof useAgendaController>;
