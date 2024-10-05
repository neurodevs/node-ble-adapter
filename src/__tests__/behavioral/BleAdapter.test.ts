import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import BleAdapterImpl from '../../BleAdapter'
import SpyBleAdapter from '../../testDoubles/SpyBleAdapter'

export default class BleAdapterTest extends AbstractSpruceTest {
    private static instance: SpyBleAdapter

    protected static async beforeEach() {
        await super.beforeEach()

        BleAdapterImpl.Class = SpyBleAdapter

        this.instance = this.BleAdapter()
    }

    @test()
    protected static async canCreateBleAdapter() {
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async createsBleScanner() {
        const scanner = this.instance.getBleScanner()
        assert.isTruthy(scanner)
    }

    private static BleAdapter() {
        return BleAdapterImpl.Create() as SpyBleAdapter
    }
}
