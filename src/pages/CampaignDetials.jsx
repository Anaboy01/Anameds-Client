import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStateContext } from '../context'
import { CustomButton, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'
import CountBox from '../components/CountBox'




const CampaignDetials = () => {
  const {state} = useLocation();
  const {donate, getDonations, contract, address} = useStateContext()



  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  // console.log(state)

  const fetchDonators = async () => {
    try {
      const data = await getDonations(state.pId);
      console.log("Donator data:", data);
      setDonators(data);
    } catch (error) {
      console.error("Error fetching donator data:", error);
    }
  }
  

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount)

    setIsLoading(false);
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center w-[80%]'>
      
      <div className='flex w-full '>
      {/* <Link className='self-start' to='/'>
              <h2 className='text-green-900 text-2xl'>Home</h2>
      </Link> */}
      </div>
      {isLoading && <Loader/>}
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
            <img src={state.image} alt='campaign' className='w-full h-[410px] object-cover rounded-xl'/>
            <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
              <div className='absolute h-full bg-[#4acd8d]' style={{width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>

              </div>

            </div>
        </div>
        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]  '>
          <CountBox title='Days Left' value={remainingDays}/>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected}/>
          <CountBox title='total Backers' value={donators.length}/>
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">

        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
              <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
              <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className='mt-[20px]'>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify ">{state.description}</p>
            </div>
            
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

            <div className='mt-[20px] flex flex-col gap-4'>

            {donators.length > 0 ? donators.map((item, index) => (
              <div key={`${item.donator}-${index}`} className='flex justify-between items-center gap-4'>
               <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all '>{index + 1}. {item.donator} </p>
               <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll '>{item.donations} </p>
              </div>
            )): (
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify ">No donators yet</p>
            )}             
            </div>
          </div>
        </div>
        
        <div className=' flex-1 '>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">fund</h4>

          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] '>

              <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191] '>
                Fund the campaign
              </p>

              <div className='mt-[30px]'>
                <input 
                  type="number"
                  placeholder='ETH 0.1'
                  step='0.01'
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-3[30px] placeholder:text-[#4b5264] rounded-[10px] '
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                      
                />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Fund patients in need – make a difference now!</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]"> Enable healing through your generosity. Support patients in need and create a life-changing impact today!</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />

                
              </div>

          </div>
        </div>

      </div>
      
    </div>
             
    </div>


  )
}

export default CampaignDetials