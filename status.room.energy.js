var currentRoomEnergy = 0;

var roomEnergy = {
    monitor: function(){
        for(var name in Game.rooms) {
            if (Game.rooms[name].energyAvailable != currentRoomEnergy){
                currentRoomEnergy = Game.rooms[name].energyAvailable;
            }
        }
    },
    
    getCurrent: function() {
        return currentRoomEnergy;
    }
    
}

module.exports = roomEnergy;