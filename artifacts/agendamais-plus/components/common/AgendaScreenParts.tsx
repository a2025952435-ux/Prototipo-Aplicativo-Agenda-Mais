import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard, useAppTheme } from '@/components/AgendaMaisUI';
import { styles } from '@/styles/agendaStyles';
import type { BookingStatus } from '@/types/agenda';

export function StatusText({ status }: { status: BookingStatus }) {
  const theme = useAppTheme();
  const label = status === 'upcoming' ? 'Agendada' : status === 'cancelled' ? 'Cancelada' : 'Concluída';
  return (
    <View style={[styles.statusPill, { backgroundColor: status === 'upcoming' ? theme.accent : theme.muted }]}>
      <AppText variant="caption" style={{ color: status === 'cancelled' ? theme.mutedForeground : theme.primary }}>{label}</AppText>
    </View>
  );
}

export function SelectionPill({
  label,
  selected,
  onPress,
  testID,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.selectionPill,
        {
          backgroundColor: selected ? theme.primary : theme.card,
          borderColor: selected ? theme.primary : theme.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="label" style={{ color: selected ? theme.primaryForeground : theme.foreground, textAlign: 'center' }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function SectionHeading({
  title,
  read,
}: {
  title: string;
  read: (text: string) => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <AppText variant="section" style={{ flex: 1 }}>{title}</AppText>
      <AudioAction text={title} onRead={read} compact />
    </View>
  );
}

export function PreferenceSwitch({
  title,
  description,
  value,
  onChange,
  read,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: () => void;
  read: (text: string) => void;
}) {
  const theme = useAppTheme();
  return (
    <View style={[styles.settingCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
      <View style={{ flex: 1, gap: 4 }}>
        <AppText variant="section">{title}</AppText>
        <AppText variant="body">{description}</AppText>
      </View>
      <AudioAction text={`${title}. ${description} ${value ? 'Ativado.' : 'Desativado.'}`} onRead={read} compact />
      <Switch
        accessibilityLabel={`${title}, ${value ? 'ativado' : 'desativado'}`}
        value={value}
        onValueChange={onChange}
        trackColor={{ false: theme.border, true: theme.primary }}
        thumbColor={theme.primaryForeground}
      />
    </View>
  );
}

export function InfoCard({
  title,
  value,
  icon,
  onRead,
}: {
  title: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onRead: (text: string) => void;
}) {
  const theme = useAppTheme();
  return (
    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
        <Ionicons name={icon} size={23} color={theme.primary} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <AppText variant="caption">{title}</AppText>
        <AppText variant="label">{value}</AppText>
      </View>
      <AudioAction text={`${title}. ${value}`} onRead={onRead} compact />
    </View>
  );
}

export function EmptyState({ title, description, icon }: { title: string; description: string; icon: React.ComponentProps<typeof Ionicons>['name'] }) {
  const theme = useAppTheme();
  return (
    <View style={[styles.emptyState, { backgroundColor: theme.muted }]}>
      <Ionicons name={icon} size={42} color={theme.primary} />
      <AppText variant="section" style={styles.centerText}>{title}</AppText>
      <AppText variant="body" style={styles.centerText}>{description}</AppText>
    </View>
  );
}

