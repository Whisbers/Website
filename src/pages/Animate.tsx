import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import * as yaml from 'js-yaml';
import { motion, AnimatePresence } from 'framer-motion';
import ArmorStand from '../components/ArmorStand';
import MetaTags from '../components/MetaTags';

interface KeyFrame {
  head: { x: number; y: number; z: number };
  left_arm: { x: number; y: number; z: number };
  right_arm: { x: number; y: number; z: number };
  left_leg: { x: number; y: number; z: number };
  right_leg: { x: number; y: number; z: number };
}

const defaultFrame: KeyFrame = {
  head: { x: 0, y: 0, z: 0 },
  left_arm: { x: 0, y: 0, z: 0 },
  right_arm: { x: 0, y: 0, z: 0 },
  left_leg: { x: 0, y: 0, z: 0 },
  right_leg: { x: 0, y: 0, z: 0 }
};

export default function Animate() {
  const [frames, setFrames] = useState<KeyFrame[]>([defaultFrame]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationName, setAnimationName] = useState('wave');
  const [interval, setInterval] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastFrameTimeRef = useRef<number>(0);
  const controlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (!isHovered) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const addKeyFrame = () => {
    setFrames([...frames, { ...frames[currentFrame] || defaultFrame }]);
    setCurrentFrame(frames.length);
  };

  const updateCurrentFrame = (part: keyof KeyFrame, axis: 'x' | 'y' | 'z', value: number) => {
    const newFrames = [...frames];
    if (!newFrames[currentFrame]) {
      newFrames[currentFrame] = { ...defaultFrame };
    }
    newFrames[currentFrame] = {
      ...newFrames[currentFrame],
      [part]: { ...newFrames[currentFrame][part], [axis]: value }
    };
    setFrames(newFrames);
  };

  const exportAnimation = () => {
    try {
      const cleanedFrames = frames.map(frame => ({
        head: { x: frame.head.x, y: frame.head.y, z: frame.head.z },
        left_arm: { x: frame.left_arm.x, y: frame.left_arm.y, z: frame.left_arm.z },
        right_arm: { x: frame.right_arm.x, y: frame.right_arm.y, z: frame.right_arm.z },
        left_leg: { x: frame.left_leg.x, y: frame.left_leg.y, z: frame.left_leg.z },
        right_leg: { x: frame.right_leg.x, y: frame.right_leg.y, z: frame.right_leg.z }
      }));

      const animation = {
        animations: {
          [animationName]: {
            interval: Math.max(1, Math.floor(interval)),
            loop: true,
            steps: cleanedFrames
          }
        }
      };
      
      const yamlStr = yaml.dump(animation, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        quotingType: '"'
      });
      
      const blob = new Blob([yamlStr], { type: 'text/yaml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'animations.yml';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export animation:', error);
    }
  };

  const playAnimation = () => {
    if (isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const animate = () => {
      const now = Date.now();
      if (now - lastFrameTimeRef.current >= interval * 50) {
        setCurrentFrame(prev => (prev + 1) % frames.length);
        lastFrameTimeRef.current = now;
      }
      timeoutRef.current = setTimeout(animate, 16);
    };
    
    lastFrameTimeRef.current = Date.now();
    animate();
  };

  const currentFrameData = frames[currentFrame] || defaultFrame;

  return (
    <div 
      className="h-screen bg-[#030303] relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
    >
      <MetaTags 
        title="Animation Creator - AdvancedArmorStands"
        description="Create custom armor stand animations with our interactive 3D editor. Export animations for your Minecraft server."
        url="https://advancedarmorstands.ir/#/animate"
      />
      
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#16161a] to-[#0d0d0e] border-b border-[#222224]">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                as="a"
                href="/"
                color="primary"
                isIconOnly
                className=" bg-gradient-to-r from-orange-600 to-orange-600"
              >
                <Icon icon="lucide:arrow-left" className="w-5 h-5" />
              </Button>
              <Input
                label="Animation Name"
                value={animationName}
                onChange={(e) => setAnimationName(e.target.value)}
                className="w-48"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pt-16">
        <Canvas camera={{ position: [0, 2, 5] }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.8} />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#ff5f15" />
          <ArmorStand frame={currentFrameData} />
          <OrbitControls />
          <gridHelper args={[10, 10, '#222224', '#222224']} />
        </Canvas>
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-16 right-0 bottom-32 w-96 bg-gradient-to-b from-[#16161a] to-[#0d0d0e] border-l border-[#222224] overflow-y-auto z-20"
          >
            <div className="p-6 space-y-6">
              <Button
                color="primary"
                isIconOnly
                className="absolute top-2 right-2  bg-gradient-to-r from-orange-600 to-orange-600"
                onClick={() => setIsPanelOpen(false)}
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </Button>
              
              {Object.entries(currentFrameData).map(([part, angles]) => (
                <div key={part} className="mb-6">
                  <h4 className="text-md font-medium mb-3 capitalize text-orange-500">
                    {part.replace('_', ' ')}
                  </h4>
                  {Object.entries(angles).map(([axis, value]) => (
                    <div key={axis} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm uppercase text-orange-500 font-medium">
                          {axis}
                        </label>
                        <Input
                          type="number"
                          value={value}
                          onChange={(e) => updateCurrentFrame(part as keyof KeyFrame, axis as 'x' | 'y' | 'z', Number(e.target.value))}
                          min={-180}
                          max={180}
                          className="w-20 text-right"
                        />
                      </div>
                      <input
                        type="range"
                        value={value}
                        onChange={(e) => updateCurrentFrame(part as keyof KeyFrame, axis as 'x' | 'y' | 'z', Number(e.target.value))}
                        min={-180}
                        max={180}
                        step={1}
                        className="w-full h-2 bg-[#222224] rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#16161a] to-[#0d0d0e] border-t border-[#222224] backdrop-blur-sm z-20"
          >
            <div className="max-w-full mx-auto p-8">
              <div className="flex items-center gap-8 mb-4">
                <Button
                  color="primary"
                  isIconOnly
                  className="rounded-full w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600"
                  onClick={playAnimation}
                >
                  <Icon icon={isPlaying ? "lucide:pause" : "lucide:play"} className="w-6 h-6" />
                </Button>
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:plus" />}
                  onClick={addKeyFrame}
                  className=" bg-gradient-to-r from-orange-600 to-orange-600"
                >
                  Add Keyframe
                </Button>
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:download" />}
                  onClick={exportAnimation}
                  className=" bg-gradient-to-r from-orange-600 to-orange-600"
                >
                  Export
                </Button>
                {!isPanelOpen && (
                  <Button
                    color="primary"
                    onClick={() => setIsPanelOpen(true)}
                    className=" bg-gradient-to-r from-orange-600 to-orange-600"
                  >
                    Show Controls
                  </Button>
                )}
                <div className="flex-grow">
                  <div className="relative w-full">
                    <div 
                      className="absolute h-2 bg-orange-500/30 rounded-l-lg" 
                      style={{ 
                        width: `${(currentFrame / (frames.length - 1)) * 100}%`,
                        maxWidth: '100%'
                      }} 
                    />
                    <input
                      type="range"
                      value={currentFrame}
                      onChange={(e) => setCurrentFrame(Number(e.target.value))}
                      min={0}
                      max={frames.length - 1}
                      step={1}
                      className="w-full h-2 bg-[#222224] rounded-lg appearance-none cursor-pointer accent-orange-500 relative z-10"
                    />
                  </div>
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    label="Interval (ticks)"
                    value={interval}
                    min={1}
                    onChange={(e) => setInterval(Math.max(1, Number(e.target.value)))}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-orange-500">
                <span>Frame {currentFrame + 1}</span>
                <span>Total Frames: {frames.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}