
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CryptoData } from '../types/dashboard';
import { colors, commonStyles } from '../styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface CryptoCardProps {
  crypto: CryptoData[];
  loading: boolean;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, loading }) => {
  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(4)}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="bitcoinsign.circle" size={24} color={colors.primary} />
          <Text style={styles.title}>Cryptocurrency</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Loading crypto data...</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.dashboardCard, styles.container]}>
      <View style={styles.header}>
        <IconSymbol name="bitcoinsign.circle" size={24} color={colors.primary} />
        <Text style={styles.title}>Cryptocurrency</Text>
      </View>
      
      {crypto.map((coin) => (
        <View key={coin.id} style={styles.cryptoItem}>
          <View style={styles.cryptoInfo}>
            <Text style={styles.cryptoName}>{coin.name}</Text>
            <Text style={styles.cryptoSymbol}>{coin.symbol.toUpperCase()}</Text>
          </View>
          <View style={styles.cryptoPricing}>
            <Text style={styles.cryptoPrice}>{formatPrice(coin.current_price)}</Text>
            <Text style={[
              styles.cryptoChange,
              { color: coin.price_change_percentage_24h >= 0 ? colors.success : colors.error }
            ]}>
              {formatPercentage(coin.price_change_percentage_24h)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 180,
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
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  cryptoSymbol: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cryptoPricing: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  cryptoChange: {
    fontSize: 12,
    fontWeight: '500',
  },
});
