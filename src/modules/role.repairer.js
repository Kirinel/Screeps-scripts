
export var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var prev_target = Game.getObjectById(creep.memory.cur_target);
        if(creep.store[RESOURCE_ENERGY] === 0 || !prev_target || //当前无能量，无修补目标，修补目标已满时重新寻找修补目标
            (prev_target && prev_target.hits === prev_target.hitsMax)) {
                creep.memory.cur_target = null;

                const repair_structures = creep.room.find(FIND_STRUCTURES);

                const repair_walls = repair_structures.filter(object => object.hits < object.hitsMax && object.structureType === STRUCTURE_WALL);
                repair_walls.sort((a,b) => a.hits - b.hits);

                const repair_others = repair_structures.filter(object => object.hits < object.hitsMax 
                    && object.structureType !== STRUCTURE_ROAD
                    && object.structureType !== STRUCTURE_WALL);
                repair_others.sort((a,b) => a.hits - b.hits);

                if(repair_others.length > 0) {
                    creep.memory.cur_target = repair_others[0].id;
                }
                else if(repair_walls.length > 0) {
                    creep.memory.cur_target = repair_walls[0].id;
                }
            }
        
        var cur_target = Game.getObjectById(creep.memory.cur_target);
        if(cur_target) {
            if(creep.repair(cur_target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(cur_target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};