import React from 'react';
import {Button} from "reakit";

export default class Template extends React.Component {
    render = () => (
        <div className="background">
            { this.props.goBack &&
            <div className='go-back' onClick={this.props.goBack}>{'<'}</div>
            }
            <div className='container'>
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