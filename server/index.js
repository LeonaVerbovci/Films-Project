const express = require("express"); //perdorim node js express
const path = require("path");
const mongodb = require("mongodb"); //driverat per node js
const bodyParser = require("body-parser"); //middleware per me i bo parse request bodys
const dotenv = require("dotenv"); //load
const cors = require("cors");

const { MongoClient } = mongodb; //import mongoclient prej mongodb

const users = require("./src/routes/users.js"); // import route per users (login, signup)
const films = require("./src/routes/films.js");
const auth = require("./src/routes/auth.js");
const authfilms = require("./src/routes/authfilms.js");

const app = express(); //qysh e krijojme nje app express
app.use(cors());
dotenv.config(); // mundemi me manipulu me te dhena mbrenda env file

const isDev = app.get("env") === "development"; // a eshte ne dev mode apo production
// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());

/*Setting extended to false is typically sufficient
 for most applications where you only need to parse
  simple URL-encoded data. If you need to parse more 
  complex data structures from URL-encoded bodies, 
  you can set extended to true, which will use the qs 
  library for parsing, allowing for nested objects and arrays. */

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/films", films);
app.use("/api/authfilms", authfilms);

const port = 4000;
//lidhje me mongodb
const dbName = "playground";
const uri =
  "mongodb+srv://leonaverbovci:XJTYAYe3qrDdRuuh@playground.egqbbcy.mongodb.net/?retryWrites=true&w=majority&appName=playground";

//me i kallzu qa me perdor ne request tone
const options = {
  useNewUrlParser: true, //use new URL parser

  /* 
    useNewUrlParser: true: This option tells the MongoDB client to use 
    the new URL parser when connecting to the MongoDB database. 
    The URL parser is responsible for parsing the MongoDB connection string. 
    Prior to version 3.x of the MongoDB Node.js driver, the default URL parser 
    used by the driver was deprecated, and the new URL parser was introduced. 
    Setting useNewUrlParser to true ensures that the new URL parser is used, 
    which is recommended for compatibility with the latest MongoDB driver versions.

    */
  useUnifiedTopology: true, //use new Server Discover and Monitoring engine
  /*
  useUnifiedTopology: true: This option tells the MongoDB client to use the 
  new Server Discovery and Monitoring engine. This engine is responsible for 
  monitoring the state of the MongoDB replica set or cluster and discovering 
  new servers as they are added to the topology. Prior to version 3.x of the 
  MongoDB Node.js driver, the default topology engine used by the driver was 
  deprecated, and the new unified topology engine was introduced. Setting 
  useUnifiedTopology to true ensures that the new unified topology engine is
   used, which is recommended for compatibility with the latest MongoDB driver versions.
  */

  //connect to MongoDB
};
MongoClient.connect(uri, options)
  .then((client) => {
    console.log("client");
    const db = client.db(dbName);
    app.set("db", db);

    //Define a route to serve the index.html file
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./index.html"));
      //kan entry point ne index.html (eshte route url i aplikacionit tone)
    });
    //Define a test route to send JSON response

    //me testu aplikacionin a eshte lidhe mire
    app.get("/api/test", (req, res) => {
      res.json({ mes: "Hello from express" });
    });

    //ne cilin port komme u startu serveri
    app.listen(port, () => console.log(`Runing on localhost :${port}`));
  })
  .catch((err) => console.log("Error connect", err));
