import { UserInterface, getMe } from "@/actions/auth-action";
import { ReactNode, createContext, useState, useEffect } from "react";

// Define the AuthInfoInterface
interface AuthInfoInterface {
  isLoading: boolean;
  user: UserInterface | null;
}

// Create the AuthContext
export const AuthContext = createContext<AuthInfoInterface | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getMe(); // Assuming getMe() fetches user data based on token
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const authInfo: AuthInfoInterface = {
    isLoading,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
