
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getCompanies = async () => {
    return await fetch(API_BASE_URL+"/company").then(res => res.json()).then(({status, data, message}) => {
        if (status !== "success") {
            throw new Error(message || "Unknown Error");
        }
        return data;
    });
}