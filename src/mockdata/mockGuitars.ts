import Guitar from '../features/guitars/model/Guitar';

const guitar1: Guitar = {
  category: 'Electric guitars',
  brand: 'Gibson',
  model: 'Gibson ES-335 Semi-hollowbody Electric Guitar - Sixties Cherry',
  description:
    'Semi-hollowbody Electric Guitar with Maple/Poplar Body, Mahogany Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Sixties Cherry',
  color: 'cherry',
  price: 3499,
  inStock: true,
  rating: 5,
  popularity: 8,
  imageFilename: 'Gibson ES-335 Semi-hollowbody Electric Guitar - Sixties Cherry.webp',
};

const guitar2: Guitar = {
  category: 'Electric guitars',
  brand: 'ESP',
  model: 'ESP LTD James Hetfield Signature Snakebyte - Snow White',
  description:
    'Solidbody Electric Guitar with Mahogany Body, Mahogany Neck, Ebony Fingerboard, and 2 Active EMG Humbucking Pickups - Snow White',
  color: 'white',
  price: 1499,
  inStock: false,
  rating: 5,
  popularity: 12,
  imageFilename: 'ESP LTD James Hetfield Signature Snakebyte - Snow White.webp',
};

const guitar3: Guitar = {
  category: 'Acoustic guitars',
  brand: 'Breedlove',
  model: 'Breedlove Oregon Concert CE Acoustic-Electric Guitar - Natural Myrtlewood',
  description:
    '6-string Acoustic-electric Guitar with Myrtlewood Top, Back, and Sides, Maple Neck, Ebony Fingerboard, and LR Baggs Element Electronics - Natural',
  color: 'natural',
  price: 2499,
  inStock: true,
  rating: 5,
  popularity: 2,
  imageFilename: 'Breedlove Oregon Concert CE Acoustic-Electric Guitar - Natural Myrtlewood.webp',
};

const mockGuitars: { [name: string]: Guitar[] } = {
  none: [],

  oneGuitar: [guitar1],

  severalGuitars: [guitar1, guitar2, guitar3],

  manyGuitars: new Array<Guitar>(100).fill(guitar1).map((guitar, index) => {
    return {
      ...guitar,
      model: `${guitar.model} (${index + 1})`,
    };
  }),
};

export default mockGuitars;
