import { createListCollection } from "@chakra-ui/react";

export const status = createListCollection ({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
  ],
});





export type User = {
  name: string;
  email: string;
  mobile: string;
  status: string;
  avatar: string;
};

export const ITEMS_PER_PAGE = 5;
