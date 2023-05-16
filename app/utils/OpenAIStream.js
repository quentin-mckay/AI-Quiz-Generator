import { createParser } from 'eventsource-parser'

export async function OpenAIStream(payload) {

	// console.log(payload)

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let counter = 0

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    })

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event) {
                if (event.type === 'event') {
                    const data = event.data
                    if (data === '[DONE]') {
						console.log('data done controller closing')
                        controller.close()
                        return
                    }
                    try {
						console.log(data)

                        const json = JSON.parse(data)
                        const text = json.choices[0].delta.content
                        // if (counter < 2 && (text.match(/\n/) || []).length) {
                        //     return
                        // }
                        const queue = encoder.encode(text)
                        controller.enqueue(queue)
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
            for await (const chunk of res.body) {
                parser.feed(decoder.decode(chunk))
            }
        },
    })

    return stream
}
