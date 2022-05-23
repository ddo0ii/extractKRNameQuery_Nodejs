const express = require("express");
const hbs = require("express-handlebars");
const server = express();

server.engine('hbs', hbs ({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

server.set("view engine", "hbs");
//template Engine
server.use(express.static(__dirname + "/public"));
server.use((req, res, next) => {
    //config
    next();
});

server.get('/', (req, res) => {
    // res.status(200).sendFile(__dirname + '/index.html');
    res.status(200).render('index');
})

server.listen(3000, () => {
    console.log("The server is running on Port 3000");
})