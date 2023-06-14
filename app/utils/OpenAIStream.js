/* Consume a streaming response from the OpenAI API and process the events from the stream, extracting the generated text from the JSON events and provide it as an output stream for further consumption. */

import { createParser } from 'eventsource-parser'

export async function OpenAIStream(payload) {

	// console.log(payload)

    const encoder = new TextEncoder() // string to binary
    const decoder = new TextDecoder() // binary to string

    // let counter = 0

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    })

    const stream = new ReadableStream({  // ReadableStream API allows for consumption of streams of data

        async start(controller) { // called when stream is first consumed

            function onParse(event) { // called whenever an event is parsed from the stream

                if (event.type === 'event') {

                    const data = event.data

                    if (data === '[DONE]') {
						// console.log('data done controller closing')

                        controller.close() // ends the stream
                        return
                    }
                    try {
						// console.log(data) // log every single token

                        const json = JSON.parse(data)
                        const text = json.choices[0].delta.content // get actual text token from chunk
                        // if (counter < 2 && (text.match(/\n/) || []).length) {
                        //     return
                        // }
                        const queue = encoder.encode(text) // encode string into binary Uint8Array
                        controller.enqueue(queue) // enqueue into the controller, making it available to consumers of the stream.

                        // counter++
                    } catch (e) {
                        controller.error(e)
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks & invoke an event for each SSE event stream
            const parser = createParser(onParse)

            // https://web.dev/streams/#asynchronous-iteration
            // iterate over the chunks of data received from the response stream
            for await (const chunk of res.body) {
                // decode binary into string
                // triggers onParse callback for each event parsed from the string
                parser.feed(decoder.decode(chunk)) 
            }
        },
    })

    return stream
}
