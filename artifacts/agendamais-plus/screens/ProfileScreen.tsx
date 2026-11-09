import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function ProfileScreen(ctx: Pick<AgendaController, 'profileName' | 'setDraftProfileName' | 'setDraftProfileEmail' | 'setDraftProfilePhone' | 'theme' | 'go' | 'openTab' | 'read'>) {
  const { profileName, setDraftProfileName, setDraftProfileEmail, setDraftProfilePhone, theme, go, openTab, read } = ctx;
      return (
        <>
          <View style={styles.profileHero}>
            <View style={[styles.avatar, styles.avatarLarge]}><Ionicons name="person-outline" size={42} color={theme.primary} /></View>
            <AppText variant="title" style={styles.centerText}>{profileName}</AppText>
            <AppText variant="body" style={styles.centerText}>Perfil local de demonstração</AppText>
            <AudioAction text={`${profileName}. Perfil fictício, sem conta real.`} onRead={read} />
          </View>
          <DemoNotice onRead={read}>Não há conta real. Os dados de perfil não são guardados depois de fechar o app.</DemoNotice>
          <ActionButton title="Editar dados pessoais" icon="create-outline" onPress={() => { setDraftProfileName(''); setDraftProfileEmail(''); setDraftProfilePhone(''); go('edit-profile'); }} />
          <ActionButton title="Configurações" icon="settings-outline" kind="secondary" onPress={() => go('settings')} />
          <ActionButton title="Ajuda e suporte" icon="help-circle-outline" kind="outline" onPress={() => go('help')} />
          <ActionButton title="Sobre o AgendaMais+" icon="information-circle-outline" kind="outline" onPress={() => go('about')} />
          <ActionButton title="Sair da demonstração" icon="log-out-outline" kind="outline" onPress={() => openTab('home')} />
        </>
      );
}
