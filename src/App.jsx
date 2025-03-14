import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [circles, setCircles] = useState([]);

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
        document.body.style.backgroundColor = 'lightcoral';
      } else {
        document.body.style.backgroundColor = 'lightblue';
      }
    } else {
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={handleClick}
    >
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