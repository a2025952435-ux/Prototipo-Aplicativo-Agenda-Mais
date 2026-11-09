import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function SettingsScreen(ctx: Pick<AgendaController, 'storageAvailable' | 'preferences' | 'setPreferences' | 'resetPrompt' | 'setResetPrompt' | 'theme' | 'read' | 'resetDemo' | 'changeFont' | 'togglePreference'>) {
  const { storageAvailable, preferences, setPreferences, resetPrompt, setResetPrompt, theme, read, resetDemo, changeFont, togglePreference } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>
            {storageAvailable
              ? 'Agendamentos fictícios, avisos e preferências ficam somente neste dispositivo. Nada é enviado a um servidor.'
              : 'Não foi possível salvar nesta sessão. As alterações serão perdidas ao fechar o app.'}
          </DemoNotice>
          <SectionHeading title="Tamanho do texto" read={read} />
          <View style={styles.wrapRow}>
            {(['normal', 'grande', 'extragrande'] as const).map((font) => (
              <SelectionPill key={font} label={font === 'extragrande' ? 'Extra grande' : font[0].toUpperCase() + font.slice(1)} selected={preferences.font === font} onPress={() => changeFont(font)} />
            ))}
          </View>
          <PreferenceSwitch title="Alto contraste" description="Realça texto, botões e contornos." value={preferences.contrast} onChange={() => togglePreference('contrast')} read={read} />
          <SectionHeading title="Orientações visuais" read={read} />
          <PreferenceSwitch title="Orientação automática" description="Preferência demonstrativa; não inicia áudio." value={preferences.guidance} onChange={() => togglePreference('guidance')} read={read} />
          <PreferenceSwitch title="Lembretes de demonstração" description="Ajusta somente os avisos locais do exemplo." value={preferences.reminders} onChange={() => togglePreference('reminders')} read={read} />
          <View style={[styles.settingCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
            <View style={styles.sectionHeading}>
              <AppText variant="section" style={{ flex: 1 }}>Velocidade da leitura</AppText>
              <AudioAction text="Velocidade de leitura é uma preferência visual. Nenhum áudio é reproduzido." onRead={read} compact />
            </View>
            <View style={styles.wrapRow}>
              {(['lenta', 'normal', 'rápida'] as const).map((speed) => (
                <SelectionPill key={speed} label={speed[0].toUpperCase() + speed.slice(1)} selected={preferences.speed === speed} onPress={() => setPreferences((current) => ({ ...current, speed }))} />
              ))}
            </View>
            <AppText variant="caption">A preferência não altera a simulação de leitura.</AppText>
          </View>
          <View style={[styles.settingCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
            <View style={styles.sectionHeading}>
              <AppText variant="section" style={{ flex: 1 }}>Antecedência dos lembretes</AppText>
              <AudioAction text={`Antecedência selecionada: ${preferences.advance}. É apenas uma preferência demonstrativa.`} onRead={read} compact />
            </View>
            <View style={styles.wrapRow}>
              {['No mesmo dia', '1 dia antes', '2 dias antes'].map((advance) => (
                <SelectionPill key={advance} label={advance} selected={preferences.advance === advance} onPress={() => setPreferences((current) => ({ ...current, advance }))} />
              ))}
            </View>
          </View>
          <ActionButton title="Testar orientação (visual)" icon="volume-high-outline" onPress={() => read('Teste de voz. Esta é uma simulação visual de leitura, sem áudio real.')} />
          <ActionButton title="Redefinir demonstração" icon="refresh-outline" kind="outline" onPress={() => setResetPrompt(true)} />
          {resetPrompt ? (
            <View style={[styles.settingCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
              <AppText variant="section">Redefinir os exemplos?</AppText>
              <AppText variant="body">Agendamentos, avisos e preferências voltarão ao início neste dispositivo.</AppText>
              <AudioAction text="Redefinir registros e preferências fictícios deste dispositivo." onRead={read} />
              <ActionButton title="Sim, redefinir" icon="refresh-outline" kind="danger" onPress={resetDemo} />
              <ActionButton title="Manter os exemplos" icon="close" kind="outline" onPress={() => setResetPrompt(false)} />
            </View>
          ) : null}
        </>
      );
}
