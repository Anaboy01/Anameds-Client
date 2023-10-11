import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './fundCard/FundCard';
import { daysLeft } from '../utils';

const DisplayCampaigns = ({ title, isLoading, campaigns, message }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  // Filter campaigns with 0 or more days left
  const fundableCampaigns = campaigns.filter((campaign) => {
    const remainingDays = daysLeft(campaign.deadline);
    return remainingDays >= 0;
  });

  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left '>
        {title} ({fundableCampaigns.length})
      </h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain ' />}

        {!isLoading && fundableCampaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[20px] text-[#818183] '>
            {message}
          </p>
        )}

        {!isLoading &&
          fundableCampaigns.length > 0 &&
          fundableCampaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
