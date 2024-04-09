// File for holding common user


// fetch name from lst, which was set upon login
export const fetchUsername = (): string | null => {
  return localStorage.getItem('username');
};

export const fetchUserToken = (): string | null => {
  return localStorage.getItem('user_token');
};