import React from "react";
import AverageCalculator from "./component/AverageCalculator.tsx";

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AverageCalculator />
        </div>
    );
};

export default App;
