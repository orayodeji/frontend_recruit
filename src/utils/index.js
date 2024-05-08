// export const isNumber = (evt) => {
//   // Regular expression pattern to match digits and '+'
//   var pattern = /^[0-9+]+$/;
//   // Test the input string against the pattern
//   if (pattern.test(evt.key)) {
//     return true;
//   } else {
//     evt.preventDefault();
//   }
// };

export const isOnlyNumber = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};
