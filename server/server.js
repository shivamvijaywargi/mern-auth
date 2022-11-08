const app = require("./app");
const connectToDB = require("./config/db");

const PORT = process.env.PORT || 4000;

connectToDB();
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
