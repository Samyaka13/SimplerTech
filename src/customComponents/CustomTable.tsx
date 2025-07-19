import {
  Avatar,
  Box,
  createListCollection,
  Flex,
  HStack,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';


const frameworks = createListCollection({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
  ],
});

const users = [
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


function CustomTable() {
  return (
    <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
      <VStack m={3} borderTopRadius="md" gap={4}>

        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" color={'black'} fontWeight="bold">
            Users
          </Text>

          <HStack gap={4} flex={1} justifyContent="flex-end">
            <InputGroup maxW="80" startElement={<LuSearch />}>
              <Input color={'black'} bg={'gray.100'} placeholder="Search Users" />
            </InputGroup>

            <HStack>
              <Text fontSize="sm" color="gray.600">
                Status:
              </Text>
              <Select.Root
                collection={frameworks}
                size="md"
                bg={"gray.100"}
                width="40"
                defaultValue={['all']}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText color={'black'} placeholder="Select status" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {frameworks.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </HStack>

            <HStack>
              <Text fontSize="sm" color="gray.600">
                Category:
              </Text>
              <Select.Root
                collection={frameworks}
                size="md"
                width="40"
                bg={"gray.100"}
                defaultValue={['all']}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText color={'black'} placeholder="Select category" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {frameworks.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </HStack>
          </HStack>
        </Flex>

        <Box w="full" bg="gray.100" py={2} borderRadius="md">
          <HStack px={4} gap={1} justifyContent="space-between">
            <Text w={"25%"} fontSize="lg" fontWeight={'semibold'} color="black">
              Name
            </Text>
            <Text w={"25%"} pl={28} fontSize="lg" fontWeight={'semibold'} color="black">
              Email
            </Text>
            <Text w={"25%"} pl={28} fontSize="lg" fontWeight={'semibold'} color="black">
              Mobile
            </Text>
            <Text w={"25%"} pl={20} fontSize="lg" fontWeight={'semibold'} color="black">
              Status
            </Text>
          </HStack>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          w="full"
          maxHeight="550px"
          overflowY="auto"
          borderRadius="md"
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#a8a8a8',
            },
          }}
        >
          {users.map((user, index) => (
            <Box
              key={index}
              w="full"
              bg="white"
              borderBottom="0.5px solid"
              borderColor="gray.200"
              py={3}
            >
              <HStack px={4} gap={6} justifyContent="space-between">
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src= {user.avatar} />
                </Avatar.Root>
                <Text color={'black'} w="25%">{user.name}</Text>
                <Text color={'black'} w="25%">{user.email}</Text>
                <Text color={'black'} w="20%">{user.mobile}</Text>
                <Text color={'black'} w="20%">{user.status}</Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}

export default CustomTable;
