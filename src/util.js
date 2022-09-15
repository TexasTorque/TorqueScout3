export const pad = (num, size) => {
  let n = "" + num;
  if (n < 0) size--;
  for (let i = n.length; i < size; i++) n = "0" + n;
  return n;
};
