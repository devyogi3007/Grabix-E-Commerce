// src/categoryForm.js
import React, { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputLabel
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getDocument } from "../../../../Helpers/firebaseHelper";
import { convertToBase64 } from "../../../../Helpers";
import BasicModal from "../../components/modal";

export const locations = [{ id: 1, name: "Pune" }];

const initialCategory = {
  name: "",
  description: "",
  image: null,
  route: ""
};

const AddCategory = ({ mode = 1, route = "category" }) => {
  const { categoryId: searchcategoryId } = useParams();
  const navigate = useNavigate();

  //states
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [parentCategory, setParentCategory] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setCategory((prev) => {
        return {
          ...prev,
          image: base64
        };
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // const handleLocation = (event) => {
  //   setCategory((prev) => {
  //     return {
  //       ...prev,
  //       location: event.target.value
  //     };
  //   });
  // };

  const fetchCategoriesList = async () => {
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setParentCategory(newData);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!category.name || !category.route || !category.description) {
      setError("All fields are required");
      return;
    }

    if (mode === 2) {
      try {
        await updateDoc(doc(db, "categories", searchcategoryId), {
          ...category,
          parentCategoryId:
            route === "category" ? "0" : category?.parentCategoryId
        }).then((value) => {
          setCategory(initialCategory);
          navigate("/panel/category");
        });
        setCategory(initialCategory);
      } catch (error) {
        console.error("Error updating document: ", e);
        setError("Error updating category");
      }
    }
    if (mode === 1) {
      try {
        const docRef = await addDoc(collection(db, "categories"), {
          ...category,
          parentCategoryId:
            route === "category" ? "0" : category?.parentCategoryId
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear fields after successful submission
        setCategory(initialCategory);

        navigate("/panel/category");
      } catch (e) {
        console.error("Error adding document: ", e);
        setError("Error adding category");
      }
    }
  };

  React.useEffect(() => {
    if (mode === 2) {
      getDocument("categories", searchcategoryId).then((data) => {
        setCategory({
          ...initialCategory,
          ...data
        });
        setImagePreview(data?.image);
      });
    }
  }, [mode, searchcategoryId]);

  React.useEffect(() => {
    fetchCategoriesList();
  }, []);

  return (
    <div className="h-full overflow-hidden relative">
      <p className="text-[#7451f8] font-bold text-xl mb-5">
        {mode === 1 && "Add New "}
        {mode === 2 && "Edit "} {route}
      </p>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        onChange={handleImageChange}
      />
      <div className="flex">
        <div className="mx-3">
          {imagePreview && (
            <label htmlFor="upload-button">
              <img
                src={imagePreview}
                alt=""
                className="border-2 rounded w-[250px] h-[250px] object-contain"
                style={{ marginTop: 20, maxWidth: 350 }}
              />
            </label>
          )}
          {!imagePreview && (
            <div
              className="border-2 rounded w-[250px] h-[250px] flex items-center justify-center"
              style={{ marginTop: 20, maxWidth: 350 }}
            >
              <label htmlFor="upload-button">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col border-l-2 px-3 overflow-auto h-[calc(100vh_-_10rem)]">
          <div className="w-full grid grid-cols-2 gap-4 items-start ">
            {route === "category" && (
              <TextField
                label="Category Name"
                variant="outlined"
                margin="normal"
                value={category.name}
                onChange={(e) => {
                  setCategory((prev) => {
                    return {
                      ...prev,
                      name: e.target.value
                    };
                  });
                }}
              />
            )}
            {route === "sub-category" && (
              <>
                <Select
                  labelId="location-select-label"
                  value={category?.userId}
                  label="Select Catefory"
                  onChange={(e) => {
                    setCategory((prev) => {
                      return {
                        ...prev,
                        parentCategoryId: e.target.value
                      };
                    });
                  }}
                  rows={1}
                  fullWidth
                  defaultValue={"select"}
                  className="mt-4"
                >
                  <MenuItem key="select" value={"select"}>
                    Select Category
                  </MenuItem>
                  {(
                    parentCategory.filter(
                      (item) => item.parentCategoryId === "0"
                    ) || []
                  ).map((loc) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="Sub Category Name"
                  variant="outlined"
                  margin="normal"
                  value={category.name}
                  onChange={(e) => {
                    setCategory((prev) => {
                      return {
                        ...prev,
                        name: e.target.value
                      };
                    });
                  }}
                />
              </>
            )}
            <TextField
              label="Route"
              variant="outlined"
              margin="normal"
              value={category.route}
              onChange={(e) => {
                setCategory((prev) => {
                  return {
                    ...prev,
                    route: e.target.value
                  };
                });
              }}
              multiline
            />
            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              value={category.description}
              onChange={(e) =>
                setCategory((prev) => {
                  return {
                    ...prev,
                    description: e.target.value
                  };
                })
              }
              multiline
              rows={4}
            />
            {error && <Typography color="error">{error}</Typography>}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-5 items-center absolute bottom-0 right-0">
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          component={Link}
          to={"/panel/category"}
        >
          Cancel
        </Button>
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
  );
};

export default AddCategory;
