import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === "object" && parsedUser !== null) {
          setUser(parsedUser);
        } else {
          console.warn("Invalid user data in localStorage. Resetting.");
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) {
      console.warn("Login called with invalid data.");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
