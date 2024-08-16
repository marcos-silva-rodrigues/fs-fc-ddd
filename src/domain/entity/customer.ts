import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerUpdatedEvent from "../event/customer/customer-updated.event";
import { Address } from "./address";

export class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;
    private _eventDispatcher: EventDispatcherInterface;

    constructor(id: string, name: string, eventDispatcher: EventDispatcherInterface) {
        this._id = id;
        this._name = name;
        this._eventDispatcher = eventDispatcher;
        this.validate();
        this._eventDispatcher.notify(new CustomerCreatedEvent({
            id: id,
            name: name
        }));
    }

    get name (): string {
        return this._name;
    }

    get id (): string {
        return this._id;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set address (address: Address) {
        this._address = address;
    }

    validate(){
        if(this._id.length === 0) {
            throw new Error("Id is required");
        }

        if(this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate()

        this.notifyCustomerUpdated();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActivate(): boolean {
        return this._active
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    private notifyCustomerUpdated(): void {
        const data = {
            id: this._id,
            name: this._name,
            endereco: `${this._address.street} ${this._address.number}, ${this._address.city} ${this._address.zip}`
        }

        this._eventDispatcher.notify(new CustomerUpdatedEvent(data));
    }
}