const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
    RichText, InspectorControls, BlockControls, AlignmentToolbar
} = wp.blockEditor;

const {
    PanelBody, PanelRow, Toolbar, SelectControl
} = wp.components;

const { Component } = wp.element;

class FirstBlockEdit extends Component {
 
	render() {
		const { attributes, setAttributes } = this.props;
		
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';

		styleClass = (attributes.style != null) ? 'enouvo-' + attributes.style : '';

		console.log( attributes.style, styleClass );
 
		return (
			<div className={styleClass}>
				<InspectorControls>
				<PanelBody>
					<AlignmentToolbar
						value={attributes.textAlignment}
						onChange={(newalign) => setAttributes({ textAlignment: newalign })}
					/>

					<SelectControl
				        label="Size"
				        value={ attributes.style }
				        options={ [
				            { label: 'Big', value: 'style1' },
				            { label: 'Medium', value: 'style2' },
				            { label: 'Small', value: 'style3' },
				        ] }
				        onChange={ ( newstyle ) => { setAttributes( { style: newstyle } ) } }
				    />

				</PanelBody>
				</InspectorControls>
				<RichText 
					tagName="h2"
					placeholder="Write your heading here"
					value={attributes.myRichHeading}
					onChange={(newtext) => setAttributes({ myRichHeading: newtext })}
					className="description review"
				/>
				<RichText
					tagName="p"
					placeholder="Write your paragraph here"
					value={attributes.myRichText}
					onChange={(newtext) => setAttributes({ myRichText: newtext })}
					className="wp-review-des"
				/>
			</div>
		);
	}
}

registerBlockType('myblock/block-test3', {
	title: __('Enouvo - test3'),
	icon: 'wordpress',
	category: 'formatting',
    attributes: {
		myRichHeading: {
			type: 'string',
		},
		myRichText: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		textAlignment: {
			type: 'string',
		},		
		style: {
			type: 'string',
		},
	},

    edit: FirstBlockEdit,

	save: (props) => { 
		const { attributes } = props;

		console.log(attributes);
 
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';

		styleClass = (attributes.style != null) ? 'enouvo-' + attributes.style : '';
 
		return (
			<div className={styleClass}>
				<RichText.Content 
					tagName="h2"
					value={attributes.myRichHeading}
				/>
				<RichText.Content 
					tagName="p"
					value={attributes.myRichText}
					className="wp-review-des"
				/>
			</div>
		);
	}
});
