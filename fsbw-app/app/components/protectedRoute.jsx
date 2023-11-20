import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      // Explicitly check for null
      router.push("/"); // Redirect to login or home page
    }
  }, [currentUser, router]);

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return currentUser ? children : null; // Render children if user is authenticated
}
