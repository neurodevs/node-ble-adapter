import { BleScanner, BleScannerImpl } from '@neurodevs/node-ble-scanner'

export default class BleAdapterImpl implements BleAdapter {
    public static Class?: BleAdapterConstructor

    protected scanner: BleScanner

    protected constructor(scanner: BleScanner) {
        this.scanner = scanner
    }

    public static Create() {
        const scanner = this.BleScanner()
        return new (this.Class ?? this)(scanner)
    }

    private static BleScanner() {
        return BleScannerImpl.Create()
    }
}

export interface BleAdapter {}

export type BleAdapterConstructor = new (scanner: BleScanner) => BleAdapter
