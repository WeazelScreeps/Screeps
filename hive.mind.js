var hiveMind = {

	// Actions
	
	build: function(creep, target) {
	    creep.memory.building = true;
	    creep.memory.repairing = false;
	    creep.memory.upgrading = false;
	    creep.memory.gathering = false;
	    creep.memory.scavenging = false;
	    creep.memory.delivering = false;
	    creep.memory.idle = false;
	    

        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }    
	    
	},

	repair: function (creep, target) {
		creep.memory.repairing = true;
		creep.memory.upgrading = false;
		creep.memory.building = false;
		creep.memory.gathering = false;
		creep.memory.scavenging = false;
		creep.memory.delivering = false;
		creep.memory.idle = false;

		if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	},

	gatherEnergy: function(creep) {
	    creep.memory.gathering = true;
	    creep.memory.scavenging = false;
	    creep.memory.building = false;
	    creep.memory.repairing = false;
	    creep.memory.upgrading = false;
	    creep.memory.delivering = false;
	    creep.memory.idle = false;
        
		var source = this._determineGatheringNode(creep);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source);
		}
	},

	deliverEnergy: function(creep, target) {
	    creep.memory.delivering = true;
	    creep.memory.gathering = false;
	    creep.memory.scavenging = false;
	    creep.memory.building = false;
	    creep.memory.repairing = false;
	    creep.memory.upgrading = false;
	    creep.memory.idle = false;
	    
        if(creep.transfer(Game.getObjectById(target.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(target.id));
        }    
	},

	upgradeController: function(creep) {
	    creep.memory.upgrading = true;
	    creep.memory.delivering = false;
	    creep.memory.gathering = true;
	    creep.memory.scavenging = false;
	    creep.memory.building = false;
	    creep.memory.repairing = false;
	    creep.memory.idle = false;
	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
	},

	scavenge: function(creep, target) {
		creep.memory.scavenging = true;
		creep.memory.gathering = false;
	    creep.memory.building = false;
	    creep.memory.repairing = false;
	    creep.memory.upgrading = false;
	    creep.memory.delivering = false;
	    creep.memory.idle = false;
		var energy = creep.pos.findInRange(
			FIND_DROPPED_ENERGY,
			1
		);
	},

	// Decisions

	determineRallyPoint: function (creep) {
		switch(creep.memory.group){
                case '1': 
                    return Game.flags.Rally1;
                    break;
                case '2':
                    return Game.flags.Rally2;
                    break;
            }
	},

	canBuild: function (creep) {
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length > 0){
			return targets[0];
		}
		return false;
	},

	canRepair: function (creep) {
		var repairable = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        return repairable;
	},

	canDeliver: function(creep) {
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

	canScavenge: function(creep) {
		var energy = creep.pos.findInRange(
			FIND_DROPPED_ENERGY,
			1
		);

		if (energy.length){
			return energy[0];
		}
		return false;
	},


	// Setters

	updateState: function(creep, state){
	    creep.memory.state = state;
	},

	setTarget: function(creep, target){
		creep.memory.target = target;
	},

	// Internal use only

	_determineGatheringNode: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var source;
        
        switch(creep.memory.group){
            case '1': 
                source = sources[0];
                break;
            case '2':
                source = sources[sources.length - 1];
                break;
        }
        return source;
	}
}

module.exports = hiveMind;