export type NotificationError = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: Map<string, string[]> = new Map();

    addError(error: NotificationError) {
        if(this.errors.has(error.context)) {
            const value = this.errors.get(error.context);
            value.push(error.message);
            this.errors.set(error.context, value);
        } else {
            this.errors.set(error.context, [error.message]);
        }
    }

    messages(context?: string) { 
        if (context) {
            const messages = this.errors.get(context)
            return this.makeMessage(context, messages)
        }

        let messages = "";
        this.errors.forEach((value, key) => {
            messages += this.makeMessage(key, value)
        })

        return messages
        
    }

    private makeMessage(context: string, messages: string[]) {
        return messages.reduce((acc, value) => 
            acc + `${context}: ${value},`, "");
    }

}