import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { Button } from '../src/index';

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
};

export const Text = () => (
  <Button
    variant={select(
      'variant',
      ['primary', 'secondary', 'success', 'error'],
      'primary',
    )}
    disabled={boolean('disabled', false)}
    onClick={action('clicked')}
  >
    Hello Button
  </Button>
);

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
