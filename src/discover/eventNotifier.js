const InviteEvent = {
    System: 'system',
    Invite: 'invite',
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class InviteEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('NextEvent', InviteEvent.System, {msg: 'connected'}));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('NextEvent', InviteEvent.System, {msg: 'disconnected'}));
        };
        this.socket.onmessage = async (msg) => {
            try {
                console.log(`Recieved: ${msg}`);
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }


    broadcastEvent(from, type, value){
        console.log("In broadcast");
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        if (event.type == "invite") {
            console.log(this.handlers);
            this.handlers.forEach((handler) => {
                console.log("handling");
                handler(event);
            })
        }
    }
}

const InviteNotifier = new InviteEventNotifier();
export { InviteEvent, InviteNotifier};