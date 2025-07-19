import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  VStack,
  useBreakpointValue,
  Stack,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import { useState, useMemo, useEffect } from 'react';
import { ITEMS_PER_PAGE, status, type User } from '@/constants/CustomTableConstants';
import { LuSearch } from 'react-icons/lu';
import axios from 'axios';
import usePaginationLogic from '@/Hooks/usePaginationLogic';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import useDebouncedSearch from '@/Hooks/useDebouncedSearch';

function CustomTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  ////Used Fetch for data Fetching (For Evaluation purpose kept in code)
  // useEffect(() => {
  //   fetch('/data.json')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     }).then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);



  ///Fetching data from Static JSON using Axios 
  useEffect(() => {
    axios.get('/data.json')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [])


  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const filteredUsers = useMemo(() => {
    let filtered = data;
    const searchLower = debouncedSearchTerm.toLowerCase().trim();

    if (searchLower) {
      filtered = filtered.filter((user) =>
        [user.name, user.email, user.status].some((field) =>
          field.toLowerCase().includes(searchLower)
        ) || user.mobile.includes(debouncedSearchTerm.trim())
      );
    }

    if (statusFilter.length > 0 && statusFilter[0] !== 'all') {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === statusFilter[0].toLowerCase()
      );
    }

    return filtered;
  }, [debouncedSearchTerm, statusFilter, data]);
  const { currentPage,
    totalPages,
    currentData,
    startIndex,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    endIndex,
    getPageNumbers } = usePaginationLogic(
      filteredUsers,
      ITEMS_PER_PAGE,
      [debouncedSearchTerm, statusFilter],
      isMobile
    )


  const MobileUserCard = ({ user, index }: { user: any; index: number }) =>
  (<Box
    key={startIndex + index}
    w="full"
    bg="white"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="md"
    p={4}
    mb={3}
  >
    <VStack align="start" gap={3}>
      <HStack w="full" justify="space-between">
        <HStack>
          <Avatar.Root size="md">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.avatar} />
          </Avatar.Root>
          <VStack align="start" gap={0}>
            <Text color="black" fontWeight="semibold" fontSize="md">
              {user.name}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {user.email}
            </Text>
          </VStack>
        </HStack>
        <Text
          color="white"
          bg={
            user.status === 'Successful' ? 'green.500'
              : user.status === 'Pending' ? 'yellow.500'
                : user.status === 'Overdue' ? 'red.500'
                  : 'gray.500'
          }
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          textAlign="center"
        >
          {user.status}
        </Text>
      </HStack>
      <Box w="full">
        <Text color="gray.600" fontSize="sm">
          Mobile: <Text as="span" color="black">{user.mobile}</Text>
        </Text>
      </Box>
    </VStack>
  </Box>
  );

  const LoadingState = () => (
    <Box w="full" minHeight="400px" display="flex" justifyContent="center" alignItems="center">
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text color="gray.600" fontSize="lg">Loading users data...</Text>
      </VStack>
    </Box>
  );




  return (
    <Box bg="white" borderRadius="md" boxShadow="md" p={{ base: 2, md: 4 }}>
      <VStack m={{ base: 2, md: 3 }} borderTopRadius="md" gap={4}>
        <Stack
          w="full"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          gap={{ base: 3, md: 0 }}
        >
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="black" fontWeight="bold">
            Users {!isLoading && `(${filteredUsers.length})`}
          </Text>

          <Stack direction={{ base: 'column', sm: 'row' }} gap={4} flex={1} justify="flex-end">
            <InputGroup maxW={{ base: 'full', md: '80' }} startElement={<LuSearch />}>
              <Input
                color="black"
                bg="gray.100"
                placeholder={isMobile ? "Search users..." : "Search by name, email, mobile, or status"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fontSize={{ base: 'sm', md: 'md' }}
                disabled={isLoading}
              />
            </InputGroup>

            <HStack minW="fit-content">
              <Text fontSize="sm" color="gray.600" display={{ base: 'none', sm: 'block' }}>Status:</Text>
              <Select.Root
                collection={status}
                size={{ base: 'sm', md: 'md' }}
                bg="gray.100"
                width={{ base: '32', md: '40' }}
                value={statusFilter}
                onValueChange={(e) => setStatusFilter(e.value)}
                disabled={isLoading}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText color="black" placeholder="Status" />
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
          </Stack>
        </Stack>


        {!isMobile && !isLoading && (
          <Box w="full" bg="gray.100" py={2} borderRadius="md">
            <HStack px={4} gap={1} justifyContent="space-between">
              {['Name', 'Email', 'Mobile', 'Status'].map((header) => (
                <Text key={header} w="25%" fontSize={{ base: 'md', lg: 'lg' }} fontWeight="semibold" color="black">
                  {header}
                </Text>
              ))}
            </HStack>
          </Box>
        )}


        <Box w="full" minHeight="400px" borderRadius="md">
          {isLoading ? (
            <LoadingState />
          ) : currentData.length > 0 ? (
            isMobile ? (
              <VStack w="full" gap={0}>
                {currentData.map((user, index) => (
                  <MobileUserCard key={startIndex + index} user={user} index={index} />
                ))}
              </VStack>
            ) : (
              currentData.map((user, index) => (
                <Box
                  key={startIndex + index}
                  w="full"
                  bg="white"
                  borderBottom="0.5px solid"
                  borderColor="gray.200"
                  py={3}
                >
                  <HStack px={4} gap={{ base: 2, lg: 6 }} justifyContent="space-between" align="center">
                    <HStack w="25%" minW="0">
                      <Avatar.Root size={{ base: 'sm', lg: 'md' }}>
                        <Avatar.Fallback name={user.name} />
                        <Avatar.Image src={user.avatar} />
                      </Avatar.Root>
                      <Text color="black" fontSize={{ base: 'sm', lg: 'md' }} flex={1}>
                        {user.name}
                      </Text>
                    </HStack>
                    <Text color="black" w="25%" fontSize={{ base: 'sm', lg: 'md' }}>{user.email}</Text>
                    <Text color="black" w="25%" fontSize={{ base: 'sm', lg: 'md' }}>{user.mobile}</Text>
                    <Box w="25%">
                      <Text
                        color="white"
                        bg={
                          user.status === 'Successful' ? 'green.500'
                            : user.status === 'Pending' ? 'yellow.500'
                              : user.status === 'Overdue' ? 'red.500'
                                : 'gray.500'
                        }
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize={{ base: 'xs', lg: 'sm' }}
                        textAlign="center"
                        display="inline-block"
                        maxW="fit-content"
                      >
                        {user.status}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))
            )
          ) : (
            <Box w="full" bg="white" py={8} textAlign="center">
              <Text color="gray.500" fontSize={{ base: 'md', md: 'lg' }}>
                {searchTerm ? 'No users found matching the current filters' : 'No users found'}
              </Text>
            </Box>
          )}
        </Box>


        {!isLoading && filteredUsers.length > 0 && (
          <Stack
            w="full"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            mt={4}
            gap={3}
          >
            <Text fontSize="sm" color="gray.600" textAlign={{ base: 'center', md: 'left' }}>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
            </Text>

            <HStack gap={{ base: 1, md: 2 }} justify="center" flexWrap="wrap">
              <Button
                size={{ base: 'xs', md: 'sm' }}
                variant="outline"
                color="white"
                bg="black"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <Icon size="md" color="white">
                  <GrFormPreviousLink />
                </Icon>
              </Button>

              {getPageNumbers().map((page, index) => (
                <Box key={index}>
                  {page === '...'
                    ? <Text px={2} color="black" fontSize={{ base: 'xs', md: 'sm' }}>...</Text>
                    : <Button
                      size={{ base: 'xs', md: 'sm' }}
                      bg={currentPage === page ? "blue.500" : "white"}
                      color={currentPage === page ? "white" : "gray.800"}
                      variant={currentPage === page ? "solid" : "outline"}
                      onClick={() => handlePageChange(page as number)}
                      minW={{ base: '8', md: '10' }}
                    >
                      {page}
                    </Button>}
                </Box>
              ))}
              <Button
                size={{ base: 'xs', md: 'sm' }}
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                color="white"
                bg="black"
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <Icon size="md" color="white">
                  <GrFormNextLink />
                </Icon>
              </Button>
            </HStack>
          </Stack>
        )}
      </VStack>
    </Box>
  );
}

export default CustomTable;
