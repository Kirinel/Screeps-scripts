
export var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if(creep.memory.boosted) {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
            }
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.upgrading) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {reusepath: 20, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // var closestContainer = creep.room.find(FIND_STRUCTURES, {
                //     filter: structure => structure.structureType == STRUCTURE_CONTAINER
                // });
                // if(closestContainer.length) {
                //     if(creep.withdraw(closestContainer[creep.memory.workingLoc], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(closestContainer[creep.memory.workingLoc], {reusepath: 20, visualizePathStyle: {stroke: '#ffaa00'}})
                //     }
                // }
                // else 
                if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {reusepath: 20, stroke: '#ffaa00'}})
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