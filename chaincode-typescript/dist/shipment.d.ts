import { Context, Contract } from 'fabric-contract-api';
export declare class ShipmentContract extends Contract {
    initLedger(ctx: Context): Promise<void>;
    createShipment(ctx: Context, id: string, sender: string, receiver: string, location: string): Promise<void>;
    updateShipmentStatus(ctx: Context, id: string, status: string, location: string): Promise<void>;
    queryShipment(ctx: Context, id: string): Promise<string>;
}
export declare const contract: typeof ShipmentContract;
