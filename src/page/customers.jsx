import React from "react";
import {
  List,
  DatagridConfigurable,
  TextField,
  DateField,
  SearchInput,
  TopToolbar,
  SelectColumnsButton,
  ExportButton,
} from "react-admin";

const postFilters = [
  <SearchInput
    key={2}
    source="q"
    alwaysOn
    placeholder="Search by name customer"
  />,
];

export const CustomersList = (props) => (
  <List
    {...props}
    filters={postFilters}
    actions={
      <TopToolbar>
        <SelectColumnsButton /> <ExportButton />
      </TopToolbar>
    }
  >
    <DatagridConfigurable
      sx={{
        "& .RaDatagrid-headerCell": {
          fontWeight: "bold",
        },
      }}
    >
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="email" label="Email" />
      <TextField source="phone" label="Phone Number" />
      <TextField source="address" label="Address" />
      <DateField source="createdAt" label="Created At" />
    </DatagridConfigurable>
  </List>
);
