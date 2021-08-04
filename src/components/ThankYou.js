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

    renderExtraContent = () => (
        <>
            <h3></h3>
            <p className='description'>
                Instrucciones de la municipalidad sobre cómo proceder en caso de inundación
                <br/>
                <a href='https://www.laplata.gob.ar/#/gobierno/programa/ejes?categoria=comoActuar'>Clickeá acá</a>
            </p>
            <p className='description'>
                Video informativo sobre la inundación de 2013
                <br/>
                <a href='https://unlp.edu.ar/inundaciones/video-inundaciones-urbanas-en-la-plata-berisso-y-ensenada-9631'>Clickeá acá</a>
            </p>
        
        </>
        
        )
    render = () => (
        <Template
            bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Caminos a refugios</>}
            extraContent={this.renderExtraContent()}>
            <h2>¡Listo!</h2>
            <p className='description'>
                Asegurate de tener el mapa impreso o digital accesible. 
            </p>
            <Button className='button' onClick={() => this.props.history.push('/', { bigFont: this.state.bigFont })}>
                Empezar de nuevo
            </Button>
        </Template>
    );
}