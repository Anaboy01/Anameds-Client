import React from 'react'
import ContactForm from '../components/ContactForm'
import Socials from '../components/Socials'

const Contact = () => {
  return (
    <div className='flex flex-col gap-[5rem] px-[15px] py-[15px] items-center justify-center xl:flex-row'>
      <ContactForm/>
      <Socials/>

    </div>
  )
}

export default Contact