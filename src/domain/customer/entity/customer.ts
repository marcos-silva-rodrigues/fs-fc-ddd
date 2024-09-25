import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerUpdatedEvent from "../event/customer-updated.event";
import { Address } from "../value-object/address";

export class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;
    private _eventDispatcher: EventDispatcherInterface;

    constructor(id: string, name: string, eventDispatcher: EventDispatcherInterface) {
        super();
        this.id = id;
        this._name = name;
        this._eventDispatcher = eventDispatcher;
        this.validate();
        this._eventDispatcher.notify(new CustomerCreatedEvent({
            id: id,
            name: name
        }));

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name (): string {
        return this._name;
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
        if(this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }

        if(this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
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
            id: this.id,
            name: this._name,
            endereco: `${this._address.street} ${this._address.number}, ${this._address.city} ${this._address.zip}`
        }

        this._eventDispatcher.notify(new CustomerUpdatedEvent(data));
    }
}