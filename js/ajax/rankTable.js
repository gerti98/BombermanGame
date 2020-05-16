
// Gestione dinamica delle tabelle rank
function RankTable() {}

//Funzione che rimuove la tabella già presente
RankTable.removeTable = function(){
	var table = document.getElementById('rank_table');

	if(table != null){
		var table_child = table.children;
		for(var i = 0; i < table_child.length; i++){
			table.removeChild(table.childNodes[0]);
		}
		table.remove();
	}
}

//Funzione che aggiorna la tabella presente (eliminando la precedente e sostituendola con i nuovi dati ottenuti)
RankTable.refresh_table = function(data, type){
	var rank_section = document.getElementsByClassName('main_rank_section');
	var column_number;
	RankTable.removeTable();
	
	if(type == "single")
		column_number = 3;
	else 
		column_number = 4;

	var table = document.createElement('table');
	table.setAttribute('id', 'rank_table');
	RankTable.addRowTh(table, column_number, type);

	if(type == "single"){
		for(var i = 0; i < data.length; i++)
			RankTable.addRow(table, data[i], i + 1);
	}

	else{
		for(var i = 0; i < data.length; i++)
			RankTable.addRowMulti(table, data[i], i + 1);
	}

	rank_section[0].appendChild(table);
}

// Aggiunge gli header della tabella in base al tipo di rank da visualizzare
RankTable.addRowTh = function(table, column_number, type){
	var table_row = document.createElement('tr');
	var table_head;
	var inner_data;
	var vett;

	if(type == "single")
		vett = ["Position", "Username", "Score"]
	else
		vett = ["Position", "Username", "Match Played", "Wins"]

	for(var i = 0; i < column_number; i++){
		table_head = document.createElement('th');
		inner_data = document.createTextNode(vett[i]);
		table_head.appendChild(inner_data);
		table_row.appendChild(table_head);
	}

	table.appendChild(table_row);
}

//Aggiunge le righe delle tabelle rimanenti
RankTable.addRow = function(table, data_row, index){
	
	table_row = document.createElement('tr');
	var table_data;
	var inner_data;
		
	table_data = document.createElement('td');
	inner_data = document.createTextNode(index);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table_data = document.createElement('td');
	inner_data = document.createTextNode(data_row.username);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table_data = document.createElement('td');
	inner_data = document.createTextNode(data_row.score);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table.appendChild(table_row);
}

// Aggiunge le righe per il rank di tipo multiplayer
RankTable.addRowMulti = function(table, data_row, index){
	table_row = document.createElement('tr');
	var table_data;
	var inner_data;
		
	table_data = document.createElement('td');
	inner_data = document.createTextNode(index);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table_data = document.createElement('td');
	inner_data = document.createTextNode(data_row.username);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table_data = document.createElement('td');
	inner_data = document.createTextNode(data_row.total_matches);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table_data = document.createElement('td');
	inner_data = document.createTextNode(data_row.wins_player1);
	table_data.appendChild(inner_data);
	table_row.appendChild(table_data);

	table.appendChild(table_row);
}

// Funzione che aggiorna la rank_table, in caso di zero record da mostrare
RankTable.void_table = function(type){

	var rank_section = document.getElementsByClassName('main_rank_section');
	var column_number;

	RankTable.removeTable();

	if(type == "single")
		column_number = 4;
	else 
		column_number = 5;

	var table = document.createElement('table');
	table.setAttribute('id', 'rank_table');

	RankTable.addRowTh(table, column_number);

	rank_section[0].appendChild(table);

}
