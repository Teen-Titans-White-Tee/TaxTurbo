import React from 'react';
import { useNormalizedData } from '@nivo/pie';

const Expenses = ({expenses}) => {
//results from userDataQuery (called in Dashboard Container):
  const {
    data = expenseData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = expenses;
   
  //styling:
  const styles = {
    dashboard: {
      padding: '20px',
      margin: '60px',
      backgroundColor: '#EDE7F6',
    },
    header: {
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      marginBottom: '20px',
    },
    username: {
      position: 'absolute',
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      top: '80px',
      right: '95px',
      fontSize: '16px',
    },
    chartContainer: {
      height: '400px',
      backgroundColor: '#E8EAF6',
      margin: '20px 0',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
    },
    button: {
      margin: '5px',
    },
    formContainer: {
      position: 'fixed',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '30px',
      zIndex: 2,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      width: '400px',
      textAlign: 'center',
      color: '#333',
    },
    closeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor: 'pointer',
    },
    listContainer: {
      width: '100%',
      backgroundColor: '#D1C4E9',
      padding: '8px',
      right: '10px',
      bottom: '0px',
      maxHeight: '247.5px',
      overflow: 'auto',
    },
    listTitle: {
      padding: '10px',
      backgroundColor: 'white',
      position: 'sticky',
      top: '1px',
      zIndex: 1,
    },
    listContent: {
      maxHeight: 'calc(100% - 58px)',
      overflowY: 'auto',
      marginTop: '7px',
    },
    projectionsContainer: {
      backgroundColor: '#D1C4E9',
      padding: '20px',
      margin: '60px',
      marginTop: '20px',
    },
    projection: {
      fontFamily: 'Poppins, sans-serif',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      backgroundColor: 'white',
    },
    slider: {
      marginTop: '10px',
      color: '#673AB7',
    },
  };
    
  return (
    <div>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : expenseData ? (
        <List style={styles.listContainer}>
          <div style={styles.listTitle}>
            <Typography variant="h7">Imported Transactions</Typography>
          </div>
          <div style={styles.listContent}>
            {expenseData.map((transaction, index) => (
              <React.Fragment key={index}>
                <ListItem style={styles.listItem}>
                  <div style={{ width: '70%', display: 'inline-block' }}>
                    {transaction.name} {transaction.amount} {transaction.date} {transaction.category}
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </List>
      ) : null}
    </div>
  );
};
         
export default Expenses;

  

          
 