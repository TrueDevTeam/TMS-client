export const generateAbbr = (name) => {
  let abbr = '';
  const splitTitle = name.split(' ');
  if (splitTitle.length > 0) {
    abbr = splitTitle.length < 2
        ? splitTitle[0][0]
        : splitTitle[0][0] + splitTitle[1][0];
  }
  return abbr;
};
