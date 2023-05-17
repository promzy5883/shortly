function SetCookie(name, value, expiryDate) {
  var d = new Date();
  d.setTime(d.getTime() + expiryDate * 24 * 60 * 60 * 1000);
  var expires = "expires" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function DeleteCookie(name) {
  document.cookie = `${name}=; expires=Wed, 15 Mar 2023 14:20:03 GMT; path=/`;
}

export default SetCookie;
