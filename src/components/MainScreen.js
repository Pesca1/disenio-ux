import React from 'react';
import Template from "./Template";
import {Button, Link} from "reakit";



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

    /*
    renderExtraContent = () => (
        <>
            <h3></h3>
            <p className='description'>
                Instrucciones de la municipalidad sobre cómo proceder en caso de inundación
                <br/>
                <a href='https://www.laplata.gov.ar/#/gobierno/programa/ejes?categoria=comoActuar'>Clickeá acá</a>
            </p>
            <p className='description'>
                Video informativo sobre la inundación de 2013
                <br/>
                <a href='https://unlp.edu.ar/inundaciones/video-inundaciones-urbanas-en-la-plata-berisso-y-ensenada-9631'>Clickeá acá</a>
            </p>
        </>
        
        )
     */

    renderExtraContent = () => (
        <>
            
        </>
        
        )
    goTo = (pathName, pathParams) => {
        this.props.history.push('/'+pathName, pathParams) 
        window.location.reload()
    }

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            extraContent={this.renderExtraContent()}>
            <h2>¿Qué hacer en una inundación?</h2>
            <p className='description'>
                Durante una inundación es importante saber a dónde ir en caso de precisar ayuda. Esta aplicación sirve para visualizar e imprimir caminos hacia algunos de los centros de evacuación, evitando zonas con riesgo a inundarse.
            </p>
            <h3>Pasos</h3>
            <ol>                
                <li>Ingresar dirección de tu casa</li>
                <li>Confirmar que el marcador del mapa sea tu dirección. Si no, seleccionar manualmente</li>
                <li>Seleccionar el centro de evacuación</li>
                <li>Imprimir o guardar el mapa</li>
            </ol>
            <Button className='button' onClick={() => this.goTo('address', { bigFont: this.state.bigFont })}>
                ¡Comencemos!
            </Button>
        </Template>
    );
}