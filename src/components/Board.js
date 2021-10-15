import { Grid } from '@mui/material';
import Column from './Column';

const Board = ({ columns, addCard, removeCard, cardColSwitch, editCard }) => {
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
