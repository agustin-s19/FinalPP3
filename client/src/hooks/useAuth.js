import { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export function useAuthState() {
  const [user, updateUser] = useState(null);

  useEffect(() => {
    (async function() {
        const token = localStorage.getItem('token')

        if (token) {
            const response = await axios.post('http://localhost:5000/api/auth/me', { token })

            if (response && response.data && response.data.email) {
                updateUser(response.data)
            } else {
                updateUser(null)
            }
        } else {
            updateUser(null)
        }
    })()
  }, [])

  const setToken = (payload) => {
    localStorage.setItem('token', payload.accessToken)
  }

  const logout = () => {
      localStorage.removeItem('token')
      updateUser(null)
  }

  return {
    user,
    setToken,
    logout
  };
}

export function useAuth() {
  const user = useContext(AuthContext);

  return user;
}
