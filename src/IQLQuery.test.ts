import { IQLQuery } from "."

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

	expect(query.query.Init.Actions[0].ActionType).toBe('LOAD_SPRITES')
	expect(query.query.Init.Actions[0].ImageName).toBe('image')
	expect(query.query.Init.Actions[0].Url).toBe('https://example.com/image.png')
	expect(query.query.Init.Actions[0].Properties?.SpriteSize).toMatchObject([ 16, 16 ])
})

test('New image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.newImage('newImage', [ 16, 16 ])

	expect(query.query.Generate.Actions[0].ActionType).toBe('NEW_IMAGE')
	expect(query.query.Generate.Actions[0].ImageName).toBe('newImage')
	expect(query.query.Generate.Actions[0].Properties?.Size).toMatchObject([ 16, 16 ])
})

test('Grayscale instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.grayScale('image')

	expect(query.query.Generate.Actions[0].ActionType).toBe('MODIFY_IMAGE')
	expect(query.query.Generate.Actions[0].ImageName).toBe('image')
	expect(query.query.Generate.Actions[0].Properties?.Grayscale).toBe(true)
})


test('Grayscale instruction with transparency gets added correctly', () => {
	const query = new IQLQuery()

	query.grayScale('image', true)

	expect(query.query.Generate.Actions[0].ActionType).toBe('MODIFY_IMAGE')
	expect(query.query.Generate.Actions[0].ImageName).toBe('image')
	expect(query.query.Generate.Actions[0].Properties?.Grayscale).toMatchObject({
		IncludeTransparency: true,
	})
})


test('Paste image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.pasteImage('image', 'image2', [ 0, 10 ])

	expect(query.query.Generate.Actions[0].ActionType).toBe('MODIFY_IMAGE')
	expect(query.query.Generate.Actions[0].ImageName).toBe('image')
	expect(query.query.Generate.Actions[0].Properties?.PasteImage).toMatchObject({
		ImageName: 'image2',
		PasteAt: [ 0, 10 ],
	})
})

test('Invert image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.invert('image')

	expect(query.query.Generate.Actions[0].ActionType).toBe('MODIFY_IMAGE')
	expect(query.query.Generate.Actions[0].ImageName).toBe('image')
	expect(query.query.Generate.Actions[0].Properties?.Invert).toBe(true)
})


test('Return image instruction gets added correctly', () => {
	const query = new IQLQuery()

	query.returnImage('image')

	expect(query.query.Return.Actions[0].ActionType).toBe('RETURN_IMAGE')
	expect(query.query.Return.Actions[0].ImageName).toBe('image')
})

