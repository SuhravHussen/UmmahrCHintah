const getTotalCounts = async () => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/dashboard/counts`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return {
      totalBlogs: 0,
      totalAuthors: 0,
    };
  }
};

export default getTotalCounts;
