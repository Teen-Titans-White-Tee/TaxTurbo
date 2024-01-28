import React from 'react';

const PieChart = ({userData}) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = userData;
  
  console.log('data in PieChart:', data);
  
  return (
    <div>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : userData ? (
        <>
          <h3>{userData.firstName}</h3>
          <PieChart userData={userData}/>
        </>
      ) : null}
    </div>
  );
};
export default PieChart;