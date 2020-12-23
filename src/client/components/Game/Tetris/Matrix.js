class Mat2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  rotate(center, angle) {
    const normVec = new Mat2(this.x - center.x, this.y - center.y);
    const newVec = new Mat2(
      normVec.x * Math.cos(angle) - normVec.y * Math.sin(angle),
      normVec.x * Math.sin(angle) + normVec.y * Math.cos(angle)
    );
    const rotVec = new Mat2(Math.round(newVec.x + center.x), Math.round(newVec.y + center.y));
    return (rotVec);
  }

  translateX(unit) {
    const newVec = new Mat2(this.x + unit, this.y);
    return (newVec);
  }

  translateY(unit) {
    const newVec = new Mat2(this.x, this.y + unit);
    return (newVec);
  }
}

export default Mat2;
