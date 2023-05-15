// older /pages/api style (not app directory)

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req, res) {
    const prompt = req.body.prompt

    if (!prompt || prompt === '') {
        return new Response('Please send your prompt', { status: 400 })
    }

    const compo = await openai.createCompletion({
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

	const response = aiResult.data.choices[0].message.content || 'Sorry, there was a problem!'
	res.status(200).json({ text: response })
}
