import { createContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize default user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const defaultEmail = 'shaikkhatija9999@gmail.com';
    
    if (!users.some(u => u.email === defaultEmail)) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('Khatija@123', salt);
      users.push({
        name: 'Khatija',
        email: defaultEmail,
        passwordHash: hash,
        picture: 'https://via.placeholder.com/30'
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const loginWithCredentials = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const isMatch = bcrypt.compareSync(password, foundUser.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const userData = {
      name: foundUser.name || 'User',
      email: foundUser.email,
      picture: foundUser.picture || 'https://via.placeholder.com/30'
    };
    login(userData);
    return userData;
  };

  const registerWithCredentials = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      throw new Error("Email already registered");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      name: name || 'User',
      email,
      passwordHash: hash,
      picture: 'https://via.placeholder.com/30'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userData = { name: newUser.name, email: newUser.email, picture: newUser.picture };
    login(userData);
    return userData;
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithCredentials, registerWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};
