import { minimumStorage } from './utils'

export const buyResourceForRoomWithNeed = function(resourceType, roomName, powerNeed) {
    let history = Game.market.getHistory(resourceType);
    let avgPrice = 0;
    let stddevPrice = 0;
    if(history[history.length - 1].volume > history[history.length - 2].volume * 0.2) {
        avgPrice = history[history.length - 1].avgPrice;
        stddevPrice = history[history.length - 1].stddevPrice;
    }
    else {
        avgPrice = history[history.length - 2].avgPrice;
        stddevPrice = history[history.length - 2].stddevPrice;
    }
    let orders = Game.market.getAllOrders(order => 
        order.resourceType === resourceType
        && order.type === ORDER_SELL
        && order.price < avgPrice + + 0.9 * stddevPrice
        && order.remainingAmount > 0
    );
        // console.log(orders.length);
        // console.log(avgPrice + 0.9 * stddevPrice);
    if(orders.length) {
        orders.sort((a,b) => a.price - b.price);
            // console.log(orders[0].price, orders[0].roomName);
        let cand = orders[0];
        let amount = Math.min(cand.remainingAmount, powerNeed);
            // console.log("target credit:", cand.price * amount);
        if(Game.market.credits >= cand.price * amount) {
            let res = Game.market.deal(cand.id, amount, roomName);
            if(res === OK) {
                console.log('bought', amount, 'power from room', cand.roomName, 'with price',cand.price,', cost', Game.market.calcTransactionCost(amount, roomName, cand.roomName));
            }
            else if(res !== ERR_TIRED) {
                console.log('failed to buy', amount, 'power from room', cand.roomName, ', cost', Game.market.calcTransactionCost(amount, roomName, cand.roomName),'(',res,')')
            }
        }
        else {
            if(Game.rooms[roomName].storage.store[RESOURCE_ENERGY] > minimumStorage && Game.rooms[roomName].terminal.store[RESOURCE_ENERGY] > 2000) {
                sellResourceWithAmountFrom(RESOURCE_ENERGY, Game.rooms[roomName].terminal.store[RESOURCE_ENERGY] - 2000, roomName);
            }
        }
    }
    else {
        // if(Game.rooms[roomName].storage.store[RESOURCE_ENERGY] > minimumStorage && Game.rooms[roomName].terminal.store[RESOURCE_ENERGY] > 2000) {
        //     sellResourceWithAmountFrom(RESOURCE_ENERGY, Game.rooms[roomName].terminal.store[RESOURCE_ENERGY] - 2000, roomName);
        // }
    }
}


export const sellResourceWithAmountFrom = function(type, haveAmount, roomName) {
    let history = Game.market.getHistory(type);
    let avgPrice = 0;
    let stddevPrice = 0;
    if(history[history.length - 1].volume > history[history.length - 2].volume * 0.2) {
        avgPrice = history[history.length - 1].avgPrice;
        stddevPrice = history[history.length - 1].stddevPrice;
    }
    else {
        avgPrice = history[history.length - 2].avgPrice;
        stddevPrice = history[history.length - 2].stddevPrice;
    }
    let orders = Game.market.getAllOrders(order => 
        order.resourceType === type
        && order.type === ORDER_BUY
        && order.price > avgPrice - 0.5 * stddevPrice
        && order.remainingAmount > 0
    );
    if(orders.length) {
        orders.sort((a,b) => b.price * 10000 / (10000 + Game.market.calcTransactionCost(10000, b.roomName, roomName)) - a.price * 10000 / (10000 + Game.market.calcTransactionCost(10000, a.roomName, roomName)));
        // console.log(orders[0].price, orders[0].roomName);
        let cand = orders[0];
        let amount = 0;
        if(type === RESOURCE_ENERGY) {
            amount = Math.min(cand.remainingAmount, haveAmount / 2);
        }
        else {
            amount = Math.min(cand.remainingAmount, haveAmount);
        }
        let res = Game.market.deal(cand.id, amount, roomName);
        if(res === OK) {
            console.log('sold', amount, 'energy to room', cand.roomName, 'with price',cand.price,', cost', Game.market.calcTransactionCost(amount, roomName, cand.roomName));
        }
        else if(res !== ERR_TIRED) {
            console.log('failed to sell', amount, 'energy to room', cand.roomName, ', cost', Game.market.calcTransactionCost(amount, roomName, cand.roomName),'(',res,')')
        }
    }
}