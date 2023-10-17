import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { MessageModel } from 'src/domain/models/message';
import { IMessageRepository } from 'src/domain/repositories/message-repository';
// import * as venom from 'venom-bot';
import { create, Whatsapp } from '@wppconnect-team/wppconnect';

import makeWASocket, {
    AuthenticationState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    proto,
    useMultiFileAuthState,
    WAMessage,
    WAMessageStubType,
    WASocket
  } from "@whiskeysockets/baileys";
import { Store } from 'src/infra/services/store';
import MAIN_LOGGER from "@whiskeysockets/baileys/lib/Utils/logger";
interface CreateMessageRequest {
    body: string;
    mediaBase64?: string;
    mediaType?: string;
    mediaName?: string;
    isGroup?: boolean;
    mentionedIds: string[];
    phone: string;
}

interface CreateMessageResponse {
    message: any;
}

type Session = WASocket & {
    id?: number;
    store?: Store;
};

const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = "silent";
@Injectable()
export class CreateMessage implements OnModuleInit {
    constructor(private readonly logger: ILogger, private readonly messageRepository: IMessageRepository) {}
    client: Whatsapp;
    wsocket: Session = null;
    async execute(request: CreateMessageRequest): Promise<CreateMessageResponse> {
        let {body, phone, mediaBase64, mediaName, mediaType, isGroup, mentionedIds} = request;
        // const message = new MessageModel();
        // Object.assign(message, request);

        let sended_message = await this.wsocket.sendMessage(phone+'@c.us', {text: body})
        // await this.client.sendText(phone+'@c.us', body)
        // .then((result) => {
        //     sended_message = result;
        // })

        this.logger.log('Send Message execute', 'New message have been sended');

        return { message: sended_message };
    }

    // async createSession(){
    //     create({
    //         session: 'session-name' //name of session
    //       })
    //     .then((_client: Whatsapp) => {
    //         this.start(_client);
    //         this.client = _client;
    //     })
    //     .catch((erro) => {
    //         console.log(erro);
    //     });
    // }

    async start(){

        const store = makeInMemoryStore({
            logger: loggerBaileys
          });
        const { isLatest, version } = await fetchLatestBaileysVersion();
        const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
        this.wsocket = makeWASocket({
            logger: loggerBaileys,
            printQRInTerminal: true,
            version,
            auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: makeCacheableSignalKeyStore(state.keys, loggerBaileys),
            },
            getMessage: async key => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid!, key.id!);
                    return msg?.message || undefined;
                }
            }
        });

        this.wsocket.ev.on(
            "connection.update",
            async ({ connection, lastDisconnect, qr }) => {
                this.logger.log(
                `Socket teste Connection Update ${connection || ""} ${
                  lastDisconnect || ""
                }`, 'teste'
              );

              const disconect = lastDisconnect?.error?.['output']?.statusCode;

              if (connection === "close") {
                if (disconect === 403) {

                //   removeWbot(id, false);
                }

                if (disconect !== DisconnectReason.loggedOut) {
                //   removeWbot(id, false);
                  setTimeout(() => this.start(), 2000);
                }

                if (disconect === DisconnectReason.loggedOut) {
                //   await whatsapp.update({
                //     status: "PENDING",
                //     session: "",
                //     number: ""
                //   });
                //   await DeleteBaileysService(whatsapp.id);

                //   await BaileysSessions.destroy({
                //     where: {
                //       whatsappId: whatsapp.id
                //     }
                //   });

                //   io.emit("whatsappSession", {
                //     action: "update",
                //     session: whatsapp
                //   });
                //   removeWbot(id, false);
                //   setTimeout(() => this.start(), 2000);
                }
              }

              if (connection === "open") {


                // resolve(wsocket);
              }

            //   if (qr !== undefined) {
            //     if (retriesQrCodeMap.get(id) && retriesQrCodeMap.get(id) >= 3) {
            //       await whatsappUpdate.update({
            //         status: "DISCONNECTED",
            //         qrcode: ""
            //       });
            //       await DeleteBaileysService(whatsappUpdate.id);
            //       await BaileysSessions.destroy({
            //         where: {
            //           whatsappId: whatsapp.id
            //         }
            //       });
            //       io.emit("whatsappSession", {
            //         action: "update",
            //         session: whatsappUpdate
            //       });
            //       wsocket.ev.removeAllListeners("connection.update");
            //       wsocket.ws.close();
            //       wsocket = null;
            //       // retriesQrCode = 0;
            //       retriesQrCodeMap.delete(id);
            //     } else {
            //       logger.info(`Session QRCode Generate ${name}`);
            //       retriesQrCodeMap.set(id, (retriesQrCode += 1));

            //       await whatsapp.update({
            //         qrcode: qr,
            //         status: "qrcode",
            //         retries: 0
            //       });
            //       const sessionIndex = sessions.findIndex(
            //         s => s.id === whatsapp.id
            //       );

            //       if (sessionIndex === -1) {
            //         wsocket.id = whatsapp.id;
            //         sessions.push(wsocket);
            //       }

            //       io.emit("whatsappSession", {
            //         action: "update",
            //         session: whatsapp
            //       });
            //     }
            //   }
            }
        );
        const filterMessages = (msg: WAMessage): boolean => {
            if (msg.message?.protocolMessage) return false;

            if (
              [
                WAMessageStubType.REVOKE,
                WAMessageStubType.E2E_DEVICE_CHANGED,
                WAMessageStubType.E2E_IDENTITY_CHANGED,
                WAMessageStubType.CIPHERTEXT
              ].includes(msg.messageStubType as WAMessageStubType)
            )
              return false;

            return true;
          };
        this.wsocket.ev.on("messages.upsert", async (messageUpsert: any) => {
            const messages = messageUpsert.messages
              .filter(filterMessages)
              .map(msg => msg);

            if (!messages) return;

            messages.forEach(async (message: proto.IWebMessageInfo) => {
              if (
                this.wsocket.type === "md" &&
                !message.key.fromMe &&
                messageUpsert.type === "notify"
              ) {
                (this.wsocket as WASocket)!.readMessages([message.key]);
              }
              console.log(JSON.stringify(message));
            //   handleMessage(message, wbot);
            });
        });

        this.wsocket.ev.on("creds.update", saveCreds);

        this.wsocket.store = store;
        store.bind(this.wsocket.ev);

        // client.onMessage((message) => {
        //     if (message.body === 'Hi' && message.isGroupMsg === false) {
        //         client
        //         .sendText(message.from, 'Welcome WP Connect')
        //         .then((result) => {
        //             console.log('Result: ', result); //return object success
        //         })

        //         .catch((erro) => {
        //             console.error('Error when sending: ', erro); //return object error
        //         });
        //     }
        // });
    }

    async onModuleInit() {
        console.log('aqui');
        await this.start();
    }
}
