import clsx from 'clsx'
import range from 'lodash-es/range'
import { PropsWithChildren, ReactNode, useContext } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { TreeContext } from './TreeContext'
import './TreeNode.scss'

export interface TreeNodeProps {
  level: number // start from 0
  lastNode?: boolean
  title?: ReactNode
  details?: ReactNode

  expandable?: boolean
  expanded?: boolean
  onToggleExpanded?(): void
}

export default function TreeNode({
  title,
  details,

  level,
  lastNode,
  children,

  expandable,
  expanded,
  onToggleExpanded,
}: PropsWithChildren<TreeNodeProps>) {
  const options = useContext(TreeContext)
  const indent = options.indent ?? 20
  const isRoot = level === 0

  const cssVars = {
    '--chevron-color': 'var(--border-color)',
    '--outline-color': 'var(--border-color)',
    '--indent-width': `${indent}px`,
    '--head-width': '26px',
  }
  return (
    <div
      className="handtree-root"
      // @ts-ignore
      style={{
        ...cssVars,
      }}
    >
      <div
        className="handtree-node"
        style={{
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* indent */}
        {range(level).map((i) => {
          const ignoreIndentOutline = options.ancestorLastTrail[i]
          return (
            <div
              key={i}
              className={clsx(['handtree-indent', ignoreIndentOutline && 'handtree-ignore'])}
              style={{
                width: indent,
              }}
            ></div>
          )
        })}

        {/* content with title and main */}
        <div className="handtree-content">
          <div className="handtree-title" style={{ display: 'flex' }}>
            {/* head */}
            <div
              className={clsx([
                'handtree-head',
                isRoot && 'handtree-headless',
                lastNode && 'handtree-last-node',
                expandable && 'handtree-expandable',
                options.classNames?.chevron,
              ])}
              onClick={onToggleExpanded}
            >
              {expandable && <>{expanded ? <VscChevronDown /> : <VscChevronRight />}</>}
            </div>
            <div style={{ flexGrow: 1 }}>{title}</div>
          </div>
          {details && (
            <div
              className={clsx([
                'handtree-details',
                !!children && 'handtree-expandable',
                lastNode && 'handtree-last-node',
                !expanded && 'handtree-collapsed',
              ])}
            >
              <div>{details}</div>
            </div>
          )}
        </div>
      </div>

      {/* children */}
      {expanded && (
        <TreeContext.Provider
          value={{
            indent,
            ancestorLastTrail: [
              ...options.ancestorLastTrail,
              lastNode ?? false,
            ],
            classNames: options.classNames,
          }}
        >
          <div className="handtree-children">{children}</div>
        </TreeContext.Provider>
      )}
    </div>
  )
}
