
export var rolePowerCreep2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source_id = ['5bbcad6f9099fc012e63743d', '5bbcad6f9099fc012e63743e']
        var ps = Game.getObjectById('617b35eb3d8c504abbe070c5');

        if(creep.store[RESOURCE_ENERGY] > 0) {
            creep.memory.carrying = true;
        }
        if(creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.carrying = false;
        }
        if(creep.memory.regen_id === undefined) {
            creep.memory.regen_id = 0;
        }

        
        if(creep.memory.operate_spawn_time === undefined) {
            creep.memory.operate_spawn_time = 0;
        }

        creep.usePower(PWR_GENERATE_OPS);

        if(creep.ticksToLive < 200) {
            if(creep.renew(ps) === ERR_NOT_IN_RANGE) {
                creep.moveTo(ps);
            }
        }
        else {
            if(creep.room.name != 'E8S47') {
                creep.moveTo(new RoomPosition(22, 26, 'E8S47'), {reusePath: 50})
            }
            else {
                if(creep.store[RESOURCE_OPS] < 100) {
                    if(creep.withdraw(creep.room.storage, RESOURCE_OPS, 100) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
                else if(creep.store[RESOURCE_OPS] >= 800) {
                    if(creep.transfer(creep.room.storage, RESOURCE_OPS, 300) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
                else if(Game.time - creep.memory.operate_spawn_time > 900) {
                    var operateSpawnTime = creep.usePower(PWR_OPERATE_SPAWN, Game.spawns.Spawn1);
                    if(operateSpawnTime === OK) {
                        creep.memory.operate_spawn_time = Game.time;
                    }
                    else {
                        creep.moveTo(Game.spawns.Spawn1)
                    }
                }
                else {
                    var source_res = creep.usePower(PWR_REGEN_SOURCE, Game.getObjectById(source_id[creep.memory.regen_id]));
                    // console.log(Game.getObjectById(source_id[creep.memory.regen_id]));
                    if(source_res === ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(source_id[creep.memory.regen_id]));
                    }
                    else if(source_res === OK) {
                        creep.memory.regen_id = (creep.memory.regen_id + 1) % 2;    
                    }
                    else if(source_res === ERR_TIRED) {
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
                            if(targets.length > 0) {
                                if(creep.transfer(targets[targets.length - 1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[targets.length - 1], {reusePath: 10, visualizePathStyle: {stroke: '#ffff33'}});
                                }
                            }
                            else {
                                creep.moveTo(25, 23);
                            }
                        }
                        else {
                            if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY, 1000) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, {reusePath: 10, visualizePathStyle: {stroke: '#ffff33'}});
                            }
                        }
                    }    
                }
            }
        }
        

        
    }
};