
export var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.carrying = false;
        }
        if(creep.store.getFreeCapacity() === 0 || creep.store[RESOURCE_ENERGY] >= 300) {
            creep.memory.carrying = true;
        }

        if(creep.memory.carrying) {
            if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffff33'}});
            }
        }
        else {
            var dropped = creep.room.find(FIND_DROPPED_RESOURCES);
            dropped.sort((a,b) => b.amount - a.amount);

            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.structureType === STRUCTURE_CONTAINER
            });
            containers.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
            if(dropped.length && creep.pickup(dropped[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#ffff33'}});
            }
            else if(containers.length && containers[0].store[RESOURCE_ENERGY] > 0) {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
        }
    }
};