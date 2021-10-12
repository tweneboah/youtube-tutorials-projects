const dateFormatter = date => {
  let d = new Date(date);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
};

export default dateFormatter;
