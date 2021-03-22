export type IQLAction = {
	ActionType: string,
	Url?: string,
	ImageName: string,
	Properties?: Record<string, any>,
}

export type IQLQueryData = {
	Init: {
		Actions: Array<IQLAction>,
	},
	Generate: {
		Actions: Array<IQLAction>,
	},
	Return: {
		Actions: Array<IQLAction>,
	},
}


class IQLQuery {
	query: IQLQueryData
	
	constructor () {
		this.query = {
			Init: { Actions: [] },
			Generate: { Actions: [] },
			Return: { Actions: [] },
		}
	}

	loadImage(url: string, name: string): IQLQuery {
		this.query.Init.Actions.push({
			ActionType: 'LOAD_IMAGE',
			Url: url,
			ImageName: name,
		})

		return this
	}

	loadSprites(url: string, name: string, spriteSize: Array<number>): IQLQuery {
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

	newImage(imageName: string, imageSize: Array<number>): IQLQuery {
		this.query.Generate.Actions.push({
			ActionType: 'NEW_IMAGE',
			ImageName: imageName,
			Properties: {
				Size: imageSize,
			},
		})
		return this
	}

	grayScale(imageName: string, includeTransparency: boolean): IQLQuery {
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
	 * Pastes an image atop another.
	 * @param imageName The image to paste on
	 * @param pasteImageName The image to be pasted
	 * @param pasteAt Where to paste the image
	 * @returns IQLQuery
	 */
	pasteImage(imageName: string, pasteImageName: string, pasteAt: Array<number>): IQLQuery {
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

	invert(imageName: string): IQLQuery {
		this.query.Generate.Actions.push({
			ActionType: 'MODIFY_IMAGE',
			ImageName: imageName,
			Properties: {
				Invert: true,
			},
		})

		return this
	}

	returnImage (imageName: string): IQLQuery {
		this.query.Return.Actions.push({
			ActionType: 'RETURN_IMAGE',
			ImageName: imageName,
		})

		return this
	}
}

export default IQLQuery
