import * as React from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error'
  disabled?: boolean
}

export interface ButtonGroupProps {
  title?: string
}

declare class ButtonGroup extends React.Component<ButtonGroupProps> {}

declare class Button extends React.Component<ButtonProps> {
  static Group: typeof ButtonGroup
}

export default Button
