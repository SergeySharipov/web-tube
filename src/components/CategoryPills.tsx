import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"

type CategoryPillProp = {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProp) {
  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const TRANSLATE_AMOUNT = 200

  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target
      if (container == null) return 0

      setIsLeftVisible(translate > 0)
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div ref={containerRef} className="overflow-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map(category => (
          <Button
            key={category}
            variant={category === selectedCategory ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5 pointer-events-auto"
            onClick={() =>
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT

                if (newTranslate <= 0) return 0

                return newTranslate
              })
            }
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 flex justify-end pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5 pointer-events-auto"
            onClick={() =>
              setTranslate((translate) => {
                if (containerRef?.current == null) return translate

                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth

                if (newTranslate + width >= edge) {
                  return edge - width
                }

                return newTranslate
              })
            }
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
