import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import { Peripheral } from '@abandonware/noble'
import BleAdapterImpl from '../../BleAdapter'
import FakePeripheral from '../../testDoubles/FakePeripheral'
import SpyBleAdapter from '../../testDoubles/SpyBleAdapter'

export default class BleAdapterTest extends AbstractSpruceTest {
    private static instance: SpyBleAdapter
    private static uuid: string

    protected static async beforeEach() {
        await super.beforeEach()

        this.uuid = generateId()

        BleAdapterImpl.Class = SpyBleAdapter

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
            await BleAdapterImpl.Create()
        })
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['peripheral'],
        })
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
        const fake = new FakePeripheral(uuid) as unknown as Peripheral
        return (await BleAdapterImpl.Create(fake)) as SpyBleAdapter
    }
}
