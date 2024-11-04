import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import Modal from "../modal/modal";
import UserForm from "../userForm/userForm";
import "./userList.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const users = useStoreState((state: any) => state.users);
  const setUsers = useStoreActions((actions: any) => actions.setUsers);
  const deleteUser = useStoreActions((actions: any) => actions.deleteUser);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, [setUsers]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      deleteUser(id);
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
      alert("Ocorreu um erro ao deletar o usuário.");
    }
  };

  const openModal = (user?: User) => {
    setEditingUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => openModal()}>Add User</button>
      {users.map((user: User) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={() => openModal(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <UserForm user={editingUser} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default UserList;
