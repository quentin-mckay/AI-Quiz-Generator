// not used in final version
// single prompt test { prompt: "What is JavaScript?"}

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req, res) {
    // const prompt = req.body.prompt
    const { prompt } = await req.json()

    if (!prompt || prompt === '') {
        return new Response('Please send your prompt', { status: 400 })
    }

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 1, // 0 - 2
            // top_p: 1,
            // frequency_penalty: 0,
            // presence_penalty: 0,
            max_tokens: 2048,
            // stream: false,
            n: 1,
        })

        console.log(completion.data.choices[0].message.content)
        const responseText =
            completion.data.choices[0].message.content ||
            'Sorry, there was a problem!'
        // res.status(200).json({ text: response })

        return new Response(responseText)
    } catch (err) {
        return new Response('Request cannot be processed!', {
            status: 400,
        })
    }
}
