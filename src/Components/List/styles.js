import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // "&:hover": {
    //   borderColor: "#FF7597",
    // },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    "&:hover": {
      borderColor: "#FF7597",
    },
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  topography: {
    marginBottom: "15px",
    letterSpacing: "1.2px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "70vh",
    overflow: "auto",
  },
}));
