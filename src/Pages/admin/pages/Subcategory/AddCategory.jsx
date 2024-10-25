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
  FormLabel
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
  const {
    categoryId: searchcategoryId,
    parentCategoryId: searchParentCategoryId
  } = useParams();
  const navigate = useNavigate();

  //states
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [parentCategory, setParentCategory] = useState([]);
  const [catId, setCatId] = useState([]);
  const [open, setOpen] = useState({ isOpen: false });
  const [refreshDataCounter, setRefreshDataCounter] = useState(0);

  const handleOpen = (mode) => setOpen({ isOpen: true, mode });
  const handleDelete = (id) => {
    handleOpen(3);
    setCatId(id);
  };
  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "categories", catId)).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

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
          parentCategoryId: searchParentCategoryId || "0"
        }).then((value) => {
          setCategory(initialCategory);
          navigate("/admin/category");
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
          parentCategoryId: searchParentCategoryId || "0"
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear fields after successful submission
        setCategory(initialCategory);

        navigate("/admin/category");
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

  const handleClose = React.useCallback(() => {
    setOpen({ isOpen: false });
  }, []);
  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchCategoriesList();
      handleClose();
    }
  }, [handleClose, refreshDataCounter]);

  return (
    <div className="h-full overflow-hidden relative">
      <p className="text-[#7451f8] font-bold text-xl mb-5">
        {mode === 1 && "Add New "}
        {mode === 2 && "Edit "} category
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
          {/* <div className="w-full">
            <p className="border-b border-black w-full my-3">
              Grabix comission Policy Settings
            </p>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Is Condition Based
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={category.commissionBasedFlag}
              onChange={(e) => {
                console.log(category.commissionBasedFlag);
                setCategory((prev) => {
                  return {
                    ...prev,
                    commissionBasedFlag: e.target.value
                  };
                });
              }}
            >
              <FormControlLabel value={"yes"} control={<Radio />} label="yes" />
              <FormControlLabel value={"no"} control={<Radio />} label="no" />
            </RadioGroup>
            <div>
              {category.commissionBasedFlag === "no" && (
                <div className="w-full flex gap-4">
                  <TextField
                    label="Grabix Commission Type"
                    variant="outlined"
                    margin="normal"
                    value={category.comissionType}
                    onChange={(e) => {
                      setCategory((prev) => {
                        return {
                          ...prev,
                          comissionType: e.target.value
                        };
                      });
                    }}
                    fullWidth
                  />
                  <TextField
                    label="Grabix Commission"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={category.comission}
                    onChange={(e) => {
                      setCategory((prev) => {
                        return {
                          ...prev,
                          comission: e.target.value
                        };
                      });
                    }}
                    fullWidth
                  />
                </div>
              )}
              {category.commissionBasedFlag === "yes" && (
                <>
                  <TextField
                    label="Grabix Commission Type"
                    variant="outlined"
                    margin="normal"
                    value={category.comissionType}
                    onChange={(e) => {
                      setCategory((prev) => {
                        return {
                          ...prev,
                          comissionType: e.target.value
                        };
                      });
                    }}
                    fullWidth
                  />
                  <TextField
                    label="Grabix Commission"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={category.comission}
                    onChange={(e) => {
                      setCategory((prev) => {
                        return {
                          ...prev,
                          comission: e.target.value
                        };
                      });
                    }}
                    fullWidth
                  />
                  <div className="flex gap-3">
                    <TextField
                      label="Grabix Product Amount"
                      variant="outlined"
                      margin="normal"
                      value={category.comissionType}
                      onChange={(e) => {
                        setCategory((prev) => {
                          return {
                            ...prev,
                            comissionType: e.target.value
                          };
                        });
                      }}
                      fullWidth
                    />
                    <p>Greater Than =</p>
                    <TextField
                      label="Grabix Commission"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      value={category.comission}
                      onChange={(e) => {
                        setCategory((prev) => {
                          return {
                            ...prev,
                            comission: e.target.value
                          };
                        });
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="flex gap-3">
                    <TextField
                      label="Grabix Commission Type"
                      variant="outlined"
                      margin="normal"
                      value={category.comissionType}
                      onChange={(e) => {
                        setCategory((prev) => {
                          return {
                            ...prev,
                            comissionType: e.target.value
                          };
                        });
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Grabix Commission"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      value={category.comission}
                      onChange={(e) => {
                        setCategory((prev) => {
                          return {
                            ...prev,
                            comission: e.target.value
                          };
                        });
                      }}
                      fullWidth
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {mode === 2 && category?.parentCategoryId === "0" && (
            <div class="flex w-full pb-3">
              <div className="w-full h-full">
                <p className="text-[#7451f8] font-bold text-md mb-2">
                  Sub categories
                </p>
                <div className="flex gap-6 items-center  flex-wrap">
                  <Link to={`/admin/category/new/${searchcategoryId}`}>
                    <div class="w-[200px] h-[250px] shadow-md border hover:border-black rounded-sm  flex items-center justify-center text-center">
                      <AddIcon />
                      Add Sub Category
                    </div>
                  </Link>
                  {parentCategory
                    ?.filter(
                      (sub) => sub?.parentCategoryId === searchcategoryId
                    )
                    ?.map((sub) => (
                      <div class="w-[200px] shadow-md h-[250px] border hover:border-black rounded-sm flex flex-col justify-between">
                        <div className="w-full flex justify-center">
                          <img
                            src={sub?.image}
                            alt=""
                            className="w-[100px] h-[100px] mt-3 object-contain"
                            style={{ maxWidth: 350 }}
                          />
                        </div>
                        <div className="border-b" />
                        <p className="font-bold my-3 text-center px-2">
                          {sub?.name}
                        </p>
                        <div className="flex bg-neutral-50 justify-around items-center py-2">
                          <Link to={`/admin/category/edit/${sub?.id}`}>
                            <p className="px-3 py-2">
                              <EditIcon />
                            </p>
                          </Link>

                          <p
                            onClick={() => handleDelete(sub?.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <DeleteIcon />
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div className="w-full flex gap-5 items-center absolute bottom-0 right-0">
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          component={Link}
          to={
            searchParentCategoryId || category?.parentCategoryId !== "0"
              ? `/admin/category/edit/${
                  searchParentCategoryId || category?.parentCategoryId
                }`
              : "/admin/category"
          }
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
      {/* <BasicModal open={open.isOpen} handleClose={handleClose}>
        {open.mode === 3 && (
          <div className="px-5">
            <p className="text-[#7451f8] font-bold text-md">
              Are you sure you want to delete this sub category ?
            </p>
            <div className="w-full flex justify-between mt-5">
              <button
                className="border px-3 py-2 rounded-md disabled:text-gray-500 disabled:border-gray-500 text-white bg-red-600 border-red-600"
                type="submit"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="border px-3 py-2 rounded-md disabled:text-gray-500 disabled:border-gray-500 text-[#7451f8] border-[#7451f8]"
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </BasicModal> */}
    </div>
  );
};

export default AddCategory;
