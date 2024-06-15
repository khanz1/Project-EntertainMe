export const fThousandsNumber = (num: number) => {
  // Convert the number to a string
  let numStr = num.toString();

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const fCapitalizeSpace = (str: string) => {
  return str
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const fLowercaseUnderscore = (str: string) => {
  return str.toLowerCase().replace(/ /g, "_");
};

export const fDateTimeGB = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${formattedDate}, ${formattedTime}`;
};
