import './Section.css';
import { useState, useEffect, useRef, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faCalendarDays, faPenToSquare, faUser, faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function ShipModel() {
  const { scene } = useGLTF("/models/ship.glb");
  const shipRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map,
          color: new THREE.Color(0xffffff),
          roughness: 0.8,
          metalness: 0.2,
          side: THREE.DoubleSide,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const initialPosition = useRef([0, -1.2, 0]);
  const initialRotation = useRef([0.2, Math.PI / 20, 0.1]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shipRef.current) {
      // Apply rotation wobble relative to initial rotation
      shipRef.current.rotation.x = initialRotation.current[0] + 0.05 * Math.sin(t * 1.2);
      shipRef.current.rotation.y = initialRotation.current[1] + 0.02 * Math.sin(t * 1.1);
      shipRef.current.rotation.z = initialRotation.current[2] + 0.08 * Math.sin(t * 0.8);

      // Apply bob relative to initial Y position
      shipRef.current.position.y = initialPosition.current[1] + 0.05 * Math.sin(t * 1.5);
      shipRef.current.position.x = initialPosition.current[0]; // keep X fixed
      shipRef.current.position.z = initialPosition.current[2]; // keep Z fixed
    }
  });


  return (
    <group ref={shipRef}>
      <primitive
        object={scene}
        scale={0.42}
        position={[0, 0, 3]}
        rotation={[-0.8, Math.PI / 1.4, 0]}
      />
    </group>
  );
}
function Ship() {
  return (
    <div className="ship-canvas">
      <Canvas camera={{ position: [0, 1.5, 6] }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color={"#ffffff"} castShadow />

        <Suspense fallback={null}>
          <ShipModel />
        </Suspense>
      </Canvas>
    </div>
  );
}





//<primitive object={scene} scale={0.45} position={[0, -1.5, 3]} rotation={[-0.8, Math.PI / 1.4, 0]} />



function Wave() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let waveSpeed = 0.9;
    let waveHeight = 70;
    let frequency = 0.025;
    let ripples = [];

    const resize = () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Generate wave points
    const generateWave = (yOffset, amplitude, freq, phase) => {
      const points = [];
      for (let x = 0; x <= width; x += 2) {
        const y = yOffset + Math.sin(x * freq + phase) * amplitude;
        points.push({ x, y });
      }
      return points;
    };

    // Draw wave
    const drawWave = (points, color, alpha) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, height);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient

      time += 0.02 * waveSpeed;

      // Multiple wave layers for realism
      const wave1 = generateWave(height * 0.45, waveHeight * 0.8, frequency * 0.8, time);
      const wave2 = generateWave(height * 0.48, waveHeight * 0.6, frequency * 1.2, time * 1.3);
      const wave3 = generateWave(height * 0.5, waveHeight, frequency, time * 0.8);

      drawWave(wave1, "#5c9fbfff", 0.6);
      drawWave(wave2, "#167097ff", 0.8);
      drawWave(wave3, "#00537aff", 1);


      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="wave-canvas" />;
};




function About() {
  const stats = [
    { icon: faUserGroup, label: 'Members', count: '150+' },
    { icon: faCalendarDays, label: 'Events', count: '100+' },
    { icon: faPenToSquare, label: 'Workshops', count: '100+' },
    { icon: faUser, label: 'Participants', count: '1000+' },
  ];

  const [poppedStates, setPoppedStates] = useState([false, false, false, false]);
  const [bubbles, setBubbles] = useState([[], [], [], []]);

  const handleBubblePop = (index) => {
    const newStates = [...poppedStates];
    newStates[index] = true;
    setPoppedStates(newStates);

    const newBubbles = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      left: `${180 + Math.random() * 20}px`, // slightly randomize within top-right
      bottom: `180px`, // start near top-right of bubble
      size: 10 + Math.random() * 30 + 'px',
      duration: 800 + Math.random() * 400,
      delay: Math.random() * 200
    }));

    setBubbles(prev => prev.map((b, i) => i === index ? newBubbles : b));

    setTimeout(() => {
      const resetStates = [...poppedStates];
      resetStates[index] = false;
      setPoppedStates(resetStates);
      setBubbles(prev => prev.map((b, i) => i === index ? [] : b));
    }, 1200);
  };

  return (
    <section id="about">
      <div className="about-text-section">
        <h1>About</h1>
        <h2>ISTE Student Chapter MH-60</h2>
        <p>The ISTE Student Chapter(MH 60) was established in 2000-2001 and it was inaugrated on Wednesday,24th January 2001 by the Chief guest Shri Pratap Borde, Principal MGM's JNCOE, Aurangabad. Shri Jayant B. Inamdar Chief Engg., MSRTC, Mumbai was present at the function as Guest of Honour. One of the major subject of the ISTE is to assist and to contribute the production and development of top quality professional engineers and technicians needed by the industries and other organisations.As ISTE council covers all the fields of engineering all students of KJSSE are members of ISTE council.</p>
      </div>

      <div className="flip-card-back">
        <div className="icon-grid">
          {stats.map(({ icon, label, count }, i) => (
            <div
              key={i}
              className={`icon-box ${poppedStates[i] ? 'pop' : ''}`}
              onClick={() => handleBubblePop(i)}
            >
              <div className="main-bubble" style={{ opacity: poppedStates[i] ? 0 : 0.92 }} />

              {bubbles[i].map((b) => (
                <div
                  key={b.id}
                  className="floating-bubble"
                  style={{
                    left: b.left,
                    bottom: b.bottom,
                    width: b.size,
                    height: b.size,
                    animationDuration: `${b.duration}ms`,
                    animationDelay: `${b.delay}ms`
                  }}
                />
              ))}

              <FontAwesomeIcon icon={icon} className="fa-icon" />
              <h3 className="count">{count}</h3>
              <p className="label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}







function Gallery() {
  const images = [
    '/img1.png',
    '/img2.png',
    '/img3.png',
    '/img4.png',
    '/img5.png',
    '/img6.png'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 2) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const displayedImages = images.slice(index, index + 3);

  return (
    <div className="gallery-section">
      <div className="gallery-overlay-text">
        <h2>Gallery</h2>
        <p>
          These are the photographs that have captured the beautiful journey of our council over the years.
          Browse through the photographs to know more about us!
        </p>
        <a className="view-more" href="https://istekjsce.com/New-Website/gallery.html">
          View More <span className="arrow">→</span>
        </a>
      </div>
      <div className="gallery-images-flex">
        {displayedImages.map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i}`} className="gallery-img" />
        ))}
      </div>
    </div>
  );
}

function ContactUs() {
  return (
    <section id="contact">
      <div className="contact-section">
        <h1>Contact Us</h1>
        <div className="contact-flex">
          {/* Map */}
          <div className="contact-map">
            <iframe
              title="KJSCE Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7541.5855311781115!2d72.899926!3d19.072847000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0xb2fd3bcfeac0052a!2sK.%20J.%20Somaiya%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1750260981909!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Form */}
          <form className="contact-form">
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="input-group">
              <FontAwesomeIcon icon={faPhone} />
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="input-group message">
              <FontAwesomeIcon icon={faPaperPlane} />
              <textarea placeholder="Message" rows="4" required></textarea>
            </div>
            <button type="submit">Send a Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Section() {
  return (
    <section className="section">
      <Ship />
      <Wave />
      <About />
      <Gallery />
      <ContactUs />
    </section>
  );
}

export default Section;
