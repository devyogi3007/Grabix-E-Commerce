import * as React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../admin/firebase";

const initialFormState = {
  name: "",
  mobile: "",
  pincode: "",
  locality: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  alternatePhone: "",
  addressType: ""
};

const AddressForm = ({
  setFormOpen,
  mode,
  rowData,
  user,
  setRefreshDataCounter
}) => {
  const [formData, setFormData] = React.useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    // if (!category.name || !category.route || !category.description) {
    // //   setError("All fields are required");
    //   return;
    // }

    if (mode === 2) {
      try {
        await updateDoc(doc(db, "customer-addresses", rowData.id), {
          ...formData,
          uId: user?.id
        }).then((value) => {
          setFormData(initialFormState);
          setRefreshDataCounter();
        });
        setFormData(initialFormState);
        setRefreshDataCounter();
      } catch (error) {
        console.error("Error updating document: ", e);
        // setError("Error updating category");
      }
    }
    if (mode === 1) {
      try {
        const docRef = await addDoc(collection(db, "customer-addresses"), {
          ...formData,
          uId: user?.id
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear fields after successful submission
        setFormData(initialFormState);
        setRefreshDataCounter();

        //
      } catch (e) {
        console.error("Error adding document: ", e);
        // setError("Error adding category");
      }
    }
  };

  React.useEffect(() => {
    if (mode === 2) {
      setFormData(rowData);
    }
  }, [mode, rowData]);

  return (
    <div className="flex flex-col gap-3 py-5">
      <p className="text-[#f61571] uppercase font-semibold text-sm">
        {mode === 1 ? "Add a new" : "Edit"} address
      </p>
      <div className="w-2/3 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.name}
            name="name"
            size="small"
            className="bg-white"
            label="Name"
          />
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.mobile}
            name="mobile"
            size="small"
            className="bg-white"
            label="10-digit mobile number"
          />
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.pincode}
            name="pincode"
            size="small"
            className="bg-white"
            label="Pincode"
          />
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.locality}
            name="locality"
            size="small"
            className="bg-white"
            label="Locality"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <TextField
            multiline
            className="bg-white"
            rows={4}
            label="Address (Area and Street)"
            variant="outlined"
            onChange={handleChange}
            value={formData.address}
            name="address"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            className="bg-white"
            size="small"
            label="City/District/Town"
            variant="outlined"
            onChange={handleChange}
            value={formData.city}
            name="city"
          />
          <TextField
            className="bg-white"
            size="small"
            label="State"
            variant="outlined"
            onChange={handleChange}
            value={formData.state}
            name="state"
          />
          <TextField
            className="bg-white"
            size="small"
            label="Landmark (Optional)"
            variant="outlined"
            onChange={handleChange}
            value={formData.landmark}
            name="landmark"
          />
          <TextField
            className="bg-white"
            size="small"
            label="Alternate Phone (Optional)"
            variant="outlined"
            onChange={handleChange}
            value={formData.alternatePhone}
            name="alternatePhone"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="text-xs font-medium text-gray-300"
            >
              Address Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
            >
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
              <FormControlLabel value="Work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="flex gap-5">
        <button
          type="submit"
          className="px-14 py-3 bg-[#f61571] text-white font-bold uppercase"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button type="button" onClick={() => setFormOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
