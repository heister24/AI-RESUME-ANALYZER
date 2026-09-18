import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Profile;
