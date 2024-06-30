import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'

import { NewFilter } from '@components/App/App'
import { ModalSubSection } from '@components/ModalSubSection'

interface CustomModalProps {
	isOpen: boolean
	onClose: () => void
	filterItems: NewFilter[]
	selectedOptions: { [key: string]: string[] }
	handleCheckboxChange: (category: string, optionId: string) => void
	handleApply: () => void
	handleClearAll: () => void
}

export const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	onClose,
	filterItems,
	selectedOptions,
	handleCheckboxChange,
	handleApply,
	handleClearAll
}) => {
	const { t } = useTranslation()

	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const cancelRef = useRef(null)

	const onCloseWithConfirmation = () => {
		setIsAlertOpen(true)
	}

	const onConfirmClose = () => {
		handleClearAll()
		setIsAlertOpen(false)
		onClose()
	}

	const onCancelClose = () => {
		setIsAlertOpen(false)
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onCloseWithConfirmation}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>{t('filters.title')}</ModalHeader>
					<ModalBody>
						{filterItems && filterItems.length > 0 ? (
							<ModalSubSection
								filterItems={filterItems}
								selectedOptions={selectedOptions}
								handleCheckboxChange={handleCheckboxChange}
							/>
						) : (
							<Text>{t('filters.noFilters')}</Text>
						)}
						<Box mt={4}>
							<Button onClick={handleApply}>{t('filters.apply')}</Button>
							<Link
								ml={4}
								onClick={handleClearAll}
							>
								{t('filters.clearAll')}
							</Link>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>

			<AlertDialog
				isOpen={isAlertOpen}
				leastDestructiveRef={cancelRef}
				onClose={onCancelClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold"
						>
							{t('filters.discardChanges')}
						</AlertDialogHeader>
						<AlertDialogBody>{t('filters.discardMessage')}</AlertDialogBody>
						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onCancelClose}
							>
								{t('filters.cancel')}
							</Button>
							<Button
								colorScheme="red"
								onClick={onConfirmClose}
								ml={3}
							>
								{t('filters.discard')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}
