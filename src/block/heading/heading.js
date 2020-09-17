const { __ } = wp.i18n;

import classnames from "classnames";

const { registerBlockType } = wp.blocks;

const { InspectorControls } = wp.editor;

const {
	PanelBody,
	TextareaControl,
	SelectControl,
	TextControl,
} = wp.components;

const { Component } = wp.element;

class HeadingBlockEdit extends Component {
	render() {
		const {
			attributes: { title, subTitle, description, align },
			setAttributes,
		} = this.props;

		const styleClass = align != null ? "text-" + align : "";

		console.log(align, styleClass);

		return (
			<div style={{ backgroundColor: "#fafafa", padding: "15px" }}>
				<InspectorControls>
					<PanelBody title={"Title"} initialOpen={true}>
						<TextareaControl
							label="Title"
							value={title}
							onChange={(newTitle) => setAttributes({ title: newTitle })}
						/>
					</PanelBody>

					<PanelBody title={"Sub Title"} initialOpen={false}>
						<TextareaControl
							label="Sub Title"
							value={subTitle}
							onChange={(newSubtitle) =>
								setAttributes({ subTitle: newSubtitle })
							}
						/>
					</PanelBody>

					<PanelBody title={"Description"} initialOpen={false}>
						<TextareaControl
							label="Description"
							value={description}
							onChange={(newDes) => setAttributes({ description: newDes })}
						/>
					</PanelBody>

					<PanelBody>
						<SelectControl
							label="Align"
							value={align}
							options={[
								{ label: "Left", value: "left" },
								{ label: "Center", value: "center" },
								{ label: "Right", value: "right" },
							]}
							onChange={(newstyle) => {
								setAttributes({ align: newstyle });
							}}
						/>
					</PanelBody>
				</InspectorControls>

				<div className={classnames("heading-title", "margin", styleClass)}>
					<h2 className="fw800">{title}</h2>
					{description && <h3 className="sub-heading  fw400">{description}</h3>}
				</div>
			</div>
		);
	}
}

registerBlockType("myblock/block-heading", {
	title: __("Enouvo - Heading"),
	icon: "wordpress",
	category: "formatting",
	attributes: {
		title: {
			type: "string",
			default: "",
			source: "text",
			selector: " h2",
		},
		subTitle: {
			type: "string",
			default: "",
			source: "text",
			// selector: '.sub-heading',
		},
		description: {
			type: "string",
			default: "",
			source: "text",
			selector: ".sub-heading",
		},
		align: {
			type: "string",
			default: "left",
		},
	},

	edit: HeadingBlockEdit,

	save: (props) => {
		const {
			attributes: { title, subTitle, description, align },
			setAttributes,
		} = this.props;

		const styleClass = align != null ? "text-" + align : "";

		return (
			<div className={classnames("heading-title", "margin", styleClass)}>
				<h2 className="fw800">{title}</h2>
				{description && <h3 className="sub-heading  fw400">{description}</h3>}
			</div>
		);
	},
});
