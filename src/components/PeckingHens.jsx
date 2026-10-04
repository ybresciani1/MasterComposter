import { PolishHenSprite } from '../sprites/animals.jsx';
import { PixelHeartSprite } from '../sprites/critters.jsx';

// Riot and Beyonce pottering back and forth near the compost, pecking at scraps.
// Tap them, or stand next to one and press Space, for a cluck and a heart (App finds them via data-hen).
export const PeckingHens = ({ x, y, span = 90, hearts, onHenClick }) => (
  <div className="absolute z-[6] pointer-events-none" style={{ transform: `translate(${x}px, ${y}px)` }}>
    {[['Riot', 0, '0s', '13s'], ['Beyonce', 16, '-6s', '16s']].map(([name, top, delay, duration]) => (
      <div key={name} className="absolute left-0 hen-wander" style={{ top, '--hen-span': `${span}px`, animationDelay: delay, animationDuration: duration }}>
        <div data-hen={name} className="relative w-8 h-8 pointer-events-auto cursor-pointer" onClick={(e) => onHenClick(e, name)}>
          {hearts.filter(h => h.hen === name).map(h => (
            <div key={h.id} className="absolute -top-5 left-1.5 w-5 h-4 animate-float-up pointer-events-none"><PixelHeartSprite /></div>
          ))}
          <div className="w-full h-full hen-peck" style={{ animationDelay: delay }}><PolishHenSprite name={name} /></div>
        </div>
      </div>
    ))}
  </div>
);
