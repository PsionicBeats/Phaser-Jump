// Note: Stuff below is newer syntax
(( Phaser, Game, CFG ) => {

//Set as null, will be set in a later step.
	Game.hero = null;
	Game.platformsGroup = null;
	Game.cursors = null;

  const preload = _ => {
	game.load.atlasJSONHash(
      CFG.ASSETS.GFX, 
      CFG.ASSETS.ATLAS_PNG_PATH, 
      CFG.ASSETS.ATLAS_JSON_PATH
    );
  };

  const create = _ => {

  };

  const update = _ => {
  };

  const game = new Phaser.Game(CFG.STAGE_WIDTH, CFG.STAGE_HEIGHT, Phaser.AUTO, CFG.GAME_CONTAINER_ID, { preload, create, update });

})(window.Phaser, window.Game, window.Game.Configuration);
