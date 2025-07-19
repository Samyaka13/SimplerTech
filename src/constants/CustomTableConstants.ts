import { createListCollection } from "@chakra-ui/react";

export const status = createListCollection ({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
  ],
});



export const users = [
  {
    name: 'Alice Sharma',
    email: 'alice.sharma@example.com',
    mobile: '9876543210',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/150?u=alice.sharma',
  },
  {
    name: 'Bob Singh',
    email: 'bob.singh@example.com',
    mobile: '9123456780',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/150?u=bob.singh',
  },
  {
    name: 'Chetan Desai',
    email: 'chetan.desai@example.com',
    mobile: '9090909090',
    status: 'Overdue',
    avatar: 'https://i.pravatar.cc/150?u=chetan.desai',
  },
  {
    name: 'Divya Rao',
    email: 'divya.rao@example.com',
    mobile: '9812345678',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/150?u=divya.rao',
  },
  {
    name: 'Eshan Mehta',
    email: 'eshan.mehta@example.com',
    mobile: '9345678901',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/150?u=eshan.mehta',
  },
  {
    name: 'Farah Khan',
    email: 'farah.khan@example.com',
    mobile: '9234567812',
    status: 'Overdue',
    avatar: 'https://i.pravatar.cc/150?u=farah.khan',
  },
  {
    name: 'Gautam Bansal',
    email: 'gautam.b@example.com',
    mobile: '9011122233',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/150?u=gautam.b',
  },
  {
    name: 'Heena Sheikh',
    email: 'heena.sheikh@example.com',
    mobile: '9877770000',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/150?u=heena.sheikh',
  },
  {
    name: 'Irfan Ali',
    email: 'irfan.ali@example.com',
    mobile: '9345612345',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/150?u=irfan.ali',
  },
  {
    name: 'Jaya Nair',
    email: 'jaya.nair@example.com',
    mobile: '8888888888',
    status: 'Overdue',
    avatar: 'https://i.pravatar.cc/150?u=jaya.nair',
  },
  {
    name: 'Karan Sood',
    email: 'karan.sood@example.com',
    mobile: '9000009999',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/150?u=karan.sood',
  },
  {
    name: 'Lavanya Iyer',
    email: 'lavanya.iyer@example.com',
    mobile: '9223344556',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/150?u=lavanya.iyer',
  },
];



export const ITEMS_PER_PAGE = 5;
