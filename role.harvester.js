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
    			if (target = HiveMind.canDeliver(creep)){
    				if (creep.carry.energy > 0) {
	    				HiveMind.updateState(creep, 'delivering');
	    				HiveMind.setTarget(creep, target);
					} else {
						HiveMind.updateState(creep, 'gathering');
					}
    			} else {
	    			HiveMind.updateState(creep, 'idle');
	    		}
    		}
    	} else if (creep.memory.delivering) {
    		if (target = HiveMind.canDeliver(creep)){
				if (creep.carry.energy > 0) {
    				HiveMind.updateState(creep, 'delivering');
    				HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'gathering');
				}
			} else {
    			HiveMind.updateState(creep, 'idle');
    		}
    	} else {
    		if (target = HiveMind.canDeliver(creep)){
    			if (creep.carry.energy > 0) {
    				HiveMind.updateState(creep, 'delivering');
    				HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'gathering');
				}
			} else {
    			if (creep.carry.energy == 0) {
	    		HiveMind.updateState(creep, 'gathering');
		    	} else {
					HiveMind.updateState(creep, 'idle');
					HiveMind.setTarget(creep, HiveMind.determineRallyPoint);
				}
    		}
    	}
	}
};

module.exports = roleHarvester;