import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  titleId?: string
  description?: string
  meta?: ReactNode
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  meta,
  action,
}: SectionHeadingProps) {
  return (
    <header className={styles.header}>
      <div className={styles.copy}>
        {eyebrow ? (
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <div className={styles.titleRow}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {meta ? <div className={styles.meta}>{meta}</div> : null}
        </div>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  )
}
