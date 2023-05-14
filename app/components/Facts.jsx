'use client'

import { useState } from 'react'
import { facts } from '../constants/facts'

import { useTypewriter, Typewriter } from 'react-simple-typewriter'

import { HiChevronRight } from 'react-icons/hi2'

import { pickRandom } from '../utils'

// const pickRandom = (arr) => {
//     return arr[Math.floor(Math.random() * arr.length)]
// }

const Facts = () => {
    const [fact, setFact] = useState(pickRandom(facts))

    // const [text] = useTypewriter({
    //     words: [fact],
    //     loop: false,
    //     typeSpeed: 40,
    //     deleteSpeed: 10000000
    // })

    return (
        <div className='flex flex-col items-center text-center mt-8'>
            <p className='min-h-[100px] text-2xl '>
                <Typewriter
                    key={fact}
                    words={[fact]}
                    loop={false}
                    typeSpeed={50}
                    deleteSpeed={10000000}
                />
            </p>
            <button
                onClick={() => setFact(pickRandom(facts))}
                className='px-4 py-2 border border-white rounded mt-6 flex items-center gap-2'
            >
                Next Fact
                <HiChevronRight />
            </button>
        </div>
    )
}
export default Facts
