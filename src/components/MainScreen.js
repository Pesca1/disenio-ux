import React from 'react';
import Template from "./Template";
import {Button} from "reakit";


export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        let bigFont = this.props.location && this.props.location.state && this.props.location.state.bigFont || false;
        this.state = { bigFont }
    }

    componentDidMount() {
        document.title = "Prevención de Inundaciones";
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    renderExtraContent = () => (
        <>
            <h3>Mas información importante</h3>
            <p className='description'>
                Lorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amen
            </p>
        </>
    )

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            extraContent={this.renderExtraContent()}>
            <h2>Prevención</h2>
            <p className='description'>
                Lorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amen
            </p>
            <Button className='button' onClick={() => this.props.history.push('/address', { bigFont: this.state.bigFont })}>
                Comencemos!
            </Button>
        </Template>
    );
}