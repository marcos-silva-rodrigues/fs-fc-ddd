import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class EnviaConsoleLogHandler 
    implements EventHandlerInterface<CustomerUpdatedEvent> {
    
    handle(event: CustomerUpdatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData?.id}, ${event.eventData?.name} alterado para: ${event.eventData?.endereco}`);
    }
}