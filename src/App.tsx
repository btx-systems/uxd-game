import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight 
                position={[10, 10, 5]} 
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            
            {/* Base platforms */}
            {/* Outer gray platform */}
            <mesh position={[0, -1.5, 0]} receiveShadow>
                <boxGeometry args={[12, 0.2, 12]} />
                <meshLambertMaterial color="#a0a0a0" />
            </mesh>
            
            {/* Inner white/light gray platform */}
            <mesh position={[0, -1.3, 0]} receiveShadow>
                <boxGeometry args={[8, 0.2, 8]} />
                <meshLambertMaterial color="#e8e8e8" />
            </mesh>
            
            {/* Dark blocks arranged in cross pattern */}
            {/* Center block */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            
            {/* Top arm of cross */}
            <mesh position={[0, 0, -2]} castShadow>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            <mesh position={[0, 0, -3.5]} castShadow>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            
            {/* Bottom arm of cross */}
            <mesh position={[0, 0, 2]} castShadow>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            <mesh position={[0, 0, 3.5]} castShadow>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            
            {/* Left arm of cross */}
            <mesh position={[-2, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            <mesh position={[-3.5, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            
            {/* Right arm of cross */}
            <mesh position={[2, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            <mesh position={[3.5, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshLambertMaterial color="#404040" />
            </mesh>
            
            <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </>
    );
}

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="w-screen h-screen bg-gray-300">
            <Canvas 
                className="w-screen h-screen"
                shadows
                camera={{
                    position: [8, 8, 8],
                    fov: 50,
                }}
                onCreated={({ camera }) => {
                    // Set up isometric-like view
                    camera.lookAt(0, 0, 0);
                }}
            >
                <Scene />
                <Environment preset="studio" />
            </Canvas>
        </div>
    );
}

export default App;
