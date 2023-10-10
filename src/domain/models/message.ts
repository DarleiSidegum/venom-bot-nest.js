export class MessageModel {
    body: string;
    mediaBase64?: string;
    mediaType?: string;
    mediaName?: string;
    isGroup?: boolean;
    mentionedIds: string[];
    whatsappId: number;
}
