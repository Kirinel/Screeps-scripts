

export var towerFunction = {

    /** @param {StructureTower} towers **/
    run: function(towers, context) {
        for(var i in towers) {
            if(context.hostiles && context.hostiles.length) {
                towers[i].attack(context.hostiles[i % context.hostiles.length]);
            }
            else if(context.repair_walls && context.repair_walls.length) {
                towers[i].repair(context.repair_walls[0]);
            }
            else if(context.damaged_creeps && context.damaged_creeps.length) {
                towers[i].heal(context.damaged_creeps[0]);
            }
            else if(context.damaged_structures && context.damaged_structures.length) {
                towers[i].repair(context.damaged_structures[0]);
            }
            else if(context.damaged_powercreeps && context.damaged_powercreeps.length) {
                towers[i].heal(context.damaged_powercreeps[0]);
            }
        }
    }
};