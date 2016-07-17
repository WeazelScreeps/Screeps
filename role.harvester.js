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
              this._deliverEnergy(creep);
              break;
	  }
	  
	},
	
	_determineState: function(creep) {
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
	},
	
	_updateState: function(creep, state){
	    creep.memory.state = state;
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
	
	_deliverEnergy: function(creep) {
	    creep.memory.delivering = true;
	    creep.memory.gathering = false;
	    
	    var location = this._determineDeliveryLocation(creep);
	    if (location.type == 'node'){
	        if(creep.transfer(location.point, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(location.point);
            }    
	    }
	    else {
	    	if (creep.carry.energy < creep.carryCapacity){
	    		creep.memory.gathering = true;
	    		creep.delivering = false;
	    	}
	    	else {
	    		this._upgradeController(creep);
	    	}
	    }
	    
	},
	
	_determineDeliveryLocation: function(creep) {
	    var deliveryLocation = {};
	    var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) {
            deliveryLocation.type = 'node';
            deliveryLocation.point = targets[0];
        }
        else {
            deliveryLocation.type = 'rally';
            switch(creep.memory.group){
                case '1': 
                    deliveryLocation.point = Game.flags.Rally1;
                    break;
                case '2':
                    deliveryLocation.point = Game.flags.Rally2;
                    break;
            }
        }
        return deliveryLocation;
	},

	_upgradeController: function(creep) {
	    creep.memory.upgrading = true;
	    creep.memory.gathering = false;
	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleHarvester;