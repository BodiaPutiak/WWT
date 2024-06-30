export const fetchFiltersData = async () => {
    const response = await fetch('src/temp/filterData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };