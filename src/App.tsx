import { useRef, useEffect } from "react"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const init = () => {
    const ctx = canvasRef.current?.getContext('2d')
    console.log('%c [ ctx ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', ctx)

    if (!ctx) return

    ctx.strokeStyle = 'black'
    ctx.beginPath();
    ctx.moveTo(30, 50)
    ctx.lineTo(100, 25);
    ctx.stroke();
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: '1px solid #ccc' }}
    />
  )
}

export default App
