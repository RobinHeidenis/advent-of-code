export default async function part1(input: string[]) {
  const particles = input.map((line, index) => {
    // Extract p, v, a vectors using regex
    const [p, v, a] = line
      .match(/p=<(.*?)>, v=<(.*?)>, a=<(.*?)>/i)!
      .slice(1)
      .map((coord) => coord.split(",").map(Number));

    // Calculate Manhattan distance for acceleration
    const accelerationMagnitude =
      Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2]);

    return {
      id: index,
      p,
      v,
      a,
      accelerationMagnitude,
    };
  });

  // Sort by acceleration magnitude (lowest first)
  particles.sort((a, b) => a.accelerationMagnitude - b.accelerationMagnitude);

  // For particles with identical acceleration, check velocity magnitude
  const lowestAcceleration = particles[0].accelerationMagnitude;
  const particlesWithLowestAcceleration = particles.filter(
    (p) => p.accelerationMagnitude === lowestAcceleration,
  );

  if (particlesWithLowestAcceleration.length === 1) {
    // If only one particle has the lowest acceleration, return its ID
    return particlesWithLowestAcceleration[0].id;
  } else {
    // If multiple particles have the same acceleration, check velocity
    particlesWithLowestAcceleration.sort((a, b) => {
      const vMagA = Math.abs(a.v[0]) + Math.abs(a.v[1]) + Math.abs(a.v[2]);
      const vMagB = Math.abs(b.v[0]) + Math.abs(b.v[1]) + Math.abs(b.v[2]);
      return vMagA - vMagB;
    });

    return particlesWithLowestAcceleration[0].id;
  }
}

// Solve time: 9 minutes
