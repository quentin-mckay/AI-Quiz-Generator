'use client'

import { useState } from 'react'

import { topics } from './constants/topics'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import AudioPlayer from './components/AudioPlayer'

import { FiGithub } from 'react-icons/fi'

const HomePage = () => {
    // const [topicOptions, setTopicOptions] = useState(topics.python.beginner)

    // const router = useRouter()

    const [language, setLanguage] = useState('javascript')
    const [difficulty, setDifficulty] = useState('Beginner')
    const [topic, setTopic] = useState('Random')
    const [numQuestions, setNumQuestions] = useState('5')

    const handleSetQuestions = (e) => {}

    const handleLanguageSelect = (e) => {
        setLanguage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(language, difficulty, topic)

        // router.push('/quiz')
    }

    // bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent

    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='border rounded border-white/0 '>
                <h1 className='text-center text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-500 via-pink-400 to-blue-500 bg-clip-text text-transparent q-animate-gradient'>
                    AI Quiz Generator
                </h1>

                {/* <form onSubmit={handleSubmit} className='mt-8 grid grid-cols-[2fr_3fr]'> */}
                <form
                    onSubmit={handleSubmit}
                    className='mt-14 flex flex-col gap-4 w-[80%] mx-auto'
                >
                    {/* <div className='flex flex-col gap-6'> */}
                    <div className='grid grid-cols-2 gap-x-8 gap-y-6'>

                        {/* LANGUAGE */}
                        <div className='flex flex-col'>
                            <label
                                htmlFor='language'
                                className='uppercase text-xs'
                            >
                                Language
                            </label>
                            <select
                                value={language}
                                onChange={handleLanguageSelect}
                                name='language'
                                className='quiz-select'
                            >
                                <option value='javascript'>JavaScript</option>
                                <option value='python'>Python</option>
                                <option value='react'>React</option>
                                <option value='css'>CSS</option>
                            </select>
                        </div>

                        {/* TOPIC */}
                        <div className='flex flex-col'>
                            <label
                                htmlFor='topic'
                                className='uppercase text-xs'
                            >
                                Topic
                            </label>
                            <select
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                name='topic'
                                className='quiz-select'
                            >
                                {topics[language].map((option, index) => (
                                    <option
                                        value={option}
                                        key={index}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DIFFICULTY */}
                        <div className='flex flex-col'>
                            <label
                                htmlFor='difficult'
                                className='uppercase text-xs'
                            >
                                Difficulty
                            </label>
                            <select
                                name='difficulty'
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className='quiz-select'
                            >
                                <option value='beginner'>Beginner</option>
                                <option value='intermediate'>
                                    Intermediate
                                </option>
                                <option value='advanced'>Advanced</option>
                            </select>
                        </div>

                        {/* NUMBER OF QUESTIONS */}
                        <div className='flex flex-col'>
                            <label
                                htmlFor='numQuestions'
                                className='uppercase text-xs'
                            >
                                # of Questions
                            </label>
                            <select
                                name='numQuestions'
                                value={numQuestions}
                                onChange={(e) =>
                                    setNumQuestions(e.target.value)
                                }
                                className='quiz-select'
                            >
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='15'>15</option>
                                <option value='20'>20</option>
                            </select>
                        </div>
                    </div>

                    <div className='mx-auto mt-8'>
                        <Link
                            className='q-button'
                            href={{
                                pathname: '/quiz',
                                query: {
                                    language,
                                    difficulty: difficulty.toLowerCase(),
                                    topic: topic.toLowerCase(),
                                    numQuestions,
                                },
                            }}
                        >
                            Generate Quiz
                        </Link>
                    </div>
                </form>
            </div>

            <a
                className='fixed bottom-0 flex items-center gap-2 pb-2 font-mono text-sm text-white/70 transition hover:text-emerald-300 sm:m-0'
                href='https://github.com/quentin-mckay/ai-quiz-generator'
                target='_blank'
            >
                {/* <FiGithub size={16} className='translate-y-[0px]' /> */}
                <FiGithub size={16} />
                Built with Next.js / Tailwind / OpenAI
            </a>
        </div>
    )
}
export default HomePage
