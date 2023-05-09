'use client'

import { useState } from 'react'

import { topics } from './constants/topics'

const HomePage = () => {
    // const [topicOptions, setTopicOptions] = useState(topics.python.beginner)

    const [language, setLanguage] = useState('javascript')
    const [difficulty, setDifficulty] = useState('beginner')
    const [topic, setTopic] = useState('functions')

    return (
        <div>
            <h1>HomePage</h1>

            <label htmlFor='difficult'>Difficulty:</label>
            <select
                className=''
                name='difficulty'
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option className='p-4' value=''>
                    Select a difficulty
                </option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
            </select>
        </div>
    )
}
export default HomePage
