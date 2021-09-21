const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json())


const fs = require("fs");
const data = require("./database.json");
const ufos = require("./ufo-data.json");
//
const events = require("./event-data.json");
//

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
)

app.get("/data", async (req, res) => {
    if (!ufos) return res.status(404).send({ message: "Data could not be found." });
    return res.status(200).send(data)
})

app.get("/test", (req, res) => {
    return res.status(223).send({ message: "Data"});
})

app.post("/banana", (req, res) => {
    
    const object = req.body;
    console.log(object);

    return res.status(200).send();
})

///EVENT DATA BASE BUSINESS
app.get("/events", async (req, res) => {
    if (events) return res.status(200).send(events)
    res.status(400).send("This data could not be found.");
})

//Endpunkt 1
app.get("/events/:index", (req, res) => {
    //return res.status(200).send(events);
    if (!events) return res.status(404).send("Events data could not be found.");
    const { index } = req.params;
    if (!index) return res.status(200).send(events);
    if (!events[index]) return res.status(404).send("A event with index: " + index + " does not exist.");   
    return res.status(200).send(events[index]);
  });
  
  //Endpunkt 2
  app.post("/events", (req, res) => {
    if (!events)
      return res.status(404).send({ message: "Source data not found." });
  
    const { index } = req.params;
    const { title, date, start, end, city, country, location, adress, description, image } = req.body;
  
    //Fehlerbehandlung die prüft, ob alle geforderten Attribute mitgegeben werden
    if (
      !(title &&
      date &&
      start &&
      end &&
      city &&
      country &&
      location &&
      adress &&
      description &&
      image)
    )
      return res.status(404).send({ message: "Please specify the event" });
    //Fehlerbehandlung 2 die prüft, ob ein Event mit dem Index bereits vorhanden ist
    const duplicatedTitle = events.find((e) => e.title.trim() == title.trim());
    if (duplicatedTitle)
      return res
        .status(409)
        .send({ message: "An item with this title already exists." });
    
    events.push({
      title: title,
      date: date,
      start: start,
      end: end,
      city: city,
      country: country,
      location: location,
      adress: adress,
      description: description,
      image: image,
    });
    const eventsToBeSaved = JSON.stringify(events, null, 2);
    fs.writeFile("./event-data.json", eventsToBeSaved, () =>
      console.log("Data written to file.")
    );
    res.status(200).send({
      message: `The item '${title}' was successfully added.`,
    });
  });

///Endpunkt 3 
app.delete("/events/:index", (req, res) => {

  console.log("executed");
  if (!events) return res.status(404).send("Events data could not be found.");
  
  const { index } = req.params;

  if (!events[index]) return res.status(404).send("A event with index: " + index + " does not exist.");   

  return res.status(200).send({
    message: "This event would have been deleted" ,
    event: events[index]});




});









///


/*app.post("/data/:name", (req, res) => {
    if (!data) return res.status(404).send({ message: "Source data not found." })

    const { name } = req.params;
    const { content } = req.body;

    if (!content) return res.status(418).send({ message: "Please specify the content of the item." })

    const duplicate = data.find(d=>d.name.trim() == name.trim())
    if (duplicate) return res.status(409).send({ message: "An item with this name already exists." })
    data.push({
        name: name,
        content: content,
    })
    const dataToBeSaved = JSON.stringify(data, null, 2)
    fs.writeFile("./database.json", dataToBeSaved, () => console.log("Data written to file."))
    res.status(200).send({
        message: `The item '${name}' with content: '${content}' was successfully added.`
    })
})
*/



app.get("/ufo", async (req, res) => {
    if (!ufos) return res.status(404).send("UFO data could not be found.");
    return res.status(200).send(ufos)
})

app.get("/ufo/:index", async (req, res) => {
    if (!ufos) return res.status(404).send("UFO data could not be found.");
    const { index } = req.params;
    if (!index) return res.status(200).send(ufos)
    if (!ufos[index]) return res.status(404).send("A ufo sighting with index: " + index + " does not exist.")
    return res.status(200).send(ufos[index])
})




