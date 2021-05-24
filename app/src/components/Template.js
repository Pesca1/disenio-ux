import React from 'react';
import {Button, Checkbox} from "reakit";

export default class Template extends React.Component {
    render = () => (
        <div className={"background "+(this.props.bigFont ? "bigger-font" : "")}>
            { this.props.goBack &&
            <Button className='go-back' onClick={this.props.goBack}>
                <i className='icon-arrow-left2' />
            </Button>
            }
            { (this.props.fontSizeOption == null || this.props.fontSizeOption) &&
                <div className='font-size-option'>
                    <label>
                        <h4><i className='icon-zoom-in'/></h4>
                        <Checkbox 
                            onChange={this.props.toggleBigFont ? this.props.toggleBigFont : null}
                            checked={this.props.bigFont} 
                        />
                    </label>
                </div>
            }
            <div className='container title-container'>
                <h2 className='page-title'>
                    {this.props.title}
                </h2>
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