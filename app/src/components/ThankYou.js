import React from 'react';
import Template from "./Template";
import {Button} from "reakit";

export default class ThankYou extends React.Component {
    constructor(props) {
        super(props);
        let bigFont = this.props.location && this.props.location.state && this.props.location.state.bigFont || false;
        this.state = { bigFont }
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    render = () => (
        <Template
            bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}>
            <h2>¡Gracias!</h2>
            <p className='description'>
                Gracias por usar nuestra aplicación!
            </p>
            <Button className='button' onClick={() => this.props.history.push('/', { bigFont: this.state.bigFont })}>
                Empezar de nuevo
            </Button>
        </Template>
    );
}