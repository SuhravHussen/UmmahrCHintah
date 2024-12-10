const getArticleCountsPerMonth = async (date = new Date()) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/dashboard/blogs-per-date?date=${date}`
    );

    const res = await response.json();

    return res.data && res.data.length > 0
      ? res.data
      : [{ date: new Date(), weight: 0 }];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [{ date: new Date(), weight: 0 }];
  }
};

export default getArticleCountsPerMonth;
