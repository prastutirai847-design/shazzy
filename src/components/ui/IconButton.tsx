import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cx } from '../../lib/cx'
import styles from './IconButton.module.css'

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'title'> {
  label: string
  variant?: 'plain' | 'surface'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function IconButton({
  label,
  variant = 'plain',
  size = 'md',
  className,
  type = 'button',
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(styles.iconButton, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

interface IconLinkProps
  extends Omit<LinkProps, 'aria-label' | 'title' | 'className' | 'children'> {
  label: string
  variant?: 'plain' | 'surface'
  size?: 'sm' | 'md'
  className?: string
  children: ReactNode
}

export function IconLink({
  label,
  variant = 'plain',
  size = 'md',
  className,
  children,
  ...rest
}: IconLinkProps) {
  return (
    <Link
      aria-label={label}
      title={label}
      className={cx(styles.iconButton, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </Link>
  )
}
