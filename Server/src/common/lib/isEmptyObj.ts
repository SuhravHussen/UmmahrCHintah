function isEmptyObj(value) {
  // Check if the value is an object and not null
  if (typeof value === 'object' && value !== null) {
    // Check if it's an empty object
    return Object.keys(value).length === 0;
  }
  // Return false if it's not an object
  return false;
}
export default isEmptyObj;
