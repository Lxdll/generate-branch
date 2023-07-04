/**
 * @author: lxdll
 * 存放一些工具函数
 */

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants"
import { Point } from "../types"

export const getEndPoint = (startPoint: Point, branchLength: number, angle: number) => {
  return {
    x: startPoint.x + branchLength * Math.sin(angle),
    y: startPoint.y + branchLength * Math.cos(angle)
  }
}

export const initCanvas = (
  originalCanvasElement: HTMLCanvasElement | null, 
  width = CANVAS_WIDTH, 
  height = CANVAS_HEIGHT
) => {
  if (!originalCanvasElement) return

  const ctx = originalCanvasElement.getContext('2d')

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error 忽略错误
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
  const dpi = dpr / bsr

  originalCanvasElement.style.width = `${width}px`
  originalCanvasElement.style.height = `${height}px`
  originalCanvasElement.width = dpi * width
  originalCanvasElement.height = dpi * height
  ctx?.scale(dpi, dpi)

  return ctx
}