import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef } from 'react';

import { TextField } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	flexDirection: 'column',
};

const AddCol = ({ addColumn }) => {
	const [open, setOpen] = React.useState(false);
	const [validColTitleValue, setvalidColTitleValue] = React.useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const colTitleValueRef = useRef('');
	return (
		<div>
			<Button variant='outlined' color='secondary' onClick={handleOpen}>
				New Column
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h5'
						sx={{ mt: '1rem', padding: 0 }}
					>
						Add new column
					</Typography>
					<TextField
						sx={{ my: '1rem' }}
						id='outlined-title-input'
						label='Title'
						type='text'
						inputRef={colTitleValueRef}
						required
						onChange={() => {
							validColTitleValue || setvalidColTitleValue(true);
						}}
						error={!validColTitleValue}
					/>
					<Button
						sx={{ my: '1rem' }}
						variant='outlined'
						color='secondary'
						onClick={() => {
							if (colTitleValueRef.current.value.length > 0) {
								addColumn(colTitleValueRef.current.value);
								handleClose();
							} else {
								setvalidColTitleValue(false);
							}
						}}
					>
						Add Column
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default AddCol;
