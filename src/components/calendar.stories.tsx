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
    test: "TEST"
  }
}
