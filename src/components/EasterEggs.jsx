import { WallaceFollowerSprite } from '../sprites/characters.jsx';

// Konami code: Wallace lowers in from the top of the screen on a string and sways there for a few seconds.
// The string is tied round the hump of his back (26px across, 48px down his 64x80 sprite).
export const WormOnAString = ({ costume }) => (
  <div className="fixed top-0 left-[18%] z-[190] pointer-events-none worm-string-drop" aria-hidden="true">
    <div className="relative worm-string-sway" style={{ paddingTop: 140, transformOrigin: '26px 0' }}>
      <div className="absolute top-0 w-0.5 bg-[#f5f5f5] shadow-sm" style={{ left: 25, height: 140 + 48 }} />
      <div className="relative w-16 h-20"><WallaceFollowerSprite costume={costume} /></div>
      <div className="stardew-credit text-xs whitespace-nowrap -ml-6 mt-1">♪ worm on a string ♪</div>
    </div>
  </div>
);

// A Minecraft-style "Achievement Get!" card that slides in from the top right
export const AchievementToast = ({ icon, title, subtitle }) => {
  const Icon = icon;
  return (
    <div role="status" className="fixed top-4 right-4 z-[210] animate-achievement pointer-events-none flex items-center gap-3 bg-[#212121] border-2 border-[#616161] shadow-[inset_0_0_0_2px_#000] px-3 py-2 rounded-sm" style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>
      <div className="w-9 h-9 bg-[#424242] border border-[#757575] p-1 shrink-0"><Icon /></div>
      <div className="leading-tight">
        <div className="text-[#fdd835] text-xs font-bold">Achievement Get!</div>
        <div className="text-white text-sm">{title}</div>
        {subtitle && <div className="text-[#a5d6a7] text-[11px]">{subtitle}</div>}
      </div>
    </div>
  );
};
