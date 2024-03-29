
export var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.carrying = false;
        }
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.carrying = true;
        }
        if(creep.memory.carrying) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType === STRUCTURE_EXTENSION ||
                         structure.structureType === STRUCTURE_SPAWN)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        //  && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 300;
                }
            });
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_TOWER 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            towers.sort((a,b) => b.store.getFreeCapacity(RESOURCE_ENERGY) - a.store.getFreeCapacity(RESOURCE_ENERGY))

            // var labs = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return structure.structureType === STRUCTURE_LAB 
            //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            //     }
            // });
            // labs.sort((a,b) => b.store.getFreeCapacity(RESOURCE_ENERGY) - a.store.getFreeCapacity(RESOURCE_ENERGY))

            // var nuker = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return structure.structureType === STRUCTURE_NUKER 
            //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            //     }
            // });

            if(!creep.memory.powerspawn_id) {
                var temp = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_POWER_SPAWN 
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
                if(temp && temp.length) {
                    creep.memory.powerspawn_id = temp[0].id;
                }
                else {
                    creep.memory.powerspawn_id = 'powerspawn not available';
                }
            }
            var powerspawn = Game.getObjectById(creep.memory.powerspawn_id);

            if(targets.length > 0) {
                if(creep.transfer(targets[creep.memory.workingLoc % targets.length], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.workingLoc % targets.length], {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
            else if(towers.length) {
                if(creep.transfer(towers[creep.memory.workingLoc % towers.length], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[creep.memory.workingLoc % towers.length], {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
            // else if(labs.length) {
            //     if(creep.transfer(labs[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(labs[0], {reusePath: 10, visualizePathStyle: {stroke: '#ffff33'}});
            //     }
            // }
            // else if(nuker.length) {
            //     if(creep.transfer(nuker[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(nuker[0], {reusePath: 10, visualizePathStyle: {stroke: '#ffff33'}});
            //     }
            // }
            else if(powerspawn) {
                if(creep.transfer(powerspawn[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(powerspawn[0], {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                }
            }
        }
        else {
            if(!creep.room.storage) {
                if(!creep.memory.closestContainer) {
                    creep.memory.closestContainer = creep.room.find(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_CONTAINER
                    }).map(a=>a.id);
                }
                var closestContainer = creep.memory.closestContainer.map(a=>Game.getObjectById(a));
                if(closestContainer.length) {
                    var res = creep.withdraw(closestContainer[creep.memory.workingLoc % closestContainer.length], RESOURCE_ENERGY);
                    if(res == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestContainer[creep.memory.workingLoc % closestContainer.length], {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}})
                    }
                    else if(res === OK) {
                        creep.memory.carrying = true;
                    }
                }
            }
            else if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
            }
            
        }
    }
};


export var roleRemoteCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.carrying = false;
        }
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.carrying = true;
        }
        // var hostiles = [];
        // if(creep.room.name === creep.memory.workingRoom) {
        //     var hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
        //         filter: creep => creep.body.length != creep.getActiveBodyparts(MOVE) + creep.getActiveBodyparts(CARRY)
        //     }); 
        // }
        
        // if(hostiles.length) {
        //     if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(hostiles[0], {reusePath: 10, visualizePathStyle: {stroke: '#ff0000'}})
        //     }
        //     if(creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(hostiles[0], {reusePath: 10, visualizePathStyle: {stroke: '#ff0000'}})
        //     }
        // }

        
        // else
        if(creep.memory.carrying) {
            var target = Game.rooms[creep.memory.backTo].storage
            if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {reusePath: 50, visualizePathStyle: {reusePath: 50, stroke: '#ff0033'}});
            }
        }
        else {
            if(creep.room.name === creep.memory.workingRoom) {
                creep.memory.arrived = true;
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER 
                    }
                });
                if(containers.length) {
                    creep.memory.workingSite = containers[creep.memory.workingLoc % containers.length];
                }
                
            }
            if(creep.room.name != creep.memory.workingRoom  && !creep.memory.arrived) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workingRoom), {reusePath: 50, visualizePathStyle: {stroke: '#ff0033'}})
            }
            else {
                if(creep.memory.workingSite) {
                    var res = creep.withdraw(Game.getObjectById(creep.memory.workingSite.id), RESOURCE_ENERGY)
                    if(res === ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.workingSite.id), {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                    }
                    else if(res === OK) {
                        creep.memory.carrying = true;
                    }
                }
                
                
            }
            
        }
    }
};