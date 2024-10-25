// withLayout.js
import React from "react";
import Layout from "../Pages/client/pages/layout/index";

const withLayout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};

export default withLayout;
