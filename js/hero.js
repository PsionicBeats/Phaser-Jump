((Phaser, Game, CFG) => {
	If( Game === undefined){
		Game = window.Game = {};
	}

	Game.Hero = class{
		constructor(){
			
		}
	};

}) (window.Phaser, window.Game, window.Game.Configuration);