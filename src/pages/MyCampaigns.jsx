import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'


const MyCampaigns = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address, contract, getUserCampaigns} = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns();
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {

    if(contract) fetchCampaigns();

  },[address, contract])

  return (
   <div>
    <DisplayCampaigns
      title='Your Campaigns'
      isLoading={isLoading}
      campaigns={campaigns}
      message='You dont have a Campaign'
    />
   </div>
  )
}

export default MyCampaigns