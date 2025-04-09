export const setupSSECard = () => {
    const eventSource = new EventSource('http://localhost:3000/card/events');

    eventSource.onopen = () => {
        console.log('Connection to server established.');
    };

    eventSource.onmessage = (event) => {
        console.log('Updated cards:', JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
    };
};

export const setupSSENotifications = () => {
    const eventSource = new EventSource('http://localhost:3000/notifications/events');

    eventSource.onopen = () => {
        console.log('Connection to server established.');
    };

    eventSource.onmessage = (event) => {
        const notifications = JSON.parse(event.data);
        console.log('Updated notifications:', notifications);
    };

    eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
    };
};
