import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='rounded flex bg-white'>
        <div className={`text-xl sm:text-2xl md:text-3xl flex justify-center items-center ${color} text-white px-2 sm:px-3 md:px-4`}>
            {icon}
        </div>
        <div className='pl-2 sm:pl-3 md:pl-4 py-1 sm:py-2'>
            <p className='text-sm sm:text-base md:text-lg font-semibold'>{text}</p>
            <p className='text-base sm:text-lg md:text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard