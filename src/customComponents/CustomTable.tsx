import { status } from '@/constants/CustomTableConstants';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { LuSearch } from 'react-icons/lu';
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

const ITEMS_PER_PAGE = 5;

function CustomTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.mobile.includes(searchTerm.trim()) ||
          user.status.toLowerCase().includes(searchLower)
        );
      });
    }

    if (statusFilter.length > 0 && statusFilter[0] !== 'all') {
      filtered = filtered.filter((user) =>
        user.status.toLowerCase() === statusFilter[0].toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
      <VStack m={3} borderTopRadius="md" gap={4}>

        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" color={'black'} fontWeight="bold">
            Users ({filteredUsers.length})
          </Text>

          <HStack gap={4} flex={1} justifyContent="flex-end">
            <InputGroup maxW="80" startElement={<LuSearch />}>
              <Input
                color={'black'}
                bg={'gray.100'}
                placeholder="Search by name, email, mobile, or status"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <HStack>
              <Text fontSize="sm" color="gray.600">
                Status:
              </Text>
              <Select.Root
                collection={status}
                size="md"
                bg={"gray.100"}
                width="40"
                value={statusFilter}
                onValueChange={(e) => setStatusFilter(e.value)}
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
                      {status.items.map((item) => (
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


        <Box
          w="full"
          minHeight="400px"
          borderRadius="md"
        >
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <Box
                key={startIndex + index}
                w="full"
                bg="white"
                borderBottom="0.5px solid"
                borderColor="gray.200"
                py={3}
              >
                <HStack px={4} gap={6} justifyContent="space-between">
                  <Avatar.Root>
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.avatar} />
                  </Avatar.Root>
                  <Text color={'black'} w="25%">{user.name}</Text>
                  <Text color={'black'} w="25%">{user.email}</Text>
                  <Text color={'black'} w="20%">{user.mobile}</Text>
                  <Box w="20%">
                    <Text
                      color={'white'}
                      bg={
                        user.status === 'Successful' ? 'green.500' :
                          user.status === 'Pending' ? 'yellow.500' :
                            user.status === 'Overdue' ? 'red.500' : 'gray.500'
                      }
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="sm"
                      textAlign="center"
                      display="inline-block"
                    >
                      {user.status}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))
          ) : (
            <Box
              w="full"
              bg="white"
              py={8}
              textAlign="center"
            >
              <Text color="gray.500" fontSize="lg">
                {searchTerm
                  ? `No users found matching the current filters`
                  : 'No users found'
                }
              </Text>
            </Box>
          )}
        </Box>

        {/* Pagination Controls */}
        {filteredUsers.length > 0 && (
          <Flex w="full" justifyContent="space-between" alignItems="center" mt={4}>
            <Text fontSize="sm" color="gray.600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
            </Text>

            <HStack gap={2}>
              <Button
                size="sm"
                variant="outline"
                color={'white'}
                bg="black"
                onClick={handlePrevPage}
                disabled={currentPage === 1}

              >
                Previous
              </Button>

              {getPageNumbers().map((page, index) => (
                <Box key={index}>
                  {page === '...' ? (
                    <Text px={2} color="black">...</Text>
                  ) : (
                    <Button
                      size="sm"
                      bg={currentPage === page ? "blue.500" : "white"}
                      color={currentPage === page ? "white" : "gray.800"}
                      variant={currentPage === page ? "solid" : "outline"}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </Button>
                  )}
                </Box>
              ))}

              <Button
                size="sm"
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                color={'white'}
                bg="black"
              // rightIcon={<LuChevronRight />}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        )}
      </VStack>
    </Box>
  );
}

export default CustomTable;
