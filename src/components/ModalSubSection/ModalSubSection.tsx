import React from 'react'

import { Box, Divider, Text } from '@chakra-ui/react'

import { NewFilter } from '@components/App/App'
import { ModalChooseVariants } from '@components/ModalChooseVariants'

interface ModalSubSectionProps {
	filterItems: NewFilter[]
	selectedOptions: { [key: string]: string[] }
	handleCheckboxChange: (category: string, optionId: string) => void
}

export const ModalSubSection: React.FC<ModalSubSectionProps> = ({
	filterItems,
	selectedOptions,
	handleCheckboxChange
}) => {
	return (
		<>
			{filterItems.map(item => (
				<Box
					key={item.id}
					mb={4}
				>
					<Text textStyle="body-text-1">{item.name}</Text>
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
	)
}
