var roleUpgrader = {

    run: function(creep) {
	    this._performAction(creep);
	},
	
	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          this._gatherEnergy(creep);
	          break;
          case 'upgrading':
              this._upgradeController(creep);
              break;
	  }
	  
	},
	
	_determineState: function(creep) {
	    if (creep.memory.gathering && creep.carry.energy < creep.carryCapacity){
	        this._updateState(creep, 'gathering');
	    }
	    else if (creep.memory.gathering && creep.carry.energy >= creep.carryCapacity){
	        this._updateState(creep, 'upgrading');
	    }
	    else if (creep.memory.upgrading && creep.carry.energy > 0){
	        this._updateState(creep, 'upgrading');
	    }
	    else if (creep.memory.upgrading && creep.carry.energy < 1){
	        this._updateState(creep, 'gathering');
	    }
	    else {
	        this._updateState(creep, 'gathering');
	    }
	},
	
	_updateState: function(creep, state){
	    creep.memory.state = state;
	},
	
	_gatherEnergy: function(creep) {
	    creep.memory.gathering = true;
	    creep.memory.upgrading = false;
        
        var source = this._determineGatheringNode(creep);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
	},
	
	_determineGatheringNode: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var source;
        
        switch(creep.memory.group){
            case '1': 
                source = sources[0];
                break;
            case '2':
                source = sources[1];
                break;
        }
        return source;
	},
	
	_upgradeController: function(creep) {
	    creep.memory.upgrading = true;
	    creep.memory.gathering = false;
	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleUpgrader;