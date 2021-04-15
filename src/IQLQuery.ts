import { IQLQueryData } from "./types"

class IQLQuery {
	query: IQLQueryData

	/**
	 * Constructs a new IQLQuery
	 * @param query The query to start with
	 */
	constructor (query?: IQLQueryData) {
		this.query = query || {
			Init: { Actions: [] },
			Generate: { Actions: [] },
			Return: { Actions: [] },
		}
	}

	/**
	 * Clones the existing query into a new IQLQuery
	 * @returns The new IQLQuery
	 */
	clone(): IQLQuery {
		return new IQLQuery(this.query)
	}

	/**
	 * Adds an instruction to load an image to the query
	 * @param url The link to the image to load
	 * @param name The name the loaded image will have
	 * @returns The IQLQuery
	 */
	loadImage(url: string, name: string): this {
		this.query.Init.Actions.push({
			ActionType: 'LOAD_IMAGE',
			Url: url,
			ImageName: name,
		})

		return this
	}

	/**
	 * Adds an instruction to load a spritesheet to the query
	 * @param url The URL to the image to load
	 * @param name The name the loaded sprites will be prefixed with
	 * @param spriteSize The size that one sprite is, defined as [width, height]
	 * @returns The IQLQuery
	 */
	loadSprites(url: string, name: string, spriteSize: [number, number]): this {
		this.query.Init.Actions.push({
			ActionType: 'LOAD_SPRITES',
			Url: url,
			ImageName: name,
			Properties: {
				SpriteSize: spriteSize,
			},
		})

		return this
	}

	/**
	 * Adds an instruction to create a new image
	 * @param imageName The name of the new image
	 * @param imageSize The size the new image will have, defined as [width, height]
	 * @returns The IQLQuery
	 */
	newImage(imageName: string, imageSize: [number, number]): this {
		this.query.Generate.Actions.push({
			ActionType: 'NEW_IMAGE',
			ImageName: imageName,
			Properties: {
				Size: imageSize,
			},
		})
		return this
	}

	/**
	 * Adds an instruction to make an image grayscale
	 * @param imageName The image to make gray
	 * @param includeTransparency If the grayscale should include transparency
	 * @returns The IQLQuery
	 */
	grayScale(imageName: string, includeTransparency = false): this {
		let grayscaleValue: any = true

		if (includeTransparency) {
			grayscaleValue = {
				IncludeTransparency: true,
			}
		}

		this.query.Generate.Actions.push({
			ActionType: 'MODIFY_IMAGE',
			ImageName: imageName,
			Properties: {
				Grayscale: grayscaleValue,
			},
		})
		return this
	}


	/**
	 * Adds an instruction to pastes an image on top of another.
	 * @param imageName The image to paste on
	 * @param pasteImageName The image to be pasted
	 * @param pasteAt Where to paste the image, defined as [x, y]
	 * @returns The IQLQuery
	 */
	pasteImage(imageName: string, pasteImageName: string, pasteAt: [number, number]): this {
		this.query.Generate.Actions.push({
			ActionType: 'MODIFY_IMAGE',
			ImageName: imageName,
			Properties: {
				PasteImage: {
					ImageName: pasteImageName,
					PasteAt: pasteAt,
				},
			},
		})

		return this
	}

	/**
	 * Adds an instruction to invert an image
	 * @param imageName The name of the image to invert
	 * @returns The IQLQuery
	 */
	invert(imageName: string): this {
		this.query.Generate.Actions.push({
			ActionType: 'MODIFY_IMAGE',
			ImageName: imageName,
			Properties: {
				Invert: true,
			},
		})

		return this
	}

	/**
	 * Adds an instruction to return an image
	 * @param imageName The name of the image to return
	 * @returns The IQLQuery
	 */
	returnImage(imageName: string): this {
		this.query.Return.Actions.push({
			ActionType: 'RETURN_IMAGE',
			ImageName: imageName,
		})

		return this
	}

	toJSON(): IQLQueryData {
		return this.query
	}
}

export default IQLQuery
