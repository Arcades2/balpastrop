export function calculateCardRotation(idx: number, total: number) {
  const isEven = total % 2 === 0;

  const half = total / 2;

  const distance = (() => {
    if (isEven && idx - half >= 0) {
      return idx - half + 1;
    }

    return Math.round(idx - half);
  })();

  const rotation = distance * 3;

  const translate = Math.abs(distance) ** 2 * 3;

  return {
    rotation,
    translate,
  };
}
