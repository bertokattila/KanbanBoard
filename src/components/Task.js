import React from 'react';
import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
} from '@mui/material';

const Task = ({ data, removeCard, colId }) => {
	const dragStart = (e) => {
		e.dataTransfer.setData('colId', colId);
		e.dataTransfer.setData('id', data.id);
	};

	return (
		<Card
			draggable='true'
			onDragStart={dragStart}
			sx={{ minWidth: 275, marginTop: '1rem', cursor: 'pointer' }}
		>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					{data.state}
				</Typography>
				<Typography variant='h5' component='div'>
					{data.title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color='text.secondary'>
					{data.description}
				</Typography>
				<Typography variant='body2'>{data.deadline}</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => {
						removeCard(data.id);
					}}
					size='small'
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default Task;
