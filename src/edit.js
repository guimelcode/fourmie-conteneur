/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { Fragment } from "@wordpress/element";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalSpacer as Spacer,
	CheckboxControl,
} from "@wordpress/components";
import BackgroundColorPalette from "./BackgroundColorPalette";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	// Extraire les variables venant de props
	const {
		attributes: {
			colonnage_withStart,
			colonnage_simple_start,
			colonnage_simple,
			colonnage_withResponsive,
			isRangee,
			rangee_simple,
			rangee_small,
			rangee_medium,
			rangee_large,
			rangee_extraLarge,
		},
	} = props;

	/**
	 * Tableau d'objets pour la conversion
	 * des noms de colonnage en id
	 */
	const tabColonne = [
		{ nom: "colonnage_small", id: "sm" },
		{ nom: "colonnage_medium", id: "md" },
		{ nom: "colonnage_large", id: "lg" },
		{ nom: "colonnage_extraLarge", id: "xl" },
		{ nom: "colonnage_extraExtraLarge", id: "xxl" },
	];

	/**
	 * Construire les classes pour le colonnage
	 */
	const constructColClass = () => {
		let classes = "";
		// Condition "start"
		if (colonnage_withStart) {
			// Mettre la classe "simple-start"
			classes += `col-${colonnage_simple}-start-${colonnage_simple_start} `;
		} else {
			// Mettre la classe "simple"
			classes += `col-${colonnage_simple} `;
		}
		// Condition "responsive"
		if (colonnage_withResponsive) {
			// Condition "start"
			if (colonnage_withStart) {
				// Parcours de tableau et mettre classes
				tabColonne.map((e) => {
					if (props.attributes[`${e.nom}_checked`] && props.attributes[e.nom]) {
						classes += `col-${e.id}-${props.attributes[e.nom]}-start-${
							props.attributes[`${e.nom}_start`]
						} `;
					}
				});
			} else {
				// Parcours de tableau et mettre classes
				tabColonne.map((e) => {
					if (props.attributes[`${e.nom}_checked`] && props.attributes[e.nom]) {
						classes += `col-${e.id}-${props.attributes[e.nom]} `;
					}
				});
			}
		}
		return classes;
	};

	const constructRangClass = () => {
		let classes = "";
		if (isRangee) {
			// Mettre la classe "simple"
			classes += `row-${rangee_simple} `;
		}
		return classes;
	};

	return (
		<Fragment>
			<InspectorControls>
				{BackgroundColorPalette(props)}
				<PanelBody title="Colonnage" initialOpen={true}>
					<Spacer>
						<ToggleControl
							label={__(
								"Permettre le placement du début du colonnage",
								"fourmi-e"
							)}
							checked={colonnage_withStart}
							onChange={() => {
								props.setAttributes({
									colonnage_withStart: !colonnage_withStart,
								});
							}}
						/>
						{colonnage_withStart && (
							<RangeControl
								label="Début du positionnement (simple)"
								value={colonnage_simple_start}
								onChange={(v) =>
									props.setAttributes({
										colonnage_simple_start: v,
									})
								}
								min={1}
								max={23} // Max 23 colonnes
								beforeIcon="arrow-down"
								afterIcon="arrow-up"
							/>
						)}
						<RangeControl
							label="Nombre de colonne (simple)"
							value={colonnage_simple}
							onChange={(v) => {
								props.setAttributes({
									colonnage_simple: v,
								});
							}}
							min={1}
							max={24} // Max 24 colonne
							beforeIcon="arrow-down"
							afterIcon="arrow-up"
						/>
					</Spacer>
					<Spacer>
						<ToggleControl
							label={__("Colonnage responsive", "fourmi-e")}
							checked={colonnage_withResponsive}
							onChange={() =>
								props.setAttributes({
									colonnage_withResponsive: !colonnage_withResponsive,
								})
							}
						/>
						{colonnage_withResponsive &&
							tabColonne.map((e) => (
								<Fragment>
									<CheckboxControl
										label={e.nom}
										checked={props.attributes[`${e.nom}_checked`]}
										onChange={() => {
											props.setAttributes({
												[`${e.nom}_checked`]:
													!props.attributes[`${e.nom}_checked`],
											});
										}}
									/>
									{props.attributes[`${e.nom}_checked`] && (
										<Fragment>
											{colonnage_withStart && (
												<RangeControl
													label="Début du positionnement "
													value={props.attributes[`${e.nom}_start`]}
													onChange={(v) =>
														props.setAttributes({
															[`${e.nom}_start`]: v,
														})
													}
													min={1}
													max={23} // Max 23 colonnes
													beforeIcon="arrow-down"
													afterIcon="arrow-up"
												/>
											)}
											<RangeControl
												label={`Nombre de colonne (${e.nom})`}
												value={props.attributes[e.nom]}
												onChange={(v) => {
													props.setAttributes({
														[e.nom]: v,
													});
												}}
												min={1}
												max={24} // Max 24 colonnes
												beforeIcon="arrow-down"
												afterIcon="arrow-up"
											/>
										</Fragment>
									)}
								</Fragment>
							))}
					</Spacer>
				</PanelBody>
				<PanelBody title="Rangée" initialOpen={true}>
					<Spacer>
						<ToggleControl
							label={__("Permettre paramètrer la rangée", "fourmi-e")}
							checked={isRangee}
							onChange={() => {
								props.setAttributes({
									isRangee: !isRangee,
								});
							}}
						/>
						{isRangee && (
							<RangeControl
								label="Nombre de rangée (simple)"
								value={rangee_simple}
								onChange={(v) => {
									props.setAttributes({
										rangee_simple: v,
									});
								}}
								min={1}
								max={6} // Max 24 colonne
								beforeIcon="arrow-down"
								afterIcon="arrow-up"
							/>
						)}
					</Spacer>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps()}
				className={`${
					useBlockProps().className
				} ${constructColClass()} ${constructRangClass()} ${
					props.attributes.backgroundColorClass
				}`}
				style={{ backgroundColor: props.attributes.backgroundColor }}
			>
				<InnerBlocks />
			</div>
		</Fragment>
	);
}
