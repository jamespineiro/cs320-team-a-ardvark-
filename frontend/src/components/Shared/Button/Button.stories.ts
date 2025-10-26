import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        text: 'Click me',
        type: 'button',
    },
};

export const Submit: Story = {
    args: {
        text: 'Submit',
        type: 'submit',
    },
};

export const WithLongText: Story = {
    args: {
        text: 'This is a longer button label to show wrapping/spacing behavior',
        type: 'button',
    },
};