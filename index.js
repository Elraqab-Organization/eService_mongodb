const express = require("express")
const app = express();
const userRouter = require('./api/controllers/user_controller');

app.use(express.json())
app.use('/users', userRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {

    console.log("started at port")
})


module.exports = { app }


// exports.api = functions.https.onRequest(app)

// // To handle "Function Timeout" exception
// exports.functionsTimeOut = functions.runWith({
//     timeoutSeconds: 300
// })