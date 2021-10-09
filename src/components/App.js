import { Grid } from '@mui/material';
import Board from './Board';
import Header from './Header';
import { useState } from 'react';

function App() {
	const [columns, setColumns] = useState([]);
	const [uId, setUid] = useState(0); // only temporary until no server side is available

	const addColumn = (title) => {
		let tmpColumns = columns.slice();
		tmpColumns.push({ id: columns.length, title: title, cards: [] });
		setColumns(tmpColumns);
	};

	const addCard = (columnId, title, description, deadline, state) => {
		setUid((prev) => {
			let tmpColumns = columns.slice();
			tmpColumns[columnId].cards.push({
				columnId: columnId,
				id: uId,
				title: title,
				description: description,
				deadline: deadline,
				state: state,
			});
			setColumns(tmpColumns);
			return prev + 1;
		});
	};

	const removeCard = (columnId, cardId) => {
		let tmpColumns = columns.slice();
		const index = tmpColumns[columnId].cards.findIndex(
			(item) => item.id === cardId
		);
		index > -1 && tmpColumns[columnId].cards.splice(index, 1);
		setColumns(tmpColumns);
	};

	return (
		<Grid container alignItems='center' justifyContent='center'>
			<Grid item container xs={10} alignItems='center' justifyContent='center'>
				<Header addColumn={addColumn} />
				<Board columns={columns} addCard={addCard} removeCard={removeCard} />
			</Grid>
		</Grid>
	);
}

export default App;
