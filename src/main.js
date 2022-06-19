import { errorMapper } from './modules/errorMapper'
import { roleUpgrader } from './modules/role.upgrader'
import { roleHarvester, roleMineHarvester, roleRemoteHarvester} from './modules/role.harvester'
import { roleBuilder} from './modules/role.builder'
import { roleCarrier, roleRemoteCarrier} from './modules/role.carrier'
import { roleRepairer } from './modules/role.repairer'
import { roleDefender } from './modules/role.defender'
import { creepInfo0, creepInfo1, minimumStorage } from './modules/utils'
import { roleTransferer } from './modules/role.transferer'
import { roleMover } from './modules/role.mover'
import { roleTraveller } from './modules/role.traveller'
import { rolePowerCreep1 } from './modules/role.powercreep1'
import { rolePowerCreep2 } from './modules/role.powercreep2'
import { spawn0Function } from './modules/Spawn'
import { towerFunction } from './modules/Tower'
import { buyResourceForRoomWithNeed } from './modules/Market'
import { roleClaimer } from './modules/role.claimer'

export const loop = errorMapper(() => {
    if(Game.cpu.bucket === 10000) {
        Game.cpu.generatePixel();
    }

    // Game.creeps.attacker.moveTo(new RoomPosition(20, 31, 'E8S47'))

    if(!Memory.ccTime) {
        Memory.ccTime = 1
    }
    var cc = Game.creeps.cc
    if(Game.time - Memory.ccTime >= 1000) {
        if(!cc) {
            if(Game.spawns.Spawn0.spawnCreep([
                MOVE,MOVE,MOVE,MOVE,MOVE,
                CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,
                CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,
                CLAIM,CLAIM,CLAIM,CLAIM,CLAIM], 'cc', 
                {memory: {bornIn: 'E7S48', role: 'controllerClaimer'}}) === OK) {
                Memory.ccTime = Game.time;
                console.log('Spawn0 spawning new controllerClaimer: cc');
            }
        }
    }
    if(cc) {
        if(cc.room.name!= 'E9S47') {
            cc.moveTo(new RoomPosition(22, 26, 'E9S47'), {reusePath: 50})
        }
        else {
            if(cc.attackController(cc.room.controller) === ERR_NOT_IN_RANGE) {
                cc.moveTo(cc.room.controller, {reusePath:50});
            }
        }
    }

    var remoteConstructionSite = Game.getObjectById('62ac82653a00f820ba9c76fb')
    const rb = Game.creeps.remoteBuilder
    if(rb) {
        if(rb.room.name != 'E8S47' && !rb.memory.arrived && (rb.pos.x != 22 || rb.pos.y != 26)) {
            rb.moveTo(new RoomPosition(22, 26, 'E8S47'), {reusePath: 50})
        }
        else{
            rb.memory.arrived = true;
            // roleUpgrader.run(rb);
            // roleCarrier.run(rb)
            roleBuilder.run(rb);
        }
    }
    // if(!rb && remoteConstructionSite) {
    if(!rb) {
        var newName = 'remoteBuilder';
            if(Game.spawns.Spawn0.spawnCreep([
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            ], newName, 
                {memory: {
                    bornIn: 'E7S48', 
                    role: 'remoteBuilder', 
                    workingLoc:0, 
                    workingRoom:'E8S47',
                    backTo: 'E8S47'
                }}) === OK) {
                console.log('Spawning new remoteBuilder: ' + newName);
        }
    }
    if(rb && remoteConstructionSite) {
        if(rb.store[RESOURCE_ENERGY] == 0) {
            rb.memory.building = false;
        }
        if(rb.store.getFreeCapacity() == 0) {
            rb.memory.building = true;
        }
        if(rb.memory.building) {
            if(rb.build(remoteConstructionSite) == ERR_NOT_IN_RANGE) {
                rb.moveTo(remoteConstructionSite, {reusePath: 50})
            }
        }
        else {
                
            
            const dropped = rb.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(dropped) {
                var res = rb.pickup(dropped)
                if(res === ERR_NOT_IN_RANGE) {
                    rb.moveTo(dropped);
                }
                else if(res === OK) {
                    rb.memory.building = true;
                }
            }
            else 
            if(rb.withdraw(Game.getObjectById('62a8c931e04394f0fcc7cc51'), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                rb.moveTo(Game.getObjectById('62a8c931e04394f0fcc7cc51'), {reusePath: 50})
            }
            // else if(rb.withdraw(Game.rooms.E7S48.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //     rb.moveTo(Game.rooms.E7S48.storage, {reusePath:50});
            // }
        }
    }

    var remoteConstructionsite1 = Game.getObjectById('62ac82653a00f820ba9c76')
    const rb1 = Game.creeps.remoteBuilder1
    if(rb1) {
        if(rb1.room.name != 'E8S47' && !rb1.memory.arrived && (rb.pos.x != 22 || rb.pos.y != 25)) {
            rb1.moveTo(new RoomPosition(22, 25, 'E8S47'), {reusePath: 50})
        }
        else{
            if(rb1.room.name === 'E8S47' && rb1.pos.x > 18 && rb1.pos.y < 26) {
                rb1.memory.workingLoc = 1
            }
            rb1.memory.arrived = true;
            // roleCarrier.run(rb1);
            // roleUpgrader.run(rb1);
            roleRemoteCarrier.run(rb1);
        }
        // if(Game.spawns.Spawn1.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        //     roleCarrier.run(rb1)
        // }
    }
    // if(!rb1 && remoteConstructionSite) {
    if(!rb1) {
        var newName = 'remoteBuilder1';
        
            if(Game.spawns.Spawn0.spawnCreep([
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,
                MOVE,MOVE, MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,
                
            ], newName, 
                {memory: {
                    bornIn: 'E7S48', 
                    role: 'remoteBuilder', 
                    workingLoc:0, 
                    workingRoom:'E8S47',
                    backTo: 'E8S47'
                }}) === OK) {
                console.log('Spawning new remoteBuilder: ' + newName);
        }
    }
    if(rb1 && remoteConstructionsite1) {
        if(rb1.store[RESOURCE_ENERGY] == 0) {
            rb1.memory.building = false;
        }
        if(rb1.store.getFreeCapacity() == 0) {
            rb1.memory.building = true;
        }
        if(rb1.memory.building) {
            if(rb1.build(remoteConstructionsite1) == ERR_NOT_IN_RANGE) {
                rb1.moveTo(remoteConstructionsite1, {reusePath: 50})
            }
        }
        else {
                // if(rb1.withdraw(Game.getObjectById('62a938f6f56367b8ebdb7c6d'), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                //     rb1.moveTo(Game.getObjectById('62a938f6f56367b8ebdb7c6d'))
                // }
            
            const dropped = rb1.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(dropped) {
                var res = rb1.pickup(dropped)
                if(res === ERR_NOT_IN_RANGE) {
                    rb1.moveTo(dropped);
                }
                else if(res === OK) {
                    rb1.memory.building = true;
                }
            }
            
            else 
            if(rb.withdraw(Game.getObjectById('62a9de7d7dce53da890ffe6d'), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                rb.moveTo(Game.getObjectById('62a9de7d7dce53da890ffe6d'),{reusePath: 50})
            }
            // else if(rb1.withdraw(Game.rooms.E7S48.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //     rb1.moveTo(Game.rooms.E7S48.storage, {reusePath:50});
            // }
        }
    }

    // var rd = Game.creeps.remoteDefender;
    // if(!rd) {
    //     var newName = 'remoteDefender';
    //         if(Game.spawns.Spawn0.spawnCreep([
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK
    //         ], newName, 
    //             {memory: {bornIn: 'E7S48', role: 'remoteDefender',}}) === OK) {
    //             console.log('Spawning new remoteDefender: ' + newName);
    //     }
    // }
    // else {
    //     if(rd.room.name != 'E8S47') {
    //         rd.moveTo(new RoomPosition(25, 23, 'E8S47'))
    //     }
    //     else {
    //         var hostiles = rd.room.find(FIND_HOSTILE_CREEPS);
    //         hostiles.sort((a,b) => a.hits - b.hits);
    //         if(hostiles.length) {
    //             if(rd.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
    //                 rd.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}})
    //             }
    //             if(rd.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
    //                 rd.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}})
    //             }
    //         }
    //         else {
    //             rd.moveTo(20,25);
    //         }
    //     }
        
    // }


    if(Game.powerCreeps.PowerCreep1.room) {
        rolePowerCreep1.run(Game.powerCreeps['PowerCreep1']);
    }
    if(Game.powerCreeps.PowerCreep2.room) {
        rolePowerCreep2.run(Game.powerCreeps['PowerCreep2']);
    }
    

    if(Game.gpl.progress && Game.time % 25 === 0) {
        console.log(Game.gpl.progress, "/", Game.gpl.progressTotal);
    }

    let powerNeed = 200 + Game.gpl.progressTotal 
    - Game.gpl.progress 
    - Game.rooms.E7S48.terminal.store[RESOURCE_POWER] 
    - Game.getObjectById('617b35eb3d8c504abbe070c5').store[RESOURCE_POWER]

    if(powerNeed <= 0
        && Game.rooms['E7S48'].storage.store[RESOURCE_ENERGY] > minimumStorage
        ) {
        Game.getObjectById('617b35eb3d8c504abbe070c5').processPower();
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawn0Function.run(Game.spawns.Spawn0, creepInfo0);
    spawn0Function.run(Game.spawns.Spawn1, creepInfo1);

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
        if(creep.memory.role === 'mover') {
            if(powerNeed <= 0
                && Game.rooms['E7S48'].storage.store[RESOURCE_ENERGY] > minimumStorage
                && Game.rooms.E7S48.terminal.store[RESOURCE_POWER] > 0) {
                    creep.drop(RESOURCE_ENERGY)
                    roleMover.run(creep);
                }
            else {
                roleCarrier.run(creep);
            }
            
        }
        if(creep.memory.role === 'mineHarvester') {
            roleMineHarvester.run(creep);
        }
        if(creep.memory.role === 'traveller') {
            roleTraveller.run(creep);
        }
        if(creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role === 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
        if(creep.memory.role === 'remoteCarrier') {
            roleRemoteCarrier.run(creep);
        }
    }


    //tower movement
    var towers0 = Game.spawns['Spawn0'].room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_TOWER
    })
    if(towers0.length) {
        towerFunction.run(towers0);
    }
    var towers1 = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_TOWER
    })
    if(towers1.length) {
        towerFunction.run(towers1);
    }

    //link transfer
    const linkFrom1 = Game.spawns['Spawn0'].room.lookForAt('structure', 46, 12)[0];
    const linkFrom2 = Game.spawns['Spawn0'].room.lookForAt('structure', 8, 6)[0];
    const linkMid = Game.spawns['Spawn0'].room.lookForAt('structure', 29, 21)[0];

    const linkTo = Game.spawns['Spawn0'].room.lookForAt('structure', 11,19,)[0]
    // linkFrom1.transferEnergy(linkTo);
    linkFrom1.transferEnergy(linkMid);
    linkMid.transferEnergy(linkTo);
    linkFrom2.transferEnergy(linkTo);

    if( powerNeed > 0 && Game.rooms.E7S48.terminal.store.getFreeCapacity() > powerNeed && Game.time % 25 === 0) {
        buyResourceForRoomWithNeed(RESOURCE_POWER, 'E7S48', powerNeed); 
    }
})