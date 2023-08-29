const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()


app.use(express.json())
app.use(morgan("dev"))

// CONNECT to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(error))

// Routes
app.use("/inventory", require("./routes/storeRoutes"))


// ERROR handling
app.use((err, req, res, next)=>{
    console.log(err)
       return res.send({errorMessage: err.message})
})



app.listen(8500, () => {
    console.log("Server lisening on port 8500")
})