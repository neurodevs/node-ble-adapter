import { assertOptions } from '@sprucelabs/schema'
import { Peripheral } from '@abandonware/noble'
import { BleScannerImpl } from '@neurodevs/node-ble-scanner'

export default class BleAdapterImpl implements BleAdapter {
    public static Class?: BleAdapterConstructor

    protected peripheral: Peripheral

    protected constructor(peripheral: Peripheral) {
        this.peripheral = peripheral
    }

    public static async Create(uuid: string) {
        assertOptions({ uuid }, ['uuid'])
        const peripheral = await this.connectToPeripheral(uuid)
        return new (this.Class ?? this)(peripheral)
    }

    private static async connectToPeripheral(uuid: string) {
        const scanner = this.BleScanner()
        const peripheral = await scanner.scanForPeripherals(uuid)
        await peripheral.connectAsync()
        return peripheral
    }

    private static BleScanner() {
        return BleScannerImpl.Create()
    }
}

export interface BleAdapter {}

export type BleAdapterConstructor = new (peripheral: Peripheral) => BleAdapter
