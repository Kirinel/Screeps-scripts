/**
 * REGEN_SOURCE Lv. 5
 * OPERATE_STORAGE Lv. 5
 * OPERATE_SPAWN Lv. 5
 * GENERATE_OPS Lv. 4
 * OPERATE_EXTENSION Lv. 3
 * OPERATE_TERMINAL Lv. 2
 * OPERATE_FACTORY Lv. 1
 */

export var rolePowerCreep1 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source_id = ['5bbcad5e9099fc012e6372b6', '5bbcad5e9099fc012e6372b5']
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
        if(creep.memory.operate_storage_time === undefined) {
            creep.memory.operate_storage_time = 0;
        }
        if(creep.memory.operate_terminal_time === undefined) {
            creep.memory.operate_terminal_time = 0;
        }
        if(creep.memory.operate_spawn_time === undefined) {
            creep.memory.operate_spawn_time = 0;
        }

        var free_extensions = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION 
                    // || structure.structureType === STRUCTURE_SPAWN
                    )
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    //  && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 300;
            }
        });
        
        if(creep.ticksToLive < 100) {
            if(creep.renew(ps) === ERR_NOT_IN_RANGE) {
                creep.moveTo(ps);
            }
        }
        else {
            creep.usePower(PWR_GENERATE_OPS);

            if(Game.time - creep.memory.operate_spawn_time > 900) {
                var operateSpawnres = creep.usePower(PWR_OPERATE_SPAWN, Game.spawns.Spawn0);
                if(operateSpawnres === OK) {
                    creep.memory.operate_spawn_time = Game.time;
                }
                else if(operateSpawnres === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn0);
                }
            }
            else if(Game.time - creep.memory.operate_storage_time > 800) {
                creep.moveTo(12, 19);
                var storage_res = creep.usePower(PWR_OPERATE_STORAGE, creep.room.storage);
                if(storage_res === OK) {
                    creep.memory.operate_storage_time = Game.time;
                }
            }
            else if(free_extensions.length) {
                if(creep.usePower(PWR_OPERATE_EXTENSION, creep.room.storage) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
                
            }
            else if(Game.time - creep.memory.operate_terminal_time > 950
                &&  0 < 200 + Game.gpl.progressTotal - Game.gpl.progress - Game.rooms.E7S48.terminal.store[RESOURCE_POWER] - Game.getObjectById('617b35eb3d8c504abbe070c5').store[RESOURCE_POWER]
                ) {
                var terminal_res = creep.usePower(PWR_OPERATE_TERMINAL, creep.room.terminal);
                if(terminal_res === OK) {
                    creep.memory.operate_terminal_time = Game.time;
                }
            }
            if(creep.store[RESOURCE_OPS] < 200) {
                if(creep.withdraw(creep.room.storage, RESOURCE_OPS, 500) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            else if(creep.store[RESOURCE_OPS] >= 800) {
                if(creep.transfer(creep.room.storage, RESOURCE_OPS, 300) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
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
                    if(ps.store[RESOURCE_ENERGY] < 3000) {
                        const fillResourceType = RESOURCE_ENERGY;
                        const source = creep.room.storage
            
                        var fillTarget = ps;
            
                        if(creep.memory.carrying) {
                            if(fillTarget) {
                                if(creep.transfer(fillTarget, fillResourceType) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(fillTarget, {visualizePathStyle: {stroke: '#ffff33'}});
                                }
                            }
                        }
                        else {
                            if(fillTarget && creep.withdraw(source, fillResourceType, 1200) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff33'}});
                            }
                        }
                    }
                    else {
                        creep.moveTo(12, 19);
                    }
                }
                
            }
            
        }
    }
};