import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView
} from 'react-native';

const VersesScreen = ({ route, navigation }) => {
  const { chapter } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Psalm ${chapter.chapter}`,
    });
  }, [navigation, chapter]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        <Text style={styles.verseNumber}>{item.verse}. </Text>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chapter.verses}
        renderItem={renderItem}
        keyExtractor={(item) => item.verse.toString()}
        contentContainerStyle={styles.list}
      />
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
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 17,
    lineHeight: 24,
  },
  verseNumber: {
    fontWeight: 'bold',
  },
});

export default VersesScreen;