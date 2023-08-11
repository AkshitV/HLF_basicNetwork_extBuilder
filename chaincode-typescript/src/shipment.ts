/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Transaction, Returns } from 'fabric-contract-api';

interface Shipment {
    id: string;
    sender: string;
    receiver: string;
    status: string;
    location: string;
    timestamp: number;
}

export class ShipmentContract extends Contract {
    @Transaction()
    public async initLedger(ctx: Context): Promise<void> {
        console.info('============= START : Initialize Ledger ===========');
        const shipments: Shipment[] = [
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

    @Transaction()
    public async createShipment(ctx: Context, id: string, sender: string, receiver: string, location: string): Promise<void> {
        console.info('============= START : Create Shipment ===========');

        const shipment: Shipment = {
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

    @Transaction()
    async updateShipmentStatus(ctx: Context, id: string, status: string, location: string): Promise<void> {
        console.info('============= START : Update Shipment Status ===========');

        const shipmentBytes = await ctx.stub.getState(id);
        if (!shipmentBytes || shipmentBytes.length === 0) {
            throw new Error(`Shipment ${id} does not exist`);
        }

        const shipment: Shipment = JSON.parse(shipmentBytes.toString());

        shipment.status = status;
        shipment.location = location;
        shipment.timestamp = Date.now();

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(shipment)));
        console.info(`Shipment ${id} status updated`);

        console.info('============= END : Update Shipment Status ===========');
    }

    @Transaction(false)
    @Returns('string')
    async queryShipment(ctx: Context, id: string): Promise<string> {
        const shipmentBytes = await ctx.stub.getState(id);
        if (!shipmentBytes || shipmentBytes.length === 0) {
            throw new Error(`Shipment ${id} does not exist`);
        }
        return shipmentBytes.toString();
    }

}

export const contract = ShipmentContract;