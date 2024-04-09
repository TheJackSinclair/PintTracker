// File for holding common user methods.


// fetch name from lst, which was set upon login
export const fetchUsername = (): string | null => {
  return localStorage.getItem('username');
};