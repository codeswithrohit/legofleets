import React,{useState,useEffect} from 'react'
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push("/Admin/adminlogin");
    } else {
    }
  }, [router]);
  return (
    <div>index</div>
  )
}

export default index