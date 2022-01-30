import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TestModel from "./components/TestModel";
import { ModelContiainer } from "./styled";

const Model = ({ ...props }) => {
  return (
    <ModelContiainer>
      <Canvas colorManagement camera={{ position: [0, 0, 3.5], fov: 30 }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <OrbitControls />
          {props.keypoints && (
            <TestModel
              keypoints={props.keypoints}
              customHeight={props.customHeight}
              setCharHeight={props.setCharHeight}
              setSuggestions={props.setSuggestions}
              modelSkin={props.modelSkin}
            />
          )}
        </Suspense>
      </Canvas>
    </ModelContiainer>
  );
};

export default Model;
