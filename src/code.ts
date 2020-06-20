import {DeeplinkModel} from './ts/domain/deeplink/model'
import {MessageType, PluginMessage, newTypePluginMessage} from './ts/message/messages'

figma.showUI(__html__, { width: 500, height: 100 })
figma.ui.postMessage(newTypePluginMessage(MessageType.UIInited))

const deeplinkModel = new DeeplinkModel()

figma.ui.onmessage = async function(msg) {
  console.log("message got by domain", msg)

  try {
    switch (msg.type) {

      case MessageType.LinkRequest:
        try {
          await deeplinkModel.onLinkRequest(msg.text)
          break
        } catch (e) {
          if (e instanceof PluginMessage) {
            figma.ui.postMessage(e)
          } else {
            throw e
          }
        }
        
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}