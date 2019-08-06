const express = require('express');
const cachedItems = require('../data/items.json');

const fs = require('fs');
const path = require('path');

const addToFavoritesRouter = express.Router();

const setFavorite = function (itemId, itemValue) {
    return cachedItems.find(function (item, index) {
        if (item.integerId === itemId) {
            cachedItems[index].favorite = itemValue;
            saveDataFile(cachedItems);
        } 
    }) || {};
};

function saveDataFile (dataObject) {
    fs.writeFile(path.dirname('../data/items.json'), JSON.stringify(dataObject), function (err) {
        if (err) return console.log(err);
    });
};

addToFavoritesRouter.post('/:id', (req, res) => {
    if (!req.body) {
        res.status(400).json("Request body not exist")
    }
    const id = req.params.id;
    const favoriteValue = req.body.favorite;
    const item = setFavorite(id, favoriteValue);
    res.status(200).json(item);
});

module.exports = addToFavoritesRouter;