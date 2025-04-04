import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numberWindow = [];

app.use(cors());
app.use(express.json());
  
const API_URLS = {
    p: "http://20.244.56.144/evaluation-service/primes",
    f: "http://20.244.56.144/evaluation-service/fibo",
    e: "http://20.244.56.144/evaluation-service/even",
    r: "http://20.244.56.144/evaluation-service/rand"
};


const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(API_URLS[type], { timeout: 500 });
        console.log("api calling",response.data)
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching numbers for ${type}:`, error.message);
        return [];
    }
};

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    return parseFloat((numbers.reduce((sum, num) => sum + num, 0) / numbers.length).toFixed(2));
};

app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;

    if (!API_URLS[numberid]) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const prevState = [...numberWindow];
    const fetchedNumbers = await fetchNumbers(numberid);
    console.log("fet",fetchedNumbers)
    fetchedNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            numberWindow.push(num);
            if (numberWindow.length > WINDOW_SIZE) {
                numberWindow.shift();
            }
        }
    });

    res.json({
        windowPrevState: prevState,
        windowCurrState: [...numberWindow],
        numbers: fetchedNumbers,
        avg: calculateAverage(numberWindow)
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


