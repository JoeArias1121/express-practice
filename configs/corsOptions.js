// cors options
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3500",
  "https://www.google.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log(`This is the origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};
export default corsOptions;