
export var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.carrying = true;
        }
        if(creep.store.getFreeCapacity() === creep.store.getCapacity()) {
            creep.memory.carrying = false;
        }

        const fillTargetStructureType = STRUCTURE_POWER_SPAWN;
        const fillResourceType = RESOURCE_POWER;
        const source = creep.room.terminal

        var fillTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === fillTargetStructureType 
                    && structure.store.getFreeCapacity(fillResourceType) > creep.store.getCapacity()
            }
        });

        if(!fillTargets.length) {
            creep.moveTo(6, 17);
        }

        if(creep.memory.carrying) {
            if(creep.transfer(fillTargets[0], fillResourceType) === ERR_NOT_IN_RANGE) {
                creep.moveTo(fillTargets[0], {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
            }
        }
        else {
            if(fillTargets.length && creep.withdraw(source, fillResourceType) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {reusePath: 50, stroke: '#ffff33'}});
            }
        }


        // ///////////////////////////装填nuker////////////////////
        // var nuker = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return structure.structureType === STRUCTURE_NUKER 
        //             && structure.store.getFreeCapacity(RESOURCE_GHODIUM) > 0
        //     }
        // });

        // if(creep.memory.carrying) {
        //     if(nuker.length) {
        //         if(creep.transfer(nuker[0], RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
        //             creep.moveTo(nuker[0], {visualizePathStyle: {stroke: '#ffff33'}});
        //         }
        //     }
        // }
        // else {
        //     if(creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffff33'}});
        //     }
        // }

        // //////////////////////////////////////////////////////////////////////

        // //寻找lab放进去，之后改写upgrader逻辑，出生后强化再去工作
        // var lab = creep.room.lookForAt('structure', 8, 23)[0];
        // if(creep.memory.carrying) {
        //     for(const resourceType in creep.store) {
        //         if(lab.store.getFreeCapacity(resourceType) && creep.transfer(lab, resourceType) === ERR_NOT_IN_RANGE) {
        //             creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffff33'}});
        //         }
        //         else if(lab.store.getFreeCapacity(resourceType) === 0) {
        //             creep.memory.carrying = false;
        //         }
        //     }
        // }
        // else {
        //     if(lab.store[RESOURCE_ENERGY] < lab.store.getCapacity(RESOURCE_ENERGY)) {
        //         if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //             creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffff33'}});
        //         }
        //     }
        //     else if(lab.store[RESOURCE_CATALYZED_GHODIUM_ACID] < lab.store.getCapacity(RESOURCE_CATALYZED_GHODIUM_ACID)) {
        //         if(creep.withdraw(creep.room.storage, RESOURCE_CATALYZED_GHODIUM_ACID) === ERR_NOT_IN_RANGE) {
        //             creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffff33'}});
        //         }
        //     }
        // }
    }
};