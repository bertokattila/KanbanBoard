import React from 'react';
import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
} from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import EditTask from './modals/EditTask';
import Paper from '@mui/material/Paper';

const Task = ({ data, removeCard, colId, index, editCard }) => {
	const stateColor = (state) => {
		switch (state) {
			case 'Pending':
				return '#b28704';
				break;
			case 'Postponed':
				return '#aa2e25';
				break;
			case 'Progress':
				return '#482880';
				break;
			case 'Done':
				return '#357a38';
				break;

			default:
				return 'grey';
				break;
		}
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
					}}
				>
					<CardContent>
						<Paper
							elevation={0}
							sx={{ width: 'fit-content', background: stateColor(data.state) }}
						>
							<Typography
								sx={{ fontSize: 14, padding: '5px', fontWeight: 'bold' }}
								color='text.secondary'
								gutterBottom
							>
								{data.state}
							</Typography>
						</Paper>

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
						<EditTask data={data} editCard={editCard} />
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Task;
