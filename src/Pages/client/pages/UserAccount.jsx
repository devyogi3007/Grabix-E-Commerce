import React, { useEffect } from "react";
// import styles from "../styles/UserAccount.module.css";
// import {
//   BsFillBagCheckFill,
//   BsFillChatTextFill,
//   BsFillGeoAltFill,
//   BsFillPersonFill
// } from "react-icons/bs";
// import Order from "../components/Order";
// import Profile from "../components/Profile";
// import Customer from "../components/CustomerMenu";
// import Addresses from "../components/Addresses";
import { auth, db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
// import {
//   userLogin,
//   userLogout
// } from "../../../Redux/UserAuth/userAuth.actions";
// import { addToCart } from "../../../Redux/Cart/cart.actions";
// import { useNavigate } from "react-router-dom";
import withLayout from "../../../Hooks/WithAccountLayout";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";
import { getDocument } from "../../../Helpers/firebaseHelper";
// const arr = JSON.parse(localStorage.getItem("orderItem")) || [];

const initialFormState = {
  name: "",
  gender: "",
  email: "",
  mob: ""
};
function UserAccount() {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState(initialFormState);
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);
  const [formDisabled, setFormDisabled] = React.useState({
    id: 0,
    isDisabled: true
  });

  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  const auth = getAuth();

  // console.log(auth);

  const headers = [
    {
      id: 1,
      title: "Personal Information",
      selector: "personal",
      mode: "edit"
    },
    {
      id: 2,
      title: "Email Address",
      selector: "email",
      mode: "edit"
    },
    {
      id: 3,
      title: "Mobile Number",
      selector: "mobile",
      mode: "edit"
    }
  ];
  const formFields = [
    {
      id: 1,
      name: "name",
      label: "Name",
      type: "text",
      selector: "personal"
    },
    {
      id: 2,
      name: "gender",
      label: "Your Gender",
      type: "radio",
      selector: "personal",
      options: [
        {
          key: "Male",
          value: "Male"
        },
        {
          key: "Female",
          value: "Female"
        }
      ]
    },
    {
      id: 3,
      name: "mob",
      label: "Mobile Number",
      selector: "mobile",
      type: "text"
    },
    {
      id: 4,
      name: "email",
      label: "Email Address",
      selector: "email",
      type: "text"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchCustomerData = React.useCallback(
    async (id) => {
      const docRef = await getDocument("customers", id);
      // setData(docRef);
      setForm({ ...userData, ...docRef });
      // dispatch(userLogin({ ...userData, ...docRef }));
    },
    [userData]
  );

  // const handleLogout = React.useCallback(() => {
  //   localStorage.setItem("userInfoF", null);
  //   dispatch(userLogout());
  //   dispatch(addToCart([]));
  //   localStorage.removeItem("address");
  //   localStorage.removeItem("orderItem");
  //   localStorage.removeItem("cart");
  //   window.location.reload();
  // }, [dispatch]);

  const handleSave = async (header) => {
    if (header.selector === "email") {
      await updateEmail(auth.currentUser, form.email)
        .then(() => {
          // Email updated!
          console.log("email updated");
          // ...
        })
        .catch((error) => {
          // An error occurred
          console.log(error);
          // ...
        });
    }
    try {
      await updateDoc(doc(db, "customers", userData?.id), {
        ...form
        // uId: user?.id
      }).then((value) => {
        // setForm(initialFormState);
        setRefreshDataCounter((prev) => prev + 1);
        setFormDisabled({
          id: 0,
          isDisabled: true
        });
      });
      setRefreshDataCounter((prev) => prev + 1);
      // setForm(initialFormState);
      // setRefreshDataCounter();
    } catch (error) {
      console.error("Error updating document: ", error);
      // setError("Error updating category");
    }
  };

  const onDeactivateAccount = async () => {
    try {
      await updateDoc(doc(db, "customers", userData?.id), {
        accountStatus: "inactive"
        // uId: userData?.id
      }).then((value) => {
        // setForm(initialFormState);
        setRefreshDataCounter((prev) => prev + 1);
        setFormDisabled({
          id: 0,
          isDisabled: true
        });
      });
      setRefreshDataCounter((prev) => prev + 1);
      // setForm(initialFormState);
      // setRefreshDataCounter();
    } catch (error) {
      console.error("Error updating document: ", error);
      // setError("Error updating category");
    }
  };

  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchCustomerData(userData?.id);
    }
    // setForm({ ...userData });
    //  else {
    // }
  }, [dispatch, fetchCustomerData, refreshDataCounter, userData?.id]);

  // React.useEffect(() => {
  //   if (form.email !== userData.email) {
  //     // fetchCustomerData(userData?.id);
  //     // setForm({ ...data });
  //     handleLogout();
  //   }
  // }, [data, form.email, handleLogout, refreshDataCounter, userData]);

  return (
    <div className="w-full bg-white p-5 h-[100vh]">
      <div className="flex flex-col gap-5">
        {headers.map((header) => {
          return (
            <>
              <div className="flex gap-5 items-end">
                <p className="text-lg font-bold">{header.title}</p>
                {header.mode && (
                  <button
                    onClick={() => {
                      setFormDisabled((prev) => ({
                        id: header.id,
                        isDisabled:
                          prev?.id === header.id ? !prev?.isDisabled : false
                      }));
                    }}
                    className="text-sm font-semibold text-[#f61571] pb-[.15rem]"
                  >
                    {formDisabled.id === header.id && !formDisabled.isDisabled
                      ? "Cancel"
                      : "Edit" || "Edit"}
                  </button>
                )}
              </div>
              <div className="flex gap-5 items-center">
                {formFields
                  .filter((field) => field.selector === header.selector)
                  .map((field) => {
                    if (field.type === "text") {
                      return (
                        <TextField
                          variant="outlined"
                          onChange={handleChange}
                          value={form[field.name] || ""}
                          name={field.name}
                          size="small"
                          className="bg-white w-1/3"
                          label={field.label}
                          disabled={
                            formDisabled.id === header.id
                              ? formDisabled.isDisabled
                              : true
                          }
                        />
                      );
                    }
                    if (field.type === "radio") {
                      return (
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="text-xs font-medium text-gray-300"
                            disabled={
                              formDisabled.id === header.id
                                ? formDisabled.isDisabled
                                : true
                            }
                          >
                            {field.label}
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            disabled={
                              formDisabled.id === header.id
                                ? formDisabled.isDisabled
                                : true
                            }
                          >
                            {field?.options.map((option) => (
                              <FormControlLabel
                                value={option.value}
                                control={
                                  <Radio
                                    disabled={
                                      formDisabled.id === header.id
                                        ? formDisabled.isDisabled
                                        : true
                                    }
                                  />
                                }
                                label={option.key}
                                key={option.key}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      );
                    }
                    return <></>;
                  })}
                {formDisabled.id === header.id && !formDisabled.isDisabled && (
                  <button
                    onClick={() => handleSave(header)}
                    className="px-14 py-2 bg-[#f61571] text-white font-bold uppercase"
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 items-start mt-10">
        <button
          onClick={onDeactivateAccount}
          className=" text-blue-500  text-sm font-bold"
        >
          Deactivate Account
        </button>
        <button
          disabled
          className=" text-[#f61571] disabled:text-gray-300 text-sm font-bold disabled:cursor-not-allowed"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default withLayout(UserAccount);
