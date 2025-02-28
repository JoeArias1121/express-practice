import allowedOrigins from "./allowedOrigins.js";
// cors options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log(`This is the origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};
export default corsOptions;