export type IQLAction = {
	ActionType: string,
	Url?: string,
	ImageName: string,
	Properties?: Record<string, any>,
}

export type IQLQueryData = {
	Init: {
		Actions: IQLInitAction[],
	},
	Generate: {
		Actions: IQLGenerateAction[],
	},
	Return: {
		Actions: IQLReturnAction[],
	},
}

/** An action allowed in a Init block. */
export type IQLInitAction = LoadImageAction | LoadSpritesAction

/** An action allowed in a Generate block. */
export type IQLGenerateAction = ModifyImageAction | NewImageAction

/** An action allowed in a Return block. */
export type IQLReturnAction = ReturnImageAction

/** Loads an image into the script execution. */
export interface LoadImageAction {
	ActionType: "LOAD_IMAGE",
	/** The URL from which to load the image */
	Url: string,
	/** The name used to track the image */
	ImageName: string,
}

/**
 * Loads an image and splits it into sprites into the script execution.
 * The images loaded are named according to the format `<imagename>-<row>-<col>`.
 */
export interface LoadSpritesAction {
	ActionType: "LOAD_SPRITES",
	/** The URL from which to load the image */
	Url: string,
	/** The name used to track the image */
	ImageName: string,
	/** The properties for the action */
	Properties: {
		/** The size of a sprite */
		SpriteSize: [number, number],
	},
}

/** ?odifies an image. */
export interface ModifyImageAction {
	ActionType: "MODIFY_IMAGE",
	/** The name of the image to modify */
	ImageName: string,
	/** The properties to modify */
	Properties: {
		/** Makes an image grayscale */
		Grayscale?: boolean | {
			/** Whether to include transparency in grayscaling */
			IncludeTransparency: boolean,
		},
		/** Pastes a loaded image at a given position */
		PasteImage?: {
			/** The name of the image to paste */
			ImageName: string,
			/** The X and Y coordinates to paste the image at */
			PasteAt: [number, number],
		},
		/** Inverts an image */
		Invert?: boolean,
	}
}

/** Creates a new image. */
export interface NewImageAction {
	ActionType: "NEW_IMAGE",
	/** The name of the image to modify */
	ImageName: string,
	/** The properties to modify */
	Properties: {
		Size: [number, number],
	},
}

/** Returns an image. */
export interface ReturnImageAction {
	ActionType: "RETURN_IMAGE",
	/** The name of the image to return */
	ImageName: string,
}
