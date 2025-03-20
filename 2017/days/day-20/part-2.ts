type Particle = {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  acceleration: [number, number, number];
};

export default async function part2(input: string[]) {
  let particles = input.map((line, id) => {
    const matches = line.match(
      /p=<([-\d]+),([-\d]+),([-\d]+)>, v=<([-\d]+),([-\d]+),([-\d]+)>, a=<([-\d]+),([-\d]+),([-\d]+)>/,
    );

    if (!matches) {
      throw new Error(`Failed to parse line: ${line}`);
    }

    const [, px, py, pz, vx, vy, vz, ax, ay, az] = matches;

    return {
      id,
      position: [parseInt(px), parseInt(py), parseInt(pz)],
      velocity: [parseInt(vx), parseInt(vy), parseInt(vz)],
      acceleration: [parseInt(ax), parseInt(ay), parseInt(az)],
    } as Particle;
  });

  let stableCount = 0;

  // Simulate until no more collisions occur for many iterations
  // This is a heuristic - we assume that after 1000 iterations with no collisions,
  // we've reached a stable state
  for (let i = 0; i < 1000; i++) {
    const prevCount = particles.length;

    // Update all particle positions
    particles.forEach((particle) => updateParticle(particle));

    // Remove collided particles
    particles = removeCollisions(particles);

    if (particles.length === prevCount) {
      stableCount++;
      // If we've had 100 stable iterations, we're probably done
      if (stableCount > 100) {
        break;
      }
    } else {
      stableCount = 0;
    }
  }

  return particles.length;
}

// Solve time: 10 minutes and 26 seconds
// Total solve time: 19 minutes and 27 seconds

// Update the position and velocity of a particle
const updateParticle = (particle: Particle): void => {
  // Update velocity by adding acceleration
  particle.velocity[0] += particle.acceleration[0];
  particle.velocity[1] += particle.acceleration[1];
  particle.velocity[2] += particle.acceleration[2];

  // Update position by adding velocity
  particle.position[0] += particle.velocity[0];
  particle.position[1] += particle.velocity[1];
  particle.position[2] += particle.velocity[2];
};

// Check for collisions and remove collided particles
const removeCollisions = (particles: Particle[]): Particle[] => {
  const positionMap = new Map<string, number[]>();

  // Group particles by position
  particles.forEach((particle) => {
    const posKey = particle.position.join(",");
    const ids = positionMap.get(posKey) || [];
    ids.push(particle.id);
    positionMap.set(posKey, ids);
  });

  // Find positions with more than one particle (collisions)
  const collisionPositions = new Set<string>();
  positionMap.forEach((ids, posKey) => {
    if (ids.length > 1) {
      collisionPositions.add(posKey);
    }
  });

  // Filter out particles that have collided
  if (collisionPositions.size > 0) {
    return particles.filter((particle) => {
      const posKey = particle.position.join(",");
      return !collisionPositions.has(posKey);
    });
  }

  return particles;
};
