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
              this._build(creep);
              break;
	  }
	  
	},
	
	_determineState: function(creep) {
	    if (creep.memory.gathering && creep.carry.energy < creep.carryCapacity){
	        this._updateState(creep, 'gathering');
	    }
	    else if (creep.memory.gathering && creep.carry.energy >= creep.carryCapacity){
	        this._updateState(creep, 'building');
	    }
	    else if (creep.memory.building && creep.carry.energy > 0){
	        this._updateState(creep, 'building');
	    }
	    else if (creep.memory.building && creep.carry.energy < 1){
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
	    creep.memory.building = false;
        
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
	
	_build: function(creep) {
	    creep.memory.building = true;
	    creep.memory.gathering = false;
	    
	    var location = this._determineBuildLocation(creep);
	    if (location.type == 'site'){
	        if(creep.build(location.point) == ERR_NOT_IN_RANGE) {
                creep.moveTo(location.point);
            }    
	    }
	    else if (location.type == 'repariable') {
	    	if(creep.repair(location.point) == ERR_NOT_IN_RANGE) {
                creep.moveTo(location.point);
            }
	    }
	    else {
	        creep.moveTo(location.point);
	    }
	    
	},
	
	_determineBuildLocation: function(creep) {
	    var buildLocation = {};
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	    var repairables = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.hits < structure.maxHits);
	    console.log(repairables);
        
        if(targets.length > 0) {
            buildLocation.type = 'site';
            buildLocation.point = targets[0];
        }
        else if (repairables.length > 0) {
        	buildLocation.type = 'repariable';
        	buildLocation.point = repairables[0];
        }
        else {
            buildLocation.type = 'rally';
            switch(creep.memory.group){
                case '1': 
                    buildLocation.point = Game.flags.Rally1;
                    break;
                case '2':
                    buildLocation.point = Game.flags.Rally2;
                    break;
            }
        }
        return buildLocation;
	}
};

module.exports = roleBuilder;