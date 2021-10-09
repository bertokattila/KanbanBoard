import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { bgcolor } from '@mui/system';
import Task from './Task';
import AddTask from './modals/AddTask';

const Column = ({ data, addCard, removeCard }) => {
	const removeCardAddColId = (cardId) => {
		removeCard(data.id, cardId);
	};

	const renderCards = () => {
		return data.cards.map((item) => {
			return <Task data={item} key={item.id} removeCard={removeCardAddColId} />;
		});
	};

	return (
		<Grid item xs={4} sx={{ padding: '1rem' }}>
			<Typography variant='h4' align='center'>
				{data.title}
			</Typography>
			<AddTask addCard={addCard} data={data} />
			{renderCards()}
		</Grid>
	);
};

export default Column;
