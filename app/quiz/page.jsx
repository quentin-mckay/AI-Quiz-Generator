'use client'

import { useEffect, useState } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { motion, useSpring } from 'framer-motion'

import LoadingScreen from '../components/LoadingScreen'
import Question from '../components/Question'

import { testQuiz } from '../constants/testQuiz'



import "highlight.js/styles/atom-one-dark.css";
import hljs from 'highlight.js'

const QuizPage = () => {
    const params = useSearchParams()
    const router = useRouter()

    const language = params.get('language')
    const difficulty = params.get('difficulty')
    const topic = params.get('topic')
    const numQuestions = Number(params.get('numQuestions'))

    const [quiz, setQuiz] = useState([]) // array of questions
    const [isLoading, setIsLoading] = useState(false)

    const [numSubmitted, setNumSubmitted] = useState(0)
    const [numCorrect, setNumCorrect] = useState(0)

    const [progress, setProgress] = useState(0)

    const scaleX = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.002,
    })


    useEffect(() => {

        const generateQuestions = async () => {
            console.log('loading...')
            setIsLoading(true)

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        language,
                        difficulty,
                        topic,
                        numQuestions
                    }),
                })

                console.log(response)

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                const text = await response.text()
                // console.log(text)
                // setQuiz(quiz)
                const quiz = JSON.parse(text).questions
                // console.log(quiz)
                setQuiz(quiz)

                // console.log(quiz)
                // console.log(JSON.parse(quiz))
            } catch (err) {
                console.log('error', err)
            } finally {
                setIsLoading(false)
                console.log('done loading')
            }
        }
        generateQuestions()
    }, [])

    useEffect(() => {
        hljs.highlightAll()
    }, [quiz])

    useEffect(() => {
        // set progress 0 - 1
        setProgress(numSubmitted / numQuestions)

        // if all questions submitted
        if (numSubmitted === numQuestions && numQuestions !== 0) {
            const score = numCorrect / numSubmitted
            router.push(`/end-screen?score=${score}`)
        }
    }, [numSubmitted])

    useEffect(() => {
        // update progress bar
        scaleX.set(progress)
    }, [progress])

    return (
        <div>
            {/* <div className='fixed right-0 p-4'>
                <div>Submitted: {numSubmitted}</div>
                <div>Correct: {numCorrect}</div>
            </div> */}

            <motion.div className='progress-bar' style={{ scaleX }} />

            {/* <h1 className='pt-12 text-3xl font-semibold text-center'>
                Quiz Page
            </h1> */}
            {isLoading ? (
                <LoadingScreen color='#F00' width='100' />
            ) : (
                <div className='pt-12'>
                    {quiz?.map((question, index) => (
                        // <div>{question.query}</div>
                        <div className='mb-12' key={index}>
                            <Question
                                question={question}
                                id={index}
                                key={index}
                                setNumSubmitted={setNumSubmitted}
                                setNumCorrect={setNumCorrect}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default QuizPage
