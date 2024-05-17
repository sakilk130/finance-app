export const getPersistData = () => {
  const persistData = localStorage.getItem('persist:root');
  const persistDataParsed = persistData ? JSON.parse(persistData) : '';
  const authData = persistDataParsed ? JSON.parse(persistDataParsed.auth) : '';

  return authData ? authData.token : '';
};

export const removePersistData = () => {
  localStorage.removeItem('persist:root');
};
