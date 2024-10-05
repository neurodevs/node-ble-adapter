import { BleScanner } from '@neurodevs/node-ble-scanner'
import BleAdapterImpl from '../BleAdapter'

export default class SpyBleAdapter extends BleAdapterImpl {
    public constructor(scanner: BleScanner) {
        super(scanner)
    }

    public getBleScanner() {
        return this.scanner
    }
}
