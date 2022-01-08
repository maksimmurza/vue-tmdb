export default (s: string): string => {
  return s[0].toUpperCase() + s.replaceAll('-', ' ').slice(1);
};
