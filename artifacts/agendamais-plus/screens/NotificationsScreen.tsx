import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function NotificationsScreen(ctx: Pick<AgendaController, 'notices' | 'setNotices' | 'theme' | 'read'>) {
  const { notices, setNotices, theme, read } = ctx;
      const unread = notices.filter((notice) => !notice.read).length;
      return (
        <>
          <DemoNotice onRead={read}>Não há envio de mensagens ou notificações push.</DemoNotice>
          <View style={styles.sectionHeading}>
            <AppText variant="section" style={{ flex: 1 }}>{unread} aviso(s) não lido(s)</AppText>
            <AudioAction text={`${unread} avisos não lidos. Confira seus avisos locais.`} onRead={read} compact />
          </View>
          {notices.map((notice) => (
            <Pressable
              key={notice.id}
              accessibilityRole="button"
              accessibilityLabel={`${notice.title}. ${notice.body}`}
              onPress={() => setNotices((items) => items.map((item) => item.id === notice.id ? { ...item, read: true } : item))}
              style={[styles.noticeCard, { backgroundColor: notice.read ? theme.card : theme.accent, borderColor: theme.border }]}
            >
              <View style={styles.noticeHead}>
                <Ionicons name={notice.read ? 'mail-open-outline' : 'mail-unread-outline'} size={24} color={theme.primary} />
                <AppText variant="section" style={{ flex: 1 }}>{notice.title}</AppText>
                <AudioAction text={`${notice.title}. ${notice.body}`} onRead={read} compact />
              </View>
              <AppText variant="body">{notice.body}</AppText>
              <AppText variant="caption">{notice.date} · toque para marcar como lido</AppText>
            </Pressable>
          ))}
          <ActionButton title="Marcar todos como lidos" icon="checkmark-done-outline" kind="outline" onPress={() => setNotices((items) => items.map((item) => ({ ...item, read: true })))} />
        </>
      );
}
