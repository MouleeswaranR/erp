import React, { createContext, useContext, useState,useEffect } from 'react'

export const userContext=createContext();
const AuthContext = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const verifyUser = async () => {
          const token = localStorage.getItem("token");
          try {
              if (token) {
                  setLoading(true); // Set loading true when starting the fetch
                  const res = await axios.get("/api/auth/verify", {
                      headers: {
                          "Authorization": `Bearer ${token}`
                      }
                  });
                  if (res.data.success) {
                      setUser(res.data.user);
                  }
              } else {
                  setUser(null);
              }
          } catch (err) {
              if (err.response && err.response.data.error) {
                  setUser(null);
              }
          } finally {
              setLoading(false);
          }
      };

      verifyUser(); 
  }, []); 

  const login = (user) => {
      setUser(user);
  };

  const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
  };

  return (
      <userContext.Provider value={{user, login, logout, loading}}>
          {children}
      </userContext.Provider>
  );
};
export const useAuth=()=>useContext(userContext)
export default AuthContext;