const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getCompanies = async () => {
  return await fetch(API_BASE_URL + "/company")
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};

export const getCompanyStockTypes = async (companyId: number) => {
  return await fetch(`${API_BASE_URL}/company/${companyId}/stockTypes`)
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};

export const getCompanyStockMarkets = async (
  companyId: number,
  stockTypeId: number
) => {
  return await fetch(
    `${API_BASE_URL}/company/${companyId}/stockType/${stockTypeId}/markets`
  )
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};

export const getHighestMarketPrices = async (limit = 5) => {
  return await fetch(`${API_BASE_URL}/stockprice/highest?limit=${limit}`)
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};

export const getExchanges = async () => {
  return await fetch(`${API_BASE_URL}/exchange`)
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};

export const getExchangePrices = async (exchangeId: number) => {
  return await fetch(`${API_BASE_URL}/exchange/${exchangeId}/prices`)
    .then((res) => res.json())
    .then(({ status, data, message }) => {
      if (status !== "success") {
        throw new Error(message || "Unknown Error");
      }
      return data;
    });
};
