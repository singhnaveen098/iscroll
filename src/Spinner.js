import React from 'react'
import spin from './spinner.gif'


function Spinner() {
    return (
        <div className='text-center'>
            <img src={spin} alt="spin" className='mx-auto' />
        </div>
    )
}

export default Spinner
