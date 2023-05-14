import { useEffect, useState } from 'react'

import { HiCheck, HiOutlineXMark } from 'react-icons/hi2'

// Question Format
// {
//     query: 'What is JS?',
//     choices: ['A', 'B', 'C', 'D'],
//     answer: '0',
//     explanation: 'Explanation',
// }

const Question = ({ question, id, setNumSubmitted, setNumCorrect }) => {
    // const Question = ({ question, choices, explanation, answer }: QuestionProps) => {
    // const Question: React.FC<QuestionProps> = ({ question, choices, explanation, answer }: QuestionProps) => {

    const { query, choices, answer, explanation } = question
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isExplained, setIsExplained] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(-1)

    // Probably not the best way to do this.
    // Should just make function to test if the choice index is the selectedIndex state variable.
    const [choiceObjects, setChoiceObjects] = useState(() =>
        choices.map((choice) => ({
            text: choice,
            isSelected: false,
        }))
    )

    const isCorrect = () => {
        return Number(answer) === selectedChoiceIndex
    }

    const handleChoiceSelect = (choiceIndex) => {
        if (isSubmitted) return

        // console.log('selected')

        setSelectedChoiceIndex(choiceIndex)
        setIsSelected(true)

        setChoiceObjects((prevChoiceObjects) =>
            prevChoiceObjects.map((choice, index) => {
                return {
                    ...choice,
                    isSelected: choiceIndex === index ? true : false,
                }
            })
        )
    }

    const handleAnswerSubmit = (e) => {
        // don't allow submitting more than once
        if (isSubmitted) return

        setIsSubmitted(true)

        setNumSubmitted((prevNumSubmitted) => prevNumSubmitted + 1)

        setSelectedChoiceIndex(
            choiceObjects.findIndex((choice) => choice.isSelected)
        )

        if (isCorrect()) {
            setNumCorrect((prevNumCorrect) => prevNumCorrect + 1)
            setIsExplained(true)
        }
    }

    const handleExplain = () => {
        setIsExplained(true)
    }

    const submitButtonStyles = () => {
        let style = isSelected
            ? 'pointer-events-auto bg-cyan-600/75'
            : 'pointer-events-none border-gray-500 bg-stone-700'
        style = isSubmitted
            ? 'pointer-events-none border-gray-500 bg-stone-700 opacity-50'
            : style
        return style
    }

    const explainButtonStyles = () => {
        let style = isExplained
            ? 'pointer-events-none opacity-50'
            : 'pointer-events-auto'
        return style
    }

    const renderChoices = () => {
        return choiceObjects?.map((choice, index) => {
            let style = ''

            style = choice.isSelected
                ? 'border-cyan-600/75 bg-cyan-600/20'
                : 'border-gray-500 hover:bg-cyan-600/10'

            let checkOrX = null

            if (isSubmitted) {
                if (index === selectedChoiceIndex) {
                    if (isCorrect()) {
                        style = 'border-emerald-300 bg-emerald-300/10'
                        checkOrX = (
                            <div>
                                <HiCheck size={30} color='#6ee7b7' />
                            </div>
                        )
                    } else {
                        style = 'border-red-400 bg-red-400/10'
                        checkOrX = (
                            <div>
                                <HiOutlineXMark size={30} color='#f87171' />
                            </div>
                        )
                    }
                }
            }

            if (isExplained) {
                if (index === Number(answer)) {
                    style = 'border-emerald-300 bg-emerald-300/10'
                    checkOrX = (
                        <div>
                            <HiCheck size={30} color='#6ee7b7' />
                        </div>
                    )
                }
            }

            return (
                <div
                    key={index}
                    className={`w-full p-4 text-left border rounded cursor-pointer ${style} flex items-center justify-between`}
                    onClick={() => handleChoiceSelect(index)}
                >
                    <pre className=' whitespace-pre-wrap'>
                        {/* <code>{choice.text}</code> */}
                        {/* <code className=' bg-opacity-0 '>{choice.text}</code> */}
                        <code
                            className='rounded'
                            style={{
                                padding: 5,
                                backgroundColor: 'transparent',
                            }}
                        >
                            {choice.text}
                        </code>
                    </pre>

                    {checkOrX}
                </div>
            )
        })
    }

    useEffect(() => {
        // Probably not a good way to do this.
        // Maybe each choice should be it's own component at this point.
        setChoiceObjects(
            choices.map((choice) => ({
                text: choice,
                isSelected: false,
            }))
        )
    }, [])

    return (
        <div className='max-w-3xl mx-auto'>
            <h2 className='text-sm font-semibold text-gray-300/80'>
                Question {id + 1}
            </h2>
            <div className='border border-gray-500/0 rounded'>
                <div className='py-2 mt-2 text-xl'>{query}</div>
                <div className='grid gap-2 mt-4'>{renderChoices()}</div>
                <div className='flex items-center justify-end gap-2 mt-2 itesm'>
                    {isSubmitted && (
                        <button
                            onClick={handleExplain}
                            className={`px-6 py-3  border-gray-500 rounded bg-stone-700 hover:bg-stone-600 ${explainButtonStyles()}`}
                        >
                            Explain
                        </button>
                    )}
                    <button
                        onClick={handleAnswerSubmit}
                        className={`px-6 py-3   rounded ${submitButtonStyles()}`}
                    >
                        {isSubmitted ? 'Submitted' : 'Submit'}
                    </button>
                </div>
                {((isSubmitted && isCorrect()) || isExplained) && (
                    <div className='mt-2 p-4 rounded bg-stone-700/50'>
                        <h3 className='text-emerald-300/60 text-sm font-bold'>
                            Explanation
                        </h3>
                        <p className='mt-2 text-sm font-light'>{explanation}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Question
