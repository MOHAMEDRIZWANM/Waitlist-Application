import React, { useState, useEffect } from 'react';
import '../styles/WaitingList.css';
import { leaderboard, winnerDet } from '../api';
import {useNavigate} from 'react-router-dom';

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [winnerDetails, setWinnerDetails] = useState(null)

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await leaderboard();
        setWaitingList(response.data);
      } catch (error) {
        console.error('Error fetching waiting list:', error);
      }
    };
    fetchWaitingList();
    const fetchWinnerDetails = async() => {
      try {
        const response = await winnerDet()
        setWinnerDetails(response.data)
      } catch (error) {
        console.error('Error fetching winner details: ', error)
      }
    }
    fetchWinnerDetails()
  }, []);

  const navigate = useNavigate()

  const handleCouponButtonClick = () => {
    if (winnerDetails && winnerDetails.winner) {
      const { name, couponCode } = winnerDetails;
      navigate('/coupon', { state: { name, couponCode }, replace: true });
    }
  }

  return (
    <div className=''>
      <h1 className='heading'>Waiting List</h1>
      <div className='table-container'>
        <table className='waiting-list-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {waitingList.map((person, index) => (
              <tr key={person.serialNumber}>
                <td>{person.serialNumber}</td>
                <td>{person.name}</td>
                <td>{person.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {winnerDetails && winnerDetails.winner && (
        <div className='winner-details'>
          <p>Congratulations {winnerDetails.name}, you are a winner!</p>
          <button onClick={handleCouponButtonClick}>View Coupon</button>
        </div>
      )}
    </div>
  );
};


export default WaitingList;


