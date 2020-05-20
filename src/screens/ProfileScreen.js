import React, {useState} from 'react';
import {
  FlatList,
  TextInput,
  StyleSheet,
  View,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderComponent from '../components/HeaderComponent.js';
import realm from '../database/database.js';
import {SORT_ASCENDING, SORT_DESCENDING} from '../components/sortState';
import {queryAllTodo, filterTodos} from '../database/database.js';
import FlatListItem from '../components/FlatListItem.js';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortState: SORT_ASCENDING,
      todos: [],
      searchedName: '',
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  sort = () => {
    this.setState({
      sortState:
        this.state.sortState === SORT_ASCENDING
          ? SORT_DESCENDING
          : SORT_ASCENDING,
      todos: this.state.todos.sorted(
        'name',
        this.state.sortState === SORT_DESCENDING ? true : false,
      ),
    });
  };
  reloadData = () => {
    queryAllTodo()
      .then(todos => {
        this.setState({todos});
      })
      .catch(error => {
        this.setState({todos: []});
      });
    console.log(`reloadData`);
  };
  render() {
    return (
      <View>
        <HeaderComponent
          title={'Tìm kiếm'}
          hasAddButton={true}
          hasDeleteAllButton={true}
          showAddTodoList={() => {
            this.refs.popupDialogComponent.showDialogComponentForAdd();
          }}
          hasSortButton={true}
          sort={this.sort}
          sortState={this.state.sortState}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter text to search"
          autoCorrect={false}
          onChangeText={text => {
            this.setState({searchedName: text});
            filterTodos(text)
              .then(filteredTodos => {
                this.setState({todos: filteredTodos});
              })
              .catch(error => {
                this.setState({todos: []});
              });
            console.log(this.state.todos);
          }}
          value={this.state.searchedName}
        />
        <FlatList
          style={styles.flatList}
          data={this.state.todos}
          renderItem={({item, index}) => (
            <FlatListItem
              todo={item}
              itemIndex={index}
              onPressItem={() => {
                alert('you pressed item');
              }}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  flatList: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'red',
  },
  textInput: {
    height: 40,
    padding: 10,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
export default ProfileScreen;
