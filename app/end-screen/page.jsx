'use client'

import { useState, useEffect } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { pickRandom } from '../utils'

import { endMessages } from '../constants/endMessages'

import { useSpeech } from 'react-use'

// import Voice from '../components/Speak'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const EndScreen = () => {
    // const voices = window.speechSynthesis.getVoices()
    // console.log(voices)

    const router = useRouter()
    const params = useSearchParams()

    const score = Number(params.get('score'))

    const [message, setMessage] = useState('')

    // const state = useSpeech(message, {
    //     rate: 0.8,
    //     pitch: 0.5,
    //     voice: voices[1],
    // })

    const { width, height } = useWindowSize()

    const handlePlayAgain = () => {
        router.push('/')
    }

    useEffect(() => {
        let messageList = []
        if (score === 1) {
            messageList = endMessages.perfect
        } else if (score >= 0.8) {
            messageList = endMessages.good
        } else {
            messageList = endMessages.bad
        }
        setMessage(pickRandom(messageList))
    }, [])

    // useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] })
    // useSpeech(message, { rate: 0.8, pitch: 0.5, voice: voices[0] })

    return (
        <div className='min-h-screen grid place-items-center'>
            {/* <Voice message={message} /> */}
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}


            {score >= 0.8 && <Confetti width={width} height={height} />}

            <div className='max-w-3xl flex flex-col items-center z-10'>
                <h2 className='text-7xl'>Score: {score * 100}%</h2>
                <iframe
                    src='https://giphy.com/embed/MhHXeM4SpKrpC'
                    width='480'
                    height='269'
                    // frameBorder='0'
                    className='giphy-embed mt-10'
                    allowFullScreen
                ></iframe>

                <p className='text-3xl mt-12 mb-5 text-center'>{message}</p>

                <button
                    // className='border border-white px-6 py-3 rounded mt-12 text-lg'
                    className='q-button'
                    onClick={handlePlayAgain}
                >
                    Play again?
                </button>
            </div>
        </div>
    )
}
export default EndScreen
