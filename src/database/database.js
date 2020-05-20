const Realm = require('realm');
const TODO_SCHEMA = 'Todo';
const TODOLIST_SCHEMA = 'TodoList';
const USER_SCHEMA = 'User';
// Define your models and their properties
const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int', // primary key
    email: 'string',
    username: 'string',
    password: 'string',
    todolists: {type: 'list', objectType: TODOLIST_SCHEMA},
  },
};
const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int', // primary key
    name: 'string',
    color: 'string',
    creationDate: 'date',
    todos: {type: 'list', objectType: TODO_SCHEMA},
  },
};
const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int', // primary key
    name: {type: 'string', indexed: true},
    timeStart: 'date',
    completed: {type: 'bool', default: false},
    important: {type: 'bool', default: false},
  },
};

const databaseOptions = {
  path: 'todolistDB.realm',
  schema: [TodoSchema, TodoListSchema, UserSchema],
  schemaVersion: 0, //optional
};

Realm.open(databaseOptions).then(realm => {
  realm.write(() => {
    let todolist0 = realm.create(TODOLIST_SCHEMA, {
      id: 0,
      name: 'Chiều ngày 20/05/2020',
      color: '#5CD859',
      creationDate: new Date('2020-05-10T21:23:53'),
      todos: [],
    });
    todolist0.todos.push(
      {
        id: 0,
        name: 'làm bài tập tiếng anh part 1',
        timeStart: new Date('2020-05-20T16:23:53'),
        completed: false,
        important: false,
      },
      {
        id: 1,
        name: 'đi chợ Gò Vấp',
        timeStart: new Date('2020-05-20T17:23:53'),
        completed: false,
        important: false,
      },
      {
        id: 2,
        name: 'đi công viên',
        timeStart: new Date('2020-05-20T18:23:53'),
        completed: false,
        important: false,
      },
    );
    let todolist1 = realm.create(TODOLIST_SCHEMA, {
      id: 1,
      name: 'Sáng ngày 21/05/2020',
      color: '#24A6D9',
      creationDate: new Date('2020-05-10T21:23:53'),
      todos: [],
    });
    let user = realm.create(USER_SCHEMA, {
      id: 0,
      email: 'tuyento2809@gmail.com',
      username: 'tuyento',
      password: 'pass1234',
      todolists: [],
    });
  });
});

const findUserByUserName = (userName, password) =>
  new Promise((resolve, reject) => {
    // let db=Realm.open(databaseOptions)
    //   .then(realm => {
    //     let user = realm
    //       .objects(USER_SCHEMA)
    //       .filtered(
    //         'username = "' +
    //           userName +
    //           '" AND ' +
    //           'password = "' +
    //           password +
    //           '"',
    //       );
    //     db.close()
    //     resolve(user);
    //   })
    //   .catch(error => {
    //     reject(error);
    //  });
  });

const queryAllUser = () =>
  new Promise((resolve, reject) => {
    // Realm.open(databaseOptions)
    //   .then(realm => {
    //     let allUser = realm.objects(USER_SCHEMA);
    //     console.log(JSON.stringify(allUser));
    //     resolve(allUser);
    //   })
    //   .catch(error => {
    //     reject(error);
    //   });
  });
export const queryAllTodoList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
      let allTodoListObject = realm.objects(TODOLIST_SCHEMA);
      let allTodoList = [];
      for (let key in allTodoListObject) {
        allTodoList.push(allTodoListObject[key]);
      }
      resolve(allTodoList);
    });
  });

export const queryAllTodo = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allTodo = realm.objects(TODO_SCHEMA);
        console.log(JSON.stringify(allTodo));
        resolve(allTodo);
      })
      .catch(error => {
        reject(error);
      });
  });

export const filterTodos = searchedText =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let filteredTodoLists = realm
          .objects(TODO_SCHEMA)
          .filtered(`name CONTAINS[c] "${searchedText}"`); //[c] = case insensitive
        let allTodo = [];
        for (let key in filteredTodoLists) {
          allTodo.push(filteredTodoLists[key]);
        }
        resolve(allTodo);
      })
      .catch(error => {
        reject(error);
      });
  });

// findUserByUserName('tuyento5', 'pass1234').then(u =>
//   console.log(JSON.stringify(u)),
// );

// export const insertUser = newUser =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           realm.create(USER_SCHEMA, newUser);
//           resolve(newUser);
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const queryAllUser = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         let allUser = realm.objects(USER_SCHEMA);
//         resolve(allUser);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// //===========================================================

//functions for TodoLists
export const insertNewTodoList = newTodoList =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(TODOLIST_SCHEMA, newTodoList);
          resolve(newTodoList);
        });
      })
      .catch(error => reject(error));
  });

export const updateTodoList = todoList =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList.id,
          );
          updatingTodoList.name = todoList.name;
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const deleteTodoList = todoListId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoListId,
          );
          realm.delete(deletingTodoList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
