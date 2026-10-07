import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function RepelLetter({
  letter,
  mouseX,
  mouseY,
  radius = 120,
  strength = 45,
  mode = 'repel',
  stiffness = 200,
  damping = 14,
  mass = 0.35,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const originX = useRef(0);
  const originY = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  const rotate = useTransform(springX, (v) => v * 0.25);

  useEffect(() => {
    const capture = () => {
      if (!ref.current) return;
      const container = ref.current.closest('[data-text-repel]');
      if (!container) return;
      const cr = container.getBoundingClientRect();
      const lr = ref.current.getBoundingClientRect();
      originX.current = lr.left - cr.left + lr.width / 2;
      originY.current = lr.top - cr.top + lr.height / 2;
    };

    const raf = requestAnimationFrame(capture);
    window.addEventListener('resize', capture);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', capture);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const dx = originX.current - mx;
      const dy = originY.current - my;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius && distance > 0) {
        const force = ((1 - distance / radius) ** 2) * strength;
        const angle = Math.atan2(dy, dx);
        const dir = mode === 'attract' ? -1 : 1;
        x.set(Math.cos(angle) * force * dir);
        y.set(Math.sin(angle) * force * dir);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const unsub1 = mouseX.on('change', update);
    const unsub2 = mouseY.on('change', update);
    return () => {
      unsub1();
      unsub2();
    };
  }, [mouseX, mouseY, radius, strength, mode, x, y]);

  if (letter === ' ') {
    return <span style={{ display: 'inline-block', whiteSpace: 'pre' }}> </span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        whiteSpace: 'pre',
        willChange: 'transform',
        x: springX,
        y: springY,
        rotate,
        ...style,
      }}
      aria-hidden="true"
    >
      {letter}
    </motion.span>
  );
}

export default function TextRepel({
  text,
  className = '',
  letterClassName = '',
  style = {},
  letterStyle = {},
  radius = 120,
  strength = 45,
  mode = 'repel',
  stiffness = 200,
  damping = 14,
  mass = 0.35,
}) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  return (
    <div
      ref={containerRef}
      data-text-repel
      className={`text-repel-wrap ${className}`.trim()}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        userSelect: 'none',
        ...style,
      }}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(-9999);
        mouseY.set(-9999);
      }}
      aria-label={text}
    >
      {text.split('').map((letter, i) => (
        <RepelLetter
          key={i}
          letter={letter}
          mouseX={mouseX}
          mouseY={mouseY}
          radius={radius}
          strength={strength}
          mode={mode}
          stiffness={stiffness}
          damping={damping}
          mass={mass}
          className={letterClassName}
          style={letterStyle}
        />
      ))}
    </div>
  );
}
