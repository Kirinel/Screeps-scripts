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
    
            const repair_walls = repair_structures.filter(object => object.hits < object.hitsMax && 
                object.structureType === STRUCTURE_WALL || object.structureType === STRUCTURE_RAMPART);
            repair_walls.sort((a,b) => a.hits - b.hits);
    
            if(construction_targets.length) {
                creep.moveTo(construction_targets[0], {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}});

                if(creep.build(construction_targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction_targets[0], {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // else if(repair_roads.length > 0) {
            //     if(creep.repair(repair_roads[0]) === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(repair_roads[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
            else if(repair_walls.length > 0) {
                if(creep.repair(repair_walls[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_walls[0], {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // else if(creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 && creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //     creep.moveTo(creep.room.storage, {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}})
            // }
            else  {
                creep.moveTo(creep.room.controller, {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}});

                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {reusePath: 15,visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            if(!creep.room.storage) {
                if(closestContainer.length) {
                    if(creep.withdraw(closestContainer[creep.memory.workingLoc], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestContainer[creep.memory.workingLoc], {reusePath: 15,visualizePathStyle: {stroke: '#ffaa00'}})
                    }
                }
            }
            // const dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // var closestContainer = creep.room.find(FIND_STRUCTURES, {
            //     filter: structure => structure.structureType == STRUCTURE_CONTAINER
            // });
            // if(dropped) {
            //     var res = creep.pickup(dropped)
            //     if(res === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            //     else if(res === OK) {
            //         creep.memory.building = true;
            //     }
            // }
            else if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {reusePath: 15,visualizePathStyle: {stroke: '#aa00ff'}});
            }
        }
    }
};