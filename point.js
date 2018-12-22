class Point {

  constructor(x, y, targets, others) {
    this.pos = createVector(x, y);
    this.targets = targets;
    this.others = others;
  }

  get within() {
    return this.withinPolygon();
  }

  withinPolygon(letters) {
    let origin = createVector(0, 0);

    let hit = false;
    for (let target of this.targets) {
      let d = dist(this.pos.x, this.pos.y, target.x, target.y);
      if (d < pointSize / 20) {
        return true;
      }
    }
    return hit;
  }
}