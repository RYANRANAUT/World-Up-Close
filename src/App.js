import React, { useEffect, useState, createRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  const geocoderContainerRef = createRef();
  const [bounds, setBounds] = useState({});
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [mode, setMode] = React.useState("light");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    setIsLoading(true);

    // let CancelToken = axios.CancelToken;
    // let source = CancelToken.source();

    getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
      // if (data !== undefined) {
      // console.log(data);
      setPlaces(data);
      setFilteredPlaces([]);
      setRating("");
      setIsLoading(false);
      // }
    });
    // return () => source.cancel("Cancelled due to new incoming request");
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={
          mode === "light"
            ? { backgroundColor: "#fcfdea" }
            : { backgroundColor: "#121212" }
        }
      >
        <CssBaseline />
        <Header
          containerRef={geocoderContainerRef}
          mode={mode}
          setMode={setMode}
        />
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid item xs={12} md={8}>
            <Map
              setBounds={setBounds}
              setClickedMarker={setClickedMarker}
              containerRef={geocoderContainerRef}
              mode={mode}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              clickedMarker={clickedMarker}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              mode={mode}
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
