// File for holding common user methods


// fetch name from lst, which was set upon login
export const fetchUsername = (dummy=false): string | null => {
  if (dummy) {
    return 'declan1'
  } else {
    return localStorage.getItem('username');
  }
};

export const fetchUserToken = (): string | null => {
  return localStorage.getItem('user_token');
};