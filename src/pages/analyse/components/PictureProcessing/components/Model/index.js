import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TestModel from "./components/TestModel";
import * as THREE from "three";

const Model = ({ ...props }) => {
  useEffect(() => {
    console.log("PASSING", props.keypoints);
  }, [props.keypoints]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "500px",
        position: "absolute",
      }}
    >
      <Canvas colorManagement camera={{ position: [0, 0, 3.5], fov: 30 }}>
        <ambientLight intensity={1} />
        <primitive object={new THREE.AxesHelper(10)} />
        <Suspense fallback={null}>
          <OrbitControls />
          {props.keypoints && (
            <TestModel
              keypoints={props.keypoints}
              customHeight={props.customHeight}
              setCustomHeight={props.setCustomHeight}
              setSuggestions={props.setSuggestions}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model;