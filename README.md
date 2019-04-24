# battleship-api

An API for a one-way game of battleships where one player always defends and the other always attacks.

## api/

This was described as being present for debug purposes.  
So for my own sake I made this more graphical.  
The 10x10 grid will show on top. (White is watter, Black is ships, Green is a miss, Red is a hit)  
The lower left point is [0,0] and latitude and logitude work the way they would on a real map.
After the grid the ships and shots are listed as bullets.

## api/reset

Resets the game

## api/ship/:latitude/:longitude/:type/:orientation

Will place a ship of the provided type at the given coordinates facing in the direction indicated by orientation.  
Errors will be throw if the ship placement is illegal or the ship is not available.

## api/shot/:latitude/:longitude

Will place a shot at the provided coordinates.  
Errors will be throw if all ships have not been placed, if the shot is outside the grid or if another shot has been fired at the same location.  
If the shot misses the return value will be 'Miss'  
If the shot hits a ship but doesn't sink it the return value will be 'Hit'  
If the shot sinks a ship the return value will be 'You just sank the <ship-type>'  
If the shot sinks the last ship the return value is 'Game over' and how many shots it took to complete.

## Build

```
yarn build
```

or

```
npm run-script build
```

## Test

```
yarn test
```

or

```
npm run-script test
```

## Run

```
yarn dev
```

or

```
npm run-script dev
```
