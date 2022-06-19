

export var towerFunction = {

    /** @param {StructureTower} towers **/
    run: function(towers) {
        var hostiles = towers[0].room.find(FIND_HOSTILE_CREEPS, {
            filter: creep => creep.body.length != creep.getActiveBodyparts(MOVE) + creep.getActiveBodyparts(CARRY)
        }); 
        
        var damaged_structures = towers[0].room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax) 
                && structure.structureType != STRUCTURE_WALL
                && structure.hits <= 2.28e6
                && structure.structureType !== STRUCTURE_RAMPART
                // || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 10000)
        })
        damaged_structures.sort((a,b) => a.hits - b.hits)

        var damaged_creeps = towers[0].room.find(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        })

        
        for(var i in towers) {
            if(hostiles.length) {
                hostiles.sort((a,b) => a.hits - b.hits)
                towers[i].attack(hostiles[0]);
            }
            else if(damaged_creeps.length) {
                towers[i].heal(damaged_creeps[0]);
            }
            else if(damaged_structures.length) {
                towers[i].repair(damaged_structures[0]);
            }
        }
    }
};