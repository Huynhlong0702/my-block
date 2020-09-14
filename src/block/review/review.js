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


registerBlockType('myblock/block-review', {
    title: __('Enouvo - Review'),
    icon: 'wordpress',
    category: 'formatting',
    attributes: {
        name: {
            type: 'string',
            source: 'text',
            default: '',
            selector: '.name',
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
        avatar: {
            type: 'string',
            attribute: 'src',
            selector: '.avatar',
        }
    },

    edit: ( props ) => {

        const { attributes: { name, content, position, avatar, imageID } , setAttributes, className  } = props;

        console.log('edit', props);

        const getImageButton = (openEvent) => {
            if( avatar ) {
                return (
                    <div>
                        <img 
                            src={ avatar }
                            onClick={ openEvent }
                            className="image"
                        />
                        { !! avatar &&
                            <MediaUploadCheck>
                            <Button onClick={() => setAttributes({ avatar: undefined }) } isLink isDestructive>
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
                    <PanelBody title={ 'Name' } initialOpen={ false }>
                        <TextareaControl
                            label="Name"
                            value={name}
                            onChange={(val) => setAttributes({ name: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Position' } initialOpen={ false }>
                        <TextareaControl
                            label="Position"
                            value={position}
                            onChange={(val) => setAttributes({ position: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Content' } initialOpen={ false }>
                        <TextareaControl
                            label="Content"
                            value={content}
                            onChange={(val) => setAttributes({ content: val }) }
                        />
                    </PanelBody>

                    <PanelBody title={ 'Avatar' } initialOpen={ false }>

                        <MediaUpload
                            onSelect={ media => { setAttributes({ avatar: media.url }); } }
                            type="image"
                            value={ imageID }
                            render={ ({ open }) => getImageButton(open) }
                            />
                    </PanelBody>

                </InspectorControls>
                <div className="wp-review-content" style={{ textAlign: 'center' }}>
                    <p className="description review" style={{ fontSize: 22, lineHeight: 1.6, letterSpacing: 0.4, textAlign: 'center', color: '#3a393d', fontWeight: '600' }}>{ content }</p> 
                    <div className="wp-review-des">
                        <p><img src={ avatar } className="avatar" /></p>
                        <h5 className="name">{ name }</h5>
                        <p><span className="position des" style={{ color: '#474b68', fontSize: 16 }}>{ position }</span></p>
                    </div>
                </div>
            </div>
        );
    },

    save: (props) => {

        const { attributes: { name, content, position, avatar, imageID } , className  } = props;
        console.log('save',props);

        return (
            <div className="wp-review-content text-center">
                <p className="description review">{ content }</p>
                <div className="wp-review-des">
                    <p><img src={ avatar } className="avatar" /></p>
                    <h5 className="name">{ name }</h5>
                    <p><span className="position des">{ position }</span></p>
                </div>
            </div>
        );
    }
});

