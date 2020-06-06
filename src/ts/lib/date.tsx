export const getFormatedDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
};

export const getDate = (year: number, month: number, day: number) => {
  if (isNaN(year) || isNaN(month) || isNaN(day)) return new Date();

  return new Date(year, month - 1, day);
};
