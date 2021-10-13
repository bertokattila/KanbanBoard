import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { bgcolor } from '@mui/system';
import Task from './Task';
import AddTask from './modals/AddTask';

const Column = ({ data, addCard, removeCard, cardColSwitch }) => {
	const removeCardAddColId = (cardId) => {
		removeCard(data.id, cardId);
	};

	const renderCards = () => {
		return data.cards.map((item) => {
			return (
				<Task
					data={item}
					key={item.id}
					removeCard={removeCardAddColId}
					colId={data.id}
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
		<Grid
			onDrop={dropCard}
			onDragOver={dragOverCard}
			item
			xs={6}
			md={4}
			lg={2}
			sx={{ padding: '1rem' }}
		>
			<Typography variant='h4' align='center'>
				{data.title}
			</Typography>
			<AddTask addCard={addCard} data={data} />
			{renderCards()}
		</Grid>
	);
};

export default Column;
