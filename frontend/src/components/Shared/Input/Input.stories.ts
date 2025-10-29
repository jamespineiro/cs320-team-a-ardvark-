import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Type here',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true,
        placeholder: 'Cannot type',
    },
};