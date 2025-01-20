import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    setTimeout(() => {
      console.log(localStorage.getItem("token")); // Log token after a short delay
    }, 2000); // Delay for half a second

    enqueueSnackbar("Logged Out Successfully", { variant: "success" });
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="m-2 items-center text-center bg-slate-300 hover:bg-black hover:text-white px-5 py-2 rounded-md hover:transition-all duration-200 ease-in-out fixed right-4"
    >
      LogOut
    </button>
  );
};

export default Logout;
