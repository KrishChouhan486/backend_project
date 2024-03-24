// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
const port = process.env.PORT || 5000;

dotenv.config({
  path: './env'

})
connectDB()

  .then(() => {
    app.listen(port, () => {
      console.log(`server  is ready ${port}`)
    })
  })
  .catch((error) => {
    console.log("MONGO db Connection failed !!!", error);
  })
  app.on("error", (error) => {
  console.log("ERROR:", error);
  throw error
})










// import  express from "express"
// const app = express()
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/$
//     {DB_NAME}`)
//     app.on("error", (error)=>{
//       console.log("ERROR:", error);
//       throw error
//     })

//     app.listen(process.env.PORT, ()=>{
//       console.log(`App is listening on port $ {process.env.PORT}`);
//     })
//   }
//   catch (error) {
//     console.error("ERROR", error)
//     throw err
//   }
// })()