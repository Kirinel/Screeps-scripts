
export var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.room.name != creep.memory.bornIn) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.bornIn), {reusePath:50});
        }
        else {
            if(creep.memory.building) {
        
                const repair_structures = creep.room.find(FIND_STRUCTURES);
        
                const repair_walls = repair_structures.filter(object => object.hits < object.hitsMax && 
                    object.structureType === STRUCTURE_WALL || object.structureType === STRUCTURE_RAMPART);
                    // ||object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_CONTAINER);
                repair_walls.sort((a,b) => a.hits - b.hits);
        
                
                if(repair_walls.length > 0) {
                    if(creep.repair(repair_walls[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(repair_walls[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath:50});
                    }
                }
                else if(creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 && creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, reusePath:50})
                }
                else  {
                    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#aa00ff'}, reusePath:50});
                }
            }
        }
    }
};