import { ShipRepository, ShotRepository } from './repositories';
import { getShipLengthFromType, didShotHit } from './utilities';
import { IShip, IShot } from './schemas';
import AuthorizationError from './AuthorizationError';
import express from 'express';
const app = express();

app.get('/attack/:latitude/:longitude', async function(req, res) {
  const { latitude, longitude } = req.params;
  try {
    let isHit = await ShotRepository.instance().create(latitude, longitude);
    if (isHit === true) {
      res.send('HIT');
    } else {
      res.send('MISS');
    }
  } catch (err) {
    if (err instanceof AuthorizationError) {
      res.status(401);
    } else {
      res.status(400);
    }
    res.send('Failed to place shot: ' + err);
  }
});

app.get('/ship/:latitude/:longitude/:type/:orientation', async function(
  req,
  res
) {
  const { latitude, longitude, type, orientation } = req.params;
  try {
    let result = await ShipRepository.instance().create(
      latitude,
      longitude,
      type,
      orientation
    );
    res.send('Placed ' + type);
  } catch (err) {
    if (err instanceof AuthorizationError) {
      res.status(401);
    } else {
      res.status(400);
    }
    res.send('Failed to place ship: ' + err);
  }
});

app.get('/reset', async function(req, res) {
  await ShipRepository.instance().reset();
  await ShotRepository.instance().reset();
  res.send('reset successfully');
});

app.get('/', async function(req, res) {
  let ships = (await ShipRepository.instance().get()) as [IShip];
  let shipString = '';
  for (let ship of ships) {
    shipString += `<li>[${ship.latitude},${ship.longitude}]: ${ship.type} (${
      ship.orientation
    })</li>`;
  }
  shipString = `<h3>Ships:</h3><ul>${shipString}</ul>`;

  let shots = (await ShotRepository.instance().get()) as [IShot];
  let shotString = '';
  for (let shot of shots) {
    let isHit = didShotHit(shot.latitude, shot.longitude, ships);
    shotString += `<li>[${shot.latitude},${shot.longitude}]: ${
      isHit ? 'HIT' : 'MISS'
    }</li>`;
  }
  shotString = `<h3>Shots:</h3><ul>${shotString}</ul>`;

  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
  for (let ship of ships) {
    let length = getShipLengthFromType(ship.type);
    for (let i = 0; i < length; i++) {
      if (ship.orientation === 'vertical') {
        grid[ship.latitude + i][ship.longitude] = 1;
      } else {
        grid[ship.latitude][ship.longitude + i] = 1;
      }
    }
  }

  for (let shot of shots) {
    if (didShotHit(shot.latitude, shot.longitude, ships)) {
      grid[shot.latitude][shot.longitude] = 3;
    } else {
      grid[shot.latitude][shot.longitude] = 2;
    }
  }

  let rows = '';
  for (let i = 0; i < 10; i++) {
    let row = '';
    for (let j = 0; j < 10; j++) {
      let color = getColorFromNumber(grid[i][j]);
      row += `<td width=30 height=30 style="color:black; border:solid; border-width:1; background-color:${color}"></td>`;
    }
    rows = `<tr>${row}</tr>` + rows; //Note these are added in reverse order to ensure latitude points north
  }
  let map = `<table style="border:solid;">${rows}</table>`;

  res.send(map + shipString + shotString);
});

const getColorFromNumber = (number: number) => {
  switch (number) {
    case 0:
      return 'white';
    case 1:
      return 'black';
    case 2:
      return 'green';
    case 3:
      return 'red';
    default:
      throw new Error('Unknown color type:' + number);
  }
};

app.listen(4000);
