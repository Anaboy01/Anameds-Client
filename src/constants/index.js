import { createCampaign, dashboard, logoutLogo, payment, profile, withdraw, medicalRecords, croud } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/patientProfile',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'allCampaigns',
    imgUrl: croud,
    link: '/patient-funding',
  },
];


export const doctorNavlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/doctorProfile',
  },
  {
    name: 'allCampaigns',
    imgUrl: croud,
    link: '/patient-funding',
  },
];


export const hospitalNavlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/doctorDash',
  },
  // {
  //   name: 'Files',
  //   imgUrl: createFile,
  //   link: '/getPatientFIle',
  // },
  {
    name: 'Campaigns',
    imgUrl: dashboard,
    link: '/campaigns',
    disabled: true,
  },
  {
    name: 'logout',
    imgUrl: logoutLogo,
    link: '/',
    disabled: true,
  },
];