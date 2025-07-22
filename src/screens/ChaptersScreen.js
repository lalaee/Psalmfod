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
    backgroundColor: '#181919',
    paddingTop: 20, // Add some padding at the top
  },
  itemContainer: {
    backgroundColor: '#1C1E1E',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderColor: '#292B2B',
  },
  itemText: {
    fontFamily: 'FKGroteskNeueTrial-Regular', // Use the exact PostScript name
    fontSize: 18,
    color: '#E5E5E2',
  },
});

export default ChaptersScreen;