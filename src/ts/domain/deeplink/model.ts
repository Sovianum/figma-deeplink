import {getNodePage} from '../util'
import {newNodeNotFound, newTypePluginMessage, MessageType, newWrongDocument} from '../../message/messages'
import { parseFigmaLink } from './link'


export class DeeplinkModel {
    onLinkRequest(req: string) {
        const linkInfo = parseFigmaLink(req)
        if (!linkInfo || !linkInfo.nodeID) {
            figma.ui.postMessage(newTypePluginMessage(MessageType.BadLink))
            return
        }

        const fileName = figma.root.name 
        if (!this.compareDocuments(linkInfo.fileName, fileName)) {
            figma.ui.postMessage(newWrongDocument(linkInfo.fileName, fileName))
            return
        }

        return this.navToNode(linkInfo.nodeID)
    }

    navToNode(id: string) {
        const srcNode = figma.getNodeById(id)
        if (!srcNode) {
            figma.ui.postMessage(newNodeNotFound(id))
            return
        }

        let node = null
        switch (srcNode.type) {
        case "PAGE":
            node = srcNode.children[0] as SceneNode
            break

        case "DOCUMENT":
        case "BOOLEAN_OPERATION":
        case "VECTOR":
            figma.ui.postMessage(newTypePluginMessage(MessageType.UnselectableNode))
            return

        default:
            node = srcNode as SceneNode
        }

        const page = getNodePage(node)
        
        if (page !== figma.currentPage) {
            figma.currentPage = page
        }
        
        try {
            figma.currentPage.selection = [node]
            figma.viewport.scrollAndZoomIntoView([node])
        } catch (e) {
            console.error(e)
            figma.ui.postMessage(newTypePluginMessage(MessageType.UnselectableNode))
        }
    }

    getCurrentDocumentID(): string {
        return figma.currentPage.parent.id
    }

    compareDocuments(file1: string, file2: string): boolean {
        const normalize = (fileName: string): string => {
            fileName.replace
            return fileName.replace(/ /g, '').replace(/-/g, '')
        }

        return normalize(file1) === normalize(file2)
    }
}