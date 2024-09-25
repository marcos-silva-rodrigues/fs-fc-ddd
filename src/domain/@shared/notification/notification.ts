export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    messages(context?: string) { 
        if (context) {
            return this.errors
                .filter(error => error.context === context)
                .reduce(this.makeMessage, "");
        }

        return this.errors.reduce(this.makeMessage, "");
        
    }

    private makeMessage(acc: string, props: NotificationErrorProps): string {
        return acc + `${props.context}: ${props.message},`
    }

}