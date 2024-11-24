const sidebarList = [
  {
    moduleName: "Dashboard",
    label: "Dashboard",
    icon: "dashboard",
    route: "/panel/dashboard",
    roles: [1, 2]
  },
  {
    moduleName: "Vendors",
    label: "Vendors",
    icon: "users",
    route: "/panel/users",
    roles: [1]
  },
  {
    moduleName: "Customers",
    label: "Customers",
    icon: "customers",
    route: "/panel/customers",
    roles: [1]
  },
  {
    moduleName: "Orders",
    label: "Orders",
    icon: "orders",
    route: "/panel/orders",
    roles: [1, 2],
    heading: 'Orders Management'
  },
  {
    moduleName: "Category",
    label: "Category",
    icon: "category",
    route: "/panel/category",
    roles: [1],
    heading: 'Product Management'
  },
  {
    moduleName: "Bulk Upload Categories",
    label: "Bulk Upload Categories",
    icon: "bulk-upload-Categories",
    route: "/panel/bulk/upload/categories",
    roles: [1, 2]
  },
  {
    moduleName: "Attributes",
    label: "Attributes",
    icon: "attributes",
    route: "/panel/attributes",
    roles: [1],
  },
  {
    moduleName: "Units",
    label: "Units",
    icon: "units",
    route: "/panel/units",
    roles: [1],
  },
  {
    moduleName: "Products",
    label: "Products",
    icon: "products",
    route: "/panel/products",
    roles: [1, 2]
  },
  {
    moduleName: "Bulk Upload Products",
    label: "Bulk Upload Products",
    icon: "bulk-upload-products",
    route: "/panel/bulk/upload/products",
    roles: [1, 2]
  },
  // {
  //   moduleName: "Add new Product",
  //   label: "Products",
  //   icon: "products",
  //   route: "/panel/products/new",
  //   roles: [1, 2]
  // },
  {
    moduleName: "Banners",
    label: "Banners",
    icon: "banners",
    route: "/panel/banners",
    roles: [1],
    heading: 'Promotional Management'
  },
  {
    moduleName: "Profile",
    label: "Profile",
    icon: "profile",
    route: "/panel/profile",
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
