import { useEffect, useState } from "react";
import Login from "./Login";
import Main from "./Main";
export default function Home() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return <div>{user ? <Main /> : <Login />}</div>;
}
