export var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            const construction_targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                // filter: object => object.structureType === STRUCTURE_CONTAINER
            });
    
            const repair_structures = creep.room.find(FIND_STRUCTURES);
    
            const repair_roads = repair_structures.filter(object => object.hits < object.hitsMax && object.structureType === STRUCTURE_ROAD);
            repair_roads.sort((a,b) => a.hits - b.hits);
    
            const repair_walls = repair_structures.filter(object => object.hits < object.hitsMax && object.structureType === STRUCTURE_WALL);
            repair_walls.sort((a,b) => a.hits - b.hits);
    
            const repair_others = repair_structures.filter(object => object.hits < object.hitsMax 
                && object.structureType !== STRUCTURE_ROAD
                && object.structureType !== STRUCTURE_WALL);
            repair_others.sort((a,b) => a.hits - b.hits);
    
            if(construction_targets.length) {
                if(creep.build(construction_targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(repair_roads.length > 0) {
                if(creep.repair(repair_roads[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_roads[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(repair_others.length > 0) {
                if(creep.repair(repair_others[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_others[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(repair_walls.length > 0) {
                if(creep.repair(repair_walls[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_walls[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 && creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            else  {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_CONTAINER
            })
            if(creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#aa00ff'}});
            }
        }
    }
};