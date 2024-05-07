export const isNumber = (evt) => {
  // Regular expression pattern to match digits and '+'
  var pattern = /^[0-9+]+$/;
  // Test the input string against the pattern
  if (pattern.test(evt.key)) {
    return true;
  } else {
    evt.preventDefault();
  }
};
