var towerHandler = {

	run: function() {

		var towers = [
			Game.getObjectById('578c3de0e949c1f60f168221');
		];

		for(var tower in towers){
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	        if(closestHostile) {
	            tower.attack(closestHostile);
	        }
	        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < structure.hitsMax
	        });
	        if(closestDamagedStructure) {
	            tower.repair(closestDamagedStructure);
	        }
	    }
	}	

}

module.exports = towerHandler;