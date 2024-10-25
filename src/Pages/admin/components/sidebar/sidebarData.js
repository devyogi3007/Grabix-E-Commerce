const sidebarList = [
  {
    moduleName: "Dashboard",
    label: "Dashboard",
    icon: "dashboard",
    route: "/pannel/dashboard",
    roles: [1, 2]
  },
  {
    moduleName: "Vendors",
    label: "Vendors",
    icon: "users",
    route: "/pannel/users",
    roles: [1]
  },
  {
    moduleName: "Customers",
    label: "Customers",
    icon: "customers",
    route: "/pannel/customers",
    roles: [1]
  },
  {
    moduleName: "Orders",
    label: "Orders",
    icon: "orders",
    route: "/pannel/orders",
    roles: [1, 2],
    heading: 'Orders Management'
  },
  {
    moduleName: "Category",
    label: "Category",
    icon: "category",
    route: "/pannel/category",
    roles: [1, 2],
    heading: 'Product Management'
  },
  {
    moduleName: "Attributes",
    label: "Attributes",
    icon: "attributes",
    route: "/pannel/attributes",
    roles: [1],
  },
  {
    moduleName: "Units",
    label: "Units",
    icon: "units",
    route: "/pannel/units",
    roles: [1],
  },
  {
    moduleName: "Products",
    label: "Products",
    icon: "products",
    route: "/pannel/products",
    roles: [1, 2]
  },
  // {
  //   moduleName: "Add new Product",
  //   label: "Products",
  //   icon: "products",
  //   route: "/pannel/products/new",
  //   roles: [1, 2]
  // },
  {
    moduleName: "Banners",
    label: "Banners",
    icon: "banners",
    route: "/pannel/banners",
    roles: [1],
    heading: 'Promotional Management'
  },
  {
    moduleName: "Profile",
    label: "Profile",
    icon: "profile",
    route: "/pannel/profile",
    roles: [2],
    heading: 'Profile Management'
  },
  // {
  //   moduleName: "Logout",
  //   label: "Logout",
  //   icon: "logout",
  //   roles: [1, 2],
  //   onclick: 'logout',
  // }
];

export { sidebarList };
