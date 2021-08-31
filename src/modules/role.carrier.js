
export var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.carrying = false;
        }
        if(creep.store.getFreeCapacity() === 0 || creep.store[RESOURCE_ENERGY] >= 300) {
            creep.memory.carrying = true;
            creep.memory.target_container = null;
        }

        if(creep.memory.carrying) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION 
                        || structure.structureType === STRUCTURE_SPAWN)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        //  && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 300;
                }
            });
            // var targets = [];
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_TOWER 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
            else if(towers.length) {
                if(creep.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
            else {
                const needy_creeps = creep.room.find(FIND_MY_CREEPS, 
                    {filter: object => object.memory.role !== 'harvester' && object.memory.role !== 'carrier' && object.memory.role !== 'upgrader'}
                );
                needy_creeps.sort((a,b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
                // console.log(needy_creeps);
                if(creep.transfer(needy_creeps[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(needy_creeps[0], {visualizePathStyle: {stroke: '#ffff33'}})
                }
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
            else {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
            
        }
    }
};