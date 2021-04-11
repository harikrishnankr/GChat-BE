import { SocketId } from 'socket.io-adapter';
import { Socket } from 'socket.io';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { WHITE_LIST } from '../config';

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

    createServer(server: http.Server) {
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

    connection(client: Socket) {
        console.log(client)
        // event fired when the chat room is disconnected
        client.on("disconnect", (userId: string) => {
            delete clientSockets[userId];
        });

        // add identity of user mapped to the socket id
        client.on("identity", (userId: UserId) => {
            if (!userId) {
               return;
            }

            if (clientSockets[userId]) {
                clientSockets[userId].push(client);
            } else {
                clientSockets[userId] = [client];
            }
        });

        client.on("message", (messageBody: IMessage) => {
            if (!messageBody.from || !messageBody.to) {
                return;
            }

            const { to } = messageBody;
            if (Array.isArray(to)) {
                try {
                    to.forEach((id: string) => {
                        if (clientSockets[id]) {
                            clientSockets[id].forEach((socket: Socket) => socket.emit('message', messageBody));
                        }
                    });
                } catch {
                    return;
                }
            }
        });
    }
}

export default new WebSockets();