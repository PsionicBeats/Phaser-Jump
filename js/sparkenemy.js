((Phaser, Game, CFG) => {
	if (Game === undefined) {
		Game = window.Game = {};
	}

	const SPAWN_Y_OFFSET = 103;

	Game.GhostEnemy = class extends Game.Enemy{
		constructor(game, x, y){
			super(game, x, y + SPAWN_Y_OFFSET, 'baddie-1.png');
      		this.sprite.body.setSize(15, 75, 75, 27);
		}
	}
})