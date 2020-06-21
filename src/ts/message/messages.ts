export enum MessageType {
    UIInited = "uiInited",
    LinkRequest = "linkRequest",
    NodeNotFound = "nodeNotFound",
    BadLink = "badLink",
    UnselectableNode = "unselectableNode",
    WrongDocument = "wrongDocument"
}

export function newNodeNotFound(id: string): PluginMessage {
    return new PluginMessage(MessageType.NodeNotFound, id)
}

export function newTypePluginMessage(type: MessageType): PluginMessage {
    return new PluginMessage(type, null)
}

export interface WrongDocumentPayload {
    linkDocument: string
    currDocument: string
}

export function newWrongDocument(linkDocument: string, currDocument: string): PluginMessage {
    return new PluginMessage(
        MessageType.WrongDocument,
        {linkDocument, currDocument} as WrongDocumentPayload
    )
}

export class PluginMessage {
    constructor(type: MessageType, data: any) {
        this.type = type
        this.data = data
    }

    type: MessageType
    data: any
} 
