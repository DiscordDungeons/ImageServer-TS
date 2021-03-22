import { IQLClient } from "."

test('New Client', () => {
	const client = new IQLClient("example.com")
	expect(client).toBe(typeof IQLClient)
})

test('Client gets correct URL', () => {
	const client = new IQLClient("example.com")
	expect(client.imageServerUrl).toBe("example.com")
})