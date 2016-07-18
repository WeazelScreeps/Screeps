var towerHandler = {

	run: function() {

		var tower = Game.getObjectById('578c3de0e949c1f60f168221');

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(!closestHostile && closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }

	}	

}

module.exports = towerHandler;