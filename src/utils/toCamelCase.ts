export default (s: string): string => {
  return s.replace(/-./g, x => x[1].toUpperCase());
};
