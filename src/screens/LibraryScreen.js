import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import psalmsData from '../data/psalms.json';

const LibraryScreen = ({ navigation }) => {
  const [highlightedSections, setHighlightedSections] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadHighlights = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const highlightKeys = keys.filter(key => key.startsWith('psalm-'));
          const storedHighlights = await AsyncStorage.multiGet(highlightKeys);

          const groupedByColor = {};

          storedHighlights.forEach(([key, color]) => {
            const [chapterNum, verseNum] = key.replace('psalm-', '').split(':').map(Number);
            
            const chapter = psalmsData.find(p => p.chapter === chapterNum);
            const verse = chapter?.verses.find(v => v.verse === verseNum);

            if (verse) {
              if (!groupedByColor[color]) {
                groupedByColor[color] = [];
              }
              groupedByColor[color].push({
                ...verse,
                chapter: chapterNum,
                color: color,
                fullChapter: chapter,
              });
            }
          });

          const sections = Object.keys(groupedByColor).map(color => ({
            title: `${color.charAt(0).toUpperCase() + color.slice(1)} Highlights`,
            data: groupedByColor[color],
          }));

          setHighlightedSections(sections);
        } catch (e) {
          console.error("Failed to load highlights for library.", e);
        }
      };

      loadHighlights();
    }, [])
  );

  const handleVersePress = (item) => {
    navigation.navigate('Psalms', {
      screen: 'Verses',
      params: { chapter: item.fullChapter },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVersePress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>"{item.text}"</Text>
        <Text style={styles.itemReference}>
          Psalm {item.chapter}:{item.verse}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {highlightedSections.length > 0 ? (
        <SectionList
          sections={highlightedSections}
          keyExtractor={(item, index) => `${item.chapter}:${item.verse}:${index}`}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No highlights yet.</Text>
            <Text style={styles.emptySubText}>Go to the Psalms tab to select and highlight verses.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#121212',
    color: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#2C2C2C',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C3C',
  },
  itemText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#EAEAEA',
  },
  itemReference: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#A9A9A9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptySubText: {
    fontSize: 14,
    color: '#A9A9A9',
    textAlign: 'center',
    marginTop: 8,
  }
});

export default LibraryScreen;