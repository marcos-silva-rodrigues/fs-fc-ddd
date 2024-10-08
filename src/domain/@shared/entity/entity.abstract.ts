import Notification from "../notification/notification";

export default abstract class Entity {

    protected _id: string;
    public notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    public get id(): string {
        return this._id;
    }

    protected set id(value: string) {
        this._id = value;
    }
}