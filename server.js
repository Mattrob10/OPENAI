const path = require('path');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv').config();


const app = express();

app.use(cors({ origin: '*' }))
app.use(express.static(path.join(__dirname, "client", "build")));
// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT=5500
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
