import { Grid } from '@mui/material';
import Column from './Column';
import React from 'react';

const Board = ({
	columns,
	addCard,
	removeCard,
	cardColSwitch,
	editCard,
	removeCol,
}) => {
	const renderColumns = () => {
		return columns.map((item, key) => {
			return (
				<Column
					key={key}
					data={item}
					addCard={addCard}
					removeCard={removeCard}
					cardColSwitch={cardColSwitch}
					editCard={editCard}
					removeCol={removeCol}
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
