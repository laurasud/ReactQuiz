const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/browse', require('./routes/browseRouter'));
app.use('/item', require('./routes/itemRouter'));
app.use('/favorite', require('./routes/addToFavoritesRouter'));

app.listen(port, function () {
    console.log('Example app listening at localhost:%s', port);
});
