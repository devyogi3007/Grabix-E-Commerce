import { Button, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDocument } from "../../../../Helpers/firebaseHelper";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AddEditUnit = ({ mode, module = "Unit", setRefreshDataCounter }) => {
  const { id: moduleId } = useParams();
  const navigate = useNavigate();
  const [moduleDetails, setModuleDetails] = React.useState({});

  const moduleRoute = module === "Unit" ? "units" : "attributes";

  React.useEffect(() => {
    if (mode === 2) {
      getDocument(moduleRoute, moduleId).then((data) => {
        setModuleDetails({
          ...data
        });
      });
    }
  }, [mode, moduleId, moduleRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs
    if (!moduleDetails.name) {
      // setError("All fields are required");
      return;
    }

    if (mode === 2) {
      try {
        await updateDoc(doc(db, "products", moduleRoute), {
          ...moduleDetails
        }).then((value) => {
          setModuleDetails({ name: "" });
          navigate(`/admin/${moduleRoute}`);
        });
        setModuleDetails({ name: "" });
      } catch (error) {
        console.error("Error updating document: ", e);
        // setError("Error updating product");
      }
    }
    if (mode === 1) {
      try {
        const docRef = await addDoc(collection(db, moduleRoute), {
          ...moduleDetails
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear fields after successful submission
        setModuleDetails({ name: "" });
        setRefreshDataCounter((prev) => ++prev);
      } catch (e) {
        console.error("Error adding document: ", e);
        // setError("Error adding product");
      }
    }
  };
  return (
    <div>
      <p className="text-[#7451f8] font-bold text-xl mb-5">
        {mode === 1 && "Add New "}
        {mode === 2 && "Edit "} {module}
      </p>
      <div>
        <TextField
          label={`${module} Name`}
          variant="outlined"
          margin="normal"
          value={moduleDetails.name}
          onChange={(e) => {
            setModuleDetails((prev) => {
              return {
                ...prev,
                name: e.target.value
              };
            });
          }}
          fullWidth
        />
        <div className="mt-5 w-full flex gap-5 items-center justify-end">
          {mode === 2 && (
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              component={Link}
              to={`/admin/${moduleRoute}`}
            >
              Cancel
            </Button>
          )}
          {mode === 1 && (
            <Button variant="outlined" color="secondary">
              Reset
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditUnit;
