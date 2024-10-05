import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import { BleScannerImpl, FakeBleScanner } from '@neurodevs/node-ble-scanner'
import BleAdapterImpl from '../../BleAdapter'
import SpyBleAdapter from '../../testDoubles/SpyBleAdapter'

export default class BleAdapterTest extends AbstractSpruceTest {
    private static instance: SpyBleAdapter
    private static uuid: string

    protected static async beforeEach() {
        await super.beforeEach()

        this.uuid = generateId()

        BleAdapterImpl.Class = SpyBleAdapter
        BleScannerImpl.Class = FakeBleScanner

        FakeBleScanner.setFakedPeripherals([this.uuid])

        this.instance = await this.BleAdapter(this.uuid)
    }

    @test()
    protected static async canCreateBleAdapter() {
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        const err = await assert.doesThrowAsync(async () => {
            // @ts-ignore
            await this.BleAdapter()
        })
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['uuid'],
        })
    }

    @test()
    protected static async discoversPeripheralOnInstantiation() {
        const peripheral = this.instance.getPeripheral()
        assert.isTruthy(peripheral)
    }

    private static async BleAdapter(uuid: string) {
        return (await BleAdapterImpl.Create(uuid)) as SpyBleAdapter
    }
}
