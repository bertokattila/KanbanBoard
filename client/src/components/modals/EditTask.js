import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef } from 'react';
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

const EditTask = ({ data, editCard }) => {
	const [open, setOpen] = React.useState(false);

	const cardDescValueRef = useRef();
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const [validCardTitleValue, setvalidCardTitleValue] =
		React.useState('pending');

	const [status, setStatus] = React.useState(data.state);

	const cardTitleValueRef = useRef();
	const cardDateValueRef = useRef();

	const updateStatus = (e, val) => {
		setStatus(val);
	};
	return (
		<div display='block'>
			<Button
				onClick={() => {
					handleOpen();
				}}
				size='small'
			>
				Edit
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
						Edit Card
					</Typography>
					<TextField
						sx={{ my: '1rem' }}
						label='Title'
						type='text'
						inputRef={cardTitleValueRef}
						required
						defaultValue={data.title}
						onChange={() => {
							validCardTitleValue || setvalidCardTitleValue(true);
						}}
						error={!validCardTitleValue}
					/>{' '}
					<TextField
						sx={{ my: '1rem' }}
						label='Description'
						type='text'
						defaultValue={data.description}
						inputRef={cardDescValueRef}
					/>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Status</FormLabel>
						<RadioGroup
							row
							aria-label='status'
							name='row-radio-buttons-group'
							onChange={updateStatus}
							value={status}
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
						defaultValue={data.deadline}
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

							editCard(data.id, [
								cardTitleValueRef.current.value,
								cardDescValueRef.current.value,
								cardDateValueRef.current.value,
								status,
							]);
							handleClose();
						}}
					>
						Save
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default EditTask;
