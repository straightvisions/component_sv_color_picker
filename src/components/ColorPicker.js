import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    
    // Turns the color string into an color object
    const colorObject = {};
    colorObject.r = props.color.split(',')[0],
    colorObject.g = props.color.split(',')[1],
    colorObject.b = props.color.split(',')[2],
    colorObject.a = props.color.split(',')[3];

    // Turns the color palette array into an presetColors array
    const presetColors = [];

    if ( props.colorPalette ) {
      for ( const key in props.colorPalette ) {
          // skip loop if the property is from prototype
          if ( ! props.colorPalette.hasOwnProperty( key ) ) continue;
      
          const c = props.colorPalette[key];
          const color = this.fullColorHex( c.color.split(',')[0], c.color.split(',')[1], c.color.split(',')[2] );

          presetColors.push({ title: c.name, color: color });
      }
    }

    this.state = {
      id: props.id,
      color: colorObject,
      presetColors: presetColors,
    };
  }

  rgbToHex = (rgb) => { 
    let hex = Number( rgb ).toString(16);

    if  ( hex.length < 2 ) {
         hex = "0" + hex;
    }

    return hex;
  };

  fullColorHex = ( r, g, b ) => {   
    const red   = this.rgbToHex( r );
    const green = this.rgbToHex( g );
    const blue  = this.rgbToHex( b );

    return '#' + red + green + blue;
  };

  handleChangeComplete = ( color ) => {
    this.setState({ color: color.rgb });
  }
  
  render() {
    const colorString = this.state.color.r + ',' + this.state.color.g + ',' + this.state.color.b + ',' + this.state.color.a;

    return [
        <SketchPicker 
          color={ this.state.color }
          onChangeComplete={ this.handleChangeComplete }
          presetColors={ this.state.presetColors }
        />,
        <input 
          data-sv_type="sv_form_field" 
          class="sv_input" 
          id={ this.state.id } 
          name={ this.state.id } 
          type="hidden" 
          value={ colorString } 
        />
    ];
  }
}

export default ColorPicker;