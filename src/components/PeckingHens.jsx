import { PolishHenSprite } from '../sprites/animals.jsx';
import { PixelHeartSprite } from '../sprites/critters.jsx';
import { SparkleSprite } from '../sprites/icons.jsx';

// Riot and Beyonce pottering back and forth near the compost, pecking at scraps.
// Tap them, or stand next to one and press Space, for a cluck and a heart (App finds them via data-hen).
// `flipping` makes both toss their crests in sync (the 10-cluck easter egg).
export const PeckingHens = ({ x, y, span = 90, hearts, onHenClick, flipping = false }) => (
  <div className="absolute z-[6] pointer-events-none" style={{ transform: `translate(${x}px, ${y}px)` }}>
    {[['Riot', 0, '0s', '13s'], ['Beyonce', 16, '-6s', '16s']].map(([name, top, delay, duration]) => (
      <div key={name} className="absolute left-0 hen-wander" style={{ top, '--hen-span': `${span}px`, animationDelay: delay, animationDuration: duration }}>
        <div data-hen={name} className="relative w-8 h-8 pointer-events-auto cursor-pointer" onClick={(e) => onHenClick(e, name)}>
          {hearts.filter(h => h.hen === name).map(h => (
            <div key={h.id} className="absolute -top-5 left-1.5 w-5 h-4 animate-float-up pointer-events-none"><PixelHeartSprite /></div>
          ))}
          {flipping && <HenSparkles />}
          <div className="w-full h-full hen-peck" style={{ animationDelay: delay }}><PolishHenSprite name={name} flipping={flipping} /></div>
        </div>
      </div>
    ))}
  </div>
);

export const HenSparkles = () => (
  <>
    <div className="absolute -top-2 -left-2 w-3 h-3 animate-sparkle pointer-events-none"><SparkleSprite /></div>
    <div className="absolute -top-3 right-0 w-2.5 h-2.5 animate-sparkle pointer-events-none" style={{ animationDelay: '0.3s' }}><SparkleSprite color="#f48fb1" /></div>
    <div className="absolute top-2 -right-2 w-2 h-2 animate-sparkle pointer-events-none" style={{ animationDelay: '0.6s' }}><SparkleSprite /></div>
  </>
);
