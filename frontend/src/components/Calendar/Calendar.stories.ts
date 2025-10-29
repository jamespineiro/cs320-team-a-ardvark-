import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

// Default export: metadata about this component for Storybook
const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar', // how it appears in the Storybook sidebar
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Type alias for cleaner story definitions
type Story = StoryObj<typeof Calendar>;

// Example story: Default Calendar
export const Default: Story = {
  args: {
    // pass any props Calendar expects, e.g.:
    initialView: 'dayGridMonth',
    events: [
      { title: 'Meeting', date: '2025-10-29' },
      { title: 'Project Deadline', date: '2025-10-30' },
    ],
  },
};

// Another example story: Calendar with no events
export const Empty: Story = {
  args: {
    initialView: 'dayGridMonth',
    events: [],
  },
};