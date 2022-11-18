const checkAuthAccount = (
  authUrl: string,
  notAuthUrl: string,
  auth: boolean | null,
  navigate: any
) => {
  if (!auth) {
    navigate(notAuthUrl);
    return;
  }
  navigate(authUrl);
};

export { checkAuthAccount };
