
export var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.signController(creep.room.controller, "Peace and Farm alone. No offend and no war. Thanks./安心种田,有事私信好商量");
        if(creep.room.name != creep.memory.bornIn) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.bornIn))
        }
        else {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
            }
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.upgrading) {
                // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {reusepath: 50, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                
                if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {reusepath: 50, stroke: '#ffaa00'}})
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
                }
            }
        }
            
        // }
        // else {
        //     var lab_id = creep.room.lookForAt('structure', 8, 23)[0].id;
        //     var res = Game.getObjectById(lab_id).boostCreep(creep);
        //     if(res === OK || res === ERR_NOT_ENOUGH_RESOURCES) {
        //         creep.memory.boosted = true;
        //     }
        //     else {
        //         creep.moveTo(Game.getObjectById(lab_id))
        //     }
        // }
    }
};