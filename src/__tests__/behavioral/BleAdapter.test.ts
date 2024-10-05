import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import BleAdapterImpl, { BleAdapter } from '../../BleAdapter'

export default class BleAdapterTest extends AbstractSpruceTest {
    private static instance: BleAdapter

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.BleAdapter()
    }

    @test()
    protected static async canCreateBleAdapter() {
        assert.isTruthy(this.instance)
    }

    private static BleAdapter() {
        return BleAdapterImpl.Create()
    }
}
