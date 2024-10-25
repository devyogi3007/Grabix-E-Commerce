import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/admin/pages/Dashboard/Dashboard";
// import List from "../Pages/admin/pages/list/List";
import Single from "../Pages/admin/pages/single/Single";
import New from "../Pages/admin/pages/new/New";
import Signup from "../Pages/admin/pages/signup";

import {
  // productInputs,
  userInputs
} from "../Pages/admin/formSource";
import "../Pages/admin/style/dark.scss";
// import { DarkModeContext } from "../Pages/admin/context/darkModeContext";
import { useAuth } from "../Pages/admin/context/AuthContext";
import ProductsList from "../Pages/admin/pages/products/ProductsList";
import OrdersList from "../Pages/admin/pages/orders/AllOrders";
import OrderDetails from "../Pages/admin/pages/orders/OrderDetails";
import BannerPage from "../Pages/admin/pages/banner/BannerPage";
import AddProduct from "../Pages/admin/pages/products/AddProduct";
import ProductOverView from "../Pages/admin/pages/products/productOverview";
import CategoryList from "../Pages/admin/pages/category/CategoriesList";
import AddCategory from "../Pages/admin/pages/category/AddCategory";
import Units from "../Pages/admin/pages/units";
import AddEditUnit from "../Pages/admin/pages/units/AddEditUnit";
import UserList from "../Pages/admin/pages/users";
// import Login from "../Pages/admin/pages/login/Login";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogin } from "../Redux/AdminAuth/adminAuth.actions";
import Logout from "../Pages/admin/pages/signup/logout";
import Profile from "../Pages/admin/pages/profile";
import CustomerList from "../Pages/admin/pages/customers";

function AdminRoutes() {
  const auth = useAuth();

  const currentUser = auth.token || {};

  const isAdmin = currentUser?.role?.id === 1 || false;
  const isVendor = currentUser?.role?.id === 2 || false;

  // console.log(currentUserLoggedInStatus);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/pannel/login" />;
  };

  // const { darkMode } = useContext(DarkModeContext);
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        {isAdmin && (
          <Route path="users">
            <Route
              index
              element={
                <RequireAuth>
                  <UserList />
                </RequireAuth>
              }
            />
            <Route
              path=":userId"
              element={
                <RequireAuth>
                  <Profile vendor={true} />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <Signup mode={2} />
                </RequireAuth>
              }
            />
          </Route>
        )}
        <Route path="products">
          <Route
            index
            element={
              <RequireAuth>
                <ProductsList isAdmin={isAdmin} isVendor={isVendor} />
              </RequireAuth>
            }
          />
          <Route
            path=":productId"
            element={
              <RequireAuth>
                <ProductOverView />
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <AddProduct mode={1} isAdmin={isAdmin} />
              </RequireAuth>
            }
          />
          <Route path="edit">
            <Route
              path=":productId"
              element={
                <RequireAuth>
                  <AddProduct mode={2} />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        <Route path="category">
          <Route
            index
            element={
              <RequireAuth>
                <CategoryList isAdmin={isAdmin} />
              </RequireAuth>
            }
          />
          {isAdmin && (
            <>
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AddCategory mode={1} route={"category"} />
                  </RequireAuth>
                }
              ></Route>
              <Route path="edit">
                <Route
                  path=":categoryId"
                  element={
                    <RequireAuth>
                      <AddCategory mode={2} route={"category"} />
                    </RequireAuth>
                  }
                />
              </Route>
            </>
          )}
        </Route>
        <Route path="sub-category">
          {isAdmin && (
            <>
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AddCategory mode={1} route={"sub-category"} />
                  </RequireAuth>
                }
              ></Route>
              <Route path="edit">
                <Route
                  path=":categoryId"
                  element={
                    <RequireAuth>
                      <AddCategory mode={2} route={"sub-category"} />
                    </RequireAuth>
                  }
                />
              </Route>
            </>
          )}
        </Route>

        <Route path="units">
          <Route
            index
            element={
              <RequireAuth>
                <Units module="Unit" />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <AddEditUnit module="Unit" mode={2} />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="attributes">
          <Route
            index
            element={
              <RequireAuth>
                <Units module="Attribute" />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <AddEditUnit module="Attribute" mode={2} />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="orders">
          <Route
            index
            element={
              <RequireAuth>
                <OrdersList isAdmin={isAdmin} />
              </RequireAuth>
            }
          />
          <Route
            path=":Id"
            element={
              <RequireAuth>
                <OrderDetails />
              </RequireAuth>
            }
          />
        </Route>
        {isAdmin && <Route path="banners" element={<BannerPage />} />}
        <Route path="logout" element={<Logout />} />
        <Route path="/pannel" element={<Navigate to="/pannel/dashboard" />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        {isAdmin && (
          <Route path="customers">
            <Route
              index
              element={
                <RequireAuth>
                  <CustomerList />
                </RequireAuth>
              }
            />
            <Route
              path=":userId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
