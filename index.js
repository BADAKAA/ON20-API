const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json())


const fs = require("fs");
const data = require("./database.json");
const ufos = require("./ufo-data.json");


app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
)

app.get("/data", async (req, res) => {
    if (!ufos) return res.status(404).send({ message: "Data could not be found." });
    return res.status(200).send(data)
})


app.post("/data/:name", (req, res) => {
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

app.get("/events", async (req, res) => {
    if (data) return res.status(200).send(data)
    res.status(400).send("This data could not be found.");
})


