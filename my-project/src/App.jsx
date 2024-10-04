import React, { useState, useEffect } from 'react'
import { AiFillSound } from "react-icons/ai";

const App = props => {
  const [advice, setAdvice] = useState(null)

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(json => setAdvice(json.slip))
      .catch(err => console.log(err))
  }, [])

  const speakAdvice = (text) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-UK' 
    synth.speak(utterance)
  }

  return (
    <div className='bg-[#212733] h-[100vh] py-[20%] px-[10%]'>
      <div className='bg-[#313A49] py-14 px-3 shadow-2xl rounded-xl text-[#D1E0ED] '>
        <h6 className='text-[#54FEAA] flex justify-center mb-10 text-xl '>ADVICE #{advice?.id}</h6>
        {advice ? (
          <div>
            <h1 className='text-4xl font-extrabold flex justify-center'>{advice.advice}</h1>
          </div>
        ) : (
          <p className='text-4xl font-extrabold flex justify-center'>Loading...</p>
        )}
      </div>

      <div className='flex justify-center relative mt-[-40px]'>
        <button onClick={() => speakAdvice(advice?.advice)} className='bg-green-300  w-20 h-20 rounded-full shadow-xl'> 
          <AiFillSound className='w-10 h-10 ml-5'/> 
        </button>
      </div>
    </div>
  )
}

export default App
