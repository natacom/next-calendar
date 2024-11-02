import type { Meta, StoryObj } from '@storybook/react';
import Calendar from "./calendar"
import styles from './calendar.stories.module.css'

const meta = {
  title: "Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
  args: {
    startDoWIndex: 6,
    month: 1,
    year: 2024,
    contents: {
      '20231230': 'test 1',
      '20240101': 'test 2',
      '20240106': 'test 3',
      '20240201': 'test 4',
    }
  }
}

export const Styles: Story = {
  args: {
    startDoWIndex: 1,
    month: 1,
    year: 2024,
    contents: {
      '20240118': 'test',
    },
    tableClassName: styles.testTableClass,
    tableStyle: {
      boxShadow: "0 2px 4px #6663",
    },
    cellClassNames: {
      '20240102': styles.testCellClass1,
    },
    cellStyles: {
      '20240118': { background: 'cyan', color: 'purple' },
      '20240130': { textShadow: '0 2px 3px #050', fontWeight: 'bold' },
    }
  }
}

export const LongContents: Story = {
  args: {
    startDoWIndex: 1,
    month: 1,
    year: 2024,
    contents: {
      '20240101': '01234567890123456789012345678901234567890123456789',
      '20240109': '0123456789 0123456789 0123456789 0123456789 0123456789',
      '20240117': 'This_is_a_long_sample_sentence.',
      '20240125': 'This is a long sample sentence.',
    },
    tableStyle: {
      boxShadow: "0 2px 4px #6663",
    }
  }
}
