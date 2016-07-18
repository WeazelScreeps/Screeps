var roomEnergy = require('status.room.energy');
var roleHandler = require('role.handler');
var creepResupply = require('creep.resupply');
var towerHandler = require('tower.handler');

module.exports.loop = function () {
    
    roomEnergy.monitor();
    
    roleHandler.delegate();

    creepResupply.manage(roomEnergy.getCurrent());
    
}