const sidebarList = [
  {
    moduleName: "Account",
    label: "Account",
    icon: "account",
    route: "/account",
    roles: [1, 2],
    heading: 'Account Management'
  },
  {
    moduleName: "Orders",
    label: "Orders",
    icon: "orders",
    route: "/orders",
    roles: [1, 2]
  },
  {
    moduleName: "Customer Support",
    label: "Customer Support",
    icon: "support",
    route: "/support",
    roles: [1, 2]
  },
  {
    moduleName: "Manage addresses",
    label: "Manage addresses",
    icon: "addresses",
    route: "/addresses",
    roles: [1, 2]
  },
  {
    moduleName: "Logout",
    label: "Logout",
    icon: "logout",
    roles: [1, 2],
    onclick: 'logout',
  }
];

export { sidebarList };
