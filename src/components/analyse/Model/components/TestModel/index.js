/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  IMG_SIZE,
  HALF_CANVA_SIZE,
} from "../../../../../../public/constants/canva";
import { BONE_NAMES, POINT_NAMES } from "../../constant";

// Convert pixel to 3D canva coordinate
function findPosition(position) {
  if (position > IMG_SIZE - 5) {
    position = IMG_SIZE - 5;
  }
  const canvaPosition =
    (position / IMG_SIZE) * (HALF_CANVA_SIZE * 2) - HALF_CANVA_SIZE;

  return canvaPosition;
}

const getAngle = (p1, p2, c1, c2, m) => {
  if (p1["score"] > CONFIDENCE && p2["score"] > CONFIDENCE) {
    return (
      (Math.atan2(
        p2["position"]["y"] - p1["position"]["y"],
        p2["position"]["x"] - p1["position"]["x"]
      ) +
        c1) *
      m
    );
  }
  return c2 * m;
};

export default function TestModel(props) {
  const group = useRef();
  const { nodes, materials, geometry, animations } = useGLTF("/testModel.glb");
  const { actions } = useAnimations(animations, group);
  // const transparentMat = new THREE.MeshStandardMaterial({
  //   color: "red",
  //   transparent: true,
  //   opacity: 0.5,
  // });
  const [keypoints, setModelKeypoints] = useState(null);

  const CONFIDENCE = 0.3;
  const getAngle = (p1, p2, c1, c2, m) => {
    if (p1.confident > CONFIDENCE && p2.confident > CONFIDENCE) {
      console.log("ANGEL", (Math.atan2(p2.y - p1.y, p2.x - p1.x) + c1) * m);
      return (Math.atan2(p2.y - p1.y, p2.x - p1.x) + c1) * m;
    }
    return c2 * m;
  };

  // const getLowerArmAngle = (p1, p2, fixedPoint) => {
  //   const angle1 = Math.atan2(p1.y - fixedPoint.y, p1.x - fixedPoint.x);
  //   const angle2 = Math.atan2(p2.y - fixedPoint.y, p2.x - fixedPoint.x);
  //   console.log("NEW FOR", angle1 - angle2);
  //   return angle1 - angle2;
  // };

  const getLowerArmAngle = (p1, p2, p3) => {
    const numarator = p2.y * (p1.x - p3.x) + p1.y * (p3.x - p2.x) + p3.y * (p2.x - p1.x);
    const denominator = (p2.x - p1.x) * (p1.x - p3.x) + (p2.y - p1.y) * (p1.y - p3.y);
    return Math.atan2(numarator, denominator);
  };

  // get Angle(in radian) that refer to Horizontal Axis 
  const getUpperArmAngle = (p1, p2) => {
    const angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));
    console.log(p2.name);
    console.log(p1.name);
    console.log("AROI", angle);
    return angle;
  };

  // side = -1 is left side of the model (right of us)
  //      =  1 is right side of the model (left of us)
  const rotateArm = (side) => {
    // get keypoints
    const shoulder = keypoints[POINT_NAMES.L_SHOULDER];
    const elbow = keypoints[POINT_NAMES.L_ELBOW];
    const waist = keypoints[POINT_NAMES.L_WRIST];

    const shoulderRad = {max: 0.4, min: -0.4};
    var upperAngle = 0;

    if(shoulder.confident > CONFIDENCE && elbow.confident > CONFIDENCE)
    {
      // =========================== UPPER ARM ===========================
      // SHOULDER
      // positive is up
      // negative is down

      // elbow is below shoulder
      if (shoulder.y < elbow.y)
        upperAngle = - getUpperArmAngle(shoulder, elbow);

      // elbow is above shoulder
      if (shoulder.y > elbow.y )
        upperAngle = getUpperArmAngle(shoulder, elbow);
      
      // If shoulder is in the range of movement we move only shoulder
      if (upperAngle <= shoulderRad.max && upperAngle >= shoulderRad.min)
        nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = upperAngle;
      else // If shoulder is out of the range of movement we move shoulder to the max then the rest move arm
      {
        // ARM rotate up and down by using x axis
        // negative is up
        // positive is down
        var radForArm = 0 // radian for arm
        if (upperAngle > shoulderRad.max)
        {
          radForArm = - (upperAngle - shoulderRad.max);
          nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = shoulderRad.max;
        }

        if (upperAngle < shoulderRad.min)
        {
          radForArm = - (upperAngle - shoulderRad.min);
          nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = shoulderRad.min;
        }
        // fore arm (move into body (left arm) : negative radian | move out body (left arm) : positive radian)
        nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.x = radForArm;
      }

      // =========================== LOWER ARM ===========================
      // find angle btw 3 points
      // Ref: https://riptutorial.com/math/example/25158/calculate-angle-from-three-points

      // create new refference point
      const xDiff = shoulder.x - elbow.x;
      const yDiff = shoulder.y - elbow.y;

      const newRefPoint = {x: elbow.x + xDiff, y: elbow.y + yDiff};

      const lowerAngle = getLowerArmAngle(elbow, newRefPoint, waist);
      // fore arm (move into body (left arm) : negative radian | move out body (left arm) : positive radian)
      nodes.Ch36.skeleton.bones[BONE_NAMES.L_FOREARM].rotation.x = -lowerAngle;
    }
    
  }

  //keypoints: [name, x, y, confidence]
  console.log("BONES", nodes.Ch36.skeleton.bones);

  if (keypoints) {
    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y =
    //   getAngle(
    //     keypoints[POINT_NAMES.L_SHOULDER],
    //     keypoints[POINT_NAMES.L_ELBOW],
    //     0,
    //     0,
    //     -1
    //   ) + 2.5;

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y =
    //   getShoulderAngle(
    //     keypoints[POINT_NAMES.L_ELBOW],
    //     keypoints[POINT_NAMES.L_HIP],
    //     keypoints[POINT_NAMES.L_SHOULDER]
    //   ) *
    //     0 -
    //   0.5;

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = getAnotherAngle(keypoints[POINT_NAMES.L_SHOULDER], keypoints[POINT_NAMES.L_ELBOW]);

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = getAnotherAngle(keypoints[POINT_NAMES.L_SHOULDER], keypoints[POINT_NAMES.L_ELBOW]);

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.y = getAnotherAngle(keypoints[POINT_NAMES.L_SHOULDER], keypoints[POINT_NAMES.L_ELBOW]);
    rotateArm(1);
    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_SHOULDER].rotation.y = 0.4

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.x = 1
    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.y = 0
    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.z = 0

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_ARM].rotation.x =
    //   getAngle(
    //     keypoints[POINT_NAMES.L_SHOULDER],
    //     keypoints[POINT_NAMES.L_ELBOW],
    //     0,
    //     0,
    //     1
    //   ) - 2.5;

    // nodes.Ch36.skeleton.bones[BONE_NAMES.L_FOREARM].rotation.x = getAngle(
    //   keypoints[POINT_NAMES.L_ELBOW],
    //   keypoints[POINT_NAMES.L_WRIST],
    //   0,
    //   0,
    //   1
    // );
  }

  useEffect(() => {
    if (props.keypoints) {
      console.log(props.keypoints);
      setModelKeypoints(props.keypoints);
    }
  }, [props.keypoints]);

  return (
    <group
      position={[
        keypoints ? findPosition(keypoints[0].x) : findPosition(250),
        keypoints ? -findPosition(keypoints[0].y) : -findPosition(250),
        0,
      ]}
    >
      <group ref={group} dispose={null} position={[0, -1.6, 0]}>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh
            geometry={nodes.Ch36.geometry}
            // material={transparentMat}
            material={materials.Ch36_Body}
            skeleton={nodes.Ch36.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/testModel.glb");
