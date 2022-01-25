import React from "react";

export const Circle = ({ cx, cy, onPositionUpdate, onHover, ...props }) => {
  // credit: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4
  const [position, setPositionRaw] = React.useState({
    x: cx,
    y: cy,
    active: false,
    offset: {},
  });

  const setPosition = React.useCallback(
    (pos) => {
      onPositionUpdate(pos);
      setPositionRaw(pos);
    },
    [setPositionRaw, onPositionUpdate]
  );

  const handlePointerDown = (e) => {
    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    el.setPointerCapture(e.pointerId);
    setPosition({
      ...position,
      active: true,
      offset: {
        x,
        y,
      },
    });
  };
  const handlePointerMove = (e) => {
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    const movePosition = {
      ...position,
      x: position.x - (position.offset.x - x),
      y: position.y - (position.offset.y - y),
    };
    if (position.active) {
      setPosition(movePosition);
    }
  };
  const handlePointerEnter = () => {
    onHover(true);
  };
  const handlePointerLeave = () => {
    onHover(false);
  };
  const handlePointerUp = (e) => {
    setPosition({
      ...position,
      active: false,
    });
  };

  return (
    <circle
      cx={position.x}
      cy={position.y}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      {...props}
      fill={position.active ? "red" : "#aaa"}
    />
  );
};

export default Circle;
