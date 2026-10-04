import { KittenSprite } from '../sprites/characters.jsx';
import { SparkleSprite } from '../sprites/icons.jsx';

const KITTENS = [
  { id: 'orange', gray: false, hat: 'purple', spell: '#b388ff', delay: '0s' },
  { id: 'gray', gray: true, hat: 'blue', spell: '#64b5f6', delay: '-4.5s' },
];
const SPELL_RAYS = [[-14, -10], [14, -10], [-18, 4], [18, 4], [-8, 12], [8, 12]];

// Two kittens padding around inside the compost bin's opening. Tap one and it meows and hops;
// with Magic in the bin they wear wizard hats and cast a sparkle spell instead.
export const CompostKittens = ({ wizard, taps, onTap }) => (
  <div className="absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] overflow-hidden pointer-events-none">
    {KITTENS.map(k => (
      <div key={k.id} className="absolute top-0 left-0 w-7 h-5 animate-kitten-walk" style={{ animationDelay: k.delay }}>
        <button
          type="button"
          aria-label={wizard ? 'Wizard kitten' : 'Kitten'}
          className="relative block w-full h-full p-0 bg-transparent border-0 pointer-events-auto cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onTap(k.id); }}
        >
          <div key={taps[k.id]} className={`w-full h-full ${taps[k.id] ? 'animate-kitten-hop' : ''}`}>
            <div className="w-full h-full animate-kitten-trot"><KittenSprite gray={k.gray} hat={wizard ? k.hat : null} /></div>
          </div>
          {wizard && taps[k.id] > 0 && (
            <div key={`spell-${taps[k.id]}`} className="absolute left-1/2 top-0 pointer-events-none">
              {SPELL_RAYS.map(([tx, ty], i) => (
                <div key={i} className="absolute -left-1.5 -top-1.5 w-3 h-3 animate-kitten-spell" style={{ '--tx': `${tx}px`, '--ty': `${ty}px`, animationDelay: `${i * 0.03}s` }}>
                  <SparkleSprite color={i % 2 ? '#fdd835' : k.spell} />
                </div>
              ))}
            </div>
          )}
        </button>
      </div>
    ))}
  </div>
);
