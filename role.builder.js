var roleBuilder = {

    run: function(creep) {

	    this._performAction(creep);
	},

	_performAction: function(creep) {
	  this._determineState(creep);
	  switch(creep.memory.state){
	      case 'gathering':
	          this._gatherEnergy(creep);
	          break;
          case 'building':
              this._build(creep, creep.memory.target);
              break;
          case 'repairing':
      		  this._repair(creep, creep.memory.target);
      		  break;
  		  case 'idle':
  		  	  creep.moveTo(creep.memory.target);	
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
    		if (target = this._canBuild(creep)) {
    			if (creep.carry.energy > 0) {
    				this._updateState(creep, 'building');
    				this._setTarget(creep, target);
				} else {
					this._updateState(creep, 'gathering');
				}
			} else if (target = this._canRepair(creep)) {
				if (creep.carry.energy > 0) {
					this._updateState(creep, 'repairing');
					this._setTarget(creep, target);
				} else {
					this._updateState(creep, 'gathering');
				}
			} else{
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
	    creep.memory.building = false;
	    creep.memory.repairing = false;
	    creep.memory.idle = false;
        
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
	
	_build: function(creep, target) {
	    creep.memory.building = true;
	    creep.memory.repairing = false;
	    creep.memory.gathering = false;
	    creep.memory.idle = false;
	    

        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }    
	    
	},

	_repair: function (creep, target) {
		creep.memory.repairing = true;
		creep.memory.building = false;
		creep.memory.gathering = false;
		creep.memory.idle = false;

		if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
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
	},

	_canBuild: function (creep) {
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length > 0){
			return targets[0];
		}
		return false;
	},

	_canRepair: function (creep) {
		var repairable = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        return repairable;
	}
};

module.exports = roleBuilder;