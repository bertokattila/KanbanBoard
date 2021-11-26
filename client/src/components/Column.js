import { Grid, Typography, Button } from '@mui/material';
import Task from './Task';
import AddTask from './modals/AddTask';
import { Droppable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

const Column = ({ addCard, removeCard, data, editCard, removeCol }) => {
	const removeCardAddColId = (cardId) => {
		removeCard(data.id, cardId);
	};
	const editCardAddColId = (id, cardData) => {
		editCard(data.id, id, ...cardData);
	};

	const renderCards = () => {
		return data.cards.map((item, index) => {
			return (
				<Task
					data={item}
					key={item.id}
					removeCard={removeCardAddColId}
					index={index}
					editCard={editCardAddColId}
				/>
			);
		});
	};

	return (
		<Grid
			item
			container
			direction='column'
			xs={6}
			md={6}
			lg={3}
			xl={2}
			sx={{ padding: '1rem' }}
		>
			<Grid item>
				<Typography variant='h4' align='center'>
					{data.title}
				</Typography>
			</Grid>
			<Grid
				item
				container
				direction='row'
				justifyContent='space-between'
				sx={{ paddingTop: '1rem' }}
			>
				<AddTask addCard={addCard} data={data} sx={{ marginBottom: '1rem' }} />

				<Button
					aria-label='delete'
					onClick={() => {
						removeCol(data.id);
					}}
					variant='outlined'
					startIcon={<DeleteForeverIcon fontSize='inherit' />}
				>
					Remove
				</Button>
			</Grid>
			<Grid item>
				<Droppable droppableId={data.id.toString()}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{renderCards()}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</Grid>
		</Grid>
	);
};

export default Column;
