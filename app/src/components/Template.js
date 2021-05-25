import React from 'react';
import {Button, Checkbox} from "reakit";

export default class Template extends React.Component {
    render = () => (
        <div role="main" className={"background "+(this.props.bigFont ? "bigger-font" : "")}>
            { this.props.goBack &&
            <Button className='go-back' onClick={this.props.goBack}>                
                <h4>
                    Volver
                <i className='icon-arrow-left2' />
                </h4>
            </Button>
            }
            { (this.props.fontSizeOption == null || this.props.fontSizeOption) &&
                <div className='font-size-option'>
                    <label>
                        <h4>
                            { this.props.bigFont ? 'Achicar letra ' : 'Agrandar letra '}
                            <i className='icon-zoom-in'/>
                        </h4>
                        <Checkbox 
                            onChange={this.props.toggleBigFont ? this.props.toggleBigFont : null}
                            checked={this.props.bigFont} 
                        />
                    </label>
                </div>
            }
            <div className='container title-container'>
                <h1 className='page-title'>
                    {this.props.title}
                </h1>
            </div>
            <br/>
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