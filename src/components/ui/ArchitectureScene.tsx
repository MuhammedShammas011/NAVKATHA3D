import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

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
}

/* ═══════════════════════════════════════════════════════
   DRAG HANDLER — runs in useFrame for smooth updates
   ═══════════════════════════════════════════════════════ */
function DragHandler({
  dragRef,
  setPositions,
  orbitRef,
}: {
  dragRef: React.MutableRefObject<DragInfo | null>
  setPositions: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
  orbitRef: React.MutableRefObject<any>
}) {
  const { pointer, camera, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const hit = useRef(new THREE.Vector3())

  // Every frame: if dragging, project pointer onto drag plane and move target
  useFrame(() => {
    const info = dragRef.current
    if (!info) return
    raycaster.current.setFromCamera(pointer, camera)
    if (raycaster.current.ray.intersectPlane(info.plane, hit.current)) {
      const world = hit.current.clone().add(info.offset)
      const local = info.pavilionGroup.worldToLocal(world)
      info.target.position.copy(local)
    }
  })

  // Pointer-up: sync final position to React state, re-enable orbit
  useEffect(() => {
    const el = gl.domElement
    const onUp = () => {
      const info = dragRef.current
      if (!info) return
      const p = info.target.position
      setPositions((prev) => ({ ...prev, [info.id]: [p.x, p.y, p.z] }))
      dragRef.current = null
      document.body.style.cursor = 'default'
      if (orbitRef.current) orbitRef.current.enabled = true
    }
    el.addEventListener('pointerup', onUp)
    return () => el.removeEventListener('pointerup', onUp)
  }, [gl, dragRef, setPositions, orbitRef])

  return null
}

/* ═══════════════════════════════════════════════════════
   DRAGGABLE WRAPPER — makes any child element grabbable
   ═══════════════════════════════════════════════════════ */
function Draggable({
  id,
  editMode,
  positions,
  dragRef,
  pavilionRef,
  orbitRef,
  children,
}: {
  id: string
  editMode: boolean
  positions: Record<string, Vec3>
  dragRef: React.MutableRefObject<DragInfo | null>
  pavilionRef: React.MutableRefObject<THREE.Group>
  orbitRef: React.MutableRefObject<any>
  children: React.ReactNode
}) {
  const { camera, gl } = useThree()
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const pos = positions[id] || DEFAULTS[id]

  return (
    <group
      ref={ref}
      position={pos}
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
        document.body.style.cursor = 'grabbing'

        // Disable orbit while dragging
        if (orbitRef.current) orbitRef.current.enabled = false

        // Get this element's world position
        const worldPos = new THREE.Vector3()
        ref.current.getWorldPosition(worldPos)

        // Create a drag plane at the click point, facing the camera
        const plane = new THREE.Plane()
        const normal = camera.position.clone().sub(e.point).normalize()
        plane.setFromNormalAndCoplanarPoint(normal, e.point)

        // Offset from click point to element center (in world space)
        const offset = worldPos.clone().sub(e.point)

        dragRef.current = {
          id,
          plane,
          offset,
          target: ref.current,
          pavilionGroup: pavilionRef.current,
        }

        // Capture pointer so drag works even if cursor leaves canvas
        gl.domElement.setPointerCapture(e.nativeEvent.pointerId)
      }}
    >
      {children}
      {/* Pulsing edit indicator dot */}
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
   PAVILION — the main building structure
   ═══════════════════════════════════════════════════════ */
function Pavilion({
  editMode,
  positions,
  dragRef,
  pavilionRef,
  orbitRef,
}: {
  editMode: boolean
  positions: Record<string, Vec3>
  dragRef: React.MutableRefObject<DragInfo | null>
  pavilionRef: React.MutableRefObject<THREE.Group>
  orbitRef: React.MutableRefObject<any>
}) {
  const groupRef = useRef<THREE.Group>(null!)

  // Assign pavilion ref for external access (drag coordinate conversion)
  useEffect(() => {
    pavilionRef.current = groupRef.current
  })

  // Animation with clean pause/resume
  const pauseAccum = useRef(0)
  const wasPaused = useRef(false)
  const pauseStart = useRef(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (editMode && !wasPaused.current) {
      pauseStart.current = t
      wasPaused.current = true
    }
    if (!editMode && wasPaused.current) {
      pauseAccum.current += t - pauseStart.current
      wasPaused.current = false
    }
    if (!editMode) {
      const adj = t - pauseAccum.current
      groupRef.current.rotation.y = adj * 0.06
      groupRef.current.position.y = -0.2 + Math.sin(adj * 0.3) * 0.08
      // Gentle float
      groupRef.current.position.y += Math.sin(adj * 1.2) * 0.025
      groupRef.current.rotation.x = Math.sin(adj * 0.6) * 0.008
    }
  })

  // Shared props for all draggable children
  const dp = { editMode, positions, dragRef, pavilionRef, orbitRef }

  // Opacity multiplier: higher in edit mode for better visibility
  const om = editMode ? 1.8 : 1

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>

      {/* ── Base Platform ── */}
      <Draggable id="base" {...dp}>
        <mesh receiveShadow>
          <boxGeometry args={[3.2, 0.06, 2.2]} />
          <meshStandardMaterial color="#c96b36" roughness={0.4} metalness={0.3} transparent opacity={Math.min(0.35 * om, 1.0)} />
        </mesh>
        <mesh>
          <boxGeometry args={[3.2, 0.06, 2.2]} />
          <meshBasicMaterial color="#c96b36" wireframe transparent opacity={Math.min(0.35 * om, 1.0)} />
        </mesh>
      </Draggable>

      {/* ── Vertical Pillars ── */}
      {PILLAR_DEFAULTS.map((_, i) => (
        <Draggable key={`p${i}`} id={`p${i}`} {...dp}>
          <mesh>
            <boxGeometry args={[0.04, 1.7, 0.04]} />
            <meshStandardMaterial color="#1a1a18" roughness={0.6} metalness={0.2} transparent opacity={Math.min(0.5 * om, 1.0)} />
          </mesh>
        </Draggable>
      ))}

      {/* ── Main Roof ── */}
      <Draggable id="roofMain" {...dp}>
        <mesh castShadow>
          <boxGeometry args={[3.4, 0.05, 2.4]} />
          <meshStandardMaterial color="#c96b36" roughness={0.3} metalness={0.4} transparent opacity={Math.min(0.35 * om, 1.0)} />
        </mesh>
        <mesh>
          <boxGeometry args={[3.4, 0.05, 2.4]} />
          <meshBasicMaterial color="#c96b36" wireframe transparent opacity={Math.min(0.8 * om, 1.0)} />
        </mesh>
      </Draggable>


      {/* ── Interior Floor Slabs ── */}
      <Draggable id="floor1" {...dp}>
        <mesh>
          <boxGeometry args={[2.8, 0.02, 1.8]} />
          <meshStandardMaterial color="#1a1a18" roughness={0.5} transparent opacity={Math.min(0.3 * om, 0.8)} />
        </mesh>
      </Draggable>
      <Draggable id="floor2" {...dp}>
        <mesh>
          <boxGeometry args={[2.2, 0.02, 1.6]} />
          <meshStandardMaterial color="#1a1a18" roughness={0.5} transparent opacity={Math.min(0.25 * om, 0.8)} />
        </mesh>
      </Draggable>

      {/* ── Glass Curtain Walls (fixed, not draggable) ── */}
      <mesh position={[0, 0, 1.05]}>
        <planeGeometry args={[3.0, 1.7]} />
        <meshPhysicalMaterial color="#e8dcc8" transparent opacity={0.15} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.55, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.0, 1.7]} />
        <meshPhysicalMaterial color="#e8dcc8" transparent opacity={0.15} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
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
    <line geometry={geometry}>
      {/* @ts-ignore */}
      <lineBasicMaterial color="#c96b36" transparent opacity={0.45} />
    </line>
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
      <line geometry={geometry}>
        {/* @ts-ignore */}
        <lineBasicMaterial color="#c96b36" transparent opacity={0.35} />
      </line>
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
}: {
  editMode: boolean
  positions: Record<string, Vec3>
  setPositions: React.Dispatch<React.SetStateAction<Record<string, Vec3>>>
}) {
  const dragRef = useRef<DragInfo | null>(null)
  const pavilionRef = useRef<THREE.Group>(null!)
  const orbitRef = useRef<any>(null)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#f5f2eb" />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#f0d9c0" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#c96b36" />
      <pointLight position={[0, 3, 0]} intensity={0.2} color="#c96b36" />

      {/* Camera controls — edit mode only */}
      {editMode && (
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 8}
          dampingFactor={0.08}
          enableDamping
        />
      )}

      {/* Drag handler — processes drag in useFrame */}
      <DragHandler dragRef={dragRef} setPositions={setPositions} orbitRef={orbitRef} />

      {/* Main Pavilion */}
      <Pavilion
        editMode={editMode}
        positions={positions}
        dragRef={dragRef}
        pavilionRef={pavilionRef}
        orbitRef={orbitRef}
      />

      {/* Decorative elements — hidden in edit mode for clarity */}
      <OrbitingPlane radius={3} speed={0.15} offset={0} size={[0.6, 0.4]} opacity={0.06} visible={!editMode} />
      <OrbitingPlane radius={3.5} speed={0.1} offset={Math.PI} size={[0.5, 0.35]} opacity={0.04} visible={!editMode} />
      <OrbitingPlane radius={2.8} speed={0.12} offset={Math.PI / 2} size={[0.4, 0.3]} opacity={0.05} visible={!editMode} />
      <FloatingFragments visible={!editMode} />
      <SpiralGuide visible={!editMode} />

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

  const resetPositions = useCallback(() => setPositions({ ...DEFAULTS }), [])
  const toggleEdit = useCallback(() => setEditMode((v) => !v), [])

  return (
    <div
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: editMode ? 'auto' : 'none' }}
      onPointerMove={editMode ? (e) => e.stopPropagation() : undefined}
      onMouseMove={editMode ? (e) => e.stopPropagation() : undefined}
    >
      {/* ── Three.js Canvas ── */}
      <Canvas
        camera={{ position: [3.5, 2, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: editMode ? 'auto' : 'none' }}
      >
        <SceneContent editMode={editMode} positions={positions} setPositions={setPositions} />
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
                Drag elements to reposition.
                <br />
                Right‑drag to orbit.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
