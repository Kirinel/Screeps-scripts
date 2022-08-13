export var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.signController(creep.room.controller, "Peace and Farm alone. No offend and no war. Thanks./安心种田,有事私信好商量");
            if(creep.room.name != creep.memory.workingRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workingRoom),{reusePath: 50})
            }
            else {
                if(creep.room.controller) {
                    if(creep.room.name === 'E11S47') {
                        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {reusePath: 50});
                        }
                    }
                    else {
                        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {reusePath: 50});
                        }
                    }
                    
                }
            }
            
    }
};