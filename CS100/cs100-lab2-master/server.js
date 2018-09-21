const express = require('express');
const path = require('path');
require('cross-fetch/polyfill');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const API_KEY = "6d521ba0-b77e-11e8-a4d1-69890776a30b";

// behavior for the index route
app.get('/', (req, res) => {
  const url = `https://api.harvardartmuseums.org/gallery?size=100&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('index', {galleries: data.records});
  });
});

app.get('/gallery/:gallery_id', function(req, res) {
  // res.send(`You are on gallery ${req.params.gallery_id}`);
  res.render('objects')
  // res.send('and now')
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});

// item
app.get('/item/:item_id', function(req, res) {
  // pass in url
  const url = `https://api.harvardartmuseums.org/object?size=100&objectnumber=${req.params.item_id}&apikey=${API_KEY}`;
  // create json output of item
  fetch(url)
  .then(response => response.json())
  .then(data => {
  // render the item id that you are in
  // example of number: 1969.172
  res.render('item', {item: data.records})
  }
}
