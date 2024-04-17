// fetch name from lst, which was set upon login

export interface Pint {
  name: string;
  full_name: string;
  abv: number;   // Assuming abv is a floating-point number
  style: string;
}

export interface Account {
  username: string;
  password: string;  // Normally you wouldn't store passwords on client-side objects for security reasons.
  member_since: string;
  added: string[];
  added_you: string[];
  pint_history: { [timestamp: string]: Pint };
}

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

export async function fetchFriendList(token: string): Promise<String[]> {

  if (!token) {
    console.error('No token found, redirecting to login.');
    // Perform a redirect to login or handle lack of token appropriately
    return [];
  }
    const response = await fetch('/api/friends/friend_list', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Cast the json response to Friend[]
    const data = await response.json();
    return data;
}