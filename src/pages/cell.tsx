import { useEffect, useState } from 'react'

import { useCellValue } from '@/stateManager'

import { filterOptionCell } from '@/components/Settings/Widgets/SafeSearch'
import SettingsModal from '@/components/Settings/SettingsModal'

// const countCell = cell(20)

const Cell = () => {
    const [renderCount, setRenderCount] = useState(0)
    const option = useCellValue(filterOptionCell)
    const [showSettingsModal, setShowSettingsModal] = useState(false)

    const toggleSettingsModal = () => {
        setShowSettingsModal((prev) => !prev)
    }

    useEffect(() => {
        setRenderCount(prevCount => prevCount + 1);
    }, [option])
  return (
    <section className='w-full h-[100vh] min-h-[100vh] bg-white text-black flex flex-col items-center justify-center relative'>
        <h1 className='mx-auto text-5xl font-semibold mb-10'>Cell Test</h1>
        <div className='w-4/5 min-h-[80%] border border-blue-500 p-4 flex flex-col'>
            <h1>Content</h1>
            <div className='w-4/5 mt-8 border border-red-500 flex flex-col justify-evenly h-auto'>
                <p>{`Safe Search is ${option}`}</p>
                <p>{`Render count: ${renderCount}`}</p>
            </div>
        </div>
        <div className='absolute top-0 right-2'>
        {showSettingsModal ? <SettingsModal callBack={toggleSettingsModal} /> : <button onClick={toggleSettingsModal} className='px-3 py-2 font-extrabold text-2xl border flex items-center justify-center'>X</button>}
        </div>
    </section>
  )
}

export default Cell
