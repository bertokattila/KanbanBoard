import React from 'react';
import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
} from '@mui/material';

const Task = ({ data, removeCard }) => {
	return (
		<Card sx={{ minWidth: 275, marginTop: '1rem' }}>
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
