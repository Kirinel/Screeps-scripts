export var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
            if(creep.room.name != creep.memory.workingRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workingRoom),{reusePath: 50})
            }
            else {
                if(creep.room.controller) {
                    if(creep.room.name === 'E8S47') {
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