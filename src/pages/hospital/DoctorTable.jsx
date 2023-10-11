import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctorsByHospitalId } from '../../redux/features/doctors/doctorsSlice';

const DoctorTable = () => {
  const dispatch = useDispatch();

  // Use useSelector to get the doctors and loading/error state from the Redux store
  const { doctors, isLoading, isError, error } = useSelector((state) => state.doctor);

  
  useEffect(() => {
    // Dispatch the async action to get doctors when the component mounts
    dispatch(getDoctorsByHospitalId());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Specialty</th>
          <th>Rank</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sortedDoctors.map((doctor) => (
          <tr key={doctor._id}>
            <td>{doctor.name}</td>
            <td>{doctor._id}</td>
            <td>{doctor.specialty}</td>
            <td>{doctor.rank}</td>
            <td>{doctor.contactInfo.email}</td>
            <td>{doctor.contactInfo.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTable;
