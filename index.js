const { request } = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

//definindo handlebars como template engine

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.post("/register/save", (request, response) => {
    const { title, pageqty } = request.body
    const query = `
        INSERT INTO books (title, pageqty)
        VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("/register", (request, response) => {
        response.render("register")
})

app.get("/", (req, res) => {
    res.render("home")
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if(error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!");

    app.listen(3000, () => {
        console.log("Servidor roodando na porta 3000")
    })
})