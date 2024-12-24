import { type ElementType, useRef, useState, useId } from 'react'
import {
  useFloating,
  useInteractions,
  useHover,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
  FloatingFocusManager,
  FloatingArrow,
  useTransitionStyles,
  useFocus,
  useDismiss,
  safePolygon
} from '@floating-ui/react'
const ARROW_WIDTH = 15
const ARROW_HEIGHT = 10

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popoverv2({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<SVGSVGElement>(null)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(ARROW_HEIGHT), flip({ padding: 5 }), shift({ padding: 5 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    placement
  })

  const arrowX = middlewareData.arrow?.x ?? 0
  const arrowY = middlewareData.arrow?.y ?? 0
  const transformX = arrowX + ARROW_WIDTH / 2
  const transformY = arrowY + ARROW_HEIGHT

  const hover = useHover(context, { handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const id = useId()

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss])

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: 'scale(0)'
    },
    common: ({ side }) => ({
      transformOrigin: {
        top: `${transformX}px calc(100% + ${ARROW_HEIGHT}px)`,
        bottom: `${transformX}px ${-ARROW_HEIGHT}px`,
        left: `calc(100% + ${ARROW_HEIGHT}px) ${transformY}px`,
        right: `${-ARROW_HEIGHT}px ${transformY}px`
      }[side]
    })
  })

  return (
    <Element ref={refs.setReference} {...getReferenceProps()} className={className} id={id}>
      {children}
      {isMounted && (
        <FloatingFocusManager context={context} modal={false} disabled>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            <div style={styles} className='floating'>
              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                className='fill-white'
              />
              {renderPopover}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </Element>
  )
}
