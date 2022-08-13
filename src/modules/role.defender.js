
export var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // var hostile_ids = creep.memory.hostiles;
        // var target_id = hostile_ids[0];
        // if(hostile_ids && hostile_ids.length) {
        //     for(i in hostile_ids) {
        //         if(Game.getObjectById(hostile_ids[i])) {
        //             target_id = hostile_ids[i];
        //             break;
        //         }
        //     }
        // }
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            var target = targets[0]
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}})
            }
            creep.rangedAttack(target);
        }
        else {
            creep.moveTo(new RoomPosition(creep.memory.stay.x, creep.memory.stay.y, creep.memory.bornIn)  );
        }
    }
};