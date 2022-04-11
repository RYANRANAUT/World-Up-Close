/* eslint-disable import/no-webpack-loader-syntax */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import useStyles from "./styles";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Paper, Rating, Typography, useMediaQuery } from "@mui/material";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ setBounds, setClickedMarker, containerRef, mode, places }) => {
  const classes = useStyles();
  const desktopScreen = useMediaQuery("(min-width: 600px)");

  const [viewport, setViewport] = useState({
    latitude: 31.104605,
    longitude: 77.173424,
    zoom: 12.303149558712713,
  });

  const mapRef = useRef();

  useEffect(() => {
    const bounds = mapRef.current.getMap().getBounds();
    setBounds({
      ne: bounds._ne,
      sw: bounds._sw,
    });
  }, []);

  //Done through mouse
  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  //Done by search
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  // Store the last setbounds after every mouse event
  const handleTransitionEnd = useCallback(() => {
    const bounds = mapRef.current.getMap().getBounds();
    setBounds({
      ne: bounds._ne,
      sw: bounds._sw,
    });
  }, [setBounds]);

  const markers = useMemo(
    () =>
      places?.map((place, i) => {
        if (!isNaN(place.longitude)) {
          return (
            <Marker
              longitude={Number(place.longitude)}
              latitude={Number(place.latitude)}
              key={i}
              className={classes.markerContainer}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => {
                setClickedMarker(i);
              }}
            >
              {!desktopScreen ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  className={classes.paper}
                  style={
                    mode === "light"
                      ? {
                          backgroundColor:
                            "hsl(185.94594594594594, 82.22222222222221%, 26.47058823529412%)",
                          color: "#E2D784",
                        }
                      : {
                          backgroundColor:
                            "hsl(344.8695652173913, 75.16339869281046%, 30%)",
                        }
                  }
                >
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    alt={place.name}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://previews.123rf.com/images/gunshe/gunshe1810/gunshe181000015/111113991-mini-comida-china-combinada.jpg"
                    }
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </Marker>
          );
        } else {
          return null;
        }
      }),
    [
      places,
      setClickedMarker,
      classes.markerContainer,
      classes.paper,
      classes.pointer,
      classes.typography,
      desktopScreen,
    ]
  );

  return (
    <div className={classes.mapContainer}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        onTransitionEnd={handleTransitionEnd}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={
          mode === "light"
            ? "mapbox://styles/mapbox/streets-v11"
            : "mapbox://styles/mapbox/dark-v10"
        }
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={containerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          inputValue=""
          placeholder="Where to?"
        />
        <GeolocateControl
          style={{ top: 10, left: 10 }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        {/* Markers on map to show the data */}
        {markers}
      </ReactMapGL>
    </div>
  );
};

export default Map;
