// LayoutContainer.js

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserType } from '../../redux/features/userType/userTypeSlice';
import PatLayout from './PatLayout';
import DocLayout from './DocLayout';
import HosLayout from './HosLayout';

const LayoutContainer = ({ children }) => {
  const userType = useSelector(selectUserType);

  const renderLayout = () => {
    switch (userType) {
      case 'patient':
        return <PatLayout>{children}</PatLayout>;
      case 'doctor':
        return <DocLayout>{children}</DocLayout>;
      case 'hospital':
        return <HosLayout>{children}</HosLayout>;
      default:
        return <div>{children}</div>;
    }
  };

  return renderLayout();
};

export default LayoutContainer;
