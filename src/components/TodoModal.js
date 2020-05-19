import React, {Component} from 'react';
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/Colors';
import Swipeout from 'react-native-swipeout';

let FlatListItem = props => {
  const {
    itemIndex,
    id,
    name,
    creationDate,
    popupDialogComponent,
    onPressItem,
  } = props;
  const showEditModal = () => {
    popupDialogComponent.showDialogComponentForUpdate({
      id,
      name,
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
            <TouchableOpacity>
              <Ionicons
                name={props.completed ? 'ios-square' : 'ios-square-outline'}
                size={24}
                color={colors.gray}
                style={{width: 32}}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: props.completed ? 'line-through' : 'none',
                  color: props.completed ? colors.gray : colors.black,
                },
              ]}>
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default class TodoModal extends Component {
  state = {
    name: this.props.list.name,
    color: this.props.list.color,
    todos: this.props.list.todos,
  };

  renderTodo = todo => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity>
          <Ionicons
            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
            size={24}
            color={colors.gray}
            style={{width: 32}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? colors.gray : colors.black,
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };
  render() {
    const taskCount = this.state.todos.length;
    const completedCount = this.state.todos.filter(todo => todo.completed)
      .length;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32, zIndex: 10}}
          onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: this.state.color},
          ]}>
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount} tasks
          </Text>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={this.state.todos}
            renderItem={({item}) => FlatListItem(item)}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <KeyboardAvoidingView
          style={[styles.section, styles.footer]}
          behavior="padding">
          <TextInput style={[styles.input, {borderColor: this.state.color}]} />
          <TouchableOpacity
            style={[styles.addTodo, {backgroundColor: this.state.color}]}>
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

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
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});
