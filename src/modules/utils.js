export const creepInfo = {
    harvester: {num: 2, 
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    ]},
    upgrader: {num: 2, 
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY,
                        WORK, WORK, WORK, WORK, WORK,
                    ]},
    builder: {num: 2, 
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY,
                        WORK, WORK, WORK, WORK, WORK, 
                    ]},
    carrier: {num: 5, 
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    ]},
    repairer: {num: 0, 
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY,CARRY, CARRY,
                        WORK, WORK, WORK, 
                    ]},
    defender: {num: 2,
                parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        ATTACK, ATTACK,  ATTACK,  ATTACK,  ATTACK,  
                        ATTACK,  ATTACK,  ATTACK,  ATTACK,  ATTACK,
                    ]}
}