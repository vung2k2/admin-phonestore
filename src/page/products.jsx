import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  NumberField,
  NumberInput,
  ImageField,
  SelectColumnsButton,
  TopToolbar,
  DatagridConfigurable,
  CreateButton,
  ExportButton,
  required,
  SearchInput,
  useNotify,
  useRefresh,
  useDataProvider,
  Empty,
  FileField,
  FileInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UploadIcon from "@mui/icons-material/Upload";

const ImportButton = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const handleImport = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    if (file) {
      dataProvider
        .importProducts(file)
        .then(() => {
          notify("Import successful", { type: "success" });
          refresh();
        })
        .catch(() => {
          notify("Import failed", { type: "error" });
        });
    }
  };

  return (
    <Button
      component="label"
      startIcon={<UploadIcon />}
      sx={{ fontSize: "13px", padding: "4px 5px" }}
    >
      Import
      <input type="file" hidden onChange={handleImport} />
    </Button>
  );
};

const postFilters = [
  <SearchInput
    key={1}
    source="q"
    alwaysOn
    placeholder="Search by name product"
  />,
];

export const ProductList = (props) => (
  <List
    {...props}
    actions={
      <TopToolbar>
        <SelectColumnsButton />
        <CreateButton />
        <ExportButton />
        <ImportButton />
      </TopToolbar>
    }
    empty={
      <>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={"100%"}
          gap={1}
        >
          <Empty />
          <ImportButton />
        </Box>
      </>
    }
    filters={postFilters}
    sort={{ field: "quantity", order: "ASC" }}
  >
    <DatagridConfigurable
      rowClick="edit"
      sx={{
        "& .RaDatagrid-headerCell": {
          fontWeight: "bold",
        },
      }}
    >
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="category" />
      <ImageField source="imageUrl" label="Image" />
      <NumberField source="oldPrice" />
      <NumberField source="newPrice" />
      <TextField source="chip" />
      <NumberField source="ram" />
      <NumberField source="rom" />
      <TextField source="screen" />
      <NumberField source="pin" />
      <TextField source="selfieCam" />
      <TextField source="behindCam" />
      <NumberField source="chargeSpeed" />
      <NumberField source="quantity" />
    </DatagridConfigurable>
  </List>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextInput disabled source="id" />
          <TextInput source="name" />
          <TextInput source="category" />
          <TextInput source="imageUrl" />
          <TextInput source="videoUrl" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <NumberInput source="oldPrice" />
          <NumberInput source="newPrice" />
          <TextInput source="chip" />
          <NumberInput source="ram" />
          <NumberInput source="rom" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextInput source="screen" />
          <NumberInput source="pin" />
          <TextInput source="selfieCam" />
          <TextInput source="behindCam" />
          <NumberInput source="chargeSpeed" />
          <NumberInput source="quantity" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextInput source="name" validate={required()} />
          <TextInput source="category" validate={required()} />
          <TextInput source="videoUrl" validate={required()} />
          <NumberInput source="quantity" validate={required()} />{" "}
          <FileInput
            source="image"
            validate={required()}
            // placeholder={<p>Drop your file here</p>}
          >
            <FileField source="image" />
          </FileInput>
        </Grid>
        <Grid item xs={12} sm={3}>
          <NumberInput source="oldPrice" validate={required()} />
          <NumberInput source="newPrice" validate={required()} />
          <TextInput source="chip" validate={required()} />
          <NumberInput source="ram" validate={required()} />
          <NumberInput source="rom" validate={required()} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextInput source="screen" validate={required()} />
          <NumberInput source="pin" validate={required()} />
          <TextInput source="selfieCam" validate={required()} />
          <TextInput source="behindCam" validate={required()} />
          <NumberInput source="chargeSpeed" validate={required()} />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
