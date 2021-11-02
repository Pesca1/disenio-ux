import React from 'react';
import Template from "./Template";
import {Button} from "reakit";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class ThankYou extends React.Component {
    constructor(props) {
        super(props);
        let bigFont = this.props.location && this.props.location.state && this.props.location.state.bigFont || false;
        this.state = { bigFont }
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    renderExtraContent = () => (
        <>
            <h3>{this.props.t('ThankYou_h3', '')}</h3>
            <ul className='description'>
                <li> {this.props.t('ThankYou_l1_1', '')}
                <a href='https://www.laplata.gob.ar/#/gobierno/programa/ejes?categoria=comoActuar'> Clickeá acá</a></li>
            
            
                <li> {this.props.t('ThankYou_l1_2', '')}
                <a href='https://unlp.edu.ar/inundaciones/video-inundaciones-urbanas-en-la-plata-berisso-y-ensenada-9631'> Clickeá acá</a></li>
            </ul>
        
        </>
        
        )
    render = () => (
        <Template
            bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            title={<> {this.props.t('ThankYou_title', '')}<br/>{this.props.t('ThankYou_subtitle', '')}</>}
            extraContent={this.renderExtraContent()}>
            <h2>{this.props.t('ThankYou_h2', '')}</h2>
            <p className='description'>
            {this.props.t('ThankYou_p', '')}
            </p>
            <Button className='button' onClick={() => this.props.history.push('/', { bigFont: this.state.bigFont })}>
                {this.props.t('ThankYou_button', '')}
            </Button>
        </Template>
    );
}

export default withTranslation()(ThankYou)