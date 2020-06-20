export enum MessageType {
    UIInited = "uiInited",
    LinkRequest = "linkRequest",
    NodeNotFound = "nodeNotFound",
    NoIDInLink = "noIDInLink",
    UnselectableNode = "unselectableNode"
}

export function newNodeNotFound(id: string): PluginMessage {
    return new PluginMessage(MessageType.NodeNotFound, id)
}

export function newTypePluginMessage(type: MessageType): PluginMessage {
    return new PluginMessage(type, null)
}

export class PluginMessage {
    constructor(type: MessageType, data: any) {
        this.type = type
        this.data = data
    }

    type: MessageType
    data: any
} 
