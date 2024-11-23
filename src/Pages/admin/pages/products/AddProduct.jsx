// src/ProductForm.js
import React, { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs
} from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  OutlinedInput,
  Box,
  Chip,
  Autocomplete
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchModuleList,
  getDocument
} from "../../../../Helpers/firebaseHelper";
import { convertToBase64 } from "../../../../Helpers";
import TagsInput from "../../components/TextInputField/TagsInput";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

export const locations = [{ id: 1, name: "Pune" }];

const initialProduct = {
  name: "",
  price: "",
  description: "",
  limit: "",
  location: "",
  image: null,
  policy: "",
  discount: ""
};

const AddProduct = React.memo((props) => {
  const auth = useAuth();

  const currentUser = auth.token || {};

  const { mode = 1, isAdmin } = props;
  const { productId: searchProductId } = useParams();
  const navigate = useNavigate();
  //states
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [product, setProduct] = useState(initialProduct);
  const [parentCategory, setParentCategory] = useState([]);
  const [stores, setStores] = useState([]);
  const [modules, setModules] = useState({
    units: [],
    attributes: []
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setProduct((prev) => {
        return {
          ...prev,
          image: base64
        };
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleLocation = (event) => {
    setProduct((prev) => {
      return {
        ...prev,
        location: event.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { price, categoryId, parentCategoryId, userId, ...rest } = product;
    // Validate inputs
    if (!product.name || !product.price || !product.description) {
      setError("All fields are required");
      return;
    }

    if (mode === 2) {
      try {
        await updateDoc(doc(db, "products", searchProductId), {
          ...rest,
          price: parseFloat(price),
          price2: parseFloat(finalPrice),
          categoryName:
            parentCategory?.find((cat) => cat.id === categoryId)?.name || "",
          categoryId,
          parentCategoryName:
            parentCategory?.find((cat) => cat.id === parentCategoryId)?.name ||
            "",
          parentCategoryId,
          vId: isAdmin ? product?.userId : currentUser?.id
        }).then((value) => {
          setProduct(initialProduct);
          navigate("/panel/products");
        });
        setProduct(initialProduct);
      } catch (error) {
        console.error("Error updating document: ", e);
        setError("Error updating product");
      }
    }
    if (mode === 1) {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          ...rest,
          price: parseFloat(price),
          price2: parseFloat(finalPrice),
          categoryName:
            parentCategory?.find((cat) => cat.id === categoryId)?.name || "",
          categoryId: categoryId || "",
          parentCategoryName:
            parentCategory?.find((cat) => cat.id === parentCategoryId)?.name ||
            "",
          parentCategoryId: parentCategoryId || "",
          vId: isAdmin ? product?.userId : currentUser?.id
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear fields after successful submission
        setProduct(initialProduct);

        navigate("/panel/products");
      } catch (e) {
        console.error("Error adding document: ", e);
        setError("Error adding product");
      }
    }
  };

  React.useEffect(() => {
    if (mode === 2) {
      getDocument("products", searchProductId).then((data) => {
        setProduct({
          ...initialProduct,
          ...data
        });
        setImagePreview(data?.image);
      });
    }
  }, [mode, searchProductId]);

  React.useEffect(() => {
    fetchModuleList("users", (data) => {
      setStores(data);
    });
    fetchModuleList("categories", (data) => {
      setParentCategory(data);
    });
    fetchModuleList("units", (data) => {
      setModules((prev) => {
        return { ...prev, units: data };
      });
    });
    fetchModuleList("attributes", (data) => {
      setModules((prev) => {
        return { ...prev, attributes: data };
      });
    });
    console.log(product?.userId);
  }, [product?.userId]);

  React.useEffect(() => {
    const price2 =
      product.discountType === "%"
        ? product.price - (product.price * product.discount) / 100
        : product.price - product?.discount;
    setFinalPrice(price2);
  }, [product.discount, product.discountType, product.price]);

  return (
    <div className="h-full overflow-hidden relative">
      <p className="text-[#7451f8] font-bold text-xl mb-5">
        {mode === 1 && "Add New "}
        {mode === 2 && "Edit "} Product
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

        <div className="border-l-2 px-3 w-full items-center h-[calc(100vh_-_10rem)] overflow-auto">
          <p className="border-b mb-2">Product Details</p>
          <TextField
            label="Product Name"
            variant="outlined"
            margin="normal"
            value={product.name}
            onChange={(e) => {
              setProduct((prev) => {
                return {
                  ...prev,
                  name: e.target.value
                };
              });
            }}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  description: e.target.value
                };
              })
            }
            multiline
            rows={2}
            fullWidth
          />

          {isAdmin && (
            <>
              <InputLabel className="mt-3" id="category-label">
                Select Store
              </InputLabel>
              <Select
                labelId="location-select-label"
                value={product?.userId}
                label="Select Store"
                onChange={(e) => {
                  setProduct((prev) => {
                    return {
                      ...prev,
                      userId: e.target.value
                    };
                  });
                }}
                rows={1}
                fullWidth
              >
                <MenuItem key="select" value={undefined}>
                  Select Category
                </MenuItem>
                {(stores || []).map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.storeName}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          <p className="border-b mt-10 mb-5">Category Info</p>
          <InputLabel className="mt-3" id="category-label">
            Select Category
          </InputLabel>
          <Select
            labelId="location-select-label"
            value={product?.parentCategoryId}
            label="Parent category"
            onChange={(e) => {
              setProduct((prev) => {
                return {
                  ...prev,
                  parentCategoryId: e.target.value
                };
              });
            }}
            rows={1}
            fullWidth
          >
            <MenuItem key="select" value={undefined}>
              Select Category
            </MenuItem>
            {(parentCategory || [])
              .filter((item) => item.parentCategoryId === "0")
              .map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
          </Select>
          {product?.parentCategoryId && (
            <>
              <InputLabel className="mt-5" id="category-label">
                Select Sub Category
              </InputLabel>
              <Select
                labelId="location-select-label"
                value={product.categoryId}
                label="Location"
                className="mb-5"
                onChange={(e) => {
                  setProduct((prev) => {
                    return {
                      ...prev,
                      categoryId: e.target.value
                    };
                  });
                }}
                rows={1}
                fullWidth
              >
                <MenuItem key="select" value={undefined}>
                  Select Sub Category
                </MenuItem>
                {(parentCategory || [])
                  .filter(
                    (item) =>
                      item.parentCategoryId === product?.parentCategoryId
                  )
                  .map((loc) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}
          <div className="w-full gap-3 flex items-end">
            <div className="w-1/3">
              <InputLabel className="mt-3" id="category-label">
                Unit
              </InputLabel>
              <Select
                labelId="location-select-label"
                value={product.units}
                label="Location"
                className="w-full"
                onChange={(e) => {
                  setProduct((prev) => {
                    return {
                      ...prev,
                      units: e.target.value
                    };
                  });
                }}
                rows={1}
              >
                <MenuItem key="select" value={undefined}>
                  Select unit
                </MenuItem>
                {(modules.units || []).map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              label="Maximum Purchase Quantity Limit"
              variant="outlined"
              className="w-2/3"
              value={product.limit}
              onChange={(e) => {
                setProduct((prev) => {
                  return {
                    ...prev,
                    limit: e.target.value
                  };
                });
              }}
            />
          </div>

          <p className="border-b mt-10 mb-5">Price Info</p>

          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            value={product.price}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  price: e.target.value
                };
              })
            }
            fullWidth
          />
          <TextField
            label="Total Stock"
            variant="outlined"
            margin="normal"
            value={product.totalstock}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  totalstock: e.target.value
                };
              })
            }
            fullWidth
          />
          <div className="flex gap-5 items-end">
            <div className="w-1/3">
              <InputLabel className="mt-3" id="discount-label">
                Dicsount Type
              </InputLabel>
              <Select
                labelId="discount-label"
                label="discount"
                value={product.discountType}
                onChange={(e) =>
                  setProduct((prev) => {
                    return {
                      ...prev,
                      discountType: e.target.value
                    };
                  })
                }
                rows={1}
                fullWidth
              >
                <MenuItem key="10" value={undefined}>
                  Select Discount type
                </MenuItem>
                <MenuItem key="10" value="%">
                  Percentage (%)
                </MenuItem>
                <MenuItem key="20" value="₹">
                  Amount (₹)
                </MenuItem>
              </Select>
            </div>
            {product.discountType && (
              <TextField
                label={`Discount ${
                  product?.discountType ? "(" + product.discountType + ")" : ""
                }`}
                variant="outlined"
                className="w-2/3"
                value={product.discount}
                onChange={(e) =>
                  setProduct((prev) => {
                    return {
                      ...prev,
                      discount: e.target.value
                    };
                  })
                }
                fullWidth
              />
            )}
          </div>
          <TextField
            label="Final Price after discount"
            variant="outlined"
            margin="normal"
            value={finalPrice}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  price: e.target.value
                };
              })
            }
            fullWidth
            disabled
          />

          <p className="border-b mt-10 mb-5">Attributes</p>

          <div className="w-full">
            <InputLabel className="mt-3" id="attri-select-label">
              Attributes
            </InputLabel>
            <Select
              labelId="attri-select-label"
              value={product.attributes}
              label="Attributes"
              onChange={(e) => {
                setProduct((prev) => {
                  return {
                    ...prev,
                    attributes: e.target.value
                  };
                });
              }}
              rows={1}
              fullWidth
            >
              <MenuItem key="select" value={undefined}>
                Select Attributes
              </MenuItem>
              {(modules.attributes || []).map((loc) => (
                <MenuItem key={loc.id} value={loc.name}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <p className="border-b my-10">Tags</p>

          <TagsInput
            selectedTags={(items) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  tags: items
                };
              })
            }
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="Add Tags"
            label="Add Tags"
          />

          <InputLabel className="mt-3" id="Location-lable">
            Location
          </InputLabel>
          <Select
            labelId="Location-lable"
            value={product.location}
            label="Location"
            onChange={handleLocation}
            rows={1}
            className="mb-3"
            fullWidth
          >
            <MenuItem key="select" value={undefined}>
              Select Location
            </MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc.id} value={loc.name}>
                {loc.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Product Policy"
            variant="outlined"
            fullWidth
            margin="normal"
            value={product.policy}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  policy: e.target.value
                };
              })
            }
            multiline
            rows={4}
          />

          {error && <Typography color="error">{error}</Typography>}
        </div>
      </div>
      <div className="w-full flex gap-5 items-center absolute bottom-0 right-0">
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          component={Link}
          to="/panel/products"
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
});

export default AddProduct;
