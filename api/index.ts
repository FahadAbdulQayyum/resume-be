const express = require('express');

const app = express();

app.get('/', (req, res) => res.send("Express on vercell"));

app.listen(3000, ()=> console.log('Server is ready on 3000'));

module.exports = app;