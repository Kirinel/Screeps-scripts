
export var rolePowerCreep2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const source_id = ['5bbcad989099fc012e6377d0','5bbcad989099fc012e6377ce']
        const ps = Game.getObjectById('62ef2f552c5330366d5ccf13');

        // creep.moveTo(creep.room.controller)
        // creep.enableRoom(creep.room.controller);

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
                creep.moveTo(ps, {reusePath: 50});
            }
        }
        else {
            if(creep.room.name != 'E11S47') {
                creep.moveTo(new RoomPosition(22, 26, 'E11S47'), {reusePath: 200})
                // console.log('moving')
            }
            else {
                if(creep.store[RESOURCE_OPS] < 100 && creep.room.storage.store[RESOURCE_OPS]) {
                    if(creep.withdraw(creep.room.storage, RESOURCE_OPS, 100) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 50});
                    }
                }
                else if(creep.store[RESOURCE_OPS] >= 800) {
                    if(creep.transfer(creep.room.storage, RESOURCE_OPS, 300) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 50});
                    }
                }
                else if(Game.spawns.Spawn6 && Game.time - creep.memory.operate_spawn_time > 900) {
                    var operateSpawnTime = creep.usePower(PWR_OPERATE_SPAWN, Game.spawns.Spawn6);
                    if(operateSpawnTime === OK) {
                        creep.memory.operate_spawn_time = Game.time;
                    }
                    else {
                        creep.moveTo(Game.spawns.Spawn6, {reusePath: 50})
                    }
                }
                else if(creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                }).length && creep.usePower(PWR_OPERATE_EXTENSION, creep.room.storage) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 50});
                    // console.log('spawn')
                }
                else {
                    var source_res = creep.usePower(PWR_REGEN_SOURCE, Game.getObjectById(source_id[creep.memory.regen_id]));
                    // console.log(Game.getObjectById(source_id[creep.memory.regen_id]));
                    // console.log('energy')
                    if(source_res === ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(source_id[creep.memory.regen_id]), {reusePath: 50});
                    }
                    else if(source_res === OK) {
                        creep.memory.regen_id = (creep.memory.regen_id + 1) % source_id.length;    
                    }
                    else if(source_res === ERR_TIRED) {
                        if(creep.memory.carrying) {
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (
                                        structure.structureType === STRUCTURE_EXTENSION ||
                                         structure.structureType === STRUCTURE_SPAWN
                                         ||structure.structureType === STRUCTURE_TOWER
                                         ||structure.structureType === STRUCTURE_POWER_SPAWN
                                         ||structure.structureType === STRUCTURE_NUKER)
                                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                                        //  && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 300;
                                }
                            });
                            if(targets.length > 0) {
                                if(creep.transfer(targets[targets.length - 1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[targets.length - 1], {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                                }
                            }
                            else {
                                creep.moveTo(24, 36, {reusePath: 50});
                            }
                        }
                        else {
                            if(creep.room.storage && creep.withdraw(creep.room.storage, RESOURCE_ENERGY, 1500) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                            }
                        }
                    }    
                }
            }
        }
        

        
    }
};