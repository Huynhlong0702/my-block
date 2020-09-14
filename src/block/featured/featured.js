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


registerBlockType('myblock/block-featured', {
    title: __('Enouvo - Featured'),
    icon: 'wordpress',
    category: 'formatting',
    attributes: {
        title: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.title',
        },
        position: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.position',
        },
        content: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.description',
        },
        icon: {
            type: 'string',
            attribute: 'src',
            selector: '.number-icon',
        }
    },

    edit: ( props ) => {

        const { attributes: { title, content, icon, imageID } , setAttributes, className  } = props;

        console.log('edit', props);

        const getImageButton = (openEvent) => {
            if( icon ) {
                return (
                    <div>
                        <img 
                            src={ icon }
                            onClick={ openEvent }
                            className="image"
                        />
                        { !! icon &&
                            <MediaUploadCheck>
                            <Button onClick={() => setAttributes({ icon: undefined }) } isLink isDestructive>
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

                    <PanelBody title={ 'Content' } initialOpen={ false }>
                        <TextareaControl
                            label="Content"
                            value={content}
                            onChange={(val) => setAttributes({ content: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Icon' } initialOpen={ false }>
                        <MediaUpload
                            onSelect={ media => { setAttributes({ icon: media.url }); } }
                            type="image"
                            value={ imageID }
                            render={ ({ open }) => getImageButton(open) }
                            />
                    </PanelBody>

                </InspectorControls>

                <div class="wpb_wrapper">
                	<div class="wp-featured-number">
                		<img class="number-icon" src={ icon } width="68" height="61" />
                	</div>
               		<div class="wp-featured-content">
                		<h3 className="title">{ title }</h3>
                		<p className="description">{ content }</p>
                	</div>
                </div>
            </div>
        );
    },

    save: (props) => {

        const { attributes: { title, content, icon, imageID } , className  } = props;
        console.log('save',props);

        return (
            <div class="wpb_wrapper">
            	<div class="wp-featured-number">
            		<img class="number-icon" src={ icon } width="68" height="61" />
            	</div>
           		<div class="wp-featured-content">
            		<h3 className="title">{ title }</h3>
            		<p className="description">{ content }</p>
            	</div>
            </div>
        );
    }
});

