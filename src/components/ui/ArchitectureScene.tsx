import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const ThreeLine = 'line' as any
const ThreeLineBasicMaterial = 'lineBasicMaterial' as any

/* ═══════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════ */
type Vec3 = [number, number, number]

interface DragInfo {
  id: string
  plane: THREE.Plane
  offset: THREE.Vector3
  target: THREE.Group
  pavilionGroup: THREE.Group
  mode: 'move' | 'rotate'
  rotateStart: { x: number; y: number }
  rotationStart: Vec3
}

function generatePillarDefaults(): Vec3[] {
  const out: Vec3[] = []
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 3; j++)
      out.push([(i - 1.5) * 0.7, 0, (j - 1) * 0.6])
  return out
}

const PILLAR_DEFAULTS = generatePillarDefaults()

const DEFAULTS: Record<string, Vec3> = {
  ...Object.fromEntries(PILLAR_DEFAULTS.map((p, i) => [`p${i}`, p])),
  base: [0, -0.85, 0],
  roofMain: [0, 0.88, 0],
  floor1: [0, -0.15, 0],
  floor2: [0.1, 0.35, 0],
  stairs1: [-1.0, -0.85, 0.2],
  stairs2: [0.8, -0.15, -0.4],
  stairs3: [-0.5, 0.35, 0.6],
}

const ROT_DEFAULTS: Record<string, Vec3> = {
  ...Object.fromEntries(PILLAR_DEFAULTS.map((_, i) => [`p${i}`, [0, 0, 0]])),
  base: [0, 0, 0],
  roofMain: [0, 0, 0],
  floor1: [0, 0, 0],
  floor2: [0, 0, 0],
  stairs1: [0, 0, 0],
  stairs2: [0, 0, 0],
  stairs3: [0, 0, 0],
}

/* ═══════════════════════════════════════════════════════
   DRAG HANDLER — runs in useFrame for smooth updates
   ═══════════════════════════════════════════════════════ */
function DragHandler({
  dragRef,
  setPositions,
  setRotations,
  orbitRef,
}: {
  dragRef: React.MutableRefObject<DragInfo | null>
  setPositions: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
  setRotations: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
  orbitRef: React.MutableRefObject<any>
}) {
  const { pointer, camera, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const hit = useRef(new THREE.Vector3())

  useFrame(() => {
    const info = dragRef.current
    if (!info) return

    if (info.mode === 'move') {
      raycaster.current.setFromCamera(pointer, camera)
      if (raycaster.current.ray.intersectPlane(info.plane, hit.current)) {
        const world = hit.current.clone().add(info.offset)
        const local = info.pavilionGroup.worldToLocal(world)
        info.target.position.copy(local)
      }
    }
    // Rotate mode is handled via pointermove in the DOM listener below
  })

  useEffect(() => {
    const el = gl.domElement

    const onMove = (e: PointerEvent) => {
      const info = dragRef.current
      if (!info || info.mode !== 'rotate') return
      const dx = (e.clientX - info.rotateStart.x) * 0.01
      const dy = (e.clientY - info.rotateStart.y) * 0.01
      info.target.rotation.y = info.rotationStart[1] + dx
      info.target.rotation.x = info.rotationStart[0] + dy
    }

    const onUp = (e: PointerEvent) => {
      const info = dragRef.current
      if (!info) return
      if (info.mode === 'move') {
        const p = info.target.position
        setPositions((prev) => ({ ...prev, [info.id]: [p.x, p.y, p.z] }))
      } else {
        const r = info.target.rotation
        setRotations((prev) => ({ ...prev, [info.id]: [r.x, r.y, r.z] }))
      }
      dragRef.current = null
      document.body.style.cursor = 'default'
      if (orbitRef.current) orbitRef.current.enabled = true
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
    }
  }, [gl, dragRef, setPositions, setRotations, orbitRef])

  return null
}

/* ═══════════════════════════════════════════════════════
   DRAGGABLE WRAPPER — makes any child element grabbable
   ═══════════════════════════════════════════════════════ */
function Draggable({
  id,
  editMode,
  positions,
  rotations,
  dragRef,
  pavilionRef,
  orbitRef,
  children,
}: {
  id: string
  editMode: boolean
  positions: Record<string, Vec3>
  rotations: Record<string, Vec3>
  dragRef: React.MutableRefObject<DragInfo | null>
  pavilionRef: React.MutableRefObject<THREE.Group>
  orbitRef: React.MutableRefObject<any>
  children: React.ReactNode
}) {
  const { camera, gl } = useThree()
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const pos = positions[id] || DEFAULTS[id]
  const rot = rotations[id] || ROT_DEFAULTS[id] || [0, 0, 0]

  return (
    <group
      ref={ref}
      position={pos}
      rotation={[rot[0], rot[1], rot[2]]}
      onPointerOver={(e) => {
        if (!editMode) return
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'grab'
      }}
      onPointerOut={(e) => {
        if (!editMode) return
        e.stopPropagation()
        setHovered(false)
        if (!dragRef.current) document.body.style.cursor = 'default'
      }}
      onPointerDown={(e) => {
        if (!editMode) return
        e.stopPropagation()

        if (orbitRef.current) orbitRef.current.enabled = false

        const isRotate = e.button === 2 || e.shiftKey

        if (isRotate) {
          // Rotation mode: track mouse movement to spin element
          document.body.style.cursor = 'crosshair'
          const currentRot = ref.current.rotation
          dragRef.current = {
            id,
            plane: new THREE.Plane(),
            offset: new THREE.Vector3(),
            target: ref.current,
            pavilionGroup: pavilionRef.current,
            mode: 'rotate',
            rotateStart: { x: e.clientX, y: e.clientY },
            rotationStart: [currentRot.x, currentRot.y, currentRot.z],
          }
        } else {
          // Move mode
          document.body.style.cursor = 'grabbing'
          const worldPos = new THREE.Vector3()
          ref.current.getWorldPosition(worldPos)
          const plane = new THREE.Plane()
          const normal = camera.position.clone().sub(e.point).normalize()
          plane.setFromNormalAndCoplanarPoint(normal, e.point)
          const offset = worldPos.clone().sub(e.point)
          dragRef.current = {
            id,
            plane,
            offset,
            target: ref.current,
            pavilionGroup: pavilionRef.current,
            mode: 'move',
            rotateStart: { x: 0, y: 0 },
            rotationStart: [0, 0, 0],
          }
        }

        gl.domElement.setPointerCapture(e.nativeEvent.pointerId)
      }}
    >
      {children}
      {editMode && <EditDot hovered={hovered} />}
    </group>
  )
}

/* ─── Small pulsing indicator shown on draggable elements ─── */
function EditDot({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const s = hovered ? 1.6 : 0.9 + Math.sin(t * 3) * 0.2
    ref.current.scale.setScalar(s)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = hovered ? 0.55 : 0.2
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#c96b36" transparent opacity={0.2} />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   STAIRCASE COMPONENT
   ═══════════════════════════════════════════════════════ */
function Staircase({ steps, width, depth, rise, run }: { steps: number, width: number, depth: number, rise: number, run: number }) {
  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => (
        <mesh 
          key={i} 
          position={[0, i * rise + rise/2, i * run + depth/2]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[width, rise, depth]} />
          <meshStandardMaterial color="#c96b36" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   PAVILION — the main building structure
   ═══════════════════════════════════════════════════════ */
function Pavilion({
  editMode,
  positions,
  rotations,
  dragRef,
  pavilionRef,
  orbitRef,
}: {
  editMode: boolean
  positions: Record<string, Vec3>
  rotations: Record<string, Vec3>
  dragRef: React.MutableRefObject<DragInfo | null>
  pavilionRef: React.MutableRefObject<THREE.Group>
  orbitRef: React.MutableRefObject<any>
}) {
  const groupRef = useRef<THREE.Group>(null!)

  // Assign pavilion ref for external access (drag coordinate conversion)
  useEffect(() => {
    pavilionRef.current = groupRef.current
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!editMode) {
      // Gentle float only (OrbitControls handles the main rotation now)
      groupRef.current.position.y = -0.2 + Math.sin(t * 1.2) * 0.025
    } else {
      groupRef.current.position.y = -0.2
    }
  })

  // Shared props for all draggable children
  const dp = { editMode, positions, rotations, dragRef, pavilionRef, orbitRef }

  // Opacity multiplier: higher in edit mode for better visibility
  const om = editMode ? 1.8 : 1

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>

      {/* ── Base Platform ── */}
      <Draggable id="base" {...dp}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.08, 2.2]} />
          <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
        </mesh>
      </Draggable>

      {/* ── Vertical Pillars ── */}
      {PILLAR_DEFAULTS.map((_, i) => (
        <Draggable key={`p${i}`} id={`p${i}`} {...dp}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.06, 1.7, 0.06]} />
            <meshStandardMaterial color="#1a1a18" roughness={0.4} metalness={0.7} />
          </mesh>
        </Draggable>
      ))}

      {/* ── Main Roof ── */}
      <Draggable id="roofMain" {...dp}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.08, 2.4]} />
          <meshStandardMaterial color="#c96b36" roughness={0.3} metalness={0.6} />
        </mesh>
      </Draggable>


      {/* ── Interior Floor Slabs ── */}
      <Draggable id="floor1" {...dp}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.04, 1.8]} />
          <meshStandardMaterial color="#1a1a18" roughness={0.7} metalness={0.2} />
        </mesh>
      </Draggable>
      <Draggable id="floor2" {...dp}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.04, 1.8]} />
          <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.2} />
        </mesh>
      </Draggable>

      {/* ── Staircases ── */}
      <Draggable id="stairs1" {...dp}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Staircase steps={14} width={0.4} depth={0.12} rise={0.05} run={0.08} />
        </group>
      </Draggable>
      <Draggable id="stairs2" {...dp}>
        <group rotation={[0, -Math.PI / 2, 0]}>
          <Staircase steps={10} width={0.4} depth={0.12} rise={0.05} run={0.08} />
        </group>
      </Draggable>
      <Draggable id="stairs3" {...dp}>
        <group rotation={[0, Math.PI, 0]}>
          <Staircase steps={11} width={0.4} depth={0.12} rise={0.05} run={0.08} />
        </group>
      </Draggable>

      {/* ── Glass Curtain Walls Removed for an open-air structure ── */}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   DECORATIVE ELEMENTS (unchanged from original)
   ═══════════════════════════════════════════════════════ */

function CrossBrace({ start, end }: { start: Vec3; end: Vec3 }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([...start, ...end]), 3))
    return geo
  }, [start, end])
  return (
    <ThreeLine geometry={geometry}>
      <ThreeLineBasicMaterial color="#c96b36" transparent opacity={0.45} />
    </ThreeLine>
  )
}

function OrbitingPlane({ radius, speed, offset, size, opacity, visible = true }: {
  radius: number; speed: number; offset: number; size: [number, number]; opacity: number; visible?: boolean
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (!visible) return
    const t = state.clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 0.7) * 0.3
    ref.current.rotation.x = t * 0.15
    ref.current.rotation.z = t * 0.1
  })
  if (!visible) return null
  return (
    <mesh ref={ref}>
      <planeGeometry args={size} />
      <meshBasicMaterial color="#c96b36" wireframe transparent opacity={opacity * 3.5} side={THREE.DoubleSide} />
    </mesh>
  )
}

function FloatingFragments({ visible = true }: { visible?: boolean }) {
  const fragments = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 2] as Vec3,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as Vec3,
      scale: 0.04 + Math.random() * 0.06,
      speed: 0.1 + Math.random() * 0.2,
    })), [])
  if (!visible) return null
  return <>{fragments.map((f, i) => <FloatingFragment key={i} {...f} index={i} />)}</>
}

function FloatingFragment({ position, rotation, scale, speed, index }: {
  position: Vec3; rotation: Vec3; scale: number; speed: number; index: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    ref.current.rotation.x = rotation[0] + t
    ref.current.rotation.y = rotation[1] + t * 0.7
    ref.current.position.y = position[1] + Math.sin(t + index) * 0.15
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={index % 3 === 0 ? '#c96b36' : '#1a1a18'} wireframe transparent opacity={0.25 + (index % 3) * 0.1} />
    </mesh>
  )
}

function GridFloor({ editMode = false }: { editMode?: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[12, 12, 24, 24]} />
      <meshBasicMaterial color="#1a1a18" wireframe transparent opacity={editMode ? 0.15 : 0.08} />
    </mesh>
  )
}

function SpiralGuide({ visible = true }: { visible?: boolean }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    if (!visible) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 200; i++) {
      const angle = i * 0.1
      const r = 0.05 * angle
      pts.push(new THREE.Vector3(Math.cos(angle) * r, (i / 200) * 2 - 1, Math.sin(angle) * r))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])
  if (!visible) return null
  return (
    <group ref={ref} position={[2.5, 0, -1]}>
      <ThreeLine geometry={geometry}>
        <ThreeLineBasicMaterial color="#c96b36" transparent opacity={0.35} />
      </ThreeLine>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   SCENE CONTENT — assembled inside Canvas
   ═══════════════════════════════════════════════════════ */
function SceneContent({
  editMode,
  positions,
  setPositions,
  rotations,
  setRotations,
}: {
  editMode: boolean
  positions: Record<string, Vec3>
  setPositions: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
  rotations: Record<string, Vec3>
  setRotations: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
}) {
  const dragRef = useRef<DragInfo | null>(null)
  const pavilionRef = useRef<THREE.Group>(null!)
  const orbitRef = useRef<any>(null)

  return (
    <>
      {/* Lighting & Environment */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} color="#c96b36" />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#c96b36" />

      {/* Camera controls — always active for 360 degree movement */}
      <OrbitControls
        ref={orbitRef}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.4}
        minPolarAngle={Math.PI / 8}
        dampingFactor={0.08}
        enableDamping
        autoRotate={!editMode}
        autoRotateSpeed={1.0}
      />

      {/* Drag handler — processes drag in useFrame */}
      <DragHandler dragRef={dragRef} setPositions={setPositions} setRotations={setRotations} orbitRef={orbitRef} />

      {/* Main Pavilion */}
      <Pavilion
        editMode={editMode}
        positions={positions}
        rotations={rotations}
        dragRef={dragRef}
        pavilionRef={pavilionRef}
        orbitRef={orbitRef}
      />

      {/* Decorative elements removed for a cleaner brutalist look */}

      {/* Realistic contact shadows mapping onto the floor */}
      <ContactShadows position={[0, -1.15, 0]} opacity={0.7} scale={10} blur={2} far={4} color="#1a1a18" />

      {/* Grid floor — more visible in edit mode */}
      <GridFloor editMode={editMode} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT — Canvas + Edit Mode UI Overlay
   ═══════════════════════════════════════════════════════ */
export function ArchitectureScene() {
  const [editMode, setEditMode] = useState(false)
  const [positions, setPositions] = useState<Record<string, Vec3>>({ ...DEFAULTS })
  const [rotations, setRotations] = useState<Record<string, Vec3>>({ ...ROT_DEFAULTS })

  const resetPositions = useCallback(() => {
    setPositions({ ...DEFAULTS })
    setRotations({ ...ROT_DEFAULTS })
  }, [])
  const toggleEdit = useCallback(() => setEditMode((v) => !v), [])

  return (
    <div
      className="absolute inset-0 z-[1] cursor-grab active:cursor-grabbing"
      style={{ pointerEvents: 'auto' }}
      onPointerMove={editMode ? (e) => e.stopPropagation() : undefined}
      onMouseMove={editMode ? (e) => e.stopPropagation() : undefined}
    >
      {/* ── Three.js Canvas ── */}
      <Canvas
        camera={{ position: [3.5, 2, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <SceneContent
          editMode={editMode}
          positions={positions}
          setPositions={setPositions}
          rotations={rotations}
          setRotations={setRotations}
        />
      </Canvas>

      {/* ── Edit Mode UI Panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          pointerEvents: 'auto',
          zIndex: 50,
        }}
      >
        <div
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: editMode
              ? 'rgba(201, 107, 54, 0.08)'
              : 'rgba(255, 255, 255, 0.45)',
            border: `1px solid ${editMode ? 'rgba(201, 107, 54, 0.2)' : 'rgba(26, 26, 24, 0.06)'}`,
            borderRadius: '16px',
            padding: editMode ? '16px' : '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            minWidth: editMode ? '200px' : 'auto',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: editMode
              ? '0 8px 32px rgba(201, 107, 54, 0.1)'
              : '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* Toggle button */}
          <button
            onClick={toggleEdit}
            style={{
              background: editMode
                ? 'linear-gradient(135deg, #c96b36, #d4845a)'
                : 'rgba(26, 26, 24, 0.04)',
              color: editMode ? '#fff' : '#1a1a18',
              border: editMode ? 'none' : '1px solid rgba(26,26,24,0.08)',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Montserrat','black' sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {editMode ? '✓ Done' : 'Customize'}
          </button>

          {/* Edit mode controls */}
          {editMode && (
            <>
              <button
                onClick={resetPositions}
                style={{
                  background: 'rgba(26, 26, 24, 0.04)',
                  color: '#5e5b54',
                  border: '1px solid rgba(26,26,24,0.08)',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  fontSize: '10px',
                  fontWeight: 600,
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                ↺ Reset Layout
              </button>

              <p
                style={{
                  fontSize: '10px',
                  color: '#5e5b54',
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                }}
              >
               Drag to move · Shift+drag or right-drag to rotate 360°.
               <br />
               Right‑drag canvas to orbit camera.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
