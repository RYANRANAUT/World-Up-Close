import axios from "axios";

export const getPlacesData = async (type, ne, sw) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "feb8290d89msh388fc908f644f3dp1426d0jsnb4db1f80f624",
        },
        // cancelToken: source.token,
      }
    );

    return data;
  } catch (error) {
    // if (axios.isCancel(error))
    // console.log("Oops! Cancelled the request");
    console.log(error);
  }
};

// export const getWeatherData = async (lat, lng) => {
//   try {
//     const { data } = await axios.get(
//       "https://community-open-weather-map.p.rapidapi.com/find",
//       {
//         params: {
//           lon: "lng",
//           lat: "lat",
//         },
//         headers: {
//           "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
//           "X-RapidAPI-Key":
//             "feb8290d89msh388fc908f644f3dp1426d0jsnb4db1f80f624",
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
