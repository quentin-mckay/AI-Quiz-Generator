import Facts from './Facts'

import { MutatingDots, Bars } from 'react-loader-spinner'

const LoadingScreen = () => {
    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='w-[80%] flex flex-col items-center'>
                <div className='flex items-center gap-4'>
                    <Bars width='60' height='60' color='#6ee7b7' />
                    <div className='text-emerald-300 uppercase text-2xl font-bold text-center translate-y-2'>
                        <p>
                            Generating Quiz...
                        </p>
                        <p className='text-xs text-emerald-300/50'>
                            (can take up to 20 seconds)
                        </p>
                    </div>
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
