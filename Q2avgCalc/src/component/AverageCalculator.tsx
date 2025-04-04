import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:9876/numbers";

const AverageCalculator = () => {
    const [numberType, setNumberType] = useState("e");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchNumbers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${API_BASE_URL}/${numberType}`);
            setData(response.data);
        } catch (err) {
            setError("Failed to fetch numbers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                    Average Calculator
                </h2>

                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3">
                        <label className="text-lg font-semibold text-gray-600">Select Type:</label>
                        <select
                            value={numberType}
                            onChange={(e) => setNumberType(e.target.value)}
                            className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="p">Prime</option>
                            <option value="f">Fibonacci</option>
                            <option value="e">Even</option>
                            <option value="r">Random</option>
                        </select>
                    </div>

                    <button
                        onClick={fetchNumbers}
                        disabled={loading}
                        className={`w-full text-white font-semibold py-2 rounded-lg transition ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Fetching..." : "Fetch Numbers"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 mt-4 text-center font-semibold">
                        {error}
                    </p>
                )}

                {data && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold text-gray-700">Results</h3>
                        <div className="text-gray-600 space-y-2">
                            <p>
                                <strong>Previous Window:</strong>{" "}
                                <span className="text-blue-500">{JSON.stringify(data.windowPrevState)}</span>
                            </p>
                            <p>
                                <strong>Current Window:</strong>{" "}
                                <span className="text-green-500">{JSON.stringify(data.windowCurrState)}</span>
                            </p>
                            <p>
                                <strong>Fetched Numbers:</strong>{" "}
                                <span className="text-purple-500">{JSON.stringify(data.numbers)}</span>
                            </p>
                            <p className="text-xl font-bold text-black">
                                <strong>Average:</strong> {data.avg.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AverageCalculator;
