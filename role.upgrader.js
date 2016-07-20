var HiveMind = require('hive.mind');
var roleUpgrader = {

    run: function(creep) {
	    this._performAction(creep);
	},
	
	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          HiveMind.gatherEnergy(creep);
	          break;
          case 'upgrading':
              HiveMind.upgradeController(creep);
              break;
	  }
	  
	},
	
	_determineState: function(creep) {

		if (creep.memory.gathering){
	    	if (creep.carry.energy < creep.carryCapacity) {
	    		HiveMind.updateState(creep, 'gathering');
	    	} else {
    			if (target = HiveMind.canDeliver(creep)){
    				HiveMind.updateState(creep, 'upgrading');
    				HiveMind.setTarget(creep, target);
    			}
    		}
    	} else {
			if (creep.carry.energy > 0) {
				HiveMind.updateState(creep, 'upgrading');
			} else {
				HiveMind.updateState(creep, 'gathering');
			}
		}
	}
};

module.exports = roleUpgrader;