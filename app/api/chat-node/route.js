// not used in final version
// same as /api/chat route but using the openai Node library

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req, res) {
    const { language, difficulty, topic, numQuestions } = await req.json()

	console.log('----------------------------------------')
    console.log(language, difficulty, topic, numQuestions)

    let firstSentence = ''
    if (language === 'JavaScript' || language === 'Python') {
        if (topic === 'Random') {
            firstSentence = `Give me ${numQuestions} multiple choice questions about a random topic in the ${language} programming language.`
        } else {
            firstSentence = `Give me ${numQuestions} multiple choice questions about ${topic} in the ${language} programming language.`
        }
    } else {
        if (topic === 'Random') {
            firstSentence = `Give me ${numQuestions} multiple choice questions about a random topic in ${language}.`
        } else {
            firstSentence = `Give me ${numQuestions} multiple choice questions about ${topic} in ${language}.`
        }
    }

    const prompt = `${firstSentence} The questions should be at an ${difficulty} level. Return your answer entirely in the form of a JSON object. The JSON object should have a key named "questions" which is an array of the questions. Each quiz question should include the choices, the answer, and a brief explanation of why the answer is correct. Don't include anything other than the JSON. The JSON properties of each question should be "query" (which is the question), "choices", "answer", and "explanation". The choices shouldn't have any ordinal value like A, B, C, D or a number like 1, 2, 3, 4. The answer should be the 0-indexed number of the correct choice.`

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
