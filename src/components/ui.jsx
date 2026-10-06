import { BASE } from '../data/assets.js';
import { useSpaceKey } from '../hooks/useSpaceKey.js';

export const PixelBox = ({ children, className = "" }) => (
  <div className={`bg-[#f4e2b8] border-4 border-[#8b5a2b] shadow-[inset_0_0_0_4px_#a0522d] p-4 font-mono text-[#3e2723] ${className}`}>
    {children}
  </div>
);

export const DialogBox = ({ name, portrait, text, onNext, hideNext, emotion = 'normal', bottomClass = 'bottom-4' }) => {
  // Space works like clicking ▼
  useSpaceKey(onNext, Boolean(onNext) && !hideNext);

  let imgSrc = `${BASE}/wallace.png`;
  let fbSrc = `${BASE}/wallace.png`;

  if (emotion === 'sad' || emotion === 'angry') {
    imgSrc = `${BASE}/sad.png`;
    fbSrc = `${BASE}/sad.png`;
  } else if (emotion === 'surprised') {
    imgSrc = `${BASE}/surprised.png`;
    fbSrc = `${BASE}/surprised.png`;
  }

  return (
    <div className={`fixed ${bottomClass} left-1/2 -translate-x-1/2 w-full max-w-3xl px-2 md:px-4 z-50 pointer-events-auto animate-fade-in-up`}>
      <PixelBox className="flex gap-4 items-start relative shadow-2xl bg-[rgba(244,226,184,0.85)]">
        {(portrait || name === 'Wallace') && (
          <div className="flex flex-col items-center shrink-0">
            <div className="w-20 h-20 bg-[#d7ccc8] border-4 border-[#5d4037] flex items-center justify-center text-4xl overflow-hidden relative">
              {name === 'Wallace' ? (
                <>
                  <img src={imgSrc} alt={`Wallace ${emotion}`} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = fbSrc; }} />
                  {emotion === 'angry' && <div className="absolute top-1 right-1 text-2xl animate-bounce drop-shadow-md">💢</div>}
                </>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${name === 'You' || name === 'Instructor' ? '' : 'p-2'}`}>{portrait}</div>
              )}
            </div>
            {name && <span className="text-xs font-bold text-[#5d4037] mt-1">{name}</span>}
          </div>
        )}
        <div className="flex-1 pr-10">
          {name && !(portrait || name === 'Wallace') && <h3 className="font-bold text-xl mb-1 text-[#5d4037]">{name}</h3>}
          <p className="text-sm md:text-base leading-relaxed break-words">{text}</p>
        </div>
        {!hideNext && (
          <button 
            onClick={onNext}
            title="Next (Space)"
            aria-label="Next"
            className="absolute bottom-2 right-2 animate-bounce text-xl bg-[#8b5a2b] text-white px-3 py-1 rounded hover:bg-[#5d4037]"
          >
            ▼
          </button>
        )}
      </PixelBox>
    </div>
  );
};
