import React from 'react';
import Template from "./Template";
import {Button, Link} from "reakit";    
import { withTranslation } from 'react-i18next';




class MainScreen extends React.Component {
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
            title={<>{this.props.t('mainScreen_title', '')}<br/>{this.props.t('mainScreen_subtitle', '')}</>}>
            <h2>{this.props.t('mainScreen_h2', '')}</h2>
            <p className='description'>
            {this.props.t('mainScreen_p', '')}
            </p>
            <h3>{this.props.t('mainScreen_h3', '')}</h3>
            <ol>                
                <li>{this.props.t('mainScreen_li1', '')}</li>
                <li>{this.props.t('mainScreen_li2', '')}</li>
                <li>{this.props.t('mainScreen_li3', '')}</li>
                <li>{this.props.t('mainScreen_li4', '')}</li>
            </ol>
            <Button className='button' onClick={() => this.goTo('address', { bigFont: this.state.bigFont })}>
            {this.props.t('mainScreen_button', '')}
            </Button>
        </Template>
    );
}

export default withTranslation()(MainScreen)