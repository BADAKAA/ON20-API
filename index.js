const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json({limit: '10mb'}), express.static("./"));
const credentials = require("./credentials.json");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const fs = require("fs");
const events = require("./event-data.json");

const eventKeys = events[0] ? Object.keys(events[0]) : ["title","date","start","end","city","country","location","adress","description","image"];

function saveData() {
  const eventsToBeSaved = JSON.stringify(events, null, 2);
  fs.writeFileSync("./event-data.json", eventsToBeSaved, () =>
    console.log("Data written to file.")
  );
}

const getUser = (password) => credentials.users[password];

const crypto = require("crypto");
const getHash = (password) => crypto.createHash("sha256").update(password + credentials.salt).digest("hex");
const login = (username, password) => (getUser(getHash(password)) && getUser(getHash(password)) == username) ? true : false;

function authorizationValid(request) {
    // https://stackoverflow.com/a/5957629
    const header = request.headers.authorization || ''; 
    const token = header.split(/\s+/).pop() || ''
    const auth = Buffer.from(token, 'base64').toString();
    const username = auth.split(":")[0];
    const password = auth.split(":")[1];
  
    if (!username || !password || !login(username, password)) return false;
    return true;
}

function addUser(password, userName) {
  credentials.users[getHash(password)] = userName;
  fs.writeFileSync(
    "./credentials.json",
    JSON.stringify(credentials, null, 2),
    () => console.log("User added.")
  );
}

//addUser(123, "admin");

// LOGIN

app.post("/login", (req, res)=> {
  const {username,password} = req.body;
  login(username,password) ? res.status(200).send("Login is valid.") : res.status(401).send("Invalid Login.");
});

app.post("/hash", (req, res)=> {
  const {input} = req.body;
  input ? res.status(200).send(getHash(input)) : res.status(400).send("Please include the value 'input' in your request body.");
})
///EVENT DATA BASE
app.get("/events", async (req, res) => {
  if (events) return res.status(200).send(events);
  res.status(404).send("No data could be found.");
});

//IMAGES
app.get("/images", (req, res) => {
  fs.readdir("./images", (err, files) => {
    if (err) return res.status(404).send(err);
    files ? res.status(200).send(files) : res.status(404).send("No files could be found.");
  });
});

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  res.status(200).sendFile(`/images/${filename}`, { root: __dirname });
});
app.delete("/images/delete/:filename", (req, res) => {
  const { filename } = req.params;

  if (!authorizationValid(req)) return res.status(401).send("Invalid login.");

  fs.unlink(`./images/${filename}`,err => {
    err ? res.status(400).send(err) : res.status(200).send("Deletion successful.")
  })
});
app.patch("/images/rename/", (req, res) => {
  const { oldName, newName } = req.body;
  if (!oldName || !newName) return res.status(400).send("Please specify the properties 'oldName' and 'newName' in the HTML body.")
  fs.rename(`./images/${oldName}`,`./images/${newName}`,err => {
    err ? res.status(400).send(err) : res.status(200).send("Renaming successful.")
  })
});

app.get("/imageByIndex/:index", (req, res) => {
  const { index } = req.params;
  fs.readdir("./images", (err, files) => {
    if (err) return res.status(404).send(err);
    files && files[index] ? res.status(200).sendFile(`/images/${files[index]}`, { root: __dirname }) : res.status(404).send(`An image with index '${index}' could not be found.`);
  });
});

app.post("/images/upload/", (req, res) => {
  const { name, data } = req.body;
  fs.existsSync(`./images/${name}`, (exists) => {
    if (exists) return res.status(409).send(`An image with the name '${name}' already exists.`);
  });
  // https://stackoverflow.com/a/43488020
  const image = data.replace(/^data:image\/\w+;base64,/, "");
  const buf = Buffer.from(image, 'base64');
  fs.writeFile(`./images/${name}`, buf, (err) => {
    if (err) console.log(err);
    err ? res.status(400).send(err) : res.status(200).send("File sucessfully uploaded.");
  });
});
//Endpunkt 1
app.get("/events/:index", (req, res) => {
  if (!events) return res.status(404).send("Event data could not be found.");
  let { index } = req.params;
  if (!index) return res.status(400).send("No index specified.");
  if (index === "last" || index === "-1") index = events.length - 1;
  if (!events[index])
    return res.status(404).send("An event with index '" + index + "' does not exist.");
  return res.status(200).send(events[index]);
});

//Endpunkt 2
app.post("/events/post", (req, res) => {
  if (!events)
    return res.status(404).send({ message: "Source data not found." });
  const newEvent = {};
  for (const key in req.body) {
    if (!Object.keys(events[0]).includes(key)) continue;
    newEvent[key] = req.body[key];
  }
  //Fehlerbehandlung die pr??ft, ob alle geforderten Attribute mitgegeben werden
  for (const key of eventKeys) {
    if (!newEvent[key])
      return res.status(418).send({
          message: "Please make sure the event contains the following data:" + Object.keys(events[0]) + "!",
        });
  }
  //Fehlerbehandlung 2 die pr??ft, ob ein Event mit dem Index bereits vorhanden ist
  const duplicatedTitle = events.find(
    (e) => e.title.trim() == newEvent.title.trim()
  );
  if (duplicatedTitle)
    return res.status(409).send({ message: "An item with this title already exists." });
  events.push(newEvent);

  saveData();
  res.status(201).send({
    message: `The event: '${newEvent.title}' was successfully added.`,
    event: newEvent,
  });
});

///Endpunkt 3
app.delete("/events/delete/:index", (req, res) => {
  if (!events) return res.status(404).send("Event data could not be found.");
  if (events.length === 0) return res.status(404).send("There are no events to delete.");

  if (!authorizationValid(req)) return res.status(401).send("Invalid login.");
  
  let { index } = req.params;
  if (index === "last" || index === "-1") index = events.length - 1;

  if (!events[index]) return res.status(404).send("An event with index: " + index + " does not exist.");

  const deletedEvent = events.splice(index, 1);

  saveData();

  return res.status(200).send({
    message: "This event was deleted:",
    event: deletedEvent,
  });
});

///Endpunkt 4

app.patch("/events/patch/:index", (req, res) => {
  if (!events) return res.status(404).send("Event data could not be found.");
  if (events.length === 0) return res.status(404).send("There are no bananas");

  let { index } = req.params;
  if (index === "last" || index === "-1") index = events.length - 1;
  if (!events[index])
    return res.status(404).send("An event with index: " + index + " does not exist.");

  for (const key in req.body) {
    if (!eventKeys.includes(key)) continue;
    events[index][key] = req.body[key];
  }

  saveData();

  return res.status(200).send({
    message: "The event was updated.",
    event: events[index],
  });
});
