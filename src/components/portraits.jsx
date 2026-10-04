import { useState } from 'react';
import { BASE } from '../data/assets.js';

export const InstructorPortrait = () => (
  <img src={`${BASE}/Teacher new puppet 300.png`} alt="Instructor" className="w-full h-full object-cover" />
);

export const StudentPortrait = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const urls = [
    `${BASE}/farmgirl pupper 300.png`,
    `${BASE}/hero.png`
  ];
  
  return (
    <img 
      src={urls[imgIdx]} 
      alt="Student" 
      className="w-full h-full object-cover" 
      onError={() => { if(imgIdx < urls.length - 1) setImgIdx(imgIdx + 1); }} 
    />
  );
};
