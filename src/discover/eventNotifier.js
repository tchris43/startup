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