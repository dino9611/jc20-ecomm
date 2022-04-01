import useUser from "../hooks/useUser";
import axios from "axios";
import { API_URL } from "../helpers";
import { toast } from "react-toastify";

const Profile = (props) => {
  const { isLogin, username, id, email } = useUser();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const sendEmail = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/sendemail-verified`,
        {
          id: id,
          username,
          email,
        },
        config
      );
      toast.success("berhasil kirim email", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("gagal kirim", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <button onClick={sendEmail} className="p-3 bg-emerald-500">
        Send VERIFIED Email AGAIN
      </button>
    </div>
  );
};

export default Profile;
