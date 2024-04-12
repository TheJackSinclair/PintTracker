// fetch name from lst, which was set upon login



export const fetchUsername = (token: string): any => {
  console.log(token)
  try {
    const base64Url = token.split('.')[1]; // Get the payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe chars with base64 equivalents
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );


    return JSON.parse(jsonPayload).sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const fetchUserToken = () => {
  return localStorage.getItem('pint_token');
};