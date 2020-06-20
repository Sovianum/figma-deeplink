import * as React from 'react'
import {LinkHeader} from './header'

export interface PanelProps {
    onLinkSubmit(text: string)
    onInputChange(text: string)
    onButtonClick()

    alertText: string
}

export class LinkPanel extends React.Component<PanelProps> {
    render() {
        return <div>
            <LinkHeader 
                onLinkSubmit={this.props.onLinkSubmit}
                onInputChange={this.props.onInputChange}
                onButtonClick={this.props.onButtonClick}
                alertText={this.props.alertText}
            />
        </div>
    }
}