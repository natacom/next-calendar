import type { Meta, StoryObj } from '@storybook/react';
import Calendar from "./calendar"

const meta = {
  title: "Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    startDoWIndex: 1,
    month: 1,
    year: 2024,
    contents: {
      '20241028': <span style={{color: 'red', fontWeight: 'bold'}}>TEST</span>,
      '20241001': 'This is a long sample sentence.',
      '20241006': 'This_is_a_long_sample_sentence.',
      '20241101': 'Next month sample contents',
    },
    style: {
      boxShadow: "0 2px 4px #6663",
    }
  }
}
