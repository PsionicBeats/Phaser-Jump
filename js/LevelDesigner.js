/*

  level width = 750
  designer breaks it in 25px chunks
  30 wide
  level1,

  ## Should dynamically set the game vertical bounds, remove from CFG

  level format

`-----------------------------|
     ___o___                  | // o = ammo for spitting, regenerates every 30 seconds
                              |
                              |
                              |
                              |
                              |
                    ___*___   | // * = bad guy 2
                              |
                              |
                              |
     ____@______              | // @ = bad guy 1
                              |
                              |
                              |
                ______________| // hero can jump up "8" rows
                              |
                              |
                              |
________________              |
                              |
                              |
                              |
------------------------------|

width of game is 750
______________________________| 25px

_______  1 = 7
___________  2 = 11
______________  3 = 14
________________  4 = 16

real dimensions
1 = 175
2 = 265
3 = 340
4 = 400
*/
((Phaser, Game, CFG) => {
  // get or create Game module
  if( Game === undefined ){
    Game = window.Game = {};
  }

  const PARTS = {
    PLATFORM : '_',
    WALL : '|',
    SPACE : ' ',
    GHOST_ENEMY : '@',
    SPARK_ENEMY : '*',
    AMMO : 'o',
  };
  const SEGMENTS = {
    7 : 1,
    11 : 2,
    14 : 3,
    16 : 4
  };
  const COL_WIDTH = 25;
  const ROW_HEIGHT = 50;
  const ROW_OFFSET = 100;

  const levels = {
    1 :
`-----------------------------|
                              |
                              |
                              |
                              |
___o___     ___o___    ___o___|
                              |
                              |
                              |
                              |
     _______                  |
                              |
                              |
                              |
                              |
     _______                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     ___________              |
                              |
                              |
                              |
                ______________|
                              |
                              |
                              |
________________              |
                  ___________ |
                              |
                              |
                              |
                              |
     __@____                  |
                              |
                              |
                              |
                              |
                              |
                    ___o___   |
                              |
                              |
                              |
     ____@______              |
                              |
                              |
                              |
                ______________|
                              |
                              |
                              |
_*_____*________              |
                  ______o_o__ |
                              |
                              |
                              |
                              |
     ____o__                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     __@________              |
                              |
                              |
                              |
                *_____________|
                              |
                              |
                              |
_____@__________              |
                              |
                              |
                              |
------------------------------|` // level 1
  };

  const spawnPlatform = (game, x, y, size) => {
    x *= COL_WIDTH;
    y *= ROW_HEIGHT;
    y += ROW_OFFSET;
    Game.platformsGroup.add(new Game.Platform(game, x, y, size).sprite);
  };

  /*
   * type class : GhostEnemy | SparkEnemy | Ammo
   */
  const spawn = (game, x, y, SpawnableClass) => {
    x *= COL_WIDTH;
    y *= ROW_HEIGHT;
    y += ROW_OFFSET;
    // instantiate the subclass of Enemy
    switch(SpawnableClass){
      case Game.GhostEnemy:
        Game.enemiesGroup.add(new Game.GhostEnemy(game, x, y).sprite);
        break;
      case Game.SparkEnemy:
        Game.enemiesGroup.add(new Game.SparkEnemy(game, x, y).sprite);
        break;
      case Game.Ammo: new Game.Ammo(game, x, y); break;
    }
  };

  const spawnRow = game => ( row, y ) => {
    // discover platforms
    let parts = row.split('');
    let spawns = parts
      .map( cell => cell === PARTS.WALL ? PARTS.SPACE : cell )
      .reduce((lastPart, curPart, x) => {
        // building a platform at the end of a sequence of underscores
        // enemies count as a platform
        if([
          PARTS.PLATFORM,
          PARTS.GHOST_ENEMY,
          PARTS.SPARK_ENEMY,
          PARTS.AMMO
        ].indexOf(curPart) >= 0 ){ // add to the sequence

          if( curPart === PARTS.GHOST_ENEMY ){
            spawn(game, x, y, Game.GhostEnemy);
          } else if( curPart === PARTS.SPARK_ENEMY ){
            spawn(game, x, y, Game.SparkEnemy);
          } else if( curPart === PARTS.AMMO ){
            spawn(game, x, y, Game.Ammo);
          }

          return lastPart + curPart;
        } else { // not in sequence
          if( lastPart.length > 0 ){ // end of a sequence
            spawnPlatform(game, x-lastPart.length, y, SEGMENTS[lastPart.length]);
          }
          return ''; // reset sequence
        }
      }, '');
  };

  const load = ( game, levelId ) => {

    if( !levels.hasOwnProperty(levelId) ){
      throw RangeError(`Level ID:${levelId} has not yet been designed.`);
    }

    let level = levels[levelId];
    // ignore top and bottom rows, always have a floor
    // scan each row from bottom(end) to top(beginning)
    let levelRows = level.split(`\n`).reverse();
    levelRows.pop();
    levelRows.shift();

    CFG.GAME_HEIGHT = levelRows.length * ROW_HEIGHT + ROW_OFFSET;

    // spawn the floor
    spawnPlatform(game, -3, -1, 4);
    spawnPlatform(game, 6, -1, 4);
    spawnPlatform(game, 17, -1, 4);

    levelRows.forEach(spawnRow(game));

  };

  Game.LevelDesigner = {
    load
  };

})(window.Phaser, window.Game, window.Game.Configuration);