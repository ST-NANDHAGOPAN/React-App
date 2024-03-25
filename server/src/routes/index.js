function routes(app){
    app.use("/api/user-register" , require("./userRoutes"))
}

module.exports = routes