import React, { useMemo } from "react";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Pit({ size = 10, depth = 1, outerSize = 100 }) {
    const wallColor = "#eee";
    const floorColor = "#fafafa";

    // width of each strip = (outerSize – pitSize)/2
    const strip = (outerSize - size) / 2;

    // define the 8 outer‐ground pieces
    const outerPieces = useMemo(
        () => [
            // bottom centre
            {
                args: [size, strip],
                pos: [0, 0, -(size / 2 + strip / 2)],
            },
            // top centre
            {
                args: [size, strip],
                pos: [0, 0, size / 2 + strip / 2],
            },
            // left centre
            {
                args: [strip, size],
                pos: [-(size / 2 + strip / 2), 0, 0],
            },
            // right centre
            {
                args: [strip, size],
                pos: [size / 2 + strip / 2, 0, 0],
            },
            // bottom-left
            {
                args: [strip, strip],
                pos: [-(size / 2 + strip / 2), 0, -(size / 2 + strip / 2)],
            },
            // top-left
            {
                args: [strip, strip],
                pos: [-(size / 2 + strip / 2), 0, size / 2 + strip / 2],
            },
            // bottom-right
            {
                args: [strip, strip],
                pos: [size / 2 + strip / 2, 0, -(size / 2 + strip / 2)],
            },
            // top-right
            {
                args: [strip, strip],
                pos: [size / 2 + strip / 2, 0, size / 2 + strip / 2],
            },
        ],
        [size, strip],
    );

    return (
        <group>
            {/* 8 outer ground planes */}
            {outerPieces.map((p, i) => (
                <mesh
                    key={i}
                    position={p.pos}
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                >
                    <planeGeometry args={p.args} />
                    <meshStandardMaterial color={wallColor} />
                </mesh>
            ))}

            {/* interior white floor lowered by “depth” */}
            <mesh
                position={[0, -depth, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[size, size]} />
                <meshStandardMaterial color={floorColor} />
            </mesh>

            {/* 4 vertical walls around the pit */}
            {[
                { rotY: 0, pos: [0, -depth / 2, size / 2] },
                { rotY: Math.PI, pos: [0, -depth / 2, -size / 2] },
                { rotY: -Math.PI / 2, pos: [-size / 2, -depth / 2, 0] },
                { rotY: Math.PI / 2, pos: [size / 2, -depth / 2, 0] },
            ].map((w, i) => (
                <mesh
                    key={i}
                    position={w.pos}
                    rotation={[0, w.rotY, 0]}
                    castShadow
                    receiveShadow
                >
                    <planeGeometry args={[size, depth]} />
                    <meshStandardMaterial color={wallColor} />
                </mesh>
            ))}
        </group>
    );
}

function Cubes({ count = 3, spacing = 1.2, cubeSize = 1, pitDepth = 1 }) {
    const offset = (count - 1) / 2;
    return (
        <group>
            {Array.from({ length: count }).flatMap((_, ix) =>
                Array.from({ length: count }).map((__, iz) => {
                    const x = (ix - offset) * spacing;
                    const z = (iz - offset) * spacing;
                    const y = -pitDepth + cubeSize / 2;
                    return (
                        <mesh
                            key={`${ix}-${iz}`}
                            position={[x, y, z]}
                            castShadow
                            receiveShadow
                        >
                            <boxGeometry
                                args={[cubeSize, cubeSize, cubeSize]}
                            />
                            <meshStandardMaterial
                                color="#111"
                                roughness={0.5}
                            />
                        </mesh>
                    );
                }),
            )}
        </group>
    );
}

export default function App() {
    return (
        <div className="w-screen h-screen bg-gray-200">
            <div className="h-16 px-2 flex items-center justify-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-400/80 backdrop-blur-2xl rounded-full shadow-lg z-50 border border-zinc-400">
                <div className="w-12 h-12 bg-zinc-400 rounded-full border border-zinc-300/50"></div>
                <div className="w-12 h-12 bg-zinc-400 rounded-full border border-zinc-300/50"></div>
                <div className="w-12 h-12 bg-zinc-400 rounded-full border border-zinc-300/50"></div>
                <div className="w-32 h-12 bg-green-300 rounded-full border border-green-400 flex items-center justify-center font-bold text-white">
                    $1,000,000
                </div>
            </div>
            <Canvas
                shadows
                camera={{ position: [7, 7, 7], fov: 45, near: 0.1, far: 100 }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight
                    castShadow
                    position={[5, 10, 5]}
                    intensity={3}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-near={0.5}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <Pit size={10} depth={1} outerSize={100} />
                <Cubes count={3} spacing={1.2} cubeSize={1} pitDepth={1} />
                <OrbitControls
                    enablePan={false}
                    minDistance={5}
                    maxDistance={20}
                />
                <EffectComposer>
                <SSAO
                    samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
                    rings={4} // amount of rings in the occlusion sampling pattern
                    distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
                    distanceFalloff={0.0} // distance falloff. min: 0, max: 1
                    rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
                    rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
                    luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
                    radius={20} // occlusion sampling radius
                    bias={0.5} // occlusion bias
                />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
