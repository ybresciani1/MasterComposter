import { PumpkinSprite, PresentSprite } from '../sprites/props.jsx';
import { MarigoldSprite } from '../sprites/plants.jsx';

// Real-world dates that dress up the game: a title banner, a Wallace costume (see WallaceFollowerSprite) and,
// for some, a `decor` sprite that sits on the compost piles and beside the title characters.
// Add ?holiday=<key> to the URL to preview one.
export const HOLIDAYS = {
  halloween: { banner: 'Happy Halloween!', decor: PumpkinSprite },
  muertos: { banner: '¡Feliz Día de los Muertos!', decor: MarigoldSprite },
  christmas: { banner: 'Merry Christmas!', decor: PresentSprite },
  earthday: { banner: 'Happy Earth Day!' },
  compostweek: { banner: 'Happy Compost Awareness Week!' },
};

export const getHoliday = (date = new Date()) => {
  try {
    const forced = new URLSearchParams(window.location.search).get('holiday');
    if (forced && HOLIDAYS[forced]) return forced;
  } catch { /* no URL to read */ }

  const month = date.getMonth(), day = date.getDate();
  if (month === 9) return 'halloween'; // all of October
  if (month === 10 && day <= 14) return 'muertos'; // the first two weeks of November
  if (month === 11 && (day === 24 || day === 25)) return 'christmas';
  if (month === 3 && day === 22) return 'earthday';
  // International Compost Awareness Week runs Sunday to Saturday, starting on the first Sunday in May
  if (month === 4) {
    const firstSunday = 1 + (7 - new Date(date.getFullYear(), 4, 1).getDay()) % 7;
    if (day >= firstSunday && day < firstSunday + 7) return 'compostweek';
  }
  return null;
};
