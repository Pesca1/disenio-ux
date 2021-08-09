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
        document.title = "Caminos a refugios";
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    goTo = (pathName, pathParams) => {
        this.props.history.push('/'+pathName, pathParams) 
        window.location.reload()
    }

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Caminos a refugios</>}>
            <h2>¿Qué hacer en una inundación?</h2>
            <p className='description'>
                Durante una inundación es importante saber a dónde ir en caso de precisar ayuda. Los centros de evacuación son puntos de encuentro donde pueden ofrecerte primeros auxilios. Si no tenés un lugar seguro preestablecido podés ir a uno de estos. Esta aplicación sirve para trazar caminos de una ubicaicón a centros evacuación, evitando zonas con probabilidad de inundarse.
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