import React from 'react'
import { Text, Divider, Box } from '@chakra-ui/react'
import { ModalChooseVariants } from '@components/ModalChooseVariants'
import { NewFilter } from '@components/App/App'

interface ModalSubSectionProps {
  filterItems: NewFilter[];
  selectedOptions: { [key: string]: string[] };
  handleCheckboxChange: (category: string, optionId: string) => void;
}

export const ModalSubSection: React.FC<ModalSubSectionProps> = ({ filterItems, selectedOptions, handleCheckboxChange }) => {
  return (
    <>
      {filterItems.map(item => (
        <Box key={item.id} mb={4}>
          <Text textStyle='body-text-1'>{item.name}</Text>
          <ModalChooseVariants 
            options={item.options} 
            selectedOptions={selectedOptions} 
            handleCheckboxChange={handleCheckboxChange} 
            category={item.id} 
          />
          <Divider mt={2} />
        </Box>
      ))}
    </>
  );
};