import React from 'react';
import ReactDOM from 'react-dom';
import SVColorPicker from './components/SVColorPicker';

function getRGB(color){
    var c;

    // Color is hex
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)){
        c= color.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return ''+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1';
    }

    return color;
}

function renderColorPicker( id, color, colorPalette ) {
    const element = jQuery( '[id="' + id + '"]' );
    const rootElement = element.parent();

    // Output
    ReactDOM.render(
        <SVColorPicker id={ id } color={ getRGB( color ? color : '0,0,0,1' ) } colorPalette={ colorPalette } />, 
        rootElement[0]
    );
}

// Loops through the registered color settings and replaces them with the GB color picker
function loadColorPicker() {
    if ( Object.keys( sv_core_color_picker ).length > 0 ) {
        for (const [key, value] of Object.entries( sv_core_color_picker ) ) {
            if ( key !== 'color_palette' ) {
                const colorPalette = sv_core_color_picker.color_palette ? sv_core_color_picker.color_palette : false;

                renderColorPicker( key, value, colorPalette );
            }
        }
    }
}

jQuery( 'body' ).on( 'click','.sv_setting_group_add_new_button', function() {
    const parent            = jQuery( this ).parents( '.sv_setting_group_parent' );
    const entries		    = parent.find( '.sv_setting_group' );
    const color_settings    = parent.find( '.sv_setting_group_new_draft input[data-sv_type="sv_form_field"][type="color"]' );
    
    // Checks all entries for the highest index and sets the next new index
	let index		        = 0;

	entries.each( function() {
		if ( parseInt( jQuery(this).attr('sv_setting_group_entry_id') ) > index ) {
			index = parseInt( jQuery(this).attr('sv_setting_group_entry_id') );
		}
    } );

    if ( color_settings ) {
        color_settings.each( function() {
            const id = jQuery( this ).attr('id').replace("sv_form_field_index", index );
            const defaultColor = '0,0,0,1';
            const colorPalette = sv_core_color_picker.color_palette ? sv_core_color_picker.color_palette : false;

            renderColorPicker( id, defaultColor, colorPalette );
        });
    }
});

loadColorPicker();