import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Environment } from "@react-three/drei";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="w-screen h-screen">
            <Canvas className="w-screen h-screen">
                
            </Canvas>
        </div>
    );
}

export default App;
