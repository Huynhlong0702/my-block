const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
    InspectorControls
} = wp.editor;

const {
    PanelBody,
    TextareaControl,
    ColorPalette,
    FontSizePicker,
} = wp.components;


registerBlockType('myblock/block-heading', {
    title: __('Enouvo - Heading'),
    icon: 'wordpress',
    category: 'formatting',
    attributes: {
        title: {
            type: 'string',
            default: '',
            source: 'text',
            selector: '.title',
        },
        titleColor: {
            type: 'array',
            default: '#f00',
        },
        titleFontSize: {
            type: 'array',
            default: 16,
        },
        subTitle: {
            type: 'string',
            default: '',
            source: 'text',
            selector: '.sub-title',
        },
        description: {
            type: 'string',
            default: '',
            source: 'text',
            selector: '.description',
        }
    },

    edit: ( props ) => {

        const { attributes, setAttributes, className  } = props;
        const { title, titleColor, titleFontSize, subTitle, description } = attributes;

        const titleColors = [
            { name: 'Custom', color: '#007cba' },
            { name: 'Custom', color: '#006ba1' },
            { name: 'Custom', color: '#005a87' },
        ];

        const titleFontSizes = [
            {
                name: __( 'Small' ),
                slug: 'small',
                size: 12,
            },
            {
                name: __( 'Big' ),
                slug: 'big',
                size: 26,
            },
        ];

        const fallbackFontSize = 16;

        console.log(attributes);

        return (
            <div>
                <InspectorControls>
                    <PanelBody title={ 'Title' } initialOpen={ false }>
                        <TextareaControl
                            label="Title"
                            value={title}
                            onChange={(val) => setAttributes({ title: val }) }
                        />
                        <ColorPalette 
                            colors={ titleColors }
                            value={ titleColor }
                            onChange={ ( val ) => setAttributes( { titleColor: val } ) }
                        />
                        <FontSizePicker
                            fontSizes={ titleFontSizes }
                            value={ titleFontSize }
                            fallbackFontSize={ fallbackFontSize }
                            onChange={ ( val ) => {
                                setAttributes( { titleFontSize: val } );
                            } }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Sub Title' } initialOpen={ false }>
                        <TextareaControl
                            label="Sub Title"
                            value={subTitle}
                            onChange={(val) => setAttributes({ subTitle: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Description' } initialOpen={ false }>
                        <TextareaControl
                            label="Description"
                            value={description}
                            onChange={(val) => setAttributes({ description: val }) }
                        />
                    </PanelBody>


                </InspectorControls>
                <div className={ className }>
                    <div className="title" style={{ color: titleColor, fontSize: titleFontSize }}>
                        { title }
                    </div>
                    <div className="sub-title">
                        { subTitle }
                    </div>
                    <p className="description">{ description }</p>
                </div>
            </div>
        );
    },

    save: (props) => {

        const { attributes, className  } = props;
        const { title, titleColor, titleFontSize, subTitle ,description } = attributes;

        return (
            <div className={ className }>
                <div className="title" style={{ color: titleColor, fontSize: titleFontSize }}> { title } </div>
                <div className="sub-title"> { subTitle } </div> 
                <p className="description">{ description }</p>
            </div>
        );
    }
});
