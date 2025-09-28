
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { NewsArticle } from '../types/dashboard';
import { colors, commonStyles } from '../styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface NewsCardProps {
  news: NewsArticle[];
  loading: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, loading }) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <View style={[commonStyles.dashboardCard, styles.container]}>
        <View style={styles.header}>
          <IconSymbol name="newspaper" size={24} color={colors.primary} />
          <Text style={styles.title}>Latest News</Text>
        </View>
        <Text style={commonStyles.textSecondary}>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.dashboardCard, styles.container]}>
      <View style={styles.header}>
        <IconSymbol name="newspaper" size={24} color={colors.primary} />
        <Text style={styles.title}>Latest News</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsScroll}
      >
        {news.map((article) => (
          <Pressable key={article.id} style={styles.newsItem}>
            <Image 
              source={{ uri: article.urlToImage }} 
              style={styles.newsImage}
              resizeMode="cover"
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {article.title}
              </Text>
              <Text style={styles.newsDescription} numberOfLines={2}>
                {article.description}
              </Text>
              <View style={styles.newsFooter}>
                <Text style={styles.newsSource}>{article.source.name}</Text>
                <Text style={styles.newsTime}>{formatTimeAgo(article.publishedAt)}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 280,
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
  newsScroll: {
    paddingRight: 20,
  },
  newsItem: {
    width: 280,
    marginRight: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.grey,
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  newsDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 16,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.primary,
  },
  newsTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
