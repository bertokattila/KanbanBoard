import { Grid } from '@mui/material';
import Column from './Column';

const Board = ({ columns, addCard, removeCard, cardColSwitch }) => {
	const renderColumns = () => {
		return columns.map((item, key) => {
			return (
				<Column
					key={key}
					data={item}
					addCard={addCard}
					removeCard={removeCard}
					cardColSwitch={cardColSwitch}
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
