export interface AnimeItem {
  id: string;
  title: string;
  coverUrl: string;
  custom?: boolean;
}

export interface Tier {
  id: string;
  label: string;
  /** Tailwind-ish accent color in RGB triplet "R G B" form. */
  accentRgb: string;
}

export interface TierListState {
  tiers: Tier[];
  /** Maps anime id -> tier id, or undefined for unranked. */
  placements: Record<string, string | undefined>;
  items: AnimeItem[];
}

export const DEFAULT_TIERS: Tier[] = [
  { id: 'tier-s', label: 'S', accentRgb: '239 68 68' },
  { id: 'tier-a', label: 'A', accentRgb: '249 115 22' },
  { id: 'tier-b', label: 'B', accentRgb: '234 179 8' },
  { id: 'tier-c', label: 'C', accentRgb: '34 197 94' },
  { id: 'tier-d', label: 'D', accentRgb: '20 184 166' },
  { id: 'tier-f', label: 'F', accentRgb: '100 116 139' },
];

const DEFAULT_ANIME: AnimeItem[] = [
  // --- Original 10 ---
  {
    id: 'anime-aot',
    title: 'Attack on Titan',
    coverUrl:
      'https://images.pexels.com/photos/32065665/pexels-photo-32065665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-op',
    title: 'One Piece',
    coverUrl:
      'https://images.pexels.com/photos/29188305/pexels-photo-29188305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-dn',
    title: 'Death Note',
    coverUrl:
      'https://images.pexels.com/photos/36801660/pexels-photo-36801660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-jk',
    title: 'Jujutsu Kaisen',
    coverUrl:
      'https://images.pexels.com/photos/17971943/pexels-photo-17971943.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-ds',
    title: 'Demon Slayer',
    coverUrl:
      'https://images.pexels.com/photos/38480954/pexels-photo-38480954.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-naruto',
    title: 'Naruto',
    coverUrl:
      'https://images.pexels.com/photos/38565628/pexels-photo-38565628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-fma',
    title: 'Fullmetal Alchemist',
    coverUrl:
      'https://images.pexels.com/photos/5870838/pexels-photo-5870838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-hxh',
    title: 'Hunter x Hunter',
    coverUrl:
      'https://images.pexels.com/photos/3348384/pexels-photo-3348384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-cb',
    title: 'Cowboy Bebop',
    coverUrl:
      'https://images.pexels.com/photos/31419072/pexels-photo-31419072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-elfen',
    title: 'Elfen Lied',
    coverUrl:
      'https://images.pexels.com/photos/35645030/pexels-photo-35645030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  // --- 30 new additions ---
  {
    id: 'anime-yourname',
    title: 'Your Name',
    coverUrl:
      'https://images.pexels.com/photos/16154051/pexels-photo-16154051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-tokyoghoul',
    title: 'Tokyo Ghoul',
    coverUrl:
      'https://images.pexels.com/photos/31002084/pexels-photo-31002084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-akira',
    title: 'Akira',
    coverUrl:
      'https://images.pexels.com/photos/5845255/pexels-photo-5845255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-ghostshell',
    title: 'Ghost in the Shell',
    coverUrl:
      'https://images.pexels.com/photos/31729749/pexels-photo-31729749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-steinsgate',
    title: 'Steins;Gate',
    coverUrl:
      'https://images.pexels.com/photos/23522893/pexels-photo-23522893.png?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-evangelion',
    title: 'Neon Genesis Evangelion',
    coverUrl:
      'https://images.pexels.com/photos/35496726/pexels-photo-35496726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-space-dandy',
    title: 'Space Dandy',
    coverUrl:
      'https://images.pexels.com/photos/16566110/pexels-photo-16566110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-mushishi',
    title: 'Mushishi',
    coverUrl:
      'https://images.pexels.com/photos/15328418/pexels-photo-15328418.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-vinland',
    title: 'Vinland Saga',
    coverUrl:
      'https://images.pexels.com/photos/6072918/pexels-photo-6072918.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-mha',
    title: 'My Hero Academia',
    coverUrl:
      'https://images.pexels.com/photos/37942073/pexels-photo-37942073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-onepunch',
    title: 'One Punch Man',
    coverUrl:
      'https://images.pexels.com/photos/29058680/pexels-photo-29058680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-aot-s2',
    title: 'Made in Abyss',
    coverUrl:
      'https://images.pexels.com/photos/22031804/pexels-photo-22031804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-erased',
    title: 'Erased',
    coverUrl:
      'https://images.pexels.com/photos/36237461/pexels-photo-36237461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-bleach',
    title: 'Bleach',
    coverUrl:
      'https://images.pexels.com/photos/36209451/pexels-photo-36209451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-fireforce',
    title: 'Fire Force',
    coverUrl:
      'https://images.pexels.com/photos/35836681/pexels-photo-35836681.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-drstone',
    title: 'Dr. Stone',
    coverUrl:
      'https://images.pexels.com/photos/37946190/pexels-photo-37946190.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-magia',
    title: 'Puella Magi Madoka Magica',
    coverUrl:
      'https://images.pexels.com/photos/11377054/pexels-photo-11377054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-castle',
    title: 'Castle in the Sky',
    coverUrl:
      'https://images.pexels.com/photos/5489194/pexels-photo-5489194.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-nichijou',
    title: 'Nichijou',
    coverUrl:
      'https://images.pexels.com/photos/28713186/pexels-photo-28713186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-wolfsrain',
    title: "Wolf's Rain",
    coverUrl:
      'https://images.pexels.com/photos/10194246/pexels-photo-10194246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-trigun',
    title: 'Trigun',
    coverUrl:
      'https://images.pexels.com/photos/35069882/pexels-photo-35069882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-blackclover',
    title: 'Black Clover',
    coverUrl:
      'https://images.pexels.com/photos/31585091/pexels-photo-31585091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-berserk',
    title: 'Berserk',
    coverUrl:
      'https://images.pexels.com/photos/17404101/pexels-photo-17404101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-claymore',
    title: 'Claymore',
    coverUrl:
      'https://images.pexels.com/photos/17404084/pexels-photo-17404084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-hxh2',
    title: 'Hellsing Ultimate',
    coverUrl:
      'https://images.pexels.com/photos/27245761/pexels-photo-27245761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-spirited',
    title: 'Spirited Away',
    coverUrl:
      'https://images.pexels.com/photos/37745668/pexels-photo-37745668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-mononoke',
    title: 'Princess Mononoke',
    coverUrl:
      'https://images.pexels.com/photos/16945384/pexels-photo-16945384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-garden',
    title: 'Garden of Words',
    coverUrl:
      'https://images.pexels.com/photos/14216414/pexels-photo-14216414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-rainbow',
    title: 'A Silent Voice',
    coverUrl:
      'https://images.pexels.com/photos/21316338/pexels-photo-21316338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-children',
    title: 'Children of the Whales',
    coverUrl:
      'https://images.pexels.com/photos/15551921/pexels-photo-15551921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-vega',
    title: 'Vivy: Fluorite Eye',
    coverUrl:
      'https://images.pexels.com/photos/11742049/pexels-photo-11742049.png?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-stars',
    title: 'To Your Eternity',
    coverUrl:
      'https://images.pexels.com/photos/35812173/pexels-photo-35812173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-skyline',
    title: 'Terror in Resonance',
    coverUrl:
      'https://images.pexels.com/photos/15960099/pexels-photo-15960099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-purple',
    title: 'Psycho-Pass',
    coverUrl:
      'https://images.pexels.com/photos/3689254/pexels-photo-3689254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-ruins',
    title: 'The Girl Who Leapt Through Time',
    coverUrl:
      'https://images.pexels.com/photos/10061869/pexels-photo-10061869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-overgrown',
    title: 'Houseki no Kuni',
    coverUrl:
      'https://images.pexels.com/photos/34164600/pexels-photo-34164600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-ruin',
    title: 'Seraph of the End',
    coverUrl:
      'https://images.pexels.com/photos/28251977/pexels-photo-28251977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-flowers',
    title: 'March Comes in Like a Lion',
    coverUrl:
      'https://images.pexels.com/photos/38111975/pexels-photo-38111975.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-purple-flowers',
    title: 'Violet Evergarden',
    coverUrl:
      'https://images.pexels.com/photos/27864870/pexels-photo-27864870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-cosmos',
    title: 'Land of the Lustrous',
    coverUrl:
      'https://images.pexels.com/photos/37042007/pexels-photo-37042007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-lightning',
    title: 'Cyberpunk: Edgerunners',
    coverUrl:
      'https://images.pexels.com/photos/9751579/pexels-photo-9751579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-storm',
    title: 'Weathering with You',
    coverUrl:
      'https://images.pexels.com/photos/12323327/pexels-photo-12323327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-bolt',
    title: 'Howl\'s Moving Castle',
    coverUrl:
      'https://images.pexels.com/photos/6611383/pexels-photo-6611383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-balloon',
    title: 'The Wind Rises',
    coverUrl:
      'https://images.pexels.com/photos/26497924/pexels-photo-26497924.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-sky-balloon',
    title: 'Kiki\'s Delivery Service',
    coverUrl:
      'https://images.pexels.com/photos/9811860/pexels-photo-9811860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-lighthouse',
    title: 'Tatami Galaxy',
    coverUrl:
      'https://images.pexels.com/photos/38312419/pexels-photo-38312419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-storm-coast',
    title: 'Ergo Proxy',
    coverUrl:
      'https://images.pexels.com/photos/20991675/pexels-photo-20991675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'anime-dusk',
    title: 'Welcome to the N.H.K.',
    coverUrl:
      'https://images.pexels.com/photos/20414058/pexels-photo-20414058.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const DEFAULT_STATE: TierListState = {
  tiers: DEFAULT_TIERS,
  placements: {},
  items: DEFAULT_ANIME,
};

export const STORAGE_KEY = 'anime-tier-list-v2';
