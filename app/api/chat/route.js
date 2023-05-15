// interacting with API via http

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API Key')
}

export async function POST(request) {
    const { language, difficulty, topic, numQuestions } = await request.json()
    
    console.log(language, difficulty, topic, numQuestions)

    let firstSentence = ''
    if (language === "JavaScript" || language === "Python") {
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
	
    // console.log(prompt)

    try {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer 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`,
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    max_tokens: 2048,
                    stream: false,
                    n: 1,
                }),
            }
        )

        // console.log('response', response)
        
        const json = await response.json()

        // console.log(json)

		// TODO: understand this
        return new Response(json.choices[0].message.content)

    } catch (err) {
        return new Response('Request cannot be processed!', {
            status: 400,
        })
    }
}
