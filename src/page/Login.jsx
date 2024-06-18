import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardWithIcon from "./dashboard/CardWithIcon";
import CategoryIcon from "@mui/icons-material/Category";

const Login = () => {
  return (
    <CardWithIcon
      to="/customers"
      title={"acacs"}
      subtitle={"cscs"}
      icon={CategoryIcon}
    />
  );
};

export default Login;
