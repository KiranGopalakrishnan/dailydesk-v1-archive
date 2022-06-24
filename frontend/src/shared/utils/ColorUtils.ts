import { colors } from '@ui-kit/Theme';

const calculateNumberForString = (value: string): number => {
  return value
    .toLowerCase()
    .split('')
    .map((s) => s.charCodeAt(0) - 0x60)
    .filter((n) => 1 <= n && n <= 26)
    .reduce((x, y) => x + y, 0);
};

export const getRandomThemeColor = (name: string) => {
  const values = [
    colors.MIDNIGHT_5,
    colors.ALMOST_DARK_1,
    colors.BLUE_3,
    colors.RED_4,
    colors.YELLOW_5,
    colors.VISUALIZATION_1,
    colors.VISUALIZATION_3,
    colors.VISUALIZATION_9,
  ];
  const indexWithinLimit = calculateNumberForString(name) % values.length;
  return values[indexWithinLimit];
};
