import React from 'react'

import { Checkbox, Stack } from '@chakra-ui/react'

interface ModalChooseVariantsProps {
	options: { id: string; name: string; description: string }[]
	selectedOptions: { [key: string]: string[] }
	handleCheckboxChange: (category: string, optionId: string) => void
	category: string
}

export const ModalChooseVariants: React.FC<ModalChooseVariantsProps> = ({
	options,
	selectedOptions,
	handleCheckboxChange,
	category
}) => {
	return (
		<Stack spacing={2}>
			{options.map(option => (
				<Checkbox
					key={option.id}
					isChecked={selectedOptions[category]?.includes(option.id) || false}
					onChange={() => handleCheckboxChange(category, option.id)}
				>
					{option.name}
				</Checkbox>
			))}
		</Stack>
	)
}
