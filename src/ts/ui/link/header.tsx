import * as React from 'react'
import { Column, Row } from 'simple-flexbox';
import { Input } from '../common/input';

interface LinkHeaderProps {
    onLinkSubmit(text: string)
    onInputChange(text: string)
    onButtonClick()

    alertText: string
}
export class LinkHeader extends React.Component<LinkHeaderProps> {
    render() {
        return <div>
            <LinkInput onSubmit={this.props.onLinkSubmit} onChange={this.props.onInputChange} />
            
            <Row horizontal="end">
                <Column horizontal="start">
                    {this.renderAlert(this.props.alertText)}
                </Column>
                <Column horizontal="end">
                    <ButtonBar onButtonClick={this.props.onButtonClick} />
                </Column>
            </Row>
        </div>
    }

    renderAlert(text: string) {
        return <p style={{ color: 'red', marginRight: 20 }} className='type type--pos-large-normal'>
            {text}
        </p>
    }
}

interface ButtonBarProps {
    onButtonClick()
}
class ButtonBar extends React.Component<ButtonBarProps> {
    render() {
        return <Row>
            <Column flexGrow={1} horizontal='end' vertical='center'>
                <Button 
                    onClick={this.props.onButtonClick}
                    text="Go!"
                />
            </Column>
        </Row>
    }
}

interface ButtonProps {
    onClick(): void
    text: string
}
class Button extends React.Component<ButtonProps> {
    render() {
        return React.createElement("button", { 
            className: 'button button--primary', 
            onClick: this.props.onClick 
        }, this.props.text)
    }
}

class LinkInput extends Input {
    getPlaceholder(): string {
        return "Link"
    }
}