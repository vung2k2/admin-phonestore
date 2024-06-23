import React, { useEffect, useState } from "react";
import { Grid, Box, CardHeader, Card, CardContent } from "@mui/material";
import { useDataProvider, useNotify } from "react-admin";
import { subDays, format } from "date-fns";
import CardWithIcon from "./CardWithIcon";
import { LineChart } from "@mui/x-charts/LineChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Dashboard = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueLast30Days, setRevenueLast30Days] = useState([]);
  const [revenueYearToDate, setRevenueYearToDate] = useState([]);
  const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenue = await dataProvider.getTotalRevenue();
        setTotalRevenue(revenue);
        const completedOrders = await dataProvider.getTotalOrdersByStatus(
          "completed"
        );
        setTotalCompletedOrders(completedOrders);
        const pendingOrders = await dataProvider.getTotalOrdersByStatus(
          "pending"
        );
        setTotalPendingOrders(pendingOrders);
        const revenue30Days = await dataProvider.getRevenueLast30Days();
        setRevenueLast30Days(revenue30Days);
        const revenueYear = await dataProvider.getRevenueYearToDate();
        setRevenueYearToDate(revenueYear);
      } catch (error) {
        notify("Error fetching data", { type: "error" });
      }
    };
    fetchData();
  }, [dataProvider, notify]);

  const formatRevenue = (revenue) => {
    if (revenue >= 1000000000) {
      return (revenue / 1000000000).toFixed(1) + " B";
    } else if (revenue >= 1000000) {
      return (revenue / 1000000).toFixed(1) + " M";
    } else {
      return revenue.toString();
    }
  };

  const numberOfDays = 30;
  const labels30Days = Array.from({ length: numberOfDays }, (_, index) => {
    const date = subDays(new Date(), index);
    if (index === 0) {
      return "today";
    }
    return format(date, "dd/MM/yyyy");
  }).reverse();

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search:
                    "?filter=%7B%22status%22%3A%22completed%22%7D&order=DESC&sort=createdAt",
                }}
                title={"Total Revenue"}
                subtitle={`${formatRevenue(totalRevenue)}`}
                icon={AttachMoneyIcon}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search:
                    "?filter=%7B%22status%22%3A%22completed%22%7D&order=DESC&sort=createdAt",
                }}
                title={"Total Orders"}
                subtitle={totalCompletedOrders}
                icon={ShoppingCartIcon}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search:
                    "?filter=%7B%22status%22%3A%22pending%22%7D&order=DESC&sort=createdAt",
                }}
                title={"New Orders"}
                subtitle={totalPendingOrders}
                icon={NewReleasesIcon}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Hàng thứ hai chứa 2 biểu đồ */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="30 Day Revenue History (M)" />
            <CardContent>
              <Box sx={{ width: "100%", height: "400px" }}>
                <LineChart
                  xAxis={[{ scaleType: "point", data: labels30Days }]}
                  series={[
                    {
                      data: revenueLast30Days,
                    },
                  ]}
                  //   colors={["#8884d8"]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="Yearly Revenue Overview (M)" />
            <CardContent>
              <Box sx={{ width: "100%", height: "400px" }}>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                  series={[
                    {
                      data: revenueYearToDate,
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
