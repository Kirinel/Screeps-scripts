export var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.room.name != creep.memory.bornIn) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.bornIn))
        }
        else {
            if(creep.memory.building) {
                const construction_targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    // filter: object => object.structureType === STRUCTURE_CONTAINER
                });
        
                if(construction_targets.length) {
                    // creep.moveTo(construction_targets[0], {reusepath: 10,visualizePathStyle: {stroke: '#ffffff'}});
                    if(creep.build(construction_targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(construction_targets[0], {reusepath: 50,visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else  {
                    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {reusepath: 50,visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                if(!creep.room.storage) {
                    if(!creep.memory.closestContainer) {
                        var closestContainer = creep.room.find(FIND_STRUCTURES, {
                            filter: structure => structure.structureType == STRUCTURE_CONTAINER
                        });
                        if(closestContainer.length) {
                            creep.memory.closestContainer = closestContainer[creep.memory.workingLoc % closestContainer.length].id;
                        }
                    }
                    var targetContainer = Game.getObjectById(creep.memory.closestContainer);
                    if(targetContainer && creep.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetContainer, {reusepath: 50,visualizePathStyle: {stroke: '#ffaa00'}})
                    }
                }
                // const dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                
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
                    creep.moveTo(creep.room.storage, {reusepath: 50,visualizePathStyle: {stroke: '#aa00ff'}});
                }
            }
        }

        
    }
};