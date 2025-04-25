import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import styles from './particlesBackground.module.css';


export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    // <div style={{position: 'absolute', zIndex:0, top:0, left: 0, width: '100%', height: '100%'}}>
      <Particles
        id="tsparticles"
        className={styles.tsparticles}
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#999999' },
            links: {
              color: "#999999",
              distance: 120,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              // speed: 1.5,
              speed: 0.7,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: {
              value: 60,
              density: { enable: true, area: 800 },
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    // </div>
  );
}
