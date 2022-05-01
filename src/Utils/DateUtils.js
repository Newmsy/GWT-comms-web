import Parse from "date-fns/parseISO";

export const FormatDateString = (date) => {
  const parsedDate = date instanceof Date ? date : new Date(Date.parse(date));
  const day = Intl.DateTimeFormat("en", { day: "2-digit" }).format(parsedDate);
  const month = Intl.DateTimeFormat("en", { month: "short" }).format(
    parsedDate
  );
  const year = Intl.DateTimeFormat("en", { year: "numeric" }).format(
    parsedDate
  );
  return `${day} ${month} ${year}`;
};

export const filterByDay = (date, items) => {
  const dayStart = date.setHours(0, 0, 0, 0);
  const dayEnd = date.setHours(23, 59, 59);

  console.log(date.setHours(1, 0, 0, 0));
  console.log(dayStart);
  console.log(dayEnd);
  return items.filter(
    (e) =>
      new Date(e.date) < new Date(dayEnd) &&
      new Date(e.date) > new Date(dayStart)
  );
};

export const ParseApiDateString = (input) => {
  if (!input) return undefined;
  const utcInput = input.endsWith("Z") ? input : input + "Z";
  return Parse(utcInput);
};

export const GetApiDateString = (input, setHours = true) => {
  const date = input instanceof Date ? input : ParseApiDateString(input);
  if (!date) return "";
  if (setHours)
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  return date.toISOString();
};
