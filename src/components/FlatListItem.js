import React, {Component, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/Colors';
import Swipeout from 'react-native-swipeout';

let FlatListItem = props => {
  const {todo, itemIndex, popupDialogComponent, onPressItem} = props;
  console.log(todo.name);

  let [state, setState] = useState({
    completed: todo.completed.toLocaleString(),
    important: todo.important.toLocaleString(),
  });

  const showEditModal = () => {
    popupDialogComponent.showDialogComponentForUpdate({
      // id,
      // name,
    });
  };
  const showDeleteConfirmation = () => {
    Alert.alert(
      'Delete',
      'Delete a todoList',
      [
        {
          text: 'No',
          onPress: () => {}, //Do nothing
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <Swipeout
      right={[
        {
          text: 'Edit',
          backgroundColor: 'rgb(81,134,237)',
          onPress: showEditModal,
        },
        {
          text: 'Delete',
          backgroundColor: 'rgb(217, 80, 64)',
          onPress: showDeleteConfirmation,
        },
      ]}
      autoClose={true}>
      <TouchableOpacity onPress={onPressItem}>
        <View
          style={{
            backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue',
          }}>
          <View style={styles.todoContainer}>
            <TouchableOpacity
              onPress={() => {
                setState(preSate => ({
                  ...preSate,
                  completed: !state.completed,
                }));
              }}>
              <Ionicons
                name={state.completed ? 'ios-square-outline' : 'ios-square'}
                size={30}
                color={colors.gray}
                style={{width: 32, marginLeft: 10}}
              />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.todo,
                  {
                    textDecorationLine: state.completed
                      ? 'none'
                      : 'line-through',
                    color: state.completed ? colors.black : colors.gray,
                  },
                ]}>
                {todo.name}
              </Text>
              <Text
                style={{
                  color: state.completed ? colors.black : colors.gray,
                }}>
                {todo.timeStart.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setState(preSate => ({
                  ...preSate,
                  important: !state.important,
                }));
              }}>
              <AntDesign
                name={state.important ? 'staro' : 'star'}
                size={30}
                color={colors.gray}
                style={{width: 42}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default FlatListItem;
