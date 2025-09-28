
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useDashboardData } from '@/hooks/useDashboardData';
import { WeatherCard } from '@/components/WeatherCard';
import { NewsCard } from '@/components/NewsCard';
import { CryptoCard } from '@/components/CryptoCard';
import { QuoteCard } from '@/components/QuoteCard';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

const ICON_COLOR = colors.primary;

const DashboardScreen = () => {
  const { data, loading, errors, refresh, updateWeather } = useDashboardData();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderHeaderRight = () => (
    <Pressable onPress={refresh.all} style={styles.headerButton}>
      <IconSymbol name="arrow.clockwise" size={20} color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <View style={styles.headerLeft}>
      <Text style={styles.headerTime}>{getCurrentTime()}</Text>
    </View>
  );

  const isRefreshing = Object.values(loading).some(Boolean);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      
      <ScrollView
        style={[commonStyles.container, styles.container]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh.all}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <WeatherCard
          weather={data.weather}
          loading={loading.weather}
          onWeatherUpdate={updateWeather}
        />

        <NewsCard
          news={data.news}
          loading={loading.news}
        />

        <CryptoCard
          crypto={data.crypto}
          loading={loading.crypto}
        />

        <QuoteCard
          quote={data.quote}
          loading={loading.quote}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pull down to refresh • Last updated: {getCurrentTime()}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  headerLeft: {
    marginLeft: 16,
  },
  headerTime: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default DashboardScreen;
