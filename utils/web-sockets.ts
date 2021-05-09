import { SocketId } from 'socket.io-adapter';
import { Socket } from 'socket.io';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { WHITE_LIST } from '../config';
import { MESSAGE_TRIGGERS } from '../constants';

export type UserId = string;

export interface User {
    socketId: SocketId;
    userId: UserId;
}

const clientSockets: { [key: string]: Socket[]} = {};

interface IMessage {
    from: string;
    to: string[];
    message: string;
}

class WebSockets {
    private io!: SocketIOServer;

    public createServer(server: http.Server) {
        const socketServer = new SocketIOServer({
            path: '/chat-server/',
            cors: {
                origin: WHITE_LIST[0],
                methods: ["GET", "POST"]
            }
        });
        this.io = socketServer.listen(server);
        socketServer.on('connection', (client) => this.connection(client));
    }

    public connection(client: Socket) {
        // event fired when the chat room is disconnected
        client.on(MESSAGE_TRIGGERS.DISCONNECT, (userId: string) => {
            delete clientSockets[userId];
        });

        // add identity of user mapped to the socket id
        client.on(MESSAGE_TRIGGERS.IDENTITY, (userId: UserId) => {
            if (!userId) {
               return;
            }

            if (clientSockets[userId]) {
                clientSockets[userId].push(client);
            } else {
                clientSockets[userId] = [client];
            }
        });

        client.on(MESSAGE_TRIGGERS.SEND_MESSAGE, (messageBody: IMessage) => {
            if (!messageBody.from || !messageBody.to) {
                return;
            }

            const { to } = messageBody;
            this.sendTo(to, (socket: Socket) => socket.emit(MESSAGE_TRIGGERS.SEND_MESSAGE, messageBody));
        });
    }


    private sendTo(sendTo: string[], callback: (socket: Socket) => void) {
        if (Array.isArray(sendTo)) {
            try {
                sendTo.forEach((id: string) => {
                    if (clientSockets[id]) {
                        clientSockets[id].forEach((socket: Socket) => callback(socket));
                    }
                });
            } catch {
                return;
            }
        }
    }

    public emit(triggerName: string, sendTo: string[], data?: any) {
        this.sendTo(sendTo, (socket: Socket) => socket.emit(triggerName, data));
    }
}

export default new WebSockets();