import { errorMapper } from './modules/errorMapper'
import { roleUpgrader } from './modules/role.upgrader'
import { roleHarvester, roleMineHarvester, roleRemoteHarvester} from './modules/role.harvester'
import { roleBuilder} from './modules/role.builder'
import { roleCarrier, roleRemoteCarrier} from './modules/role.carrier'
import { roleRepairer } from './modules/role.repairer'
import { roleDefender } from './modules/role.defender'
import { creepInfo0, creepInfo1, creepInfo2, creepInfo3, creepInfo4, creepInfo5, creepInfo6, minimumStorage } from './modules/utils'
import { roleTransferer } from './modules/role.transferer'
import { roleMover } from './modules/role.mover'
import { roleTraveller } from './modules/role.traveller'
import { rolePowerCreep1 } from './modules/role.powercreep1'
import { rolePowerCreep2 } from './modules/role.powercreep2'
import { spawnFunction } from './modules/Spawn'
import { towerFunction } from './modules/Tower'
import { buyResourceForRoomWithNeed, sellResourceWithAmountFrom } from './modules/Market'
import { roleClaimer } from './modules/role.claimer'

export const loop = errorMapper(() => {
    // if(Game.cpu.bucket === 10000) {
    //     Game.cpu.generatePixel();
    // }

    try {
        // Game.creeps.RemoteHarvester40146285.pickup(Game.getObjectById('62dd450ae94fa4f97a167fd8'))
    }
    catch {

    }

    try {
        // if(Game.rooms.E7S48.terminal.store[RESOURCE_ENERGY] > 60000 
        //     && Game.rooms.E9S51.terminal.store.getFreeCapacity()>50000) {
        //         Game.rooms.E7S48.terminal.send(RESOURCE_ENERGY, 50000, 'E9S51');
        // }
        // else 
        if( Game.time % 1000 === 0 && 
            Game.rooms.E7S48.terminal.store[RESOURCE_ENERGY] > 60000 
            && Game.rooms.E11S47.terminal.store.getFreeCapacity()>50000) {
                Game.rooms.E7S48.terminal.send(RESOURCE_ENERGY, 50000, 'E11S47');
        }
        
        // if(Game.rooms.E8S47.terminal.store[RESOURCE_ENERGY] > 60000 
        //     && Game.rooms.E11S47.terminal
        //     && Game.rooms.E11S47.terminal.store.getFreeCapacity()>50000) {
        //         Game.rooms.E8S47.terminal.send(RESOURCE_ENERGY, 50000, 'E11S47');
        // }
        // if(Game.rooms.E5S52.terminal.store[RESOURCE_ENERGY] > 60000 
        //     && Game.rooms.E11S47.terminal
        //     && Game.rooms.E11S47.terminal.store.getFreeCapacity()>50000) {
        //         Game.rooms.E5S52.terminal.send(RESOURCE_ENERGY, 50000, 'E11S47');
        // }
        // // if(Game.rooms.E9S51.terminal.store[RESOURCE_ENERGY] > 60000 
        // //     && Game.rooms.E7S48.terminal.store.getFreeCapacity()>50000) {
        // //         Game.rooms.E9S51.terminal.send(RESOURCE_ENERGY, 50000, 'E7S48');
        // // }
        // if(Game.rooms.E9S52.terminal.store[RESOURCE_ENERGY] > 60000 
        //     && Game.rooms.E11S47.terminal
        //     && Game.rooms.E11S47.terminal.store.getFreeCapacity()>50000) {
        //         Game.rooms.E9S52.terminal.send(RESOURCE_ENERGY, 50000, 'E11S47');
        // }
        // if(Game.rooms.E13S47.terminal.store[RESOURCE_ENERGY] > 60000 
        //     && Game.rooms.E11S47.terminal
        //     && Game.rooms.E11S47.terminal.store.getFreeCapacity()>50000) {
        //         Game.rooms.E13S47.terminal.send(RESOURCE_ENERGY, 50000, 'E11S47');
        // }
    }
    catch {

    }

    // var helpers = ['helper1',]
    // for(var i in helpers) {
    //     // console.log(h)
    //     var helper = Game.creeps[helpers[i]];
    //     var targetRoom = Game.rooms.E11S47;
    //     var backRoom = Game.rooms.E13S47;

    //     if(!helper) {
    //         var newName = helpers[i];
    //         if(Game.spawns.Spawn5.spawnCreep([
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             CARRY,CARRY,CARRY,CARRY,WORK,WORK,
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             CARRY,CARRY,CARRY,CARRY,WORK,WORK,
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             CARRY,CARRY,CARRY,CARRY,WORK,WORK,
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             CARRY,CARRY,CARRY,CARRY,WORK,WORK,
    //         ], newName, 
    //             {memory: {
    //                 bornIn: 'E13S47', 
    //                 role: 'helper', 
    //                 workingLoc:0, 
    //                 workingRoom:'E11S47',
    //                 backTo: 'E13S47'
    //             }}) === OK) {
    //             console.log('Spawning new helper: ' + newName);
    //             }
    //     }
    //     else {
    //         if(helper.store[RESOURCE_ENERGY] == 0) {
    //             helper.memory.building = false;
    //         }
    //         if(helper.store.getFreeCapacity() == 0) {
    //             helper.memory.building = true;
    //         }
    //         if(helper.memory.building) {
    //             const construction_targets = targetRoom.find(FIND_CONSTRUCTION_SITES);
        
    //             if(construction_targets.length) {
    //                 // creep.moveTo(construction_targets[0], {reusepath: 10,visualizePathStyle: {stroke: '#ffffff'}});
    //                 if(helper.build(construction_targets[0]) === ERR_NOT_IN_RANGE) {
    //                     helper.moveTo(construction_targets[0], {reusepath: 80,visualizePathStyle: {stroke: '#ffffff'}});
    //                 }
    //             }
    //             else  {
    //                 if(helper.upgradeController(targetRoom.controller) === ERR_NOT_IN_RANGE) {
    //                     helper.moveTo(targetRoom.controller, {reusepath: 80,visualizePathStyle: {stroke: '#ffffff'}});
    //                 }
    //             }
    //         }
    //         else {
    //             if(helper.withdraw(backRoom.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //                 helper.moveTo(backRoom.storage, {reusepath: 80,visualizePathStyle: {stroke: '#aa00ff'}});
    //             }
    //         }
    //     }
    // }

    

    
    

    // Game.creeps.attacker.moveTo(new RoomPosition(20, 31, 'E8S47'))

    // var remoteConstructionSite = Game.getObjectById('62dd24066c1ade72d36bbb80');
    // if(!remoteConstructionSite) {
    //     remoteConstructionSite = Game.getObjectById('62dd20cd6c1adeb7f26bbb4f');
    // }
    
    // if(!remoteConstructionSite) {
    //     remoteConstructionSite = Game.getObjectById('62b8210ca2c7c68fa9c56ca7');
    // }
    // const rb = Game.creeps.remoteBuilder
    // if(rb) {
    //     if(rb.room.name != 'E11S47' 
    //     && !rb.memory.arrived 
    //     ) {
    //         rb.moveTo(new RoomPosition(12, 27, 'E11S47'), {reusePath: 200})
    //     }
    //     else{
    //         rb.memory.arrived = true;
    //         if(rb && remoteConstructionSite) {
    //             if(rb.store[RESOURCE_ENERGY] == 0) {
    //                 rb.memory.building = false;
    //             }
    //             if(rb.store.getFreeCapacity() == 0) {
    //                 rb.memory.building = true;
    //             }
    //             if(rb.memory.building) {
    //                 if(rb.build(remoteConstructionSite) == ERR_NOT_IN_RANGE) {
    //                     rb.moveTo(remoteConstructionSite, {reusePath: 50})
    //                 }
    //             }
    //             else {
    //                 const dropped = 
    //                 rb.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    //                 if(dropped) {
    //                     var res = rb.pickup(dropped)
    //                     if(res === ERR_NOT_IN_RANGE) {
    //                         rb.moveTo(dropped);
    //                     }
    //                     else if(res === OK) {
    //                         rb.memory.building = true;
    //                     }
    //                 }
    //                 else {
    //                     var closestContainer = rb.room.find(FIND_STRUCTURES, {
    //                         filter: structure => structure.structureType == STRUCTURE_CONTAINER
    //                     });
    //                     if(closestContainer.length) {
    //                         if(rb.withdraw(closestContainer[rb.memory.workingLoc % closestContainer.length], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                             rb.moveTo(closestContainer[rb.memory.workingLoc % closestContainer.length], {reusepath: 10,visualizePathStyle: {stroke: '#ffaa00'}})
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // else {
    //     if(!rb && remoteConstructionSite) {
    //         // console.log('nonono')
    //         // if(!rb) {
    //             var newName = 'remoteBuilder';
    //                 if(Game.spawns.Spawn5.spawnCreep([
    //                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //                     CARRY,CARRY,CARRY,CARRY,
    //                     WORK,WORK,
    //                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //                     CARRY,CARRY,CARRY,CARRY,
    //                     WORK,WORK,
    //                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //                     CARRY,CARRY,CARRY,CARRY,
    //                     WORK,WORK,
    //                 ], newName, 
    //                     {memory: {
    //                         bornIn: 'E13S47', 
    //                         role: 'remoteBuilder', 
    //                         workingLoc:0, 
    //                         workingRoom:'E11S47',
    //                         backTo: 'E13S47'
    //                     }}) === OK) {
    //                     console.log('Spawning new remoteBuilder: ' + newName);
    //             }
    //     }
    // }

    // var rd = Game.creeps.remoteDefender;
    // // var hostiles = Game.rooms.E12S47.find(FIND_HOSTILE_CREEPS);
    // // if(!hostiles || hostiles.length === 0) {
    //     var hostiles = []
    // // }
    // if(!rd && hostiles.length) {
    //     var newName = 'remoteDefender';
    //         if(Game.spawns.Spawn5.spawnCreep([
    //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //             ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
    //             ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK
    //         ], newName, 
    //             {memory: {bornIn: 'E13S47', role: 'remoteDefender',hostiles:hostiles}}) === OK) {
    //             console.log('Spawning new remoteDefender: ' + newName);
    //     }
    // }
    // else if(rd) {
    //     if(rd.room.name != 'E12S47') {
    //         rd.moveTo(new RoomPosition(26, 25, 'E12S47'), {reusePath: 200})
    //     }
    //     else {
    //         hostiles = Game.rooms.E12S47.find(FIND_STRUCTURES, {filter:a=>a.structureType === STRUCTURE_EXTENSION});
    //         if(!hostiles||hostiles.length === 0) {
    //             hostiles = Game.rooms.E12S47.find(FIND_HOSTILE_CREEPS);
    //         }
    //         if(hostiles && hostiles.length) {
    //             if(rd.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
    //                 rd.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}})
    //             }
    //             if(rd.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
    //                 rd.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}})
    //             }
    //         }
    //         else {
    //             if(rd.pos.x != 26 || rd.pos.y != 25) {
    //                 rd.moveTo(26,25,{reusePath: 200});
    //             }
    //         }
    //     }
        
    // }


    if(Game.powerCreeps.PowerCreep1.room) {
        rolePowerCreep1.run(Game.powerCreeps['PowerCreep1']);
    }
    if(Game.powerCreeps.PowerCreep2.room) {
        rolePowerCreep2.run(Game.powerCreeps['PowerCreep2']);
    }
    // if(Game.powerCreeps.PowerCreep2.enableRoom(Game.rooms.E11S47.controller) === ERR_NOT_IN_RANGE) {
    //     Game.powerCreeps.PowerCreep2.moveTo(Game.rooms.E11S47.controller, {reusePath: 200})
    // }

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

    try {
        spawnFunction.run(Game.spawns.Spawn0, creepInfo0);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn1, creepInfo1);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn2, creepInfo2);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn3, creepInfo3);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn4, creepInfo4);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn5, creepInfo5);
    }
    catch (err){
        console.log(err.message)
    }
    try {
        spawnFunction.run(Game.spawns.Spawn6, creepInfo6);
    }
    catch (err){
        // console.log(err.message)
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role === 'carrier') {
            roleCarrier.run(creep);
        }
        else if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role === 'defender') {
            try {
                roleDefender.run(creep);
            }
            catch {

            }
        }
        else if(creep.memory.role === 'transferer') {
            roleTransferer.run(creep);
        }
        else if(creep.memory.role === 'mover') {
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
        else if(creep.memory.role === 'mineHarvester') {
            roleMineHarvester.run(creep);
        }
        else if(creep.memory.role === 'traveller') {
            roleTraveller.run(creep);
        }
        else if(creep.memory.role === 'claimer') {
            if(creep.memory.workingRoom === 'E9S48' && creep.room.name === 'E9S48') {
                creep.memory.workingRoom = 'E13S47'
            }
            roleClaimer.run(creep);
        }
        else if(creep.memory.role === 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
        else if(creep.memory.role === 'remoteCarrier') {
            roleRemoteCarrier.run(creep);
        }
    }

    //link transfer
    try {
        const link0From1 = Game.getObjectById('612f341189c2b921bfd3b248'); // Game.spawns['Spawn0'].room.lookForAt('structure', 46, 12)[0];
        const link0From2 = Game.getObjectById('6136308c577f1f2264c1b569'); // Game.spawns['Spawn0'].room.lookForAt('structure', 8, 6)[0];
        const link0Mid = Game.getObjectById('61b3c0be0e50dabca9c5014d'); // Game.spawns['Spawn0'].room.lookForAt('structure', 29, 21)[0];

        const link0To = Game.getObjectById('612f1a45d45773ee33616215'); // Game.spawns['Spawn0'].room.lookForAt('structure', 11,19,)[0]
        // linkFrom1.transferEnergy(linkTo);
        link0From1.transferEnergy(link0Mid);
        link0Mid.transferEnergy(link0To);
        link0From2.transferEnergy(link0To);
    }
    catch(err) {
        console.log('Links in Spawn0 room error:', err.message);
    }

    
    
    
    try {
        const link1From1 = Game.getObjectById('62b0aa051937aa10c9ec48f4');
        const link1From2 = Game.getObjectById('62b276512e827272a528f487');
        const link1mid = Game.getObjectById('62b711a2b2ed313be33d3572');
        const link1To = Game.getObjectById('62b0abe8820dd365eff50604');
        
        link1From1.transferEnergy(link1mid);
        link1mid.transferEnergy(link1To);
        link1From2.transferEnergy(link1To);
    }
    catch(err) {
        console.log('Links in Spawn1 room error:', err.message);
    }
    try {

        const link2From1 = Game.getObjectById('62c16b36cc836e68455ce218');
        const link2From2 = Game.getObjectById('62be42b9ff3a5e425a689b98');
        const link2To = Game.getObjectById('62bdec82aad9e44f25a62b82')
        link2From1.transferEnergy(link2To);
        link2From2.transferEnergy(link2To);
    }
    catch {

    }
    try {
        const link3From1 = Game.getObjectById('62cccb39383bb15a7c4804ff');
        const link3To = Game.getObjectById('62ccc2942592b2481f17a16f');
        link3From1.transferEnergy(link3To);
    }
    catch {

    }
    try {
        const link4From1 = Game.getObjectById('62d414a2d35099f7ce5ef151');
        const link4From2 = Game.getObjectById('62d214289bcc7476f740c644');
        const link4To = Game.getObjectById('62d1ace17d33b9438221ce45');
        link4From1.transferEnergy(link4To);
        link4From2.transferEnergy(link4To);
    }
    catch {

    }
    try {
        const link5From1 = Game.getObjectById('62d6d11c9bcc7491b642132d');
        const link5From2 = Game.getObjectById('62db4f947552b26c4743e921');
        const link5To = Game.getObjectById('62d67c99d3c1507880107e32');
        link5From1.transferEnergy(link5To);
        link5From2.transferEnergy(link5To);
    }
    catch {

    }
    try {
        const link6From1 = Game.getObjectById('62f281651996b21bf66fa677');
        const link6From2 = Game.getObjectById('62f3ce1e951b9a26a6b9ede7');
        const link6To = Game.getObjectById('62f27bf024b7260fdaa426f7');
        link6From1.transferEnergy(link6To);
        link6From2.transferEnergy(link6To);
    }
    catch {

    }

    // try {
    //     if( powerNeed > 0 && Game.rooms.E7S48.terminal.store.getFreeCapacity() > powerNeed && Game.time % 25 === 0) {
    //         buyResourceForRoomWithNeed(RESOURCE_POWER, 'E7S48', powerNeed); 
    //     }
    // }
    // catch {

    // }
    stateScanner();
})





const stateScanner = function () {
    if(Game.time % 10 === 0) {
        console.log(
            'bucket:',Game.cpu.bucket,
            '\nSpawn0 E7S48:',Game.rooms.E7S48.storage.store[RESOURCE_ENERGY],
            'Spawn1 E8S47:',Game.rooms.E8S47.storage.store[RESOURCE_ENERGY],
            'Spawn2 E5S52:',Game.rooms.E5S52.storage.store[RESOURCE_ENERGY],
            'Spawn3 E9S51:',Game.rooms.E9S51.storage.store[RESOURCE_ENERGY],
            'Spawn4 E9S52:',Game.rooms.E9S52.storage.store[RESOURCE_ENERGY],
            'Spawn5 E13S47:',Game.rooms.E13S47.storage.store[RESOURCE_ENERGY],
            '\n Spawn6 E11S47 storage:', Game.rooms.E11S47.storage.store[RESOURCE_ENERGY],'progress:', Game.rooms.E11S47.controller.progress, '/', Game.rooms.E11S47.controller.progressTotal,
            // 'terminal:',Game.rooms.E11S47.terminal.store[RESOURCE_ENERGY]
            );
    }
    // 每 20 tick 运行一次
    if (Game.time % 20) return 
  
    if (!Memory.stats) Memory.stats = {}
    
    // 统计 GCL / GPL 的升级百分比和等级
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    // CPU 的当前使用量
    Memory.stats.cpu = Game.cpu.getUsed()
    // bucket 当前剩余量
    Memory.stats.bucket = Game.cpu.bucket
}