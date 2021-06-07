const express = require("express")
const app = express();
const userRouter = require('./api/controllers/user_controller');

app.use(express.json())
app.use('/users', userRouter)

// exports.api = functions.https.onRequest(app)

// // To handle "Function Timeout" exception
// exports.functionsTimeOut = functions.runWith({
//     timeoutSeconds: 300
// })