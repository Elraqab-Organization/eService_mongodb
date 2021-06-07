const express = require("express")
const app = express();
const userRouter = require('./api/controllers/user_controller');
const router = express.Router()
const userModel = require('./api/models/user_model')

app.use(express.json())
app.use('/users', userRouter)

router.get('/', async(req, res, next) => {
    try {
        const result = await userModel.get()
        return res.json(result)
    } catch (e) {
        return next(e)
    }
})
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