import { errorMapper } from './modules/errorMapper'
import { roleUpgrader } from './modules/role.upgrader'
import { roleHarvester} from './modules/role.harvester'
import { roleBuilder} from './modules/role.builder'
import { roleCarrier} from './modules/role.carrier'
import { roleRepairer } from './modules/role.repairer'
import { roleDefender } from './modules/role.defender'
import { creepInfo } from './modules/utils'
import { roleTransferer } from './modules/role.transferer'
import { roleMover } from './modules/role.mover'

global.energy_sources = [{x: 45, y: 13, roomName: 'E7S48'},
                        {x: 9, y: 7, roomName: 'E7S48'}]
global.isOdd = 0;

// global.energy_sources = []

export const loop = errorMapper(() => {
    var deathPos = energy_sources[isOdd]
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if(Memory.creeps[name].role === 'harvester') {
                deathPos = energy_sources[isOdd];
                isOdd = (isOdd + 1) % 2;
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
    var transferers = _.filter(Game.creeps, (creep) => creep.memory.role === 'transferer');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role === 'mover');

    // console.log(defenders);

    if(harvesters.length < creepInfo.harvester.num) {
        var newName = 'Harvester' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.harvester.parts, newName,
            {memory: {role: 'harvester', lastPos: deathPos}}) === OK) {
                console.log('Spawning new harvester: ' + newName);
                // energy_sources.shift();
            };
    }
    else if(carriers.length < creepInfo.carrier.num) {
        var newName = 'Carrier' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.carrier.parts, newName, 
            {memory: {role: 'carrier'}}) === OK) {
            console.log('Spawning new carrier: ' + newName);
        }
    }
    else if(transferers.length < creepInfo.transferer.num) {
        var newName = 'Transferer' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.transferer.parts, newName, 
            {memory: {role: 'transferer'}}) === OK) {
            console.log('Spawning new transferer: ' + newName);
        }
    }
    else if(movers.length < creepInfo.mover.num) {
        var newName = 'Mover' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.mover.parts, newName,
            {memory: {role: 'mover'}}) === OK) {
                console.log('Spawning new Mover: ' + newName);
            };
    }
    else if(upgraders.length < creepInfo.upgrader.num) {
        var newName = 'Upgrader' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.upgrader.parts, newName,
            {memory: {role: 'upgrader'}}) === OK) {
                console.log('Spawning new upgrader: ' + newName);
            };
    }
    else if(defenders.length < creepInfo.defender.num) {
        var newName = 'Defender' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.defender.parts, newName,
            {memory: {role: 'defender', stay: {x:29, y:21, room:'E7S48'}}}) === OK) {
                console.log('Spawning new defender: ' + newName);
            };
    }
    else if(repairers.length < creepInfo.repairer.num) {
        var newName = 'Repairer' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.repairer.parts, newName,
            {memory: {role: 'repairer'}}) === OK) {
                console.log('Spawning new repairer: ' + newName);
            };
    }
    else if(builders.length < creepInfo.builder.num) {
        var newName = 'Builder' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(creepInfo.builder.parts, newName,
            {memory: {role: 'builder'}}) === OK) {
                console.log('Spawning new builder: ' + newName);
            };
    }

    // console.log(Memory.creeps['Harvester30974276'].lastPos.x);
    if(harvesters.length === 2 && 
        Memory.creeps[harvesters[0].name].lastPos.x === Memory.creeps[harvesters[1].name].lastPos.x) {
            if(Memory.creeps[harvesters[0].name].lastPos.x === 9) {
                Memory.creeps[harvesters[1].name].lastPos = new RoomPosition(45, 13, 'E7S48');
            }
            else {
                Memory.creeps[harvesters[1].name].lastPos = new RoomPosition(9, 7, 'E7S48');
            }
        }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'carrier') {
            roleCarrier.run(creep);
        }
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role === 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role === 'transferer') {
            roleTransferer.run(creep);
        }
        if(creep.memory.role === 'mover' || creep.memory.role === 'Mover') {
            roleMover.run(creep);
        }
    }


    //tower movement
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_TOWER
    })
    if(towers.length) {
        var damaged_structures = towers[0].room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax) 
                && structure.structureType != STRUCTURE_WALL
                && structure.hits <= 1e6
                && structure.structureType !== STRUCTURE_RAMPART
                // || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 10000)
        })
        damaged_structures.sort((a,b) => a.hits - b.hits)

        var damaged_creeps = towers[0].room.find(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        })

        var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        for(var i in towers) {
            if(closestHostile) {
                towers[i].attack(closestHostile);
            }
            else if(damaged_creeps.length) {
                towers[i].heal(damaged_creeps[0]);
            }
            else if(damaged_structures.length) {
                towers[i].repair(damaged_structures[0]);
            }
        }
    }

    //link transfer
    const linkFrom = Game.spawns['Spawn1'].room.lookForAt('structure', 46, 12)[0];

    const linkTo = Game.spawns['Spawn1'].room.lookForAt('structure', 11,19,)[0]

    linkFrom.transferEnergy(linkTo);
})