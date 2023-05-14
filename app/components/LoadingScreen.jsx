import Facts from './Facts'

import { MutatingDots, Bars } from 'react-loader-spinner'

const LoadingScreen = () => {
    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='w-[80%] flex flex-col items-center'>
                <div className='flex items-center gap-4'>
                    <Bars width='60' height='60' color='#6ee7b7' />
                    <span className='text-emerald-300 uppercase text-base font-bold'>
                        Generating Quiz...
                    </span>
                    <Bars width='60' height='60' color='#6ee7b7' />
                </div>
                <div className='mt-8'>
                    <Facts />
                </div>
            </div>
        </div>
    )
}
export default LoadingScreen
