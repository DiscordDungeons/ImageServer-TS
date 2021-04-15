import { IQLClient } from "."

test('Client gets correct URL', () => {
	const client = new IQLClient("example.com")
	expect(client.imageServerUrl).toBe("example.com")
})
