import { minimumStorage, minimumTerminal } from './utils'


export var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(11, 18);

        // creep.withdraw(creep.room.terminal, RESOURCE_CATALYZED_GHODIUM_ACID);
        

        var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_LINK
        })
        if(link.store[RESOURCE_ENERGY]) {
            creep.withdraw(link, RESOURCE_ENERGY);
        }
        else {
            // creep.withdraw(creep.room.terminal, RESOURCE_OPS);
        }
        
        var factory = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_FACTORY
        })

        for(const resourceType in creep.store) {
            if(resourceType !== RESOURCE_ENERGY) {
                creep.transfer(creep.room.terminal, resourceType);
                // creep.transfer(creep.room.storage, resourceType);
            }
            else {
                if(creep.room.storage.store[RESOURCE_ENERGY] < minimumStorage) {
                    creep.transfer(creep.room.storage, resourceType);
                }
                else if(creep.room.terminal.store[RESOURCE_ENERGY] < minimumTerminal) {
                    creep.transfer(creep.room.terminal, resourceType);
                    // creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                }
                else if(factory && factory.store[RESOURCE_ENERGY] < 10000) {
                    creep.transfer(factory, resourceType);
                }
                else {
                    creep.transfer(creep.room.storage, resourceType);
                }
            }
        }
    }
};