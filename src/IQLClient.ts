import fetch, { Blob } from 'node-fetch'

class IQLClient {
	imageServerUrl: string

	constructor (imageServerUrl: string) {
		this.imageServerUrl = imageServerUrl
	}

	/**
	 * Sends a query
	 */
	async send (query: string): Promise<Blob> {
		const response = await fetch(this.imageServerUrl, {
			method: 'POST',
			body: JSON.stringify(query),
		})

		const data = await response.blob()

		return data
	}
}

export default IQLClient
