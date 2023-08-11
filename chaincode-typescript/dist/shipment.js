"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.ShipmentContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class ShipmentContract extends fabric_contract_api_1.Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const shipments = [
            {
                id: 'shipment1',
                sender: 'SenderA',
                receiver: 'ReceiverX',
                status: 'InTransit',
                location: 'WarehouseA',
                timestamp: Date.now()
            },
            // Add more initial shipments here
        ];
        for (const shipment of shipments) {
            await ctx.stub.putState(shipment.id, Buffer.from(JSON.stringify(shipment)));
            console.info(`Added shipment ${shipment.id}`);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async createShipment(ctx, id, sender, receiver, location) {
        console.info('============= START : Create Shipment ===========');
        const shipment = {
            id,
            sender,
            receiver,
            status: 'InTransit',
            location,
            timestamp: Date.now()
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(shipment)));
        console.info(`Shipment ${id} created`);
        console.info('============= END : Create Shipment ===========');
    }
    async updateShipmentStatus(ctx, id, status, location) {
        console.info('============= START : Update Shipment Status ===========');
        const shipmentBytes = await ctx.stub.getState(id);
        if (!shipmentBytes || shipmentBytes.length === 0) {
            throw new Error(`Shipment ${id} does not exist`);
        }
        const shipment = JSON.parse(shipmentBytes.toString());
        shipment.status = status;
        shipment.location = location;
        shipment.timestamp = Date.now();
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(shipment)));
        console.info(`Shipment ${id} status updated`);
        console.info('============= END : Update Shipment Status ===========');
    }
    async queryShipment(ctx, id) {
        const shipmentBytes = await ctx.stub.getState(id);
        if (!shipmentBytes || shipmentBytes.length === 0) {
            throw new Error(`Shipment ${id} does not exist`);
        }
        return shipmentBytes.toString();
    }
}
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], ShipmentContract.prototype, "initLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ShipmentContract.prototype, "createShipment", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], ShipmentContract.prototype, "updateShipmentStatus", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ShipmentContract.prototype, "queryShipment", null);
exports.ShipmentContract = ShipmentContract;
exports.contract = ShipmentContract;
//# sourceMappingURL=shipment.js.map