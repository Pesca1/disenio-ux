import React from 'react';
import Template from "./Template";
import {Button} from "reakit";


export default class MainScreen extends React.Component {
    renderExtraContent = () => (
        <>
            <h3>Mas información importante</h3>
            <p className='description'>
                Lorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amen
            </p>
        </>
    )

    render = () => (
        <Template
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            extraContent={this.renderExtraContent()}>
            <h3>Prevención</h3>
            <p className='description'>
                Lorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amenLorem ipsum dolor sit amen
            </p>
            <Button className='button' onClick={() => this.props.history.push('/address')}>
                Comencemos!
            </Button>
        </Template>
    );
}