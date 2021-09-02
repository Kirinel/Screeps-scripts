
export var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
            // creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
            // if(creeps.length && Game.getObjectById(creeps[0].id) && Game.getObjectById(creeps[0].id).pos.x === 9) {
            //     creep.memory.lastPos = new RoomPosition(45, 13, 'E7S48');
            // }
            // else {
            //     creep.memory.lastPos = new RoomPosition(9, 7, 'E7S48');
            // }
            creep.moveTo(creep.memory.lastPos.x, creep.memory.lastPos.y )

            //明天检验这种算法
            // if(creep.ticksToLive === 1) {
            //     energy_sources.push(creep.pos);
            // }

            if(creep.pos.inRangeTo(creep.memory.lastPos.x, creep.memory.lastPos.y , 3)) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            if(creep.store.getFreeCapacity() == 0) {
                var nearest_link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (struct) => struct.structureType == STRUCTURE_LINK
                })
                creep.transfer(nearest_link, RESOURCE_ENERGY);
            }
    }
};