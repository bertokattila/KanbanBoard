import { Grid } from '@mui/material';
import Board from './Board';
import Header from './Header';
import { DragDropContext } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';

function App() {
	const [columns, setColumns] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);
	const baseUrl = 'http://localhost:5000';

	/// initially getting the data from server
	useEffect(() => {
		fetch(baseUrl + '/api/column/board/')
			.then((res) => res.json())
			.then(
				(board) => {
					setIsLoaded(true);
					for (const column of board) {
						column.cards.sort((a, b) => a.position - b.position);
					}
					setColumns(board);
				},

				(err) => {
					setError(true);
					console.log(err);
				}
			);
	}, []);

	const addColumn = (title) => {
		fetch(baseUrl + '/api/column/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: title }),
		})
			.then((response) => response.json())
			.then(
				(column) => {
					let tmpColumns = columns.slice();
					tmpColumns.push({ id: column.id, title: column.title, cards: [] });
					setColumns(tmpColumns);
				},
				(err) => {
					console.log(err);
					setError(true);
				}
			);
	};

	const removeCol = (columnId) => {
		fetch(baseUrl + '/api/column/' + columnId, {
			method: 'DELETE',
		}).then(
			(resp) => {
				if (resp.status === 200) {
					let tmpColumns = columns.slice();
					const index = tmpColumns.findIndex((item) => item.id === columnId);
					tmpColumns.splice(index, 1);
					setColumns(tmpColumns);
				} else {
					setError(true);
				}
			},
			(err) => {
				console.log(err);
				setError(true);
			}
		);
	};

	const addCard = (columnId, title, description, deadline, state) => {
		fetch(baseUrl + '/api/card/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				columnId: columnId,
				title: title,
				description: description,
				deadline: deadline,
				state: state,
			}),
		})
			.then((response) => response.json())
			.then(
				(card) => {
					let tmpColumns = columns.slice();
					const colIndex = tmpColumns.findIndex((item) => item.id === columnId);
					tmpColumns[colIndex].cards.push({
						columnId: columnId,
						id: card.id,
						title: title,
						description: description,
						deadline: deadline,
						state: state,
					});
					setColumns(tmpColumns);
				},
				(err) => {
					console.log(err);
					setError(true);
				}
			);
	};

	// TODO
	const editCard = (columnId, cardId, title, description, deadline, state) => {
		fetch(baseUrl + '/api/card/' + cardId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: cardId,
				title: title,
				description: description,
				deadline: deadline,
				state: state,
			}),
		})
			.then((response) => {
				console.log(response);
				if (!response.ok) setError(true);
				return response;
			})
			.then((response) => response.json())
			.then(
				(card) => {
					if (card.id !== cardId) setError(true);
				},
				(err) => {
					console.log(err);
					setError(true);
				}
			);
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
		fetch(baseUrl + '/api/card/' + cardId, {
			method: 'DELETE',
		}).then(
			(resp) => {
				if (resp.status === 200) {
					let tmpColumns = columns.slice();
					const colIndex = tmpColumns.findIndex((item) => item.id === columnId);
					const index = tmpColumns[colIndex].cards.findIndex(
						(item) => item.id === cardId
					);
					index > -1 && tmpColumns[colIndex].cards.splice(index, 1);
					setColumns(tmpColumns);
				} else {
					setError(true);
				}
			},
			(err) => {
				console.log(err);
				setError(true);
			}
		);
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
		fetch(baseUrl + '/api/card/' + cardId + '/location/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cardId: cardId,
				newColId: newColId,
				newPos: result.destination.index,
			}),
		}).then(
			(resp) => {
				if (resp.status !== 200) {
					setError(true);
				}
			},
			(err) => {
				console.log(err);
				setError(true);
			}
		);
	};
	if (error) return <h1>Error occured, please refresh</h1>;
	if (isLoaded) {
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
	return <h1>Loading...</h1>;
}

export default App;
