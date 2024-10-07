import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import {
    BleScannerImpl,
    FakeBleScanner,
    FakePeripheral,
} from '@neurodevs/node-ble-scanner'
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
    protected static async discoversPeripheralDuringCreate() {
        assert.isTruthy(
            this.peripheral,
            'Should discover peripheral during Create!'
        )
    }

    @test()
    protected static async connectsToPeripheralDuringCreate() {
        assert.isTruthy(
            this.peripheral.didCallConnectAsync,
            'Should connect to peripheral during Create!'
        )
    }

    private static get peripheral() {
        return this.instance.getPeripheral() as unknown as FakePeripheral
    }

    private static async BleAdapter(uuid: string) {
        return (await BleAdapterImpl.Create(uuid)) as SpyBleAdapter
    }
}
