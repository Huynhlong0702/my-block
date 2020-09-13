import classNames from 'classnames'; // Used to to join classes together
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
    InspectorControls,
    MediaUpload, 
    MediaUploadCheck
} = wp.blockEditor;

const {
    PanelBody,
    TextareaControl,
    Button,
    SelectControl,
    TextControl
} = wp.components;


registerBlockType('myblock/block-service', {
    title: __('Enouvo - SVC'),
    icon: 'wordpress',
    category: 'formatting',
    attributes: {
        title: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.title',
        },
        description: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.description',
        },
        iconFormat: {
            type: 'string',
            default: 'icon',
        },
        svgText: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.icon-text',
        },
        fontClass: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.icon-font i',
        },
        imageUrl: {
            type: 'string',
            attribute: 'src',
            selector: '.icon-image',
        }
    },

    edit: ( props ) => {

        const { attributes, setAttributes, className  } = props;
        const { title, description, iconFormat, svgText, imageUrl, fontClass } = attributes;

        console.log(attributes);

        const getIcon = () => {
            if( imageUrl && iconFormat ==='image'){

                return(
                    <div className="icon icon-image">
                        <img 
                            src={ imageUrl }
                            className="image"
                        />
                    </div>
                )
            }

            if( svgText && iconFormat ==='svg' ){
                return(
                    <div className="icon icon-text" >vdvdvdvdvd</div>
                )
            }

            if( fontClass && iconFormat ==='icon' ){
                return(
                    <div className="icon-font icon" ><i className={`hello ` + props.attributes.fontClass }></i></div>
                )
            }
        };

        const getImageButton = (openEvent) => {
            if( imageUrl ) {
                return (
                    <div>
                        <img 
                            src={ attributes.imageUrl }
                            onClick={ openEvent }
                            className="image"
                        />
                        { !! attributes.imageUrl &&
                            <MediaUploadCheck>
                            <Button onClick={() => setAttributes({ imageUrl: undefined }) } isLink isDestructive>
                                { 'Remove background image' }
                            </Button>
                            </MediaUploadCheck>
                        }
                    </div>
                );
            }
            else {
                return (
                    <div className="button-container">
                    <Button  onClick={ openEvent } className="button button-large"> Select Icon Image </Button> 
                    </div>
                );
            }  
        };


        return (
            <div>
                <InspectorControls>
                    <PanelBody title={ 'Title' } initialOpen={ false }>
                        <TextareaControl
                            label="Title"
                            value={title}
                            onChange={(val) => setAttributes({ title: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Description' } initialOpen={ false }>
                        <TextareaControl
                            label="Description"
                            value={description}
                            onChange={(val) => setAttributes({ description: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Icon' } initialOpen={ false }>
                        <SelectControl
                            label={ __( 'Select Icon:' ) }
                            value={ iconFormat }
                            onChange={ ( val ) => setAttributes( { iconFormat: val } ) }
                            options={ [
                                { value: 'icon', label: 'Icon Fonts' },
                                { value: 'image', label: 'Image' },
                                { value: 'svg', label: 'Svg' },
                            ] }
                        />
                        {
                            iconFormat == 'svg' && 
                                <TextareaControl
                                label="Description"
                                value={svgText}
                                onChange={(val) => setAttributes({ svgText: val }) }
                            />
                        }
                        {
                            iconFormat == 'image' && 
                            <MediaUpload
                                onSelect={ media => { setAttributes({ imageUrl: media.url }); } }
                                type="image"
                                value={ attributes.imageID }
                                render={ ({ open }) => getImageButton(open) }
                                />
                        }
                        {   
                            iconFormat == 'icon' &&
                            <TextControl
                                label="Additional CSS Class"
                                value={ fontClass }
                                onChange={ ( val ) => setAttributes( { fontClass: val } ) }
                            />
                        }
                    </PanelBody>


                </InspectorControls>
                <div className="sevice">
                    { getIcon() }
                    <div className="title">
                        { title }
                    </div>
                    <p className="description">{ description }</p>
                </div>
            </div>
        );
    },

    save: (props) => {

        const { attributes, className  } = props;
        const { title, description, iconFormat, svgText, imageUrl, fontClass } = attributes;

        console.log(attributes);

        const getIcon = () => {
            if( imageUrl && iconFormat ==='image'){

                return(
                    <div className="icon icon-image">
                        <img 
                            src={ imageUrl }
                            className="image"
                        />
                    </div>
                )
            }

            if( svgText && iconFormat ==='svg' ){
                return(
                    <div className="icon icon-text" >vdvdvdvdvd</div>
                )
            }

            if( fontClass && iconFormat ==='icon' ){
                return(
                    <div className="icon-font icon" ><i className={`hello ` + props.attributes.fontClass }></i></div>
                )
            }
        };


        return (
            <div className="sevice">
                { getIcon() }
                <div className="title"> { title } </div>
                <p className="description">{ description }</p>
            </div>
        );
    }
});

