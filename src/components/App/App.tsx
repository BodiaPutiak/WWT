import { Box, Spinner, Text } from '@chakra-ui/react'
import { CustomModal } from '../CustomModal'
import { Header } from '../Header'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFiltersData } from '@utils/fetchFiltersData'

export interface NewFilter {
  id: string;
  name: string;
  description?: string;
  type: string;
  options: { id: string; name: string; description: string }[];
}

export const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
  const { data: filterItems, error, isLoading } = useQuery({
    queryKey: ['filtersData'],
    queryFn: fetchFiltersData,
  });

  const handleCheckboxChange = (category: string, optionId: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const categoryOptions = prevSelectedOptions[category] || [];
      if (categoryOptions.includes(optionId)) {
        return {
          ...prevSelectedOptions,
          [category]: categoryOptions.filter(id => id !== optionId)
        };
      } else {
        return {
          ...prevSelectedOptions,
          [category]: [...categoryOptions, optionId]
        };
      }
    });
  };

  const handleApply = () => {
    console.log('Selected Options:', selectedOptions);
    setShowModal(false);
  };

   const handleClearAll = () => {
    setSelectedOptions({});
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error loading filters</Text>;
  }


  return (
    <Box
      maxW="100rem"
      mx="auto"
      minH="100dvh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Header showModal={showModal} setShowModal={setShowModal}/>
      {showModal && 
        <CustomModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          filterItems={filterItems.filterItems || []} 
          selectedOptions={selectedOptions} 
          handleCheckboxChange={handleCheckboxChange} 
          handleApply={handleApply} 
          handleClearAll={handleClearAll}
        />
      }
    </Box>
  );
};