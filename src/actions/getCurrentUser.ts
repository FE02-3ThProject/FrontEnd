import { useEffect, useState } from "react";
import axios from "axios";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const sessionResponse = await axios.get("/api/auth/session");
        const session = sessionResponse.data;

        if (!session?.user?.email) {
          setCurrentUser(null);
          return;
        }

        const userResponse = await axios.get(
          `/api/user?email=${session.user.email}`
        );
        const user = userResponse.data;
        setCurrentUser({
          ...user,
          createdAt: new Date(user.createdAt).toISOString(),
          updatedAt: new Date(user.updatedAt).toISOString(),
        });
      } catch (error) {
        setCurrentUser(null);
      }
    }

    fetchCurrentUser();
  }, []);

  return currentUser;
}
