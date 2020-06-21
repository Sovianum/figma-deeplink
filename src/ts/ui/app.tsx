import * as React from 'react'
import { MessageType } from '../message/messages'
import { LinkPanel } from './link/panel'

export interface AppState {
    link: string
    alert: string
}

export class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)

        this.state = {
            link: "",
            alert: ""
        }

        this.sendLinkRequest = this.sendLinkRequest.bind(this)
        this.onLinkInputChange = this.onLinkInputChange.bind(this)
    }

    render() {
        return this.getLinkPanel()
    }

    getLinkPanel() {
        return <LinkPanel 
            onButtonClick={this.sendLinkRequest}
            onLinkSubmit={this.sendLinkRequest}
            onInputChange={this.onLinkInputChange}
            alertText={this.state.alert}
        />
    }

    onLinkInputChange(text: string) {
        this.setState({
            link: text
        })
    }

    onNodeNotFound(id: string) {
        console.log("node not found called")
        this.resetState()

        this.setState({
            alert: "Node is not found in this document"
        })
    }

    onWrongDocument(linkDocument: string, currDocument: string) {
        console.log("wrong document")
        this.resetState()

        this.setState({
            alert: `This link is from \"${linkDocument}\" document; current document is \"${currDocument}\"`
        })
    }

    onBadLink() {
        this.resetState()

        this.setState({
            alert: "Wrong link format"
        })
    }

    onUnselectableNode() {
        this.resetState()

        this.setState({
            alert: "This type of node is not selectable"
        })
    }

    resetState() {
        this.setState({
            alert: ""
        })
    }

    onLinkSubmit(query: string) {
        this.setState({
            link: query
        })

        this.sendLinkRequest
    }

    sendLinkRequest() {
        this.resetState()

        const query = this.state.link

        parent.postMessage({ pluginMessage: { 
                type: MessageType.LinkRequest, 
                text: query
            }
        }, '*')
    }
}