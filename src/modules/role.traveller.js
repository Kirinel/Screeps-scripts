
export var roleTraveller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() === 0 || creep.ticksToLive <= 400) {
            creep.memory.carrying = true;
        }
        if(creep.store.getFreeCapacity() === creep.store.getCapacity()) {
            creep.memory.carrying = false;
        }

        const pathrooms = ['E7S48', 'E7S49', 'E7S50', 'E8S50', 'E9S50','E10S50']
        
        var roomIndex = 0;
        for(var i = 0; i < pathrooms.length; i++) {
            if(creep.room.name === pathrooms[i]) {
                roomIndex = i;
                break;
            }
        } 


        const fillResourceType = RESOURCE_BIOMASS;

        // var fillTargets = Game.rooms['E7S48'].find(FIND_STRUCTURES, {
        //     filter: (structure)=> {
        //         return structure.structureType === STRUCTURE_FACTORY
        //     }
        // })

        if(creep.memory.carrying) {
            if(creep.room.name === 'E7S48') {
                if(creep.transfer(creep.room.storage, fillResourceType) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffff33'}});
                }
                else {
                    console.log('finished filling:',creep.ticksToLive);
                }
                // if(fillTargets.length) {
                //     if(creep.transfer(fillTargets[0], fillResourceType) === ERR_NOT_IN_RANGE) {
                //         creep.moveTo(fillTargets[0], {visualizePathStyle: {stroke: '#ffff33'}});
                //     }
                //     else {
                //         console.log('finished filling:',creep.ticksToLive);
                //     }
                // }
            }
            else {
                creep.moveTo(new RoomPosition(10, 41, 'E7S48'))
            }
            
        }
        else {
            if(creep.room.name === 'E10S47' || creep.room.name === 'E10S50') {
                // console.log('there')
                var targets = creep.room.find(FIND_DEPOSITS, {
                    filter: (deposit)=> {
                        return deposit.lastCooldown <= 80
                    }
                });
                targets.sort((a,b) => a.lastCooldown - b.lastCooldown)
                // console.log(targets)
                if(targets.length) {
                    if(creep.harvest(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
            else {
                // console.log('here')
                creep.moveTo(new RoomPosition(25, 25, pathrooms[roomIndex + 1]))
            }
            
        }
    }
};