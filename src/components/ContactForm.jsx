import React from 'react';
import styles from './ContactForm.module.css'


const ContactForm = () => {
  return (
   <div className='grid justify-center items-center w-[80%]'>
      <div>
            <div>
                        <h1 className='font-semibold   sm:text-4xl md:text-5xl xl:text-7xl text-[white] text-center fon'>Contact us</h1>
            </div>
            <div >
                        <h4 className=' font-normal text-l text-[#9b9b9b] leading-normal text-center'>We'd love to hear from you!</h4>
            </div>
            <form className='  max-w-full mt-5 mb-[25px] mx-auto'>
                        <div className={`${styles['col-md-6']} ${styles['col-sm-12']}`}>
                              <div className='w-full max-w-full float-left  relative rounded mx-0 my-4'>
                                    <input type="text" required className=' w-full text-base bg-[#2d2d2d] text-[white] rounded p-[30px] border-0' />
                                    <label className='text-[#999] absolute transition-all duration-[0.25s] ease-[ease] pointer-events-none pt-[1.3rem] pb-4 px-[30px] left-0 top-2.5'>Name</label> 
                              </div>
                        </div>
                        <div >
                              <div className='float-left w-full relative rounded mx-0 my-4 sm:w-full' >
                                    <input type="text" required  className=' w-full text-base bg-[#2d2d2d] text-[white] rounded p-[30px] border-0'/>
                                    <label className='text-[#999] absolute transition-all duration-[0.25s] ease-[ease] pointer-events-none pt-[1.3rem] pb-4 px-[30px] left-0 top-2.5'>Email</label> 
                              </div>
                        </div>
                        <div >
                              <div className='float-right w-full relative rounded mx-0 my-4 ' >
                                    <input type="text" required className='w-full text-base bg-[#2d2d2d] text-[white] rounded p-[30px] border-0' />
                                    <label className='text-[#999] absolute transition-all duration-[0.25s] ease-[ease] pointer-events-none pt-[1.3rem] pb-4 px-[30px] left-0 top-2.5'>Phone Number</label> 
                              </div>
                        </div>
                        <div >
                              <div className=' w-full max-w-full float-left  relative rounded mx-0 my-4'>
                                    <textarea required className='w-full min-h-[15em] sm:w-[293px]  md:w-[400px] lg:w-[630px] text-base bg-[#2d2d2d] text-[white] rounded p-[30px] border-0'></textarea>
                                    <label className='text-[#999] absolute transition-all duration-[0.25s] ease-[ease] pointer-events-none pt-[1.3rem] pb-4 px-[30px] left-0 top-2.5'>Message</label>
                              </div>
                        </div>
                        <div>
                              <div className={`${styles['btn-lrg']} float-right inline-block bg-[#bd9f67] text-[#001233] text-lg cursor-pointer shadow-[0_2px_5px_0_rgba(0,0,0,0.06),0_2px_10px_0_rgba(0,0,0,0.07)] transition-all duration-300 ease-[ease] px-[35px] py-[7px] rounded-[60px] hover:translate-y-px hover:shadow-[0_1px_1px_0_rgba(0,0,0,0.10),0_1px_1px_0_rgba(0,0,0,0.09)] md:w-full md:float-none md:text-center vl:text-sm`}>Send Message</div>
                        </div>
            </form>
      </div>
   </div>
  );
};

export default ContactForm;
