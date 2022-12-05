import { SelectOption } from '@mui/base';
import { SxProps, Theme } from '@mui/material/styles';

export const DRAWER_WIDTH: number = 220;

export const MAX_CHART_PLOT_POINTS = 5;

export const DEFAULT_NOTIFICATION_DURATION: number = 12000;

export const EMAIL_FROM = 'noreply@motherhonestly.com';

export const ALLOCATION_FIELDS = [
  'Wellbeing',
  'Learning & Development',
  'Caregiving',
  'Remote & Hybrid',
  'Rewards & Recognition',
  'Family Building'
];

export const BACKGROUND_IMAGE_SX: SxProps<Theme> = {
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'background.default',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
};

export const ROLES: SelectOption<string>[] = [
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Member',
    label: 'Member'
  }
];

export const RELATIONSHIP_STATUS_OPTIONS: SelectOption<string>[] = [
  {
    value: 'single',
    label: 'Single'
  },
  {
    value: 'married',
    label: 'Married'
  },
  {
    value: 'committed',
    label: 'Committed'
  }
];

export const QUANTITY_OPTIONS: SelectOption<string>[] = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5+',
    label: '5+'
  }
];

export const BOOL_OPTIONS: SelectOption<string>[] = [
  {
    value: 'yes',
    label: 'Yes'
  },
  {
    value: 'no',
    label: 'No'
  }
];

export const IDENTITY_OPTIONS: SelectOption<string>[] = [
  {
    value: 'she/her',
    label: 'She/Her'
  },
  {
    value: 'he/him',
    label: 'He/Him'
  },
  {
    value: 'they/them',
    label: 'They/Them'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

export const RACE_OPTIONS: SelectOption<string>[] = [
  {
    value: 'Native American',
    label: 'Native American'
  },
  {
    value: 'Asian',
    label: 'Asian'
  },
  {
    value: 'Black or African American',
    label: 'Black or African American'
  },
  {
    value: 'Native Hawaiian or Other Pacific Islander',
    label: 'Native Hawaiian or Other Pacific Islander'
  },
  {
    value: 'Hispanic, Latino, or Spanish origin',
    label: 'Hispanic, Latino, or Spanish origin'
  },
  {
    value: 'White',
    label: 'White'
  },
  {
    value: 'Unknown',
    label: 'Unknown'
  },
  {
    value: 'Other/Prefer to self-describe',
    label: 'Other/Prefer to self-describe'
  },
  {
    value: "Don't wish to answer",
    label: "Don't wish to answer"
  }
];

export const CARE_RESPONSIBILITY_OPTIONS: SelectOption<string>[] = [
  {
    value: 'self',
    label: 'Self'
  },
  {
    value: 'child',
    label: 'Child'
  },
  {
    value: 'parent',
    label: 'Parent'
  },
  {
    value: 'extended_family',
    label: 'Extended family'
  },
  {
    value: 'family_of_choice',
    label: 'Family of choice'
  },
  {
    value: 'household',
    label: 'Household'
  },
  {
    value: 'pet',
    label: 'Pet'
  }
];

export const CALENDAR_TYPES: Array<SelectOption<string>> = [
  {
    label: 'Google Calendar',
    value: 'GOOGLE'
  },
  {
    label: 'Outlook',
    value: 'OUTLOOK'
  },
  {
    label: 'Apple Calendar',
    value: 'APPLE'
  }
];

const FILE_TYPES: Array<string> = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon'
];
