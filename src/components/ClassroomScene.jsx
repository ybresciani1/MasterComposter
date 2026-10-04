import { InstructorSprite, StudentBlondeSprite, StudentBrownHairSprite, StudentPonytailSprite, SeatedFarmerSprite } from '../sprites/characters.jsx';
import { ClassDeskSprite, ClassroomBackdropSprite } from '../sprites/scenery.jsx';

// The classroom is drawn on a 242x167 "bit" grid; this places a sprite on that grid so the whole scene scales together.
const classroomSpot = (x, y, w, h) => ({ left: `${x / 2.42}%`, top: `${y / 1.67}%`, width: `${w / 2.42}%`, height: `${h / 1.67}%` });

export const ClassroomScene = ({ farmerEyes = 'open', farmerJolts = false, instructorAngry = false }) => (
  <div className="w-full max-w-[372px] md:max-w-[500px] border-8 border-[#5d4037] shadow-2xl mb-4 md:mb-24">
    <div className="aspect-[242/167] bg-[#d7ccc8] relative overflow-hidden">
      <div className="absolute inset-0"><ClassroomBackdropSprite /></div>
      <div className="absolute" style={classroomSpot(37, 53, 48, 52)}>
        <InstructorSprite />
        {instructorAngry && <div className="absolute -top-[10%] left-[42%] text-2xl animate-bounce text-red-500 font-bold">💢</div>}
      </div>
      <div className="absolute" style={classroomSpot(152, 118, 40, 18)}><ClassDeskSprite paper="#fbcfe8" /></div>
      <div className="absolute" style={classroomSpot(152, 96, 40, 26)}><StudentPonytailSprite /></div>
      <div className="absolute" style={classroomSpot(10, 136, 40, 18)}><ClassDeskSprite /></div>
      <div className="absolute" style={classroomSpot(10, 114, 40, 26)}><StudentBlondeSprite /></div>
      <div className="absolute" style={classroomSpot(192, 136, 40, 18)}><ClassDeskSprite paper="#fdd835" /></div>
      <div className="absolute" style={classroomSpot(192, 114, 40, 26)}><StudentBrownHairSprite /></div>
      <div className={`absolute ${farmerJolts ? 'animate-[bounce_0.5s_ease-out_2]' : ''}`} style={classroomSpot(101, 114, 40, 38)}>
        <SeatedFarmerSprite eyes={farmerEyes} />
        {farmerJolts && <div key="alert-bubble" className="absolute -top-4 right-0 text-xl animate-pulse text-red-600 font-bold">❗</div>}
      </div>
      <div className="absolute" style={classroomSpot(101, 140, 40, 18)}><ClassDeskSprite /></div>
    </div>
  </div>
);
