import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { ProductList, ProductEdit, ProductCreate } from "./products";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default App;
