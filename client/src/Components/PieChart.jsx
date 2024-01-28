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
  const updatedPieChartData = [
    { id: 'State Tax', label: 'State Tax', value: data.taxesOwed.stateTax },
    { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.taxesOwed.fed)) },
    { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.taxesOwed.ssi)) },
    { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.taxesOwed.medicare)) },
    { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.businessExpenses))},
    { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.estimatedIncome))},
  ];
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