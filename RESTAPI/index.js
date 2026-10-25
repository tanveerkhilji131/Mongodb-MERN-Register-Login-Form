let express = require("express")
let app = express();
let StudentRouter = require("./router/Students");
app.use(express.json());

app.use("/api/users",StudentRouter)
app.listen(3000, () => {
    console.log("port started 3000")
})