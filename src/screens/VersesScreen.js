import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const HIGHLIGHT_COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Cyan', 'Orange'];

const VersesScreen = ({ route, navigation }) => {
  const { chapter } = route.params;
  const [highlights, setHighlights] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState(null);

  const getHighlightKey = (chapterNum, verseNum) => `psalm-${chapterNum}:${verseNum}`;

  // Load highlights from AsyncStorage when the screen loads
  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const highlightKeys = keys.filter(key => key.startsWith(`psalm-${chapter.chapter}:`));
        const storedHighlights = await AsyncStorage.multiGet(highlightKeys);
        const highlightsObj = storedHighlights.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
        setHighlights(highlightsObj);
      } catch (e) {
        console.error("Failed to load highlights.", e);
      }
    };
    loadHighlights();
  }, [chapter.chapter]);

  // Set the navigation header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Psalm ${chapter.chapter}`,
    });
  }, [navigation, chapter]);

  const handleVersePress = (verse) => {
    setSelectedVerse(verse);
    setModalVisible(true);
  };

  const handleHighlight = async (color) => {
    if (!selectedVerse) return;
    const key = getHighlightKey(chapter.chapter, selectedVerse.verse);

    try {
      if (color) {
        await AsyncStorage.setItem(key, color);
        setHighlights(prev => ({ ...prev, [key]: color }));
      } else {
        // Remove highlight
        await AsyncStorage.removeItem(key);
        setHighlights(prev => {
          const newHighlights = { ...prev };
          delete newHighlights[key];
          return newHighlights;
        });
      }
    } catch (e) {
      console.error("Failed to save or remove highlight.", e);
    } finally {
      setModalVisible(false);
      setSelectedVerse(null);
    }
  };

  const renderItem = ({ item }) => {
    const key = getHighlightKey(chapter.chapter, item.verse);
    const backgroundColor = highlights[key] || '#ffffff';

    return (
      <TouchableOpacity onPress={() => handleVersePress(item)}>
        <View style={[styles.itemContainer, { backgroundColor }]}>
          <Text style={styles.itemText}>
            <Text style={styles.verseNumber}>{item.verse}. </Text>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chapter.verses}
        renderItem={renderItem}
        keyExtractor={(item) => item.verse.toString()}
        contentContainerStyle={styles.list}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Highlight Verse</Text>
          {HIGHLIGHT_COLORS.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorButton, { backgroundColor: color.toLowerCase() }]}
              onPress={() => handleHighlight(color.toLowerCase())}
            >
              <Text style={styles.colorButtonText}>{color}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.separator} />
          <Button title="Remove Highlight" color="red" onPress={() => handleHighlight(null)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 8,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  itemText: {
    fontSize: 17,
    lineHeight: 24,
  },
  verseNumber: {
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  colorButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  colorButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
});

export default VersesScreen;