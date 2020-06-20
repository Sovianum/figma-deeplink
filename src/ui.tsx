import './static/ds.min.css'
import './static/ds.min.js'
import './styles/tabs.scss'
import './styles/tags.scss'
import './styles/indexing.scss'
import {MessageType, PluginMessage } from './ts/message/messages'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { App } from './ts/ui/app'

let app: App = null

onmessage = event => {
  console.log("event got by client", event)

  const msg = event.data.pluginMessage as PluginMessage
  if (!msg) {
    return
  }

  if (msg.type == MessageType.UIInited) {
    initApp()
  } else {
    handleMessage(msg)
  }
}

const initApp = () => {
  const page = document.getElementById('react-page')
  ReactDOM.render(<App ref={ref => {
    app = ref
  
    parent.postMessage({pluginMessage: {
      type: MessageType.UIInited
    }}, "*")
  
  }}/>, page)
}

const handleMessage = (msg: PluginMessage) => {
  if (!app) {
    console.log('initialising')
    return
  }

  switch (msg.type) {
    case MessageType.NodeNotFound:
      app.onNodeNotFound(msg.data as string)
      break

    case MessageType.NoIDInLink:
      app.onNoIDInLink()
      break

    case MessageType.UnselectableNode:
      app.onUnselectableNode()
      break
  }
}