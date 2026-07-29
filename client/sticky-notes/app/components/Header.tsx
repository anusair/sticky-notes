"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

function Header() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get("http://localhost:3000/api/users/me", {
        withCredentials: true,
      });

      const user = await response.data.user;

      console.log(user);
      setUser(user);
    }

    fetchUser();
  }, []);
  return <div className="text-white">welcome {user?.name} 👋</div>;
}

export default Header;
