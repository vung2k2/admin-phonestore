import React from "react";
import {
  Grid,
  Box,
  CardHeader,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import CardWithIcon from "./CardWithIcon";
import { LineChart } from "@mui/x-charts/LineChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Dashboard = () => {
  const theme = useTheme();
  const fakeData = [
    { day: "21/05/2024", revenue: 100 },
    { day: "22/05/2024", revenue: 150 },
    { day: "23/05/2024", revenue: 120 },
    { day: "24/05/2024", revenue: 180 },
    { day: "25/05/2024", revenue: 200 },
    { day: "26/05/2024", revenue: 250 },
    { day: "27/05/2024", revenue: 220 },
    { day: "28/05/2024", revenue: 300 },
    { day: "29/05/2024", revenue: 280 },
    { day: "30/05/2024", revenue: 320 },
    { day: "31/05/2024", revenue: 350 },
    { day: "01/06/2024", revenue: 400 },
    { day: "02/06/2024", revenue: 380 },
    { day: "03/06/2024", revenue: 420 },
    { day: "04/06/2024", revenue: 440 },
    { day: "05/06/2024", revenue: 460 },
    { day: "06/06/2024", revenue: 500 },
    { day: "07/06/2024", revenue: 480 },
    { day: "08/06/2024", revenue: 520 },
    { day: "09/06/2024", revenue: 550 },
    { day: "10/06/2024", revenue: 580 },
    { day: "11/06/2024", revenue: 600 },
    { day: "12/06/2024", revenue: 620 },
    { day: "13/06/2024", revenue: 650 },
    { day: "14/06/2024", revenue: 680 },
    { day: "15/06/2024", revenue: 700 },
    { day: "16/06/2024", revenue: 720 },
    { day: "17/06/2024", revenue: 750 },
    { day: "18/06/2024", revenue: 780 },
    { day: "19/06/2024", revenue: 800 },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search: "?filter=%7B%22status%22%3A%22completed%22%7D",
                }}
                title={"Total Revenue"}
                subtitle={"870.900.000 VND"}
                icon={AttachMoneyIcon}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search: "?filter=%7B%22status%22%3A%22completed%22%7D",
                }}
                title={"Total Orders"}
                subtitle={"362"}
                icon={ShoppingCartIcon}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CardWithIcon
                to={{
                  pathname: "/orders",
                  search: "?filter=%7B%22status%22%3A%22pending%22%7D",
                }}
                title={"New Orders"}
                subtitle={"6"}
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
                  xAxis={[
                    {
                      data: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        2, 5.5, 2, 8.5, 1.5, 5, 4, 7, 2.5, 6, 3, 8, 5.5, 2.3, 9,
                        5.8, 3.2, 6.5, 2.1, 7, 4.5, 8.2, 6.7, 9.5, 4.1, 7.8,
                        3.6, 5.7, 2.9, 6.3,
                      ],
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
                      data: [200, 350, 220, 600, 150, 500],
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
