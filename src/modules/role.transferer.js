
export var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(11, 18);

        var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_LINK
        })
        creep.withdraw(link, RESOURCE_ENERGY);
        creep.transfer(creep.room.storage, RESOURCE_ENERGY);
    }
};