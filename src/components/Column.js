import { Grid, Typography } from '@mui/material';
import Task from './Task';
import AddTask from './modals/AddTask';
import { Droppable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

const Column = ({ addCard, removeCard, cardColSwitch, data }) => {
	const removeCardAddColId = (cardId) => {
		removeCard(data.id, cardId);
	};

	const renderCards = () => {
		return data.cards.map((item, index) => {
			return (
				<Task
					data={item}
					key={item.id}
					removeCard={removeCardAddColId}
					colId={data.id}
					index={index}
				/>
			);
		});
	};

	const dropCard = (e) => {
		cardColSwitch(
			parseInt(e.dataTransfer.getData('colId')),
			data.id,
			parseInt(e.dataTransfer.getData('id'))
		);
		e.preventDefault();
	};
	const dragOverCard = (e) => {
		e.preventDefault();
	};

	return (
		<Droppable droppableId={data.id + 'droppable'}>
			{(provided, snapshot) => (
				<Grid
					ref={provided.innerRef}
					{...provided.droppableProps}
					item
					xs={6}
					md={6}
					lg={3}
					xl={2}
					sx={{ padding: '1rem' }}
				>
					<Typography variant='h4' align='center'>
						{data.title}
					</Typography>
					<AddTask addCard={addCard} data={data} />

					{renderCards()}
					{provided.placeholder}
				</Grid>
			)}
		</Droppable>
	);
};

export default Column;
