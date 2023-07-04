import { useRef, useLayoutEffect } from "react"
import { CANVAS_WIDTH, CANVAS_HEIGHT, r15, r180, r90, BASIC_BRANCH_LENGTH } from './constants'
import { getEndPoint, initCanvas } from "./tool"
import { GenerateBranchTask, Point } from "./types"

const { random } = Math

function GenerateBranch() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const init = () => {
    const ctx = initCanvas(canvasRef.current)
    if (!ctx) return
    
    let iterations = 0
    let frameCount = 0
    let generateBranchTasks: GenerateBranchTask[] = []
    let prevGenerateBranchTasks: GenerateBranchTask[] = []

    const step = (startPoint: Point, angle: number) => {
      const branchLength = random() * BASIC_BRANCH_LENGTH
  
      const endPoint = getEndPoint(startPoint, branchLength, angle)
      
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(endPoint.x, endPoint.y)
      ctx.stroke()

      const angle1 = angle + random() * r15
      const angle2 = angle - random() * r15

      if (endPoint.x < -100 || endPoint.x > 500 || endPoint.y < -100 || endPoint.y > 500) return
  
      if (iterations <= 5 || Math.random() > 0.5) {
        generateBranchTasks.push(() => {
          step(endPoint, angle1)
        })
      }
  
  
      if (iterations <= 5 || Math.random() > 0.5) {
        generateBranchTasks.push(() => {
          step(endPoint, angle2)
        })
      }
    }

    const frame = () => {
      iterations += 1
      prevGenerateBranchTasks = generateBranchTasks
      generateBranchTasks = []
      prevGenerateBranchTasks.forEach(fn => fn())
    }

    const startAnimation = () => {
      requestAnimationFrame(() => {
        frameCount += 1
        if (frameCount % 3 === 0)
          frame()
        startAnimation()
      })
    }

    const run = () => {
      ctx.lineWidth = 1
      ctx.strokeStyle = '#00000040'
      prevGenerateBranchTasks = []
      generateBranchTasks = random() < 0.5
        ? [
          () => step({ x: 0, y: random() * 400 }, 0),
          () => step({ x: 400, y: random() * 400 }, r180)
        ]
        : [
          () => step({ x: random() * 400, y: 0 }, r90),
          () => step({ x: random() * 400, y: 400 }, -r90)
        ]

      startAnimation()
    }

    run()
  }

  useLayoutEffect(() => {
    init()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ 
        border: '1px solid #ccc',
      }}
    />
  )
}

export default GenerateBranch
