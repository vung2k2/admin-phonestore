import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { CustomersList } from "./page/Customers";
import { ProductList, ProductEdit, ProductCreate } from "./page/Products";
import { OrderList } from "./page/Orders";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource name="customers" list={CustomersList} />
    <Resource name="orders" list={OrderList} />
  </Admin>
);

export default App;
