var HiveMind = require('hive.mind');
var roleHarvester = {

    run: function(creep) {
	    this._performAction(creep);
	},
	
	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          HiveMind.gatherEnergy(creep);
	          break;
          case 'delivering':
              HiveMind.deliverEnergy(creep, creep.memory.target);
              break;
          case 'scavenging':
          	  HiveMind.scavenge(creep, creep.memory.target);
      	  case 'idle':
      	  	  HiveMind.upgradeController(creep);
      	  	  break;

	  }
	  
	},
	
	_determineState: function(creep) {
		var target;
	    if (creep.memory.gathering){
	    	if (creep.carry.energy < creep.carryCapacity) {
	    		HiveMind.updateState(creep, 'gathering');
	    	} else {
    			creep.memory.gathering = false;
    			HiveMind.updateState(creep, 'delivering');
    		}

    	} else {
    		if (target = HiveMind.canDeliver(creep)){
    			if (creep.carry.energy > 0) {
    				HiveMind.updateState(creep, 'delivering');
    				HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'gathering');
				}
			else if (target = HiveMind.canScavenge(creep)) {
				if (creep.carry.energy < creep.carryCapacity) {
					HiveMind.updateState(creep, 'scavenging');
					HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'idle');
				}
    		} else {
    			creep.memory.idle = true;
    			HiveMind.updateState(creep, 'idle');
				HiveMind.setTarget(creep, HiveMind.determineRallyPoint(creep));
    		}
    	}
	}
};

module.exports = roleHarvester;