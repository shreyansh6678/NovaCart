import { connectDB } from "./database/db.js";
import { app } from "./app.js";

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(`App is listening on http://localhost:${process.env.PORT}`)
  })
})
.catch(()=>{
    console.log("Something went wrong while connecting database",error)
})