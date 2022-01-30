/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  IMG_SIZE,
  HALF_CANVA_SIZE,
} from "../../../../../../../../../public/constants/canva";
import { BONE_NAMES, POINT_NAMES } from "../../constant";
import * as THREE from "three";

// Convert pixel to 3D canva coordinate
function findPosition(position) {
  if (position > IMG_SIZE - 5) {
    position = IMG_SIZE - 5;
  }
  const canvaPosition =
    (position / IMG_SIZE) * (HALF_CANVA_SIZE * 2) - HALF_CANVA_SIZE;

  return canvaPosition;
}

const getLowerArmAngle = (p1, p2, p3) => {
  const numarator =
    p2.y * (p1.x - p3.x) + p1.y * (p3.x - p2.x) + p3.y * (p2.x - p1.x);
  const denominator =
    (p2.x - p1.x) * (p1.x - p3.x) + (p2.y - p1.y) * (p1.y - p3.y);
  return Math.atan2(numarator, denominator);
};

// get Angle(in radian) that refer to Horizontal Axis
const getUpperArmAngle = (p1, p2) => {
  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  return angle;
};

// side =  1 is left side of the model (right of us)
//      = -1 is right side of the model (left of us)
const rotateArm = (side, keypoints, nodes) => {
  const CONFIDENCE = 0.3;
  var indexShoulder,
    indexElbow,
    indexWrist = 0;
  var shoulderBoneIndex,
    elbowBoneIndex,
    wristBoneIndex = 0;

  if (side == 1) {
    // left of model
    // keypoints index
    indexShoulder = POINT_NAMES.L_SHOULDER;
    indexElbow = POINT_NAMES.L_ELBOW;
    indexWrist = POINT_NAMES.L_WRIST;
    // bones index
    shoulderBoneIndex = BONE_NAMES.L_SHOULDER;
    elbowBoneIndex = BONE_NAMES.L_ARM;
    wristBoneIndex = BONE_NAMES.L_FOREARM;
  }

  if (side == -1) {
    // right of model
    // keypoints index
    indexShoulder = POINT_NAMES.R_SHOULDER;
    indexElbow = POINT_NAMES.R_ELBOW;
    indexWrist = POINT_NAMES.R_WRIST;
    // bones index
    shoulderBoneIndex = BONE_NAMES.R_SHOULDER;
    elbowBoneIndex = BONE_NAMES.R_ARM;
    wristBoneIndex = BONE_NAMES.R_FOREARM;
  }

  // get keypoints
  const shoulder = keypoints[indexShoulder];
  const elbow = keypoints[indexElbow];
  const waist = keypoints[indexWrist];

  // get bones
  const shoulderBone = nodes.Ch36.skeleton.bones[shoulderBoneIndex];
  const armBone = nodes.Ch36.skeleton.bones[elbowBoneIndex];
  const forearmBone = nodes.Ch36.skeleton.bones[wristBoneIndex];

  const shoulderRad = { max: 0.4, min: -0.4 };
  var upperAngle = 0;

  // reset value to original
  shoulderBone.rotation.y = 0;
  armBone.rotation.x = 0;
  forearmBone.rotation.x = 0;

  if (shoulder.confident > CONFIDENCE && elbow.confident > CONFIDENCE) {
    // =========================== UPPER ARM ===========================
    // SHOULDER LEFT          SHOULDER RIGHT
    // positive is up         positive is down
    // negative is down       negative is up

    // // elbow is below shoulder
    // if (shoulder.y < elbow.y)
    //   upperAngle = - getUpperArmAngle(shoulder, elbow);

    // // elbow is above shoulder
    // if (shoulder.y > elbow.y )
    //   upperAngle = - getUpperArmAngle(shoulder, elbow);

    upperAngle = -getUpperArmAngle(shoulder, elbow);

    if (side == -1) upperAngle = upperAngle + Math.PI; // right side need to adjust a little radian (plus one round)

    // If shoulder is in the range of movement we move only shoulder
    if (upperAngle <= shoulderRad.max && upperAngle >= shoulderRad.min)
      shoulderBone.rotation.y = upperAngle;
    // If shoulder is out of the range of movement we move shoulder to the max then the rest move arm
    else {
      // ARM rotate up and down by using x axis (LEFT and RIGHT is the same)
      // negative is up
      // positive is down
      var radForArm = 0; // radian for arm
      if (upperAngle > shoulderRad.max) {
        radForArm = -(upperAngle - shoulderRad.max) * side;
        shoulderBone.rotation.y = shoulderRad.max;
      }

      if (upperAngle < shoulderRad.min) {
        radForArm = -(upperAngle - shoulderRad.min) * side;
        shoulderBone.rotation.y = shoulderRad.min;
      }
      // fore arm (move into body (left arm) : negative radian | move out body (left arm) : positive radian)
      armBone.rotation.x = radForArm;
    }

    // =========================== LOWER ARM ===========================
    // find angle btw 3 points
    // Ref: https://riptutorial.com/math/example/25158/calculate-angle-from-three-points

    // create new refference point
    const xDiff = shoulder.x - elbow.x;
    const yDiff = shoulder.y - elbow.y;

    const newRefPoint = { x: elbow.x + xDiff, y: elbow.y + yDiff };

    const lowerAngle = getLowerArmAngle(elbow, newRefPoint, waist);
    // FOREARM
    // left arm
    // move into body : negative radian
    // move out body : positive radian

    // right arm
    // move into body : positive radian
    // move out body : negative radian
    forearmBone.rotation.x = -lowerAngle * side;
  }
};

// 3 and half head not include foot
function getLeglength(hip, knee, ankle) {
  const upperLeglength = Math.hypot(
    Math.abs(hip.x - knee.x),
    Math.abs(hip.y - knee.y)
  );
  const lowerLeglength = Math.hypot(
    Math.abs(knee.x - ankle.x),
    Math.abs(knee.y - ankle.y)
  );

  return {
    leglength: upperLeglength + lowerLeglength,
    upperleglength: upperLeglength,
    lowerleglength: lowerLeglength,
  };
}

// 2 and half head
function getBodyLength(shoulder, hip) {
  return Math.hypot(Math.abs(shoulder.x - hip.x), Math.abs(shoulder.y - hip.y));
}

// ~2 an half head not include hand
function getArmLength(shoulder, elbow, wrist) {
  const upperArmlength = Math.hypot(
    Math.abs(shoulder.x - elbow.x),
    Math.abs(shoulder.y - elbow.y)
  );
  const lowerArmlength = Math.hypot(
    Math.abs(elbow.x - wrist.x),
    Math.abs(elbow.y - wrist.y)
  );

  return {
    armlength: upperArmlength + lowerArmlength,
    upperarmlength: upperArmlength,
    lowerarmlength: lowerArmlength,
  };
}

// need keypoints
// result will be in pixel
// 8 proportions human ratio
function getFullBodyLength(keypoints) {
  const left_body_length = getBodyLength(
    keypoints[POINT_NAMES.L_SHOULDER],
    keypoints[POINT_NAMES.L_HIP]
  );
  const right_body_length = getBodyLength(
    keypoints[POINT_NAMES.R_SHOULDER],
    keypoints[POINT_NAMES.R_HIP]
  );

  const left_leg_length = getLeglength(
    keypoints[POINT_NAMES.L_HIP],
    keypoints[POINT_NAMES.L_KNEE],
    keypoints[POINT_NAMES.L_ANKLE]
  ).leglength;
  const right_leg_length = getLeglength(
    keypoints[POINT_NAMES.R_HIP],
    keypoints[POINT_NAMES.R_KNEE],
    keypoints[POINT_NAMES.R_ANKLE]
  ).leglength;

  // these two part equal to ~6 heads / 75% of the full body (if 1 head = 12.5%)
  const body_length = Math.max(left_body_length, right_body_length);
  const leg_length = Math.max(left_leg_length, right_leg_length);

  const full_body_length = (body_length + leg_length) / 0.75; // in pixel

  return full_body_length;
}

function findCriLevel(current_length, good_length) {
  var cri_level = 0;

  const diff = Math.abs(current_length - good_length);

  const diff_percent = diff / good_length;

  if (diff_percent > 0.05 && diff_percent <= 0.1) cri_level = 1;
  else if (diff_percent > 0.1 && diff_percent <= 0.3) cri_level = 2;
  else if (diff_percent > 0.3) cri_level = 3;
  else cri_level = 0;

  return cri_level;
}

// part_name -> string
// length -> pixel
// head_ratio -> correct ratio that suppose to be for this part
// side -> string
function getComment(part_name, length, head_ratio, side, fullBody, origin_fullBody) {
  const headSize = fullBody * 0.125; // in 8 proportion ration head size = 12.5% of full body
  const new_length = fullBody * (length/origin_fullBody);
  const static_suffix = {
    long: "is longer than usual.",
    short: "is shorter than usual.",
  };
  var thisSuffix = "";

  if (new_length < headSize * head_ratio) thisSuffix = static_suffix.short;

  if (new_length > headSize * head_ratio) thisSuffix = static_suffix.long;

  const cri_val = findCriLevel(new_length, headSize * head_ratio);
  var this_comment = null;
  if (cri_val !== 0)
    this_comment = {
      part: part_name,
      comment: `${side} ${part_name} ${thisSuffix}`,
      severity: cri_val,
    };

  return this_comment;
}

function pushArray(array, value) {
  if (value != null) array.push(value);
}

function detectComment(keypoints, fullBody) {
  var all_comment = [];
  const origin_fullBody = getFullBodyLength(keypoints);

  const left_arm_length = getArmLength(
    keypoints[POINT_NAMES.L_SHOULDER],
    keypoints[POINT_NAMES.L_ELBOW],
    keypoints[POINT_NAMES.L_WRIST]
  );
  const right_arm_length = getArmLength(
    keypoints[POINT_NAMES.R_SHOULDER],
    keypoints[POINT_NAMES.R_ELBOW],
    keypoints[POINT_NAMES.R_WRIST]
  );
  const left_leg_length = getLeglength(
    keypoints[POINT_NAMES.L_HIP],
    keypoints[POINT_NAMES.L_KNEE],
    keypoints[POINT_NAMES.L_ANKLE]
  );
  const right_leg_length = getLeglength(
    keypoints[POINT_NAMES.R_HIP],
    keypoints[POINT_NAMES.R_KNEE],
    keypoints[POINT_NAMES.R_ANKLE]
  );

  // check arm
  pushArray(
    all_comment,
    getComment("arm", left_arm_length.armlength, 2.5, "Left", fullBody, origin_fullBody)
  );
  pushArray(
    all_comment,
    getComment("arm", right_arm_length.armlength, 2.5, "Right", fullBody, origin_fullBody)
  );

  pushArray(
    all_comment,
    getComment(
      "upper arm",
      left_arm_length.upperarmlength,
      1.5,
      "Left",
      fullBody,
      origin_fullBody
    )
  );
  pushArray(
    all_comment,
    getComment(
      "upper arm",
      right_arm_length.upperarmlength,
      1.5,
      "Right",
      fullBody,
      origin_fullBody
    )
  );

  pushArray(
    all_comment,
    getComment("lower arm", left_arm_length.lowerarmlength, 1, "Left", fullBody, origin_fullBody)
  );
  pushArray(
    all_comment,
    getComment(
      "lower arm",
      right_arm_length.lowerarmlength,
      1,
      "Right",
      fullBody, origin_fullBody
    )
  );

  // check leg
  pushArray(
    all_comment,
    getComment("leg", left_leg_length.leglength, 3.5, "Left", fullBody, origin_fullBody)
  );
  pushArray(
    all_comment,
    getComment("leg", right_leg_length.leglength, 3.5, "Right", fullBody, origin_fullBody)
  );

  pushArray(
    all_comment,
    getComment(
      "upper leg",
      left_leg_length.upperleglength,
      1.8,
      "Left",
      fullBody,
      origin_fullBody
    )
  );
  pushArray(
    all_comment,
    getComment(
      "upper leg",
      right_leg_length.upperleglength,
      1.8,
      "Right",
      fullBody,
      origin_fullBody
    )
  );

  pushArray(
    all_comment,
    getComment(
      "lower leg",
      left_leg_length.lowerleglength,
      1.7,
      "Left",
      fullBody,
      origin_fullBody
    )
  );
  pushArray(
    all_comment,
    getComment(
      "lower leg",
      right_leg_length.lowerleglength,
      1.7,
      "Right",
      fullBody,
      origin_fullBody
    )
  );

  return all_comment;
}

export default function TestModel(props) {
  const group = useRef();
  const { nodes, materials, geometry, animations } = useGLTF("/testModel.glb");
  const { actions } = useAnimations(animations, group);

  const [keypoints, setModelKeypoints] = useState(null);

  const [comment, setComment] = useState(null);
  const [trans, setTrans] = useState(true);

  // first time of height calucation
  const [firstHeight, setFirstHeight] = useState(true);

  //keypoints: [name, x, y, confidence]
  console.log("BONES", nodes.Ch36.skeleton.bones);

  if (keypoints) {
    rotateArm(1, keypoints, nodes); // left of the model
    rotateArm(-1, keypoints, nodes); // right of the model
  }

  useEffect(() => {
    if (props.keypoints) {
      console.log(props.keypoints);
      setModelKeypoints(props.keypoints);

      // Find character's height
      var fullBody = 0;
      if (firstHeight) {
        // If first time of height calculation, get height from model
        console.log("FIRST");
        fullBody = getFullBodyLength(props.keypoints);
        setFirstHeight(false);
        props.setCustomHeight(fullBody);
      } else {
        // Else get height from user input
        console.log("NEXT");
        fullBody = props.customHeight;
      }
      console.log("GET NEW COMMENT");
      // detect comment
      setComment(detectComment(props.keypoints, fullBody));
    }
  }, [props.keypoints, props.customHeight]);

  useEffect(() => {
    console.log("COMMENT", comment);
  }, [comment]);

  const transparentMat = new THREE.MeshStandardMaterial({
    color: "#016064",
    transparent: true,
    opacity: 0.8,
  });

  return (
    <group
      position={[
        keypoints ? findPosition(keypoints[0].x) : findPosition(250),
        keypoints ? -findPosition(keypoints[0].y) + 1 : -findPosition(250) + 1,
        0,
      ]}
    >
      <group ref={group} dispose={null} position={[0, -1.6, 0]}>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1Hips} position={[1, 0, 0]} />
          <skinnedMesh
            geometry={nodes.Ch36.geometry}
            material={trans ? transparentMat : materials.Ch36_Body}
            // material={materials.Ch36_Body}
            skeleton={nodes.Ch36.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/testModel.glb");
