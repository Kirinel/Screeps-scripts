import { minimumStorage, minimumTerminal } from './utils'


export var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name === 'E7S48') {
            creep.moveTo(11, 18);
            // creep.withdraw(creep.room.storage, RESOURCE_OPS)
        }
        else if(creep.room.name === 'E8S47') {
            creep.moveTo(25, 10);
        }
        else if(creep.room.name === 'E5S52') {
            creep.moveTo(34, 20);
        }
        else if(creep.room.name === 'E9S51') {
            creep.moveTo(34, 36);
            // creep.withdraw(creep.room.terminal, RESOURCE_ENERGY)

        }
        else if(creep.room.name === 'E9S52') {
            creep.moveTo(29,21)
            // creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM);
        } 
        else if(creep.room.name === 'E13S47') {
            creep.moveTo(24,28)
        } 
        else if(creep.room.name === 'E11S47') {
            creep.moveTo(24,33)
            creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
        } 

        
        
        // if(!creep.memory.link_id) {
        //     var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //         filter: (s) => s.structureType === STRUCTURE_LINK
        //     });
        //     if(link && link.store[RESOURCE_ENERGY]) {
        //         var res = creep.withdraw(link, RESOURCE_ENERGY);
        //         if(res === OK) {
        //             creep.memory.link_id = link.id;
        //         }
        //     }
        // }
        
        var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_LINK
        });
        if(link && link.store[RESOURCE_ENERGY]) {
            creep.withdraw(link, RESOURCE_ENERGY);
        }
        
        
        if(!creep.memory.factory_id) {
            var temp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_FACTORY
            });
            if(temp) {
                creep.memory.factory_id = temp.id;
            }
            else {
                creep.memory.factory_id = 'factory not available';
            }
            
        }
        var factory = Game.getObjectById(creep.memory.factory_id);

        if(!creep.memory.nuker_id) {
            var temp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_NUKER
            });
            if(temp) {
                creep.memory.nuker_id = temp.id
            }
            else {
                creep.memory.nuker_id = 'nuker not available';
            }
        }
        var nuker = Game.getObjectById(creep.memory.nuker_id);

        for(const resourceType in creep.store) {
            if(resourceType !== RESOURCE_ENERGY) {
                if(resourceType === RESOURCE_GHODIUM) {
                    creep.transfer(nuker, resourceType);
                }
                else if(resourceType === RESOURCE_OPS) {
                    creep.transfer(creep.room.storage, resourceType)
                }
                else if(creep.room.terminal) {
                    creep.transfer(creep.room.terminal, resourceType);
                }
                else {
                    creep.transfer(creep.room.storage, resourceType);
                }
            }
            else {
                if(nuker && nuker.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.transfer(nuker, resourceType);
                }
                else if(creep.room.storage.store[RESOURCE_ENERGY] < minimumStorage) {
                    creep.transfer(creep.room.storage, resourceType);
                }
                else if(creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < minimumTerminal) {
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