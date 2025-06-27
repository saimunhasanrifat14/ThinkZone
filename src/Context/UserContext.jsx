import { createContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// Create Context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getDatabase();
  const auth = getAuth();

  /**
   * todo : Data fetch from users database
   * @param (null)
   * @description : This function fetches the data from the users database and sets it to the userList state.
   */
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let data = {};
        snapshot.forEach((item) => {
          if (auth.currentUser?.uid === item.val().uid) {
            data = { ...item.val(), userkey: item.key };
          }
        });
        setUser(data);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
