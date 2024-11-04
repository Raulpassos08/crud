import { action, Action, createStore } from "easy-peasy";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserModel {
  users: User[];
  setUsers: Action<UserModel, User[]>;
  addUser: Action<UserModel, User>;
  updateUser: Action<UserModel, User>;
  deleteUser: Action<UserModel, number>;
}

const store = createStore<UserModel>({
  users: [],
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
  addUser: action((state, payload) => {
    state.users.push(payload);
  }),
  updateUser: action((state, payload) => {
    const index = state.users.findIndex((user) => user.id === payload.id);
    if (index !== -1) {
      state.users[index] = payload;
    }
  }),
  deleteUser: action((state, payload) => {
    state.users = state.users.filter((user) => user.id !== payload);
  }),
});

export default store;
