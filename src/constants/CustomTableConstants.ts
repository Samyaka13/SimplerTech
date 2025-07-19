import { createListCollection } from "@chakra-ui/react";

export const status = createListCollection ({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
  ],
});