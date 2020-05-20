import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from 'react-native';
//Delete all TodoLists
import {deleteAllTodoLists} from '../database/database.js';
//sort
import {SORT_ASCENDING, SORT_DESCENDING} from '../components/sortState';
const HeaderComponent = props => {
  const {
    title,
    showAddTodoList,
    hasAddButton,
    hasSortButton,
    sort,
    sortState,
  } = props;
  var sortIcon =
    sortState === SORT_ASCENDING
      ? require('../assets/sort-asc-icon.png')
      : require('../assets/sort-desc-icon.png');
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      {hasSortButton && (
        <TouchableOpacity style={styles.addButton} onPress={sort}>
          <Image style={styles.sortButtonImage} source={sortIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#009387',
    height: Platform.OS === 'ios' ? 88 : 80,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50,
  },
  addButton: {
    zIndex: 2,
    marginRight: 10,
    marginTop: 30,
  },
  addButtonImage: {
    width: 42,
    height: 42,
    tintColor: 'white',
  },
  deleteButtonImage: {
    width: 26,
    height: 26,
    tintColor: 'white',
  },
  sortButtonImage: {
    width: 26,
    height: 26,
    tintColor: 'white',
  },
});
export default HeaderComponent;
