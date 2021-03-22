# ImageServer-TS
Package for interacting with [ImageServer](https://github.com/DiscordDungeons/ImageServer), written in TypeScript 


# Installation

`npm i --save @discorddungeons/iqlclient`

# Usage

Create a new client:

```js
import { IQLClient } from 'iqlclient'

const client = new IQLClient("https://example.com")
```

Create and send a new query:

```js
import { IQLClient, IQLQuery } from 'iqlclient'

const client = new IQLClient("https://example.com")

const query = new IQLQuery().loadImage("image-url", "imageName").returnImage("imageName")

client.send(query).then(image => {
	// Do stuff with the image blob
})
```