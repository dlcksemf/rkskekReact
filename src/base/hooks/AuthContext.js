import { createContext, useCallback, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

const AuthContext = createContext();

function AuthProvider({ children }) {
  // 공유할 상탯값을 정의
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({ access, refresh, user_num, is_staff, username, nickname }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        user_num,
        is_staff,
        username,
        nickname,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  // 하위 컴포넌트에서 공유할 값/함수들을 value로 지정합니다.

  return (
    <AuthContext.Provider value={[auth, setAuth, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
