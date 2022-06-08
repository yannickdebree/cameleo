type MessageCallback = (...message: any[]) => void;

export class Output {
    private callbacks = new Array<MessageCallback>();

    push(line: any, ...params: any[]) {
        this.callbacks.forEach(callback => {
            callback(line, ...params);
        })
    }

    onMessage(onMessageCallback: MessageCallback) {
        this.callbacks.push(onMessageCallback);
    }
}