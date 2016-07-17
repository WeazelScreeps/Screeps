var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleHandler = {
    delegate: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            switch(creep.memory.role){
                case 'builder':
                    roleBuilder.run(creep);
                    break;
                case 'upgrader':
                    roleUpgrader.run(creep);
                    break;
                case 'harvester':
                    roleHarvester.run(creep);
                    break;
                    
            }
        }
    }
}

module.exports = roleHandler;