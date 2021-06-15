export function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const tokenData = JSON.parse(window.atob(base64));
  return tokenData.userId;
}
