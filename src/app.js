const express = require('express');
const app = express();

// Define specific routes first
app.get("/test", (req, res) => {
   res.send('Test  from the server');
});

app.post("/user", (req, res) => {
   res.send("post method call");
});
app.delete("/demo", (req, res) => {
   res.send("de method call");
});
app.put("/edit", (req, res) => {
   res.send("update method call");
});

app.listen(8888, () => {
   console.log('Server is successfully listening on port 8888...');
});