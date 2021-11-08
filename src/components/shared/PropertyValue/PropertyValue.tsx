import React, { Component, Fragment } from 'react';
import { Divider } from '@mui/material';

import './PropertyValue.scss';

interface IPropertyValueProps {
    showDivider: boolean;
    property: string;
    value: string;
}

export default class PropertyValue extends Component<IPropertyValueProps> {
    render() {
        return (
            <Fragment>
                <div className="property-value">
                    <div className="property">{this.props.property}:</div>
                    {this.props.value ? <div className="value">{this.props.value}</div> : 'Not added yet'}
                </div>
                {this.props.showDivider && <Divider></Divider>}
            </Fragment>
        );
    }
};
