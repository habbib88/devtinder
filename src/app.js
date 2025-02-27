const express = require('express');
const app = express();

// Log all requests
app.use((req, res, next) => {
   console.log(`Request received: ${req.method} ${req.url}`);
   next();
});

// Define specific routes first
app.use("/hello", (req, res) => {
   res.send('Hello from the server');
});

app.use("/demo", (req, res) => {
   res.send('Demo');
});

// Define the catch-all route last
// app.use("/", (req, res) => {
//    res.send('from dashboard');
// });

app.listen(8888, () => {
   console.log('Server is successfully listening on port 8888...');
});