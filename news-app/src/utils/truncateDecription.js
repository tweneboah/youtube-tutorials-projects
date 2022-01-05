function truncateDescription(description) {
  if (description?.length > 100) {
    return description?.substring(0, 100) + "...";
  } else {
    return description;
  }
}

export default truncateDescription;
