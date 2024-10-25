import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./profile.scss";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { getDocument } from "../../../../Helpers/firebaseHelper";
import { useParams } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  userName: "",
  role: { id: 2, name: "Vendor" },
  email: "",
  emailVerified: false,
  phoneNo: "",
  panCard: "",
  storeName: "",
  storeAddress: "",
  bankDetails: {
    bankName: "",
    branch: "",
    ifscCode: "",
    accountNumber: ""
  },
  locationLink: "",
  city: "",
  pincode: "",
  authDetails: {
    provider: "",
    authDomain: "",
    apiKey: "",
    createdAt: "",
    lastLoginAt: "",
    expirationTime: "",
    isAnonymous: false
  }
};

const initialUserState = {
  storeName: "",
  lastName: "",
  role: {
    id: 2,
    name: "Vendor"
  },
  bankName: "",
  city: "",
  userName: "",
  ifscCode: "",
  storeAddress: "",
  locationLink: "",
  branch: "",
  firstName: "",
  panCard: "",
  phoneNo: "",
  pincode: "",
  accountNumber: "",
  id: "",
  email: ""
};

const formFields = [
  { label: "First Name", name: "firstName", category: "basicInfo" },
  { label: "Last Name", name: "lastName", category: "basicInfo" },
  { label: "Username", name: "userName", category: "basicInfo" },
  { label: "Email", name: "email", category: "basicInfo" },
  { label: "Phone Number", name: "phoneNo", category: "basicInfo" },
  { label: "PAN Card", name: "panCard", category: "basicInfo" },
  { label: "City", name: "city", category: "basicInfo" },
  { label: "Pincode", name: "pincode", category: "basicInfo" },
  { label: "Store Name", name: "storeName", category: "storeInfo" },
  { label: "Store Address", name: "storeAddress", category: "storeInfo" },
  { label: "Bank Name", name: "bankName", category: "bankInfo" },
  { label: "Branch", name: "branch", category: "bankInfo" },
  { label: "IFSC Code", name: "ifscCode", category: "bankInfo" },
  { label: "Account Number", name: "accountNumber", category: "bankInfo" }
];
const Profile = ({ vendor = false }) => {
  const { token: user } = useAuth();

  const { userId } = useParams();

  const [form, setForm] = React.useState(
    vendor ? initialUserState : initialFormState || {}
  );

  React.useEffect(() => {
    if (!vendor && user) {
      setForm(user);
    }
    if (vendor) {
      getDocument("users", userId).then((data) => {
        setForm(data);
      });
    }
  }, [user, userId, vendor]);

  console.log(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };
  return (
    <div className="flex flex-col gap-5 px-5 text-center">
      <p className="text-[#7451f8] font-bold text-xl">
        {vendor ? "Vendor" : "User"} Profile
      </p>
      <div className="shadow-lg rounded-xl relative flex flex-col justify-center">
        <div className="h-[10rem] bg-[#ece8ff] rounded-t-xl"></div>
        <div className="h-[2.5rem]"></div>
        <div className="rounded-full h-[8rem] w-[8rem] border-4 border-white absolute bg-slate-300 bottom-2 left-[50%] centered "></div>
        <div className="rounded-full h-[2rem] w-[2rem] absolute border px-1 bg-white bottom-4 left-[54.5%] centered shadow-lg">
          <div
            className="text-[#7451f8] cursor-pointer"
            // onClick={() => handleEdit(params)}
          >
            <EditIcon />
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-xl relative">
        <div className="w-full flex">
          <p className="bg-[#7451f8] text-white rounded-t-lg font-bold text-xl border-[#7451f8] border-b w-full px-5 py-3">
            Basic Information
          </p>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          {formFields
            .filter((item) => item.category === "basicInfo")
            .map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ))}
          {/* <a
            className="text-[#007bff] hover:text-[#8ac3ff]"
            href={form.locationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location on Map
          </a> */}
          <div></div>
          <div></div>
          <div></div>
          <div className="flex gap-5 justify-end">
            {/* <Button type="submit" variant="outlined" color="secondary">
              Cancel
            </Button> */}
            <Button
              type="button"
              // onClick={handleSubmit}
              variant="contained"
              color="primary"
              // className="bg-[#7451f8]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-xl relative">
        <div className="w-full flex">
          <p className="bg-[#7451f8] text-white rounded-t-lg font-bold text-xl border-[#7451f8] border-b w-full px-5 py-3">
            Store Information
          </p>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          {formFields
            .filter((item) => item.category === "storeInfo")
            .map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
              />
            ))}
          {/* <a
            className="text-[#007bff] hover:text-[#8ac3ff]"
            href={form.locationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location on Map
          </a> */}
          {/* <div></div>
          <div></div> */}
          <div></div>
          <div className="flex gap-5 justify-end">
            {/* <Button type="submit" variant="outlined" color="secondary">
              Cancel
            </Button> */}
            <Button
              type="button"
              // onClick={handleSubmit}
              variant="contained"
              color="primary"
              // className="bg-[#7451f8]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-xl relative mb-5">
        <div className="w-full flex">
          <p className="bg-[#7451f8] text-white rounded-t-lg font-bold text-xl border-[#7451f8] border-b w-full px-5 py-3">
            Bank Details
          </p>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          {formFields
            .filter((item) => item.category === "bankInfo")
            .map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ))}
          {/* <a
            className="text-[#007bff] hover:text-[#8ac3ff]"
            href={form.locationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location on Map
          </a> */}
          {/* <div></div>
          <div></div> */}
          <div></div>
          <div className="flex gap-5 justify-end">
            {/* <Button type="submit" variant="outlined" color="secondary">
              Cancel
            </Button> */}
            <Button
              type="button"
              // onClick={handleSubmit}
              variant="contained"
              color="primary"
              // className="bg-[#7451f8]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
