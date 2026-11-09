import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function ScheduleScreen(ctx: Pick<AgendaController, 'selectedDate' | 'setSelectedDate' | 'selectedTime' | 'setSelectedTime' | 'demoDays' | 'go' | 'back' | 'read'>) {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, demoDays, go, back, read } = ctx;
      return (
        <>
          <SectionHeading title="Escolha um dia" read={read} />
          <View style={styles.wrapRow}>
            {demoDays.map((day) => (
              <SelectionPill key={day.id} label={day.label} selected={selectedDate === day.id} onPress={() => setSelectedDate(day.id)} testID={`day-${day.id}`} />
            ))}
          </View>
          <SectionHeading title="Escolha um horário" read={read} />
          <View style={styles.wrapRow}>
            {exampleTimes.map((time) => (
              <SelectionPill key={time} label={time} selected={selectedTime === time} onPress={() => setSelectedTime(time)} testID={`time-${time}`} />
            ))}
          </View>
          <AudioAction text={`Seleção de dia e horário. ${selectedDate ? formatDay(selectedDate) : 'Escolha um dia.'} ${selectedTime ? `Às ${selectedTime}.` : 'Escolha um horário.'} `} onRead={read} />
          <ActionButton title="Revisar agendamento" icon="arrow-forward" disabled={!selectedDate || !selectedTime} onPress={() => go('confirmation')} />
          <ActionButton title="Voltar ao profissional" icon="arrow-back" kind="outline" onPress={() => go('doctor')} />
        </>
      );
}
