import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActions,
  Button,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";
import useStyles from "./styles";

function PlaceDetails({ place, selected, refProp, mode }) {
  const classes = useStyles();

  if (selected) {
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  return (
    <Card
      elevation={6}
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
              color: "#E2D784",
            }
      }
    >
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://previews.123rf.com/images/gunshe/gunshe1810/gunshe181000015/111113991-mini-comida-china-combinada.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop="7px">
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.slice(0, 3).map((award) => (
          <Box my={2} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="#E2D784">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip
            key={name}
            size="small"
            label={name}
            className={classes.chip}
            style={{ color: "white" }}
          />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="#E2D784"
            className={classes.subtitle}
            marginTop="7px"
          >
            <LocationOnOutlinedIcon />
            {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="#E2D784"
            className={classes.spacing}
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button
            size="small"
            onClick={() => window.open(place.web_url, "_blank")}
            style={{ color: "#E2D784" }}
          >
            {/* blank opens site in new page */}
            Trip Advisor
          </Button>
          <Button
            size="small"
            onClick={() => window.open(place.website, "_blank")}
            style={{ color: "#E2D784" }}
          >
            {/* blank opens site in new page */}
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;
