const { ShipRepository, ShotRepository } = require('./repositories');
const express = require('express');
const app = express();

app.get('/attack/:latitude/:longitude', async function(req, res) {
  console.log('SHOT PARAMS:', req.params);
  const { latitude, longitude } = req.params;
  res.send('Hello World');
});

app.get('/ship/:latitude/:longitude/:type/:orientation', async function(
  req,
  res
) {
  console.log('SHIP PARAMS:', req.params);
  const { latitude, longitude, type, orientation } = req.params;
  let repo = new ShipRepository();
  try {
    let result = await repo.create(latitude, longitude, type, orientation);
    res.send('Placed ship');
  } catch (err) {
    res.send('Failed to place ship:' + err);
  }
});

app.get('/reset', async function(req, res) {
  //Reset both ships and shots
  res.send('reset successfully');
});

app.get('/', async function(req, res) {
  //List ships and shots
  let repo = new ShipRepository();
  let ships = await repo.get();
  console.log('SHIPS:', ships);
  res.send('Hello World');
});

app.listen(4000);
