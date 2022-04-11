import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";
const List = ({
  places,
  clickedMarker,
  isLoading,
  type,
  setType,
  rating,
  setRating,
  mode,
}) => {
  const classes = useStyles();
  const [elementRefs, setElementRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elementRefs[i] || createRef());
    setElementRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography
        variant="h5"
        className={classes.topography}
        marginBottom="15px"
        fontSize="25px"
        style={mode === "light" ? { color: "#062C30" } : { color: "#FF7597" }}
      >
        Destination Insights | Travel Trends
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
            }}
          >
            <FormControl className={classes.formControl}>
              {/* <InputLabel>Type</InputLabel> */}
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
              sx={{ ml: "5px", minWidth: 150 }}
            >
              <InputLabel>Rating</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Average</MenuItem>
                <MenuItem value={4}>Good</MenuItem>
                <MenuItem value={4.5}>Top Notch</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ paddingTop: 25 }}>
            <Grid container spacing={3} className={classes.list}>
              {places?.map((place, index) => (
                <Grid ref={elementRefs[index]} item key={index} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={clickedMarker === index}
                    refProp={elementRefs[index]}
                    mode={mode}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
