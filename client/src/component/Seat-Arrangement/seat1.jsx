import React, { useEffect, useState } from "react";
import "./seat.css";

const SeatArrangement = ({ squareCount }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const seatSize = 15; // Size of each seat
    const radiuses = [150, 180, 210, 230, 260, 290, 310]; // Radius for each circle
    let remainingSeats = squareCount;
    let newSeats = [];
    let minSeat = 40; // Initial minSeat value

    // Loop through each circle's radius
    for (let i = 0; i < radiuses.length && remainingSeats > 0; i++) {
      const radius = radiuses[i];
      const maxSeatsPerRound = Math.min(minSeat + i * 20, remainingSeats); // Dynamic minSeat calculation
      const angleIncrement = 360 / maxSeatsPerRound;

      // Calculate seats for the current circle
      for (let angle = 0; angle < 360 && remainingSeats > 0; angle += angleIncrement) {
        const radians = angle * Math.PI / 180;
        const x = Math.cos(radians) * radius + 300; // Center of circle is at (300, 300)
        const y = Math.sin(radians) * radius + 300;
        newSeats.push({ left: x - seatSize / 2, top: y - seatSize / 2 });
        remainingSeats--;
      }
    }

    setSeats(newSeats);
  }, [squareCount]);

  return (
    <div className="circle-container m-auto">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
      <div className="circle circle-3" />
      <div id="seat-arrangement">
        {seats.map((seat, index) => (
          <div key={index} className="seat" style={{ left: seat.left, top: seat.top }} />
        ))}
      </div>
    </div>
  );
};

export default SeatArrangement;
