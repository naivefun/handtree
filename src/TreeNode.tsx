import clsx from 'clsx'
import range from 'lodash-es/range'
import { PropsWithChildren, ReactNode, useContext } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { TreeContext } from './TreeContext'
import styles from './TreeNode.module.scss'

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
      className={styles.root}
      // @ts-ignore
      style={{
        ...cssVars,
      }}
    >
      <div
        className={styles.node}
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
              className={clsx([styles.indent, ignoreIndentOutline && styles.ignore])}
              style={{
                width: indent,
              }}
            ></div>
          )
        })}

        {/* content with title and main */}
        <div className={styles.content}>
          <div className={styles.title} style={{ display: 'flex' }}>
            {/* head */}
            <div
              className={clsx([
                styles.head,
                isRoot && styles.headless,
                lastNode && styles.lastNode,
                expandable && styles.expandable,
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
                styles.details,
                !!children && styles.expandable,
                lastNode && styles.lastNode,
                !expanded && styles.collpased,
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
          <div className={styles.children}>{children}</div>
        </TreeContext.Provider>
      )}
    </div>
  )
}
