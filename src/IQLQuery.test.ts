import { IQLQuery } from "."
import { LoadSpritesAction, ModifyImageAction, NewImageAction, ReturnImageAction } from "./types"

test('Load image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.loadImage('https://example.com/image.png', 'image')

	expect(query.query.Init.Actions[0].ActionType).toBe('LOAD_IMAGE')
	expect(query.query.Init.Actions[0].ImageName).toBe('image')
	expect(query.query.Init.Actions[0].Url).toBe('https://example.com/image.png')
})

test('Load sprites instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.loadSprites('https://example.com/image.png', 'image', [ 16, 16 ])

	const action = query.query.Init.Actions[0] as LoadSpritesAction

	expect(action.ActionType).toBe('LOAD_SPRITES')
	expect(action.ImageName).toBe('image')
	expect(action.Url).toBe('https://example.com/image.png')
	expect(action.Properties.SpriteSize).toMatchObject([ 16, 16 ])
})

test('New image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.newImage('newImage', [ 16, 16 ])

	const action = query.query.Generate.Actions[0] as NewImageAction

	expect(action.ActionType).toBe('NEW_IMAGE')
	expect(action.ImageName).toBe('newImage')
	expect(action.Properties.Size).toMatchObject([ 16, 16 ])
})

test('Grayscale instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.grayScale('image')

	const action = query.query.Generate.Actions[0] as ModifyImageAction

	expect(action.ActionType).toBe('MODIFY_IMAGE')
	expect(action.ImageName).toBe('image')
	expect(action.Properties.Grayscale).toBe(true)
})


test('Grayscale instruction with transparency gets added correctly', () => {
	const query = new IQLQuery()

	query.grayScale('image', true)

	const action = query.query.Generate.Actions[0] as ModifyImageAction

	expect(action.ActionType).toBe('MODIFY_IMAGE')
	expect(action.ImageName).toBe('image')
	expect(action.Properties.Grayscale).toMatchObject({
		IncludeTransparency: true,
	})
})


test('Paste image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.pasteImage('image', 'image2', [ 0, 10 ])

	const action = query.query.Generate.Actions[0] as ModifyImageAction

	expect(action.ActionType).toBe('MODIFY_IMAGE')
	expect(action.ImageName).toBe('image')
	expect(action.Properties.PasteImage).toMatchObject({
		ImageName: 'image2',
		PasteAt: [ 0, 10 ],
	})
})

test('Invert image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.invert('image')

	const action = query.query.Generate.Actions[0] as ModifyImageAction

	expect(action.ActionType).toBe('MODIFY_IMAGE')
	expect(action.ImageName).toBe('image')
	expect(action.Properties.Invert).toBe(true)
})


test('Return image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.returnImage('image')

	const action = query.query.Return.Actions[0] as ReturnImageAction

	expect(action.ActionType).toBe('RETURN_IMAGE')
	expect(action.ImageName).toBe('image')
})

