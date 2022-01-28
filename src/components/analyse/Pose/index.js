import React, { useEffect, useState } from "react";
import { BASE_POSE, UNWANTED_POINTS, NAMINGS } from "./constant";
import { Canva, Tooltip } from "./styled";
import Line from "./components/Line";
import Circle from "./components/Circle";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import merge from "lodash.merge";

async function PostEstimation(image) {
  const model = poseDetection.SupportedModels.MoveNet;
  const detector = await poseDetection.createDetector(model);
  return await detector.estimatePoses(image);
}

function FindKeypoints(image, setPose, pose, updatedJoints, setModelKeypoints) {
  let keypoints = [];
  let score;
  let poseEs = {};

  PostEstimation(image).then((e) => {
    console.log("POSENET", e);
    score = e[0].score;
    e[0].keypoints.forEach((p) => {
      const x = p.x;
      const y = p.y;
      if (!UNWANTED_POINTS.includes(p.name)) {
        keypoints.push({
          name: NAMINGS[p.name],
          x: x,
          y: y,
          confident: p.score,
        });
        poseEs[NAMINGS[p.name]] = [x, y];
      }
    });
    setModelKeypoints(keypoints);
    pose.joints = poseEs;
    setPose(Object.assign({}, pose, { edges: updatedJoints }));
  });
}

const Pose = ({ ...props }) => {
  const [pose, setPose] = useState(BASE_POSE);
  const [showPoints, setShowPoints] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      setShowPoints(true);
    }
  }, [pose]);

  const updatedJoints = [
    ["r_shoulder", "l_shoulder"],

    ["r_shoulder", "r_hip"],
    ["r_hip", "r_knee"],
    ["r_knee", "r_ankle"],

    ["r_hip", "l_hip"],

    ["l_shoulder", "l_hip"],
    ["l_hip", "l_knee"],
    ["l_knee", "l_ankle"],

    ["head", "r_shoulder"],
    ["head", "l_shoulder"],

    ["l_shoulder", "l_elbow"],
    ["l_elbow", "l_wrist"],

    ["r_shoulder", "r_elbow"],
    ["r_elbow", "r_wrist"],
  ];

  useEffect(() => {
    if (props.finishProcess) {
      const img = document.getElementById("picture");
      FindKeypoints(img, setPose, pose, updatedJoints, props.setModelKeypoints);
    }
  }, [props.finishProcess]);

  const xStep = 500;
  const yStep = 500;

  const mapX = (unit) => unit;
  const mapY = (unit) => unit;

  const unmapX = (coord) => coord;
  const unmapY = (coord) => coord;

  const [hoveredJoint, setHoveredJoint] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  return (
    <Canva {...props}>
      <svg
        style={{ width: xStep, height: yStep }}
        viewBox={`0 0 ${xStep} ${yStep}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {showPoints &&
            pose.edges.map(([from, to], index) => (
              <svg key={index}>
                <Line
                  key={`${from}-${to}-border`}
                  x1={mapX(pose.joints[from][0])}
                  y1={mapY(pose.joints[from][1])}
                  x2={mapX(pose.joints[to][0])}
                  y2={mapY(pose.joints[to][1])}
                  stroke={"white"}
                  strokeWidth="4"
                />
                <Line
                  key={`${from}-${to}`}
                  x1={mapX(pose.joints[from][0])}
                  y1={mapY(pose.joints[from][1])}
                  x2={mapX(pose.joints[to][0])}
                  y2={mapY(pose.joints[to][1])}
                  stroke={"black"}
                  strokeWidth="2"
                />
              </svg>
            ))}
          {showPoints &&
            Object.entries(pose.joints).map(([name, pos]) => {
              return (
                <Circle
                  key={name}
                  cx={mapX(pos[0])}
                  cy={mapY(pos[1])}
                  strokeWidth="2"
                  stroke="white"
                  r="4"
                  onPositionUpdate={(pos) => {
                    const newPos = [unmapX(pos.x), unmapY(pos.y)];
                    setPose(merge({}, pose, { joints: { [name]: newPos } }));
                    setIsMoving(pos.active);
                  }}
                  onHover={(enter) => {
                    setHoveredJoint(enter ? name : null);
                  }}
                />
              );
            })}
        </g>
      </svg>
      {hoveredJoint ? (
        <Tooltip>
          {hoveredJoint?.replace("l_", "left ")?.replace("r_", "right ")}
        </Tooltip>
      ) : null}
    </Canva>
  );
};

export default Pose;
