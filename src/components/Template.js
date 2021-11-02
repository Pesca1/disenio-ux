import React from 'react';
import {Button, Checkbox,useMenuState, Menu, MenuButton,MenuItem} from "reakit";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';



function LanguageMenu(props){
        const menu =  useMenuState();
        
        return (
            <div className="language-option">
                <label>
                    
                    <MenuButton style={{fontWeight: 'bold'}} {...menu} >{props.t('Template_language')}</MenuButton>
                    <Menu {...menu} aria-label="Preferences">
                        <MenuItem {...menu} onClick={() => i18next.changeLanguage('en')}>English</MenuItem>                    
                        <MenuItem {...menu} onClick={() => i18next.changeLanguage('es')}>Español</MenuItem>
                    </Menu>
                </label>
                </div>
        )
        
}

class Template extends React.Component {
    render = () => (
        <div role="main" className={"background "+(this.props.bigFont ? "bigger-font" : "")}>
            { this.props.goBack &&
            <Button className='go-back' onClick={this.props.goBack}>                
                <h4>
                    <i className='icon-arrow-left2' />
                    {this.props.t('Template_goback')}
                </h4>
            </Button>
            }
            { (this.props.fontSizeOption == null || this.props.fontSizeOption) &&
                <div className='font-size-option'>
                    <label>
                        <h4>
                            { this.props.bigFont ? this.props.t('Template_bigfont') :this.props.t('Template_littlefont')}
                            <i className='icon-zoom-in'/>
                        </h4>
                        <Checkbox 
                            onChange={this.props.toggleBigFont ? this.props.toggleBigFont : null}
                            checked={this.props.bigFont} 
                        />
                        <br/>
                        <LanguageMenu t={this.props.t}/>
                    </label>
                </div>
            }
            {
                
            }
            {this.props.title &&
            <>
            <div className='container title-container'>
                <h1 className='page-title'>
                    {this.props.title}
                </h1>
            </div>
            <br/>
            </>
            }
            <div className={`main container ${this.props.containerClass}`}>
                {this.props.children}
            </div>
            <br/>
            {this.props.extraContent &&
            <div className='main container'>
                {this.props.extraContent}
            </div>
            }
        </div>
    );
}
export default withTranslation()(Template)