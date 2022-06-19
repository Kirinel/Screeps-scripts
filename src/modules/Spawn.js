export var spawn0Function = {

    /** @param {StructureSpawn} spawn **/
    run: function(spawn, creepInfo) {
            
        var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS); 
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.bornIn === spawn.room.name);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.bornIn === spawn.room.name);
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier' && creep.memory.bornIn === spawn.room.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.bornIn === spawn.room.name);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer' && creep.memory.bornIn === spawn.room.name);
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender' && creep.memory.bornIn === spawn.room.name);
        var transferers = _.filter(Game.creeps, (creep) => creep.memory.role === 'transferer' && creep.memory.bornIn === spawn.room.name);
        var movers = _.filter(Game.creeps, (creep) => creep.memory.role === 'mover' && creep.memory.bornIn === spawn.room.name);
        var mine_harvesters =  _.filter(Game.creeps, (creep) => creep.memory.role === 'mineHarvester' && creep.memory.bornIn === spawn.room.name);
        var travellers = _.filter(Game.creeps, (creep) => creep.memory.role === 'traveller' && creep.memory.bornIn === spawn.room.name);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer' && creep.memory.bornIn === spawn.room.name);
        var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHarvester' && creep.memory.bornIn === spawn.room.name);
        var remoteCarriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteCarrier' && creep.memory.bornIn === spawn.room.name);

        
        var remoteHarvesterRooms = [];
        if(creepInfo.remoteHarvester) {
            remoteHarvesterRooms = Object.keys(creepInfo.remoteHarvester)
        }
        var remoteHarvesterNum = 0
        remoteHarvesterRooms.map(room => remoteHarvesterNum += creepInfo.remoteHarvester[room].num)

        var remoteCarrierRooms = [];
        if(creepInfo.remoteCarrier) {
            remoteCarrierRooms = Object.keys(creepInfo.remoteCarrier)
        }
        var remoteCarrierNum = 0
        remoteCarrierRooms.map(room => remoteCarrierNum += creepInfo.remoteCarrier[room].num)

        var claimerRooms = []
        if(creepInfo.claimer) {
            claimerRooms = Object.keys(creepInfo.claimer)
        }
        var claimerNum = 0
        claimerRooms.map(room => claimerNum += creepInfo.claimer[room].num)

        // remoteCarriers.map(c => console.log(c.memory.workingRoom))

        // const testRooms = Object.keys(creepInfo.test)
        // var testNum = 0
        // testRooms.map(room => testNum += creepInfo.test[room].num)
        // console.log(remoteHarvesters.length, remoteHarvesterNum)
    

        if(creepInfo.carrier && carriers.length < creepInfo.carrier.num) {
            var newName = 'Carrier' + Game.time;
            var newloc = 1;
            if(carriers.length === 0 || carriers[0].memory.workingLoc) {
                newloc = 0;
            }
            if(spawn.spawnCreep(creepInfo.carrier.parts, newName,
                {memory: {bornIn: spawn.room.name, 
                            role: 'carrier', 
                            workingLoc: newloc,
                        }}) === OK) {
                    console.log(spawn.name + ' spawning new carrier: ' + newName);
                };
        }
        else if(creepInfo.harvester && harvesters.length < creepInfo.harvester.num) {
            var newName = 'Harvester' + Game.time;
            var newloc = 1;
            if(harvesters.length === 0 || harvesters[0].memory.workingLoc) {
                newloc = 0;
            }
            if(spawn.spawnCreep(creepInfo.harvester.parts, newName,
                {memory: {bornIn: spawn.room.name, 
                            role: 'harvester', 
                            workingLoc: newloc,
                        }}) === OK) {
                    console.log(spawn.name + ' spawning new harvester: ' + newName);
                };
        }
        else if(creepInfo.transferer && transferers.length < creepInfo.transferer.num) {
            var newName = 'Transferer' + Game.time;
            if(spawn.spawnCreep(creepInfo.transferer.parts, newName, 
                {memory: {bornIn: spawn.room.name, role: 'transferer'}}) === OK) {
                console.log(spawn.name + ' spawning new transferer: ' + newName);
            }
        }
        else if(creepInfo.mover && movers.length < creepInfo.mover.num) {
            var newName = 'Mover' + Game.time;
            if(spawn.spawnCreep(creepInfo.mover.parts, newName,
                {memory: {bornIn: spawn.room.name, role: 'mover'}}) === OK) {
                    console.log(spawn.name + ' spawning new Mover: ' + newName);
                };
        }
        else if(creepInfo.upgrader && upgraders.length < creepInfo.upgrader.num) {
            var newName = 'Upgrader' + Game.time;
            var newloc = 1;
            if(upgraders.length === 0 || upgraders[0].memory.workingLoc) {
                newloc = 0;
            }
            if(spawn.spawnCreep(creepInfo.upgrader.parts, newName,
                {memory: {bornIn: spawn.room.name, 
                            role: 'upgrader', 
                            workingLoc: newloc,
                        }}) === OK) {
                    console.log(spawn.name + ' spawning new upgrader: ' + newName);
                };
        }
        else if(creepInfo.defender && hostiles.length > 3 && defenders.length < creepInfo.defender.num) {
            var newName = 'Defender' + Game.time;
            if(spawn.spawnCreep(creepInfo.defender.parts, newName,
                {memory: {bornIn: spawn.room.name, role: 'defender', stay: {x:21, y:19, room:'E7S48'}}}) === OK) {
                    console.log(spawn.name + ' spawning new defender: ' + newName);
                };
        }
        else if(creepInfo.repairer && repairers.length < creepInfo.repairer.num) {
            var newName = 'Repairer' + Game.time;
            if(spawn.spawnCreep(creepInfo.repairer.parts, newName,
                {memory: {bornIn: spawn.room.name, role: 'repairer'}}) === OK) {
                    console.log(spawn.name + ' spawning new repairer: ' + newName);
                };
        }
        else if(creepInfo.builder && builders.length < creepInfo.builder.num) {
            var newName = 'Builder' + Game.time;
            var newloc = 1;
            if(builders.length === 0 || builders[0].memory.workingLoc) {
                newloc = 0;
            }
            if(spawn.spawnCreep(creepInfo.builder.parts, newName,
                {memory: {bornIn: spawn.room.name, 
                            role: 'builder', 
                            workingLoc: newloc,
                        }}) === OK) {
                    console.log(spawn.name + ' spawning new builder: ' + newName);
                };
        }
        else if(creepInfo.mine_harvester && mine_harvesters.length < creepInfo.mine_harvester.num) {
            var newName = 'MineHarvester' + Game.time;
            if(spawn.spawnCreep(creepInfo.mine_harvester.parts, newName, 
                {memory: {bornIn: spawn.room.name, role: 'mineHarvester'}}) === OK) {
                    console.log(spawn.name + ' spawning new mineHarvester: ' + newName);
                }
        }
        else if(creepInfo.traveller && travellers.length < creepInfo.traveller.num) {
            var newName = 'Traveller' + Game.time;
            if(spawn.spawnCreep(creepInfo.traveller.parts, newName, 
                {memory: {bornIn: spawn.room.name, role: 'traveller',}}) === OK) {
                    console.log(spawn.name + ' spawning new traveller: ' + newName);
                }
        }
        else if(creepInfo.claimer && claimers.length < claimerNum) {
            var newName = 'Claimer' + Game.time;
            for(var room in creepInfo.claimer) {
                var workers = _.filter(claimers, creep => creep.memory.workingRoom === room)
                
                if(workers.length < creepInfo.claimer[room].num) {
                    var newName = 'Claimer' + Game.time;
                    
                    if(spawn.spawnCreep(creepInfo.claimer[room].parts, newName,
                        {memory: {bornIn: spawn.room.name, 
                                    role: 'claimer', 
                                    workingRoom: room,
                                }}) === OK) {
                            console.log(spawn.name + ' spawning new claimer: ' + newName);
                        };
                }
            }
        }
        else if(creepInfo.remoteHarvester && remoteHarvesters.length < remoteHarvesterNum) {
            for(var room in creepInfo.remoteHarvester) {
                var workers = _.filter(remoteHarvesters, creep => creep.memory.workingRoom === room)
                
                // console.log(room,creepInfo.remoteHarvester[remoteHarvesterRooms[index]],creepInfo.remoteHarvester.room)
                if(workers.length < creepInfo.remoteHarvester[room].num) {
                    var newName = 'RemoteHarvester' + Game.time;
                    var newloc = 1;
                    if(workers.length === 0 || workers[0].memory.workingLoc) {
                        newloc = 0;
                    }
                    if(spawn.spawnCreep(creepInfo.remoteHarvester[room].parts, newName,
                        {memory: {bornIn: spawn.room.name, 
                                    role: 'remoteHarvester', 
                                    workingLoc: newloc,
                                    workingRoom: room,
                                }}) === OK) {
                            console.log(spawn.name + ' spawning new remoteHarvester: ' + newName);
                        };
                }
            }
        }
        else if(creepInfo.remoteCarrier && remoteCarriers.length < remoteCarrierNum) {
            for(var room in creepInfo.remoteCarrier) {
                var workers = _.filter(remoteCarriers, creep => creep.memory.workingRoom === room)
                
                if(workers.length < creepInfo.remoteCarrier[room].num) {
                    var newName = 'RemoteCarrier' + Game.time;
                    var newloc = 1;
                    if(workers.length === 0 || workers[0].memory.workingLoc) {
                        newloc = 0;
                    }
                    if(spawn.spawnCreep(creepInfo.remoteCarrier[room].parts, newName,
                        {memory: {bornIn: spawn.room.name, 
                                    role: 'remoteCarrier', 
                                    workingLoc: newloc,
                                    workingRoom: room,
                                    backTo: creepInfo.remoteCarrier[room].backTo
                                }}) === OK) {
                            console.log(spawn.name + ' spawning new remoteCarrier: ' + newName);
                        };
                }
            }
        }
        

        // const remoteHarvesterRooms = Object.keys(creepInfo.remoteHarvester)
        // var remoteHarvesterNum = 0
        // remoteHarvesterRooms.map(room => remoteHarvesterNum += creepInfo.remoteHarvester[room].num)
        // console.log(remoteHarvesterNum)
    

     // const info =   {
    //     remoteHarvester: {
    //         E8S47:{num:2, parts:[MOVE,WORK]},
    //         E7S48:{num:2, parts:[WORK,WORK]},
    //         E7S49:{num:1, parts:[MOVE,MOVE]}
    //     }
    // } 
    
        if(spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};