import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = ({ containerRef, mode, setMode }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      style={
        mode === "light" ? { background: "#05595B" } : { background: "#121212" }
      }
    >
      <Toolbar
        className={classes.toolbar}
        style={mode === "light" ? { color: "#E2D784" } : { color: "#FF7597" }}
      >
        <Typography
          variant="h4"
          className={classes.title}
          fontFamily="rubik"
          style={mode === "light" ? { color: "#E2D784" } : { color: "#FF0266" }}
          fontSize="2rem"
        >
          World Up Close
        </Typography>
        <Box display="flex">
          <Typography variant="h5" className={classes.title} fontFamily="rubik">
            The Excursion Point
          </Typography>
          <div className={classes.search}>
            <div ref={containerRef} />
          </div>
          <div>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() =>
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
              }
              color="inherit"
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
