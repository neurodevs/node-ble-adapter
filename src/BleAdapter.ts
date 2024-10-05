export default class BleAdapterImpl implements BleAdapter {
    public static Class?: BleAdapterConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface BleAdapter {}

export type BleAdapterConstructor = new () => BleAdapter
