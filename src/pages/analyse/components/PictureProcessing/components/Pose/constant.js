export const BASE_POSE = {
  joints: {
    head: [0, 0],
    l_shoulder: [1, 1],
    l_elbow: [2, 1],
    l_wrist: [3, 1],
    r_shoulder: [-1, 1],
    r_elbow: [-2, 1],
    r_wrist: [-3, 1],
    l_hip: [1, 3],
    l_knee: [1, 4.5],
    l_ankle: [1, 6],
    r_hip: [-1, 3],
    r_knee: [-1, 4.5],
    r_ankle: [-1, 6],
  },
  edges: [
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
  ],
};

export const UNWANTED_POINTS = [
  "left_eye",
  "right_eye",
  "left_ear",
  "right_ear",
];

export const NAMINGS = {
  nose: "head",
  left_shoulder: "l_shoulder",
  right_shoulder: "r_shoulder",
  left_elbow: "l_elbow",
  right_elbow: "r_elbow",
  left_wrist: "l_wrist",
  right_wrist: "r_wrist",
  left_hip: "l_hip",
  right_hip: "r_hip",
  left_knee: "l_knee",
  right_knee: "r_knee",
  left_ankle: "l_ankle",
  right_ankle: "r_ankle",
};

export default NAMINGS;
