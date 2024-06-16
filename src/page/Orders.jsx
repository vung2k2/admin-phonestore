import * as React from "react";
import { Fragment, useCallback } from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  Filter,
  SelectInput,
  useListContext,
  Count,
  SearchInput,
  DatagridConfigurable,
  SelectColumnsButton,
  ExportButton,
  TopToolbar,
} from "react-admin";
import {
  useMediaQuery,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const orderFilters = [
  <SearchInput key={3} source="q" alwaysOn placeholder="Search by order" />,
];

const tabs = [
  { id: "pending", name: "pending" },
  { id: "completed", name: "completed" },
  { id: "cancelled", name: "cancelled" },
];

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;

  const handleChange = useCallback(
    (event, value) => {
      setFilters(
        { ...filterValues, status: value },
        displayedFilters,
        false // no debounce, we want the filter to fire immediately
      );
    },
    [filterValues, setFilters, displayedFilters]
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} (
                <Count
                  filter={{
                    ...filterValues,
                    status: choice.name,
                  }}
                  sx={{ lineHeight: "inherit" }}
                />
                )
              </span>
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      <>
        {filterValues.status === "pending" && (
          <DatagridConfigurable
            rowClick="edit"
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
            expand={<ProductDetails />}
          >
            <TextField source="id" />
            <DateField source="order_date" />
            <TextField source="orderInfo" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="total_amount" />
          </DatagridConfigurable>
        )}
        {filterValues.status === "completed" && (
          <DatagridConfigurable
            rowClick="edit"
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
            expand={<ProductDetails />}
          >
            <TextField source="id" />
            <DateField source="order_date" />
            <TextField source="orderInfo" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="total_amount" />
          </DatagridConfigurable>
        )}
        {filterValues.status === "cancelled" && (
          <DatagridConfigurable
            rowClick="edit"
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
            expand={<ProductDetails />}
          >
            <TextField source="id" />
            <DateField source="order_date" />
            <TextField source="orderInfo" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="total_amount" />
          </DatagridConfigurable>
        )}
      </>
    </Fragment>
  );
};

const ProductDetails = ({ record }) => (
  <Card sx={{ width: 600, margin: "auto" }}>
    <CardContent>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {record.products && record.products.length > 0 ? (
              record.products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.newPrice.toLocaleString()} VNĐ</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {(product.newPrice * product.quantity).toLocaleString()} VNĐ
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body2">No products</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export const OrderList = (props) => (
  <List
    {...props}
    actions={
      <TopToolbar>
        <SelectColumnsButton />
        <ExportButton />
      </TopToolbar>
    }
    filterDefaultValues={{ status: "pending" }}
    perPage={25}
    filters={orderFilters}
  >
    <TabbedDatagrid />
  </List>
);

export default OrderList;
