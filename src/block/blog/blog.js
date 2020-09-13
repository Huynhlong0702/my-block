//  Import CSS.
// import './editor.scss';
// import './style.scss';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	InspectorControls,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	TextControl,
	PanelBody,

	Toolbar,
	Button,
	Tooltip,
	PanelRow,
	FormToggle,
	NumberControl,
	FormFileUpload,
	SelectControl,
} = wp.components;

registerBlockType('myblock/block-blog', {
	// Block name. Example: my-plugin/my-custom-block.
	title: __('Enouvo - Blog'),
	icon: 'wordpress',
	category: 'formatting',
	attributes: {
		postPerPage: {
			type: 'number',
			default: '6'
		},
		order: {
			type: 'string',
			default: 'none',
		},
		orderBy: {
			type: 'string',
			default: 'date',
		}
	},

	edit: props => {

		const { setAttributes, attributes } = props;

		function onTextChange(changes) {
			setAttributes({
				postPerPage: changes
			});
		}

		function onOrderChange(changes) {
			setAttributes({
				order: changes
			});
		}
		function onOrderByChange(changes) {
			setAttributes({
				orderBy: changes
			});
		}

		console.log(attributes);



		return (
			<div>
				<InspectorControls>
					<PanelBody
						title={__('Post Setting:', 'jsforwpblocks')}
					>
						<PanelRow>
							<TextControl
								label="Post Per Page:"
								value={attributes.postPerPage}
								onChange={onTextChange}
							/>
						</PanelRow>

						<PanelRow>
							<SelectControl
								label="Order:"
								value={attributes.order}
								options={[
									{ label: 'None', value: 'none' },
									{ label: 'ASC', value: 'ASC' },
									{ label: 'DESC', value: 'DESC' },
								]}
								onChange={onOrderChange}
							/>
						</PanelRow>

						<PanelRow>
							<SelectControl
								label="Order By:"
								value={attributes.orderBy}
								options={[
									{ label: 'None', value: 'none' },
									{ label: 'Rand', value: 'rand' },
									{ label: 'Id', value: 'ID' },
									{ label: 'Title', value: 'title' },
									{ label: 'Date', value: 'date' },
								]}
								onChange={onOrderByChange}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className="enouvo-blog-grid">
					<div className="row">
						<div className="col-md-4">
							<div className="blog-thumbnail">
								<a href="#">
									<img src="ccscsc" />
								</a>
							</div>
							<div className="blog-footer">
								<h3 className="blog-title">
									<a href="#">
										test cai nek
									</a>
								</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save: props => {

		const { attributes } = props;

		return null;
	}
});
