import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DragDropContext } from 'react-beautiful-dnd';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
ReactDOM.render(
	<ThemeProvider theme={darkTheme}>
		<LocalizationProvider dateAdapter={DateAdapter}>
			<CssBaseline />
			<DragDropContext>
				<App />
			</DragDropContext>
		</LocalizationProvider>
	</ThemeProvider>,
	document.getElementById('root')
);
