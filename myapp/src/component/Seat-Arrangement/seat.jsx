import React, { useState } from 'react';
import "./seat.css";

// SeatingChart component represents the seating area of the stadium
const SeatingChart = () => {
  const numSeats = 100; // Total number of seats in the stadium
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to handle seat selection
  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  // Seat component represents an individual seat in the stadium
  const Seat = ({ number, angle }) => {
    const isSelected = selectedSeats.includes(number);
    // const seatStyle = {
    //   transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`
    // };

    return (
      <div
        className={`seat ${isSelected ? 'selected' : ''}`}
        // style={seatStyle}
        onClick={() => handleSeatSelect(number)}
      >
        {number}
      </div>
    );
  };

  // Generating seats
  const seats = [];
  const angleIncrement = 360 / numSeats;
  for (let i = 1; i <= numSeats; i++) {
    const angle = i * angleIncrement;
    seats.push(<Seat key={i} number={i} angle={angle} />);
  }

  return (
    <div className="App">
      <h1 className='text-center'>Cricket Stadium</h1>
      <div>Selected Seats: {selectedSeats.join(', ')}</div>
      <div className="cricket-ground">
        <div className="stadium"></div>
        <div className="pitch"></div>
      </div>
    </div>
  );
};

export default SeatingChart;
