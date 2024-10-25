import React, { useEffect } from "react";
import styles from "../styles/UserAccount.module.css";
import {
  BsFillBagCheckFill,
  BsFillChatTextFill,
  BsFillGeoAltFill,
  BsFillPersonFill
} from "react-icons/bs";
import Order from "../components/Order";
import Profile from "../components/Profile";
import Customer from "../components/CustomerMenu";
import Addresses from "../components/Addresses";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../Redux/UserAuth/userAuth.actions";
import { addToCart } from "../../../Redux/Cart/cart.actions";
import { useNavigate } from "react-router-dom";
import withLayout from "../../../Hooks/WithAccountLayout";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
// const arr = JSON.parse(localStorage.getItem("orderItem")) || [];

const initialFormState = {
  name: "",
  gender: "",
  email: "",
  mob: ""
};
function UserAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = React.useState(initialFormState);
  const [formDisabled, setFormDisabled] = React.useState({
    id: 0,
    isDisabled: true
  });
  // const allUsers = React.useMemo(() => [], []);
  // const listAllUsers = React.useCallback(
  //   async (nextPageToken) => {
  //     const res = { user: [] };
  //     allUsers.push(...res.users);
  //     if (res.pageToken) {
  //       await listAllUsers(res.pageToken);
  //     }
  //   },
  //   [allUsers]
  // );

  // useEffect(() => {
  //   // listAllUsers();
  //   // console.log(allUsers);
  // }, [allUsers]);

  const handleLogout = () => {
    localStorage.setItem("userInfoF", null);
    dispatch(userLogout());
    dispatch(addToCart([]));
    localStorage.removeItem("address");
    localStorage.removeItem("orderItem");
    window.location.reload();
  };

  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  React.useEffect(() => {
    setForm({ ...userData });
  }, [userData]);

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
                  <button className="px-14 py-2 bg-[#f61571] text-white font-bold uppercase">
                    Save
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 items-start mt-10">
        <button className=" text-blue-500  text-sm font-bold">
          Deactivate Account
        </button>
        <button className=" text-[#f61571] text-sm font-bold">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default withLayout(UserAccount);
