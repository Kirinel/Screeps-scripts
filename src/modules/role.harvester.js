
export var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
            
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.workingLoc]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.workingLoc], {reusePath: 50,visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if(creep.store.getFreeCapacity() < 28) {
                var nearest_link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (struct) => struct.structureType == STRUCTURE_LINK
                })
                if(creep.transfer(nearest_link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearest_link);
                }
            }
    }
};

export var roleMineHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var source = creep.room.find(FIND_MINERALS)
                if(creep.harvest(source[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[0], {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            if(creep.store.getFreeCapacity() == 0) {
                // var lab = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                //     filter: (s) => s.structureType === STRUCTURE_LAB
                // })
                for(const resourceType in creep.store) {
                    if(creep.transfer(creep.room.storage, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 50, visualizePathStyle: {stroke: '#ffff33'}});
                    }
                }
            }
    }
};

export var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name === creep.memory.workingRoom) {
            creep.memory.arrived = true;
            creep.memory.workingSite = creep.room.find(FIND_SOURCES)[creep.memory.workingLoc];
        }
        if(creep.room.name != creep.memory.workingRoom && !creep.memory.arrived) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.workingRoom))
        }
        else {
            var res = creep.harvest(Game.getObjectById(creep.memory.workingSite.id))
            if(res === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.workingSite.id), {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if(res === OK && !creep.memory.transferTo) {
                var nearest_link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (struct) => struct.structureType == STRUCTURE_LINK
                })
                if(nearest_link) {
                    creep.memory.transferTo = nearest_link.id;
                }
                else {
                    var nearest_container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (struct) => struct.structureType == STRUCTURE_CONTAINER
                    });
                    if(nearest_container) {
                        creep.memory.transferTo = nearest_container.id;
                    }
                }
            }

            if(creep.memory.transferTo) {
                const target = Game.getObjectById(creep.memory.transferTo);
                if(target.hits < target.hitsMax) {
                    creep.repair(target);
                }
                else {
                    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
            
    }
};