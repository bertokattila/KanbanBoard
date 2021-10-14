import React from 'react';
import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
} from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ data, removeCard, colId, index }) => {
	const dragStart = (e) => {
		e.dataTransfer.setData('colId', colId);
		e.dataTransfer.setData('id', data.id);
	};

	return (
		<Draggable key={data.id} draggableId={data.id.toString()} index={index}>
			{(provided) => (
				<Card
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					sx={{
						maxWidth: '100%',
						marginTop: '1rem',
						cursor: 'pointer',
					}}
				>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{data.state}
						</Typography>
						<Typography
							variant='h5'
							component='div'
							sx={{ wordBreak: 'break-all' }}
						>
							{data.title}
						</Typography>
						<Typography
							sx={{ mb: 1.5, wordBreak: 'break-all' }}
							color='text.secondary'
						>
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
			)}
		</Draggable>
	);
};

export default Task;
