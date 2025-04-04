import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchNumbers = async (type: string): Promise<number[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/${type}`, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error);
        return [];
    }
};
