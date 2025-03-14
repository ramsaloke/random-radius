import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [circles, setCircles] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('white'); // State for background color

  const handleClick = (event) => {
    const { clientX, clientY } = event;
    const radius = Math.floor(Math.random() * (200 - 20 + 1)) + 20;

    const newCircle = {
      x: clientX,
      y: clientY,
      radius: radius,
    };

    let updatedCircles = [...circles, newCircle];

    if (updatedCircles.length > 2) {
      updatedCircles = [];
    }

    setCircles(updatedCircles);

    // Check for intersection
    if (updatedCircles.length === 2) {
      const circle1 = updatedCircles[0];
      const circle2 = updatedCircles[1];

      const distance = Math.sqrt((circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2);
      const sumOfRadii = circle1.radius + circle2.radius;

      if (distance < sumOfRadii) {
        setBackgroundColor('lightcoral'); // Set background color to lightcoral if circles intersect
      } else {
        setBackgroundColor('lightblue'); // Set background color to lightblue if circles do not intersect
      }
    } else {
      setBackgroundColor('white'); // Reset background color to white if there are fewer than 2 circles
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: backgroundColor, // Use the state for background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer', // Show a pointer cursor to indicate clickability
      }}
      onClick={handleClick}
    >
      {/* Show "Click Here" message only if there are no circles */}
      {circles.length === 0 && (
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}
        >
          Click Here
        </div>
      )}

      {/* Render circles */}
      {circles.map((circle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: circle.x - circle.radius,
            top: circle.y - circle.radius,
            width: circle.radius * 2,
            height: circle.radius * 2,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            border: '2px solid blue',
          }}
        />
      ))}
    </div>
  );
};

export default App;