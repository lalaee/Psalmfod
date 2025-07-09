import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import psalmsData from '../data/psalms.json';

const ChaptersScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Verses', { chapter: item })}
    >
      <Text style={styles.itemText}>Psalm {item.chapter}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={psalmsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.chapter.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  itemContainer: {
    backgroundColor: '#2C2C2C',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default ChaptersScreen;