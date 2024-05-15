// fetch name from lst, which was set upon login

import {useEffect, useState} from "react";

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
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pint_token');
  } else {return ''}
};

export async function fetchFriendList(token: string): Promise<String[]> {

  if (!token) {
    console.error('No token found, redirecting to login.');
    return [];
  }
    const response = await fetch('/api/friends/friend_list', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  return await response.json();
}

export const useAuth = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchTokenAndUsername = async () => {
      const fetchedToken = await fetchUserToken();
      if (!fetchedToken) {
        window.location.href = '/login';
      } else {
        const usernameFromToken = await fetchUsername(fetchedToken);
        setUsername(usernameFromToken);
        setToken(fetchedToken);
      }
    };

    fetchTokenAndUsername();
  }, []);


  return { token, username };
}

export const useFetchFriendsList = (token: string | null) => {
  const [friends, setFriends] = useState<String[]>([]);

  const fetchFriends = () => {
    if (token) {
      fetchFriendList(token)
          .then(setFriends)
          .catch(console.error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [token]);

  return { friends, fetchFriends }; // Expose fetchFriends for manual triggering
};

export const logout = async () => {
  localStorage.removeItem('pint_token');
  window.location.reload();
}