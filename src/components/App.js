import { Grid } from '@mui/material';
import Board from './Board';
import Header from './Header';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
	const [columns, setColumns] = useState([]);
	const [, setUid] = useState(0); // only temporary until no server side is available

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
				id: prev,
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

	const cardColSwitch = (result) => {
		if (!result.destination) {
			return;
		}
		const oldColId = parseInt(result.source.droppableId);
		const newColId = parseInt(result.destination.droppableId);
		const cardId = parseInt(result.draggableId);

		let tmpColumns = columns.slice();
		// finding the card
		const index = tmpColumns[oldColId].cards.findIndex(
			(item) => item.id === cardId
		);

		const tmpCard = tmpColumns[oldColId].cards[index];
		tmpColumns[oldColId].cards.splice(index, 1);
		tmpColumns[newColId].cards.splice(result.destination.index, 0, tmpCard);

		setColumns(tmpColumns);
	};

	return (
		<DragDropContext onDragEnd={cardColSwitch}>
			<Grid container alignItems='center' justifyContent='center'>
				<Grid
					item
					container
					xs={10}
					alignItems='center'
					justifyContent='center'
				>
					<Header addColumn={addColumn} />
					<Board
						columns={columns}
						addCard={addCard}
						removeCard={removeCard}
						cardColSwitch={cardColSwitch}
					/>
				</Grid>
			</Grid>
		</DragDropContext>
	);
}

export default App;
