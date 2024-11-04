import axios from "axios";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import "./userForm.css";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserFormProps {
  user?: User | null; // Aceitando user como null
  onClose: () => void; // Função para fechar o formulário
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const addUser = useStoreActions((actions: any) => actions.addUser);
  const updateUser = useStoreActions((actions: any) => actions.updateUser);

  // Efeito para preencher o formulário com dados do usuário se estiver em modo de edição
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const updatedUser = { ...user, name, email };
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          updatedUser
        );
        updateUser(updatedUser);
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        alert("Ocorreu um erro ao atualizar o usuário.");
      }
    } else {
      const newUser = { id: Math.random(), name, email }; // ID gerado aleatoriamente
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          newUser
        );
        addUser({ ...newUser, id: response.data.id });
      } catch (error) {
        console.error("Erro ao adicionar o usuário:", error);
        alert("Ocorreu um erro ao adicionar o usuário.");
      }
    }

    onClose(); // Fecha o formulário após a ação
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{user ? "Update" : "Add"} User</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
