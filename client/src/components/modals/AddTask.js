import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef } from 'react';
import { format } from 'date-fns';

import {
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';

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

const AddTask = ({ data, addCard }) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [validCardTitleValue, setvalidCardTitleValue] =
		React.useState('pending');

	const defaultStatusValue = 'Pending';
	const [status, setStatus] = React.useState(defaultStatusValue);
	const cardTitleValueRef = useRef();
	const cardDateValueRef = useRef();
	const cardDescValueRef = useRef();

	const updateStatus = (e, val) => {
		setStatus(val);
	};

	return (
		<div display='block'>
			<Button variant='contained' onClick={handleOpen}>
				New card
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
						sx={{ mb: '1rem', mt: '1rem' }}
					>
						Add new Card
					</Typography>
					<TextField
						sx={{ my: '1rem' }}
						label='Title'
						type='text'
						inputRef={cardTitleValueRef}
						required
						onChange={() => {
							validCardTitleValue || setvalidCardTitleValue(true);
						}}
						error={!validCardTitleValue}
					/>{' '}
					<TextField
						sx={{ my: '1rem' }}
						label='Description'
						type='text'
						inputRef={cardDescValueRef}
					/>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Status</FormLabel>
						<RadioGroup
							row
							aria-label='status'
							name='row-radio-buttons-group'
							onChange={updateStatus}
							defaultValue={defaultStatusValue}
						>
							<FormControlLabel
								value='Pending'
								control={<Radio />}
								label='Pending'
							/>
							<FormControlLabel
								value='Progress'
								control={<Radio />}
								label='In Progress'
							/>
							<FormControlLabel value='Done' control={<Radio />} label='Done' />
							<FormControlLabel
								value='Postponed'
								control={<Radio />}
								label='Postponed'
							/>
						</RadioGroup>
					</FormControl>
					<TextField
						id='date'
						type='date'
						defaultValue={format(new Date(), 'yyyy-MM-dd')}
						inputRef={cardDateValueRef}
						sx={{ width: 220, my: '1rem' }}
					/>
					<Button
						sx={{ my: '1rem' }}
						variant='outlined'
						color='secondary'
						onClick={() => {
							if (cardTitleValueRef.current.value.length <= 0) {
								setvalidCardTitleValue(false);
								return;
							}

							addCard(
								data.id,
								cardTitleValueRef.current.value,
								cardDescValueRef.current.value,
								cardDateValueRef.current.value,
								status
							);
							handleClose();
						}}
					>
						Add Card
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default AddTask;
