const getToken = async () => {
  const res = await fetch(`/api/token`);
  return res.json();
};

export default getToken;
