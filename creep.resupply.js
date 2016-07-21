var maxEnergy = 500;
var defaultProps = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];

var creepResupply = {
    
    status: {
        harvesters: false,
        upgraders: false,
        builders: false,
    },
    
    currentEnergy: 0,
    
    manage: function(currentEnergy) {
        this._clearDeadNames();
        
        this.currentEnergy = currentEnergy;
        
        this._cascadeResupply();
        
    },
    
    _cascadeResupply: function() {
        this._manageHarvesterLevels();
        
        if (this.status.harvesters) {
            this._manageUpgraderLevels();
        }
        
        if (this.status.harvesters && this.status.upgraders){
            this._manageBuilderLevels();
        }
        
    },
    
    _clearDeadNames: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing dead creep: ', name);
            }
        }  
    },
    
    _manageHarvesterLevels: function() {
        
        var desiredUnits = {
            groupOne: 3,
            groupTwo: 3
        };
        var groupOneFilled = false;
        var groupTwoFilled = false;
        
        var current = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var groupOne = _.filter(current, (creep) => creep.memory.group == '1');
        var groupTwo = _.filter(current, (creep) => creep.memory.group == '2');
        
        if (groupOne.length < desiredUnits.groupOne){
            this._spawnCreep(defaultProps, {role: 'harvester', group: '1', state: 'gathering'});
        }
        else {
            groupOneFilled = true;
        }
        
        if (groupOneFilled){
            if (groupTwo.length < desiredUnits.groupTwo){
                this._spawnCreep(defaultProps, {role: 'harvester', group: '2', state: 'gathering'});
            }
            else {
                groupTwoFilled = true;
            }
        }
        
        
        if (groupOneFilled && groupTwoFilled){
            this.status.harvesters = true;
        }
      
    },
    
    _manageUpgraderLevels: function() {

        var desiredUnits = {
            groupOne: 1,
            groupTwo: 1
        };
        var groupOneFilled = false;
        var groupTwoFilled = false;
        
        var current = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var groupOne = _.filter(current, (creep) => creep.memory.group == '1');
        var groupTwo = _.filter(current, (creep) => creep.memory.group == '2');
        
        if (groupOne.length < desiredUnits.groupOne){
            this._spawnCreep(defaultProps, {role: 'upgrader', group: '1', state: 'gathering'});
        }
        else {
            groupOneFilled = true;
        }

        if (groupOneFilled){
            if (groupTwo.length < desiredUnits.groupTwo){
                this._spawnCreep(defaultProps, {role: 'upgrader', group: '2', state: 'gathering'});
            }
            else {
                groupTwoFilled = true;
            }
        }
        
        
        if (groupOneFilled && groupTwoFilled){
            this.status.upgraders = true;
        }
    },
    
    _manageBuilderLevels: function() {
        
        var desiredUnits = {
            groupOne: 3,
            groupTwo: 3
        };
        var groupOneFilled = false;
        var groupTwoFilled = false;
        
        var current = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var groupOne = _.filter(current, (creep) => creep.memory.group == '1');
        var groupTwo = _.filter(current, (creep) => creep.memory.group == '2');
        
        if (groupOne.length < desiredUnits.groupOne){
            this._spawnCreep(defaultProps, {role: 'builder', group: '1', state: 'gathering'});
        }
        else {
            groupOneFilled = true;
        }

        if (groupOneFilled){
            if (groupTwo.length < desiredUnits.groupTwo){
                this._spawnCreep(defaultProps, {role: 'builder', group: '2', state: 'gathering'});
            }
            else {
                groupTwoFilled = true;
            }
        }
        
        
        if (groupOneFilled && groupTwoFilled){
            this.status.builders = true;
        }
    },
    
    _spawnCreep: function(props, options) {
        if (this.currentEnergy < maxEnergy){
            return false;
        }
        var newName = Game.spawns.Spawn1.createCreep(props, undefined, options);
        //console.log('Spawning new ' + options.role +': ' + newName);
    }
    
}

module.exports = creepResupply;