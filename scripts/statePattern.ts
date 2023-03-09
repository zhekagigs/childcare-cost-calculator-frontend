//state patterns

type Item = {
    name: string,
    price: number,
}

interface OrderState {
    Handle(): void;
}

class Order {

    currentState: OrderState;

    constructor() {
        this.currentState = new OrderReceived(this);
    }

    Request() {
        this.currentState.Handle()
    }
}

class OrderReceived implements OrderState {
    constructor (private _order: Order, ){}

    Handle(): void {
        console.log("Order Approved")
        this._order.currentState = new OrderShipped(this._order)
    }
}

// class InventoryStorage implements OrderState {

// }

// class OrderPicked implements OrderState {

// }

// class OrderPacked implements OrderState {

// }

class OrderShipped implements OrderState {
    constructor (private _order: Order, ){}
    Handle(): void {
        console.log("Order shipped")
        this._order.currentState = new OrderDelivered(this._order)
    }
}

class OrderDelivered implements OrderState{
    constructor (private _order: Order, ){}
    Handle(): void {
        console.log("Order delivered")
    }
}

// class OrderReturned implements OrderState{

// }




export default Order