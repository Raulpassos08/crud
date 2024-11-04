import { StoreProvider } from "easy-peasy";
import React from "react";
import UserList from "./componentes/userList/userList";
import store from "./store/store";

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <UserList />
    </StoreProvider>
  );
};

export default App;
