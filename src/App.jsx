import React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { CustomersList } from "./page/Customers";
import { ProductList, ProductEdit, ProductCreate } from "./page/Products";
import { OrderList } from "./page/Orders";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import themes from "./themes";
import { authProvider } from "./authProvider";
import Dashboard from "./page/dashboard/Dashboard";

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    // loginPage={LoginPage}
    {...themes}
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      icon={CategoryIcon}
    />
    <Resource name="customers" list={CustomersList} icon={PeopleAltIcon} />
    <Resource name="orders" list={OrderList} icon={AttachMoneyIcon} />
  </Admin>
);

export default App;
