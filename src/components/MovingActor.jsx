import { useEffect, useState } from 'react';

// A character in the play field that moves without re-rendering the whole game:
// the game loop calls apiRef.current(newPos) every frame and only this component updates.
export const MovingActor = ({ apiRef, start, className, children }) => {
  const [pos, setPos] = useState(start);
  useEffect(() => {
    apiRef.current = setPos;
    return () => { apiRef.current = null; };
  }, [apiRef]);
  return (
    <div className={className} style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, willChange: 'transform' }}>
      {children(pos)}
    </div>
  );
};
