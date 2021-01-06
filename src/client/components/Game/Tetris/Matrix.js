function rotate(vec, center, angle) {
  const normVec = {
    x: vec.x - center.x,
    y: vec.y - center.y
  };
  const rotVec = {
    x: Math.round((normVec.x * Math.cos(angle) - normVec.y * Math.sin(angle)) + center.x),
    y: Math.round((normVec.x * Math.sin(angle) + normVec.y * Math.cos(angle)) + center.y)
  };
  return (rotVec);
}

function translateX(vec, unit) {
  return ({ x: vec.x + unit, y: vec.y });
}

function translateY(vec, unit) {
  return ({ x: vec.x, y: vec.y + unit });
}

export default { rotate, translateX, translateY };
