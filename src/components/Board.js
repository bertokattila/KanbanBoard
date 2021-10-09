import { Grid } from '@mui/material';
import { useState } from 'react';
import Column from './Column';

const Board = ({ columns, addCard, removeCard }) => {
	const renderColumns = () => {
		return columns.map((item, key) => {
			return (
				<Column
					key={key}
					data={item}
					addCard={addCard}
					removeCard={removeCard}
				/>
			);
		});
	};

	return (
		<Grid container direction='row' item>
			{renderColumns()}
		</Grid>
	);
};

export default Board;
