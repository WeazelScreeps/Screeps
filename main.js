var roomEnergy = require('status.room.energy');
var roleHandler = require('role.handler');
var creepResupply = require('creep.resupply');
var towerHandler = require('tower.handler');

module.exports.loop = function () {
    
    roomEnergy.monitor();
    
    roleHandler.delegate();

    creepResupply.manage(roomEnergy.getCurrent());

	var tower1 = Game.getObjectById('578c3de0e949c1f60f168221');
	var tower2 = Game.getObjectById('57901a17cf166c723f8beee2');
    towerHandler.run(tower1);
    towerHandler.run(tower2);
    
}