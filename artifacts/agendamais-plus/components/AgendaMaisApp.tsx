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

import { useAgendaController } from '@/hooks/useAgendaController';
import { styles } from '@/styles/agendaStyles';
import { titles, descriptions } from '@/constants/agendaData';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import WelcomeScreen from '@/screens/WelcomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import RecoveryScreen from '@/screens/RecoveryScreen';
import AccessibilityScreen from '@/screens/AccessibilityScreen';
import HomeScreen from '@/screens/HomeScreen';
import SpecialtyScreen from '@/screens/SpecialtyScreen';
import DoctorsScreen from '@/screens/DoctorsScreen';
import DoctorScreen from '@/screens/DoctorScreen';
import ScheduleScreen from '@/screens/ScheduleScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
import SuccessScreen from '@/screens/SuccessScreen';
import AppointmentsScreen from '@/screens/AppointmentsScreen';
import AppointmentDetailScreen from '@/screens/AppointmentDetailScreen';
import OnlineScreen from '@/screens/OnlineScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import HelpScreen from '@/screens/HelpScreen';
import AboutScreen from '@/screens/AboutScreen';

function AgendaMaisApp() {
  const ctx = useAgendaController();
  const { baseTheme, insets, screen, setScreen, history, setHistory, ready, setReady, storageAvailable, setStorageAvailable, activeReading, setActiveReading, bookings, setBookings, preferences, setPreferences, notices, setNotices, visitType, setVisitType, specialty, setSpecialty, provider, setProvider, selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedBookingId, setSelectedBookingId, reschedulingId, setReschedulingId, inCall, setInCall, cancelPrompt, setCancelPrompt, resetPrompt, setResetPrompt, search, setSearch, loginEmail, setLoginEmail, loginPassword, setLoginPassword, registerName, setRegisterName, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, registerConfirmation, setRegisterConfirmation, recoveryEmail, setRecoveryEmail, formMessage, setFormMessage, profileName, setProfileName, draftProfileName, setDraftProfileName, draftProfileEmail, setDraftProfileEmail, draftProfilePhone, setDraftProfilePhone, demoDays, fontScale, theme, selectedBooking, activeOnlineBooking, demoProviders, matchingProviders, mainTabs, showBottomNav, go, back, openTab, read, resetDemo, proceedToBooking, saveBooking, beginReschedule, submitLogin, submitRegistration, submitRecovery, cancelBooking, changeFont, togglePreference } = ctx;

  const renderOpening = () => (
    <View style={[styles.opening, { paddingBottom: Math.max(insets.bottom, Platform.OS === 'web' ? 34 : 18) }]}>
      <View style={styles.openingMain}>
        <View style={styles.orbitArtwork} accessibilityElementsHidden>
          <View style={[styles.orbit, styles.orbitOne, { borderColor: 'rgba(255,255,255,0.22)' }]} />
          <View style={[styles.orbit, styles.orbitTwo, { borderColor: 'rgba(255,255,255,0.22)' }]} />
          <View style={[styles.orbit, styles.orbitThree, { borderColor: 'rgba(255,255,255,0.22)' }]} />
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.openingIcon}
            accessibilityLabel="Logo do AgendaMais+, com calendário e coração"
          />
        </View>
        <AppText variant="brand" style={{ color: theme.primaryForeground, textAlign: 'center', marginTop: 7 }}>
          AgendaMais+
        </AppText>
        <AppText variant="body" style={{ color: theme.primaryForeground, textAlign: 'center', maxWidth: 330, marginTop: 11 }}>
          Cuidar da sua saúde ficou mais fácil
        </AppText>
        <AppText variant="body" style={{ color: theme.primaryForeground, textAlign: 'center', opacity: 0.9, maxWidth: 330 }}>
          Com mais autonomia, simplicidade e acessibilidade.
        </AppText>
        <AudioAction
          inverted
          text="Cuidar da sua saúde ficou mais fácil. O AgendaMais+ é uma demonstração com foco em autonomia e acessibilidade."
          onRead={read}
        />
        <View style={styles.openingDots} accessibilityLabel="Tela 1 de 3">
      <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.secondary }]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.openingFooter}>
        <ActionButton title="Começar demonstração" icon="arrow-forward" onPress={() => go('welcome')} kind="outline" />
        <AppText variant="caption" style={{ color: theme.primaryForeground, textAlign: 'center', opacity: 0.8 }}>
          Protótipo acadêmico · sem atendimento de saúde
        </AppText>
      </View>
    </View>
  );

  const renderScreen = (): ReactNode => {
    if (screen === 'welcome') return <WelcomeScreen {...ctx} />;
    if (screen === 'login') return <LoginScreen {...ctx} />;
    if (screen === 'register') return <RegisterScreen {...ctx} />;
    if (screen === 'recovery') return <RecoveryScreen {...ctx} />;
    if (screen === 'accessibility') return <AccessibilityScreen {...ctx} />;
    if (screen === 'home') return <HomeScreen {...ctx} />;
    if (screen === 'specialty') return <SpecialtyScreen {...ctx} />;
    if (screen === 'doctors') return <DoctorsScreen {...ctx} />;
    if (screen === 'doctor') return <DoctorScreen {...ctx} />;
    if (screen === 'schedule') return <ScheduleScreen {...ctx} />;
    if (screen === 'confirmation') return <ConfirmationScreen {...ctx} />;
    if (screen === 'success') return <SuccessScreen {...ctx} />;
    if (screen === 'appointments') return <AppointmentsScreen {...ctx} />;
    if (screen === 'appointment-detail') return <AppointmentDetailScreen {...ctx} />;
    if (screen === 'online') return <OnlineScreen {...ctx} />;
    if (screen === 'notifications') return <NotificationsScreen {...ctx} />;
    if (screen === 'profile') return <ProfileScreen {...ctx} />;
    if (screen === 'edit-profile') return <EditProfileScreen {...ctx} />;
    if (screen === 'settings') return <SettingsScreen {...ctx} />;
    if (screen === 'help') return <HelpScreen {...ctx} />;
    if (screen === 'about') return <AboutScreen {...ctx} />;
    return null;
  };

  const appBody = screen === 'opening' ? renderOpening() : (
    <>
      {screen === 'home' ? (
        <View style={styles.homeBrand}>
          <BrandLogo size={50} compact />
        </View>
      ) : (
        <View style={styles.pageHeader}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para a tela anterior"
            onPress={back}
            style={({ pressed }) => [styles.backButton, { backgroundColor: theme.muted }, pressed && styles.pressed]}
          >
            <Ionicons name="arrow-back" size={25} color={theme.primary} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <AppText variant="title">{titles[screen]}</AppText>
            {descriptions[screen] ? <AppText variant="caption">{descriptions[screen]}</AppText> : null}
          </View>
          <AudioAction
            compact
            text={`${titles[screen]}. ${descriptions[screen] ?? 'Tela de demonstração do AgendaMais+.'}`}
            onRead={read}
          />
        </View>
      )}
      <KeyboardAwareScrollViewCompat
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: showBottomNav ? 122 + insets.bottom : 38 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        bottomOffset={24}
      >
        {renderScreen()}
      </KeyboardAwareScrollViewCompat>
      {showBottomNav ? (
        <View style={[styles.bottomNav, { backgroundColor: theme.card, borderTopColor: theme.border, paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom }]}>
          {([
            { id: 'home' as const, label: 'Início', icon: 'home-outline' as const },
            { id: 'appointments' as const, label: 'Consultas', icon: 'calendar-outline' as const },
            { id: 'notifications' as const, label: 'Avisos', icon: 'notifications-outline' as const },
            { id: 'profile' as const, label: 'Perfil', icon: 'person-outline' as const },
          ]).map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: screen === item.id }}
              onPress={() => openTab(item.id)}
              style={styles.navItem}
            >
              <Ionicons name={item.icon} size={24} color={screen === item.id ? theme.primary : theme.mutedForeground} />
              <AppText variant="caption" style={{ color: screen === item.id ? theme.primary : theme.mutedForeground, textAlign: 'center' }}>
                {item.label}
              </AppText>
            </Pressable>
          ))}
        </View>
      ) : null}
    </>
  );

  const backgroundColor = screen === 'opening' ? theme.primary : theme.background;
  return (
    <UIProvider theme={theme} fontScale={fontScale} onRead={read}>
      <StatusBar barStyle={screen === 'opening' ? 'light-content' : 'dark-content'} backgroundColor={backgroundColor} />
      <View style={[styles.root, { backgroundColor, paddingTop: Platform.OS === 'web' ? 67 : insets.top }]}>
        {!ready ? (
          <View style={styles.loading}>
            <BrandLogo size={92} inverted={screen === 'opening'} />
            <ActivityIndicator color={screen === 'opening' ? theme.primaryForeground : theme.primary} />
            <AppText variant="caption" style={{ color: screen === 'opening' ? theme.primaryForeground : theme.mutedForeground }}>
              Preparando a demonstração…
            </AppText>
          </View>
        ) : (
          <>
            {appBody}
            {activeReading ? (
              <View style={[styles.readingBar, { backgroundColor: theme.primary, bottom: showBottomNav ? 82 + insets.bottom : 14 + insets.bottom }]}>
                <View style={styles.readingText}>
                  <Ionicons name="volume-high-outline" size={24} color={theme.primaryForeground} />
                  <View style={{ flex: 1 }}>
                    <AppText variant="caption" style={{ color: theme.primaryForeground, fontWeight: '700' }}>Leitura de demonstração</AppText>
                    <AppText variant="caption" numberOfLines={2} style={{ color: theme.primaryForeground }}>{activeReading}</AppText>
                  </View>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Interromper simulação de leitura"
                  onPress={() => setActiveReading(null)}
                  style={({ pressed }) => [styles.stopReading, pressed && styles.pressed]}
                >
                  <Ionicons name="close" size={23} color={theme.primaryForeground} />
                  <AppText variant="caption" style={{ color: theme.primaryForeground }}>Interromper</AppText>
                </Pressable>
              </View>
            ) : null}
          </>
        )}
      </View>
    </UIProvider>
  );
}

export default AgendaMaisApp;
