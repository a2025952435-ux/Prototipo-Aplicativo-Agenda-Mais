import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function AccessibilityScreen(ctx: Pick<AgendaController, 'preferences' | 'openTab' | 'read' | 'changeFont' | 'togglePreference'>) {
  const { preferences, openTab, read, changeFont, togglePreference } = ctx;
      return (
        <>
          <AppText variant="body">Escolha o tamanho do texto e o contraste que deixam a demonstração mais confortável.</AppText>
          <SectionHeading title="Tamanho do texto" read={read} />
          <View style={styles.wrapRow}>
            {(['normal', 'grande', 'extragrande'] as const).map((font) => (
              <SelectionPill key={font} label={font === 'extragrande' ? 'Extra grande' : font[0].toUpperCase() + font.slice(1)} selected={preferences.font === font} onPress={() => changeFont(font)} testID={`font-${font}`} />
            ))}
          </View>
          <PreferenceSwitch title="Alto contraste" description="Deixa bordas e textos mais destacados." value={preferences.contrast} onChange={() => togglePreference('contrast')} read={read} />
          <PreferenceSwitch title="Orientação automática" description="Preferência demonstrativa, sem leitura automática real." value={preferences.guidance} onChange={() => togglePreference('guidance')} read={read} />
          <DemoNotice onRead={read}>O botão de alto-falante mostra uma simulação visual. Não há reprodução de áudio.</DemoNotice>
          <ActionButton title="Salvar e ir ao início" icon="arrow-forward" onPress={() => openTab('home')} />
          <ActionButton title="Ajustar depois" icon="settings-outline" kind="outline" onPress={() => openTab('home')} />
        </>
      );
}
