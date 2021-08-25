const genresIDs = selectedGenres => {
  if (selectedGenres.length < 1) return "";
  const genresId = selectedGenres?.map(genre => genre?.id);
  return genresId?.reduce((acc, curr) => acc + "," + curr);
};

export default genresIDs;
