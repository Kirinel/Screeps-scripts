
export var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        hostiles.sort((a,b) => a.hits - b.hits);
        if(hostiles.length) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}})
            }
        }
        else {
            creep.moveTo(creep.memory.stay.x, creep.memory.stay.y);
        }
    }
};