import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/companyProducts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("[MONGO] Db is connected"))
  .catch((error: Error) => console.log("error", error.message));
