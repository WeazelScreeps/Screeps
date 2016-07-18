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
	      case 'scavenging':	
          	  HiveMind.scavenge(creep, creep.memory.target);
          	  break;
          case 'upgrading':
              HiveMind.upgradeController(creep);
              break;
	  }
	  
	},
	
	_determineState: function(creep) {

		if (creep.memory.gathering){
	    	if (creep.carry.energy < creep.carryCapacity) {
	    		if (target = HiveMind.canScavenge(creep)){
	    			HiveMind.updateState(creep, 'scavenging');
	    			HiveMind.setTarget(creep, target);
	    		} else {
	    			HiveMind.updateState(creep, 'gathering');
	    		}
	    	} else {
    			creep.memory.gathering = false;
    			if (target = HiveMind.canDeliver(creep)){
    				HiveMind.updateState(creep, 'upgrading');
    				HiveMind.setTarget(creep, target);
    			}
    		}
    	} else if (target = HiveMind.canScavenge(creep)) {
				if (creep.carry.energy < creep.carryCapacity) {
					HiveMind.updateState(creep, 'scavenging');
					HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'upgrading');
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