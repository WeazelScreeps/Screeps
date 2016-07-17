var roomEnergy = require('status.room.energy');
var roleHandler = require('role.handler');
var creepResupply = require('creep.resupply');

module.exports.loop = function () {
    
    roomEnergy.monitor();
    
    roleHandler.delegate();

    creepResupply.manage(roomEnergy.getCurrent());
    
}