import {createContext, ReactNode, useState} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextData {
  token: unknown;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(() => {
    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens')!);
      return tokens.token;
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (token: string) => {
    localStorage.setItem('tokens', JSON.stringify({token}));
    setToken(token);
    navigate('/kanban');
    navigate(0);
  }

  const logout = async () => {
    localStorage.removeItem('tokens');
    setToken(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;