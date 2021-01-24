import { serverApp } from "./src/server";

serverApp.listen(8080, () => {
  console.log("Server Running at port 8080");
});
