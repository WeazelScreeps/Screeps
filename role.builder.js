var HiveMind = require('hive.mind');
var roleBuilder = {

    run: function(creep) {

	    this._performAction(creep);
	},

	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          HiveMind.gatherEnergy(creep);
	          break;
          case 'building':
              HiveMind.build(creep, creep.memory.target);
              break;
          case 'repairing':
      		  HiveMind.repair(creep, creep.memory.target);
      		  break;
  		  case 'idle':
  		  	  HiveMind.upgradeController(creep);	
	  }
	  
	},
	
	_determineState: function(creep) {
		var target;
	    if (creep.memory.gathering){
	    	if (creep.carry.energy < creep.carryCapacity) {
	    		this._updateState(creep, 'gathering');
	    	} else {
    			creep.memory.gathering = false;
    		}

    	} else {
    		if (target = HiveMind.canBuild(creep)) {
    			if (creep.carry.energy > 0) {
    				HiveMind.updateState(creep, 'building');
    				HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'gathering');
				}
			} else if (target = HiveMind.canRepair(creep)) {
				if (creep.carry.energy > 0) {
					HiveMind.updateState(creep, 'repairing');
					HiveMind.setTarget(creep, target);
				} else {
					HiveMind.updateState(creep, 'gathering');
				}
			} else{
				HiveMind.updateState(creep, 'idle');
				HiveMind.setTarget(creep, HiveMind.determineRallyPoint);
			}
		}
	}
};

module.exports = roleBuilder;