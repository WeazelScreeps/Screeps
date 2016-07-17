var roleHarvester = {

    run: function(creep) {
	    this._performAction(creep);
	},
	
	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          this._gatherEnergy(creep);
	          break;
          case 'delivering':
              this._deliverEnergy(creep, creep.memory.target);
              break;
      	  case 'idle':
      	  	  this._upgradeController(creep);
      	  	  break;

	  }
	  
	},
	
	_determineState: function(creep) {
		var target;
	    if (creep.memory.gathering && creep.carry.energy < creep.carryCapacity){
	        this._updateState(creep, 'gathering');
	    }
	    else if (creep.memory.gathering && creep.carry.energy >= creep.carryCapacity){
	        this._updateState(creep, 'delivering');
	    }
	    else if (creep.memory.delivering && creep.carry.energy > 0){
	        this._updateState(creep, 'delivering');
	    }
	    else if (creep.memory.delivering && creep.carry.energy < 1){
	        this._updateState(creep, 'gathering');
	    }
	    else {
	        this._updateState(creep, 'gathering');
	    }

	    if (creep.memory.gathering){
	    	if (creep.carry.energy < creep.carryCapacity) {
	    		this._updateState(creep, 'gathering');
	    	} else {
    			creep.memory.gathering = false;
    		}

    	} else {
    		if (target = this._canDeliver(creep)){
    			if (creep.carry.energy > 0) {
    				this._updateState(creep, 'delivering');
    				this._setTarget(creep, target);
				} else {
					this._updateState(creep, 'gathering');
				}
    		} else {
    			creep.memory.idle = true;
    			this._updateState(creep, 'idle');
				this._setTarget(creep, this._determineRallyPoint);
    		}
    	}
	},
	
	_updateState: function(creep, state){
	    creep.memory.state = state;
	},

	_setTarget: function(creep, target){
		creep.memory.target = target;
	},
	
	_gatherEnergy: function(creep) {
	    creep.memory.gathering = true;
	    creep.memory.delivering = false;
        
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
	
	_deliverEnergy: function(creep, target) {
	    creep.memory.delivering = true;
	    creep.memory.gathering = false;
	    creep.memory.idle = false;
	    
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }    
	},

	_canDeliver: function(creep) {
		var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) {
        	return targets[0];
        }
        return false;
	},

	_upgradeController: function(creep) {
	    creep.memory.upgrading = true;
	    creep.memory.gathering = false;
	    creep.memory.idle = false;

	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
	},

	_determineRallyPoint: function (creep) {
		switch(creep.memory.group){
                case '1': 
                    return Game.flags.Rally1;
                    break;
                case '2':
                    return Game.flags.Rally2;
                    break;
            }
	}
};

module.exports = roleHarvester;