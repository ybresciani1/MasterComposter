import React from 'react';
import { CrowSprite } from '../sprites/animals.jsx';

export const CrowOverlay = ({ crow }) => {
  const [pos, setPos] = React.useState({ left: window.innerWidth + 50, top: crow.targetY });
  const [transition, setTransition] = React.useState('none');
  const [hasHeart, setHasHeart] = React.useState(false);

  React.useEffect(() => {
    // Next frame: trigger approach transition toward the heart
    const approachFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition('left 1.4s cubic-bezier(0.25,0.1,0.25,1), top 1.0s cubic-bezier(0.25,0.1,0.25,1)');
        setPos({ left: crow.targetX, top: crow.targetY });
      });
    });

    // After arriving, grab the heart and escape left
    const escapeTimer = setTimeout(() => {
      setHasHeart(true);
      setTransition('left 1.6s cubic-bezier(0.4,0,0.6,1), top 1.2s ease-in');
      setPos({ left: -150, top: crow.targetY - 60 });
    }, 1700);

    return () => {
      cancelAnimationFrame(approachFrame);
      clearTimeout(escapeTimer);
    };
  }, []);

  return (
    <div className="fixed z-[300] pointer-events-none drop-shadow-2xl"
         style={{ width: '80px', height: '80px', left: pos.left, top: pos.top, transition }}>
      <div className="relative w-full h-full">
        <CrowSprite hasHeart={hasHeart} />
      </div>
    </div>
  );
};
