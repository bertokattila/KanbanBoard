import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import AddCol from './modals/AddCol';

const Header = ({ addColumn }) => {
	return (
		<Grid item xs={10} container direction='column'>
			<Grid item>
				<Typography
					variant='h2'
					align='center'
					sx={{ marginTop: '3rem', marginBottom: '3rem' }}
				>
					Kanban Board
				</Typography>
			</Grid>
			<AddCol addColumn={addColumn} />
			<Grid item></Grid>
		</Grid>
	);
};

export default Header;
