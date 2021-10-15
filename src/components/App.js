import { Grid } from '@mui/material';
import Board from './Board';
import Header from './Header';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
	const [columns, setColumns] = useState([]);
	const [, setUid] = useState(0); // only temporary until no server side is available
	const [, setColId] = useState(0); // only temporary until no server side is available

	const addColumn = (title) => {
		setColId((prev) => {
			let tmpColumns = columns.slice();
			tmpColumns.push({ id: prev, title: title, cards: [] });
			setColumns(tmpColumns);
			return prev + 1;
		});
	};

	const addCard = (columnId, title, description, deadline, state) => {
		setUid((prev) => {
			let tmpColumns = columns.slice();
			const colIndex = tmpColumns.findIndex((item) => item.id === columnId);
			tmpColumns[colIndex].cards.push({
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

	const editCard = (columnId, cardId, title, description, deadline, state) => {
		let tmpColumns = columns.slice();
		const colIndex = tmpColumns.findIndex((item) => item.id === columnId);
		const index = tmpColumns[colIndex].cards.findIndex(
			(item) => item.id === cardId
		);
		if (index > -1) {
			tmpColumns[colIndex].cards[index].title = title;
			tmpColumns[colIndex].cards[index].description = description;
			tmpColumns[colIndex].cards[index].deadline = deadline;
			tmpColumns[colIndex].cards[index].state = state;
		}
		setColumns(tmpColumns);
	};

	const removeCard = (columnId, cardId) => {
		let tmpColumns = columns.slice();
		const colIndex = tmpColumns.findIndex((item) => item.id === columnId);
		const index = tmpColumns[colIndex].cards.findIndex(
			(item) => item.id === cardId
		);
		index > -1 && tmpColumns[colIndex].cards.splice(index, 1);
		setColumns(tmpColumns);
	};

	const removeCol = (columnId) => {
		let tmpColumns = columns.slice();
		const index = tmpColumns.findIndex((item) => item.id === columnId);
		tmpColumns.splice(index, 1);
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

		const oldColIndex = tmpColumns.findIndex((item) => item.id === oldColId);
		const newColIndex = tmpColumns.findIndex((item) => item.id === newColId);

		// finding the card
		const index = tmpColumns[oldColIndex].cards.findIndex(
			(item) => item.id === cardId
		);

		const tmpCard = tmpColumns[oldColIndex].cards[index];
		tmpColumns[oldColIndex].cards.splice(index, 1);
		tmpColumns[newColIndex].cards.splice(result.destination.index, 0, tmpCard);

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
						editCard={editCard}
						removeCol={removeCol}
					/>
				</Grid>
			</Grid>
		</DragDropContext>
	);
}

export default App;
