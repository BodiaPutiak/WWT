import { Box, Button, Text } from '@chakra-ui/react'

interface HeaderProps {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ showModal, setShowModal }) => {
	return (
		<Box
			w="100vw"
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			position="fixed"
			top={0}
			shadow="underlining"
		>
			<Text textStyle="headline-1">WinWinTravel</Text>
			<Button
				colorScheme="red"
				onClick={() => setShowModal(!showModal)}
			>
				Filters
			</Button>
		</Box>
	)
}
