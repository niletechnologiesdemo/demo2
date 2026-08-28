export const INK     = '#040D0A';
export const FOREST  = '#0A211B';
export const FOREST2 = '#123B31';
export const GOLD    = '#A97A31';
export const GOLD2   = '#D2A254';
export const GOLD3   = '#EFD49B';
export const CREAM   = '#FBF9F6';

/* frame ranges at 30fps — one place to retime the whole film */
export const BEAT = {
  logo:    [0,   130],
  tagline: [118, 252],
  phoneIn: [240, 1010],
  s_home:  [396, 578],
  s_lock:  [558, 742],
  s_plans: [722, 844],
  s_code:  [824, 962],
  s_deals: [942, 1012],
  outro:   [988, 1110],
} as const;
