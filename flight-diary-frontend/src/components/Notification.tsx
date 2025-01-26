import { Message } from "../types";

interface NotificationProps {
    message: Message | null
};

const Notification = ({ message }: NotificationProps) => {
    if (message === null) { return null; }
    let message_color = "black";
    if (message.type === "error") { 
        message_color = "red";
    }
    return (
        <div style={{color: message_color}}>
            { message.text }
        </div>
    )

};

export default Notification;