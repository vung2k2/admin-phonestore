import * as React from "react";
import { Fragment, useCallback } from "react";
import {
  List,
  TextField,
  NumberField,
  DateField,
  useListContext,
  Count,
  SearchInput,
  DatagridConfigurable,
  SelectColumnsButton,
  ExportButton,
  TopToolbar,
  useRecordContext,
  useNotify,
  useRefresh,
  useDataProvider,
} from "react-admin";
import {
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
  Button,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const orderFilters = [
  <SearchInput key={3} source="q" alwaysOn placeholder="Search in orders" />,
];

const tabs = [
  { id: "pending", name: "pending" },
  { id: "completed", name: "completed" },
  { id: "cancelled", name: "cancelled" },
];

const ActionButtons = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const handleConfirm = async (event) => {
    event.stopPropagation();
    try {
      await dataProvider.update("orders", {
        id: record.id,
        data: { status: "completed" },
      });
      notify("Order confirmed", { type: "success" });
      refresh();
    } catch (error) {
      notify("Error: Unable to confirm order", { type: "error" });
    }
  };

  const handleCancel = async (event) => {
    event.stopPropagation();
    try {
      await dataProvider.update("orders", {
        id: record.id,
        data: { status: "cancelled" },
      });
      notify("Order cancelled", { type: "success" });
      refresh();
    } catch (error) {
      notify("Error: Unable to cancel order", { type: "error" });
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={handleConfirm} color="primary" startIcon={<CheckIcon />}>
        Confirm
      </Button>
      <Button
        onClick={handleCancel}
        color="secondary"
        startIcon={<CancelIcon />}
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

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
                {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)} (
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
            rowClick="expand"
            expand={<ProductDetails />}
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
          >
            <TextField source="id" />
            <DateField source="createdAt" showTime />
            <TextField source="orderInfo" />
            <TextField source="provider" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="totalAmount" />
            <ActionButtons />
          </DatagridConfigurable>
        )}
        {filterValues.status === "completed" && (
          <DatagridConfigurable
            rowClick="expand"
            expand={<ProductDetails />}
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
          >
            <TextField source="id" />
            <DateField source="createdAt" showTime />
            <TextField source="orderInfo" />
            <TextField source="provider" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="totalAmount" />
          </DatagridConfigurable>
        )}
        {filterValues.status === "cancelled" && (
          <DatagridConfigurable
            rowClick="expand"
            expand={<ProductDetails />}
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
              },
            }}
          >
            <TextField source="id" />
            <DateField source="createdAt" showTime />
            <TextField source="orderInfo" />
            <TextField source="provider" />
            <NumberField source="products.length" label="Items" />
            <NumberField source="totalAmount" />
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
