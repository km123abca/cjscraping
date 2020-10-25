const axios=require('axios');
const pageUrl='https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States';
async function getUsStates()
	{
		const {data}=await axios.get(pageUrl);
		// console.log(data);
		const table=$('caption:contains("States of the United States of America")')[0].parentElement;
		console.log(table);
	}

getUsStates();