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
    goTo = (pathName, pathParams) => {
        this.props.history.push('/'+pathName, pathParams) 
        window.location.reload()
    }

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            extraContent={this.renderExtraContent()}>
            <h2>Prevención</h2>
            <p className='description'>
                Durante una inundación es importante saber a dónde ir en caso de precisa ayuda. Esta aplicación sirve para visualizar e imprimir caminos hacia algunos de los centros de evacuación. 
            </p>
            <Button className='button' onClick={() => this.goTo('address', { bigFont: this.state.bigFont })}>
                Comencemos!
            </Button>
        </Template>
    );
}