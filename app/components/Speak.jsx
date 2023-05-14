// 'use client'

// import { useSpeech } from 'react-use'

// const Speak = ({ message }) => {

//     const [voices, setVoices] = useState([])

//     useEffect(() => {
//         setVoices(window.speechSynthesis.getVoices())
//     }, [])

//     const state = useSpeech('hello from speak', {
//         rate: 0.8,
//         pitch: 0.5,
//         voice: voices[1],
//     })

//     return <pre>{JSON.stringify(state, null, 2)}</pre>
// }

// export default Speak
