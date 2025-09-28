
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QuoteData } from '../types/dashboard';
import { colors, commonStyles } from '../styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface QuoteCardProps {
  quote: QuoteData | null;
  loading: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, loading }) => {
  if (loading) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="quote.bubble" size={24} color={colors.primary} />
          <Text style={styles.title}>Daily Inspiration</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Loading quote...</Text>
      </View>
    );
  }

  if (!quote) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="quote.bubble" size={24} color={colors.primary} />
          <Text style={styles.title}>Daily Inspiration</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Unable to load quote</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.dashboardCard, styles.container]}>
      <View style={styles.header}>
        <IconSymbol name="quote.bubble" size={24} color={colors.primary} />
        <Text style={styles.title}>Daily Inspiration</Text>
      </View>
      
      <View style={styles.quoteContent}>
        <Text style={styles.quoteText}>"{quote.text}"</Text>
        <Text style={styles.quoteAuthor}>— {quote.author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  quoteContent: {
    flex: 1,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
    fontWeight: '500',
  },
});
