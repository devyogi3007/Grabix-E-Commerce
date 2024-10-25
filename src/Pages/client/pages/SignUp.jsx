import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "@firebase/auth";
import { auth } from "../../../firebase";
import React, { useState } from "react";
import styles from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../Redux/UserAuth/userAuth.actions";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../admin/firebase";

const initialFormState = {
  name: "",
  mob: "",
  email: "",
  password: "",
  cnfPassword: ""
};
function SignUp() {
  const [form, setForm] = useState(initialFormState || {});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const signUp = async (e) => {
    const { email, password, cnfPassword, ...rest } = form;
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    if (password !== cnfPassword) {
      setError("Password dosen't match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address!");
      return;
    }

    if (password.length < 7) {
      setError("Password must be atleast 7 characters long!");
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      const user = res.user;
      const uid = user.uid;
      if (uid) {
        console.log(uid);
        const docRef = await setDoc(doc(db, "customers", uid), {
          ...rest,
          email,
          role: {
            id: 3,
            name: "Customer"
          }
        });
        console.log("Document written with ID: ", docRef);
      }
      dispatch(userLogin(res.user));
      localStorage.setItem("userInfoF", JSON.stringify(res.user));
      toast.success("Signup Successfully Done!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.warn("Signup Failed!", error.message);
      console.log(error);
      setError(error);
    }
  };

  const handleGoogle = async () => {
    try {
      let res = await signInWithPopup(auth, provider);
      dispatch(userLogin(res.user));
      localStorage.setItem("userInfoF", JSON.stringify(res.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
      className: "form-input name-field"
    },
    {
      name: "mob",
      label: "Mobile Number",
      type: "text",
      placeholder: "Enter your mobile number",
      required: true,
      className: "form-input mob-field"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      className: "form-input email-field"
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      className: "form-input password-field"
    },
    {
      name: "cnfPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      required: true,
      className: "form-input cnf-password-field"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  React.useEffect(() => {
    if (userData?.uid) {
      navigate("/");
    }
  }, [navigate, userData?.uid]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading!!</div>
      ) : (
        <form onSubmit={signUp} className="overflow-scroll max-h-[90vh]">
          <h1>Create your account</h1>

          {formFields.map((field) => (
            <input
              className={styles.Input}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          ))}

          {error && (
            <div className={styles.error}>
              {"* "}
              {error}
            </div>
          )}

          <div className={styles.signupBox}>
            <p>
              Already a User? <Link to="/login">Login</Link>{" "}
            </p>
          </div>

          <button type="submit" className={styles.signupbtn}>
            Sign Up
          </button>

          <div>
            <h1 className="text-[18px] font-semibold mt-2">Or</h1>
          </div>

          <button
            onClick={handleGoogle}
            type="submit"
            className={styles.signGoogle}
          >
            Sign Up with Google <FcGoogle className="text-[21px]" />
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
