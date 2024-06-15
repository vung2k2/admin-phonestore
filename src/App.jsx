import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { CustomersList } from "./page/customers";
import { ProductList, ProductEdit, ProductCreate } from "./page/products";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource name="customers" list={CustomersList} />
  </Admin>
);

export default App;
