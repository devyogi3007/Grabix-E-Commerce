import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getDocument } from "../../../Helpers/firebaseHelper";
import { adminLogin } from "../../../Redux/AdminAuth/adminAuth.actions";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("adminInfo")) || {});
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      let res = await signInWithEmailAndPassword(auth, data.email, data.password);
      const { uid } = res?.user;
      const user = await getDocument("users", uid).then((data) => {
        return data;
      });
      const logedinUser = { ...res?.user, ...user };
      if (res?.user) {
        // setUser(res.data.user);
        setToken(logedinUser);
        localStorage.setItem("adminInfo", JSON.stringify(logedinUser));
        toast.success("Login");
        if (logedinUser?.role?.id === 1) {
          // setLoading(false);
          navigate("/pannel/dashboard");
        }
        navigate("/pannel/dashboard");
        return;
      }
      throw new Error(res.message);
      // dispatch(adminLogin(logedinUser));

    } catch (error) {
      // setLoading(false);
      toast.warn("SignIn Failed!", error.message);
      console.log(error.message);
      // setError(error);
    }
  };

  const logOut = () => {
    // setUser(null);
    setToken({});
    localStorage.removeItem("adminInfo");
    navigate("/pannel/login");
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};