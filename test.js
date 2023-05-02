function rotatePoint(x1, y1, angle) {
    const radians = (Math.PI / 180) * angle;
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);

    const x2 = x1 * cosTheta - y1 * sinTheta;
    const y2 = x1 * sinTheta + y1 * cosTheta;

    return [x2, y2];
}

const [x2, y2] = rotatePoint(100, 100, 135);
console.log(`旋转后的坐标: (${x2.toFixed(2)}, ${y2.toFixed(2)})`);
