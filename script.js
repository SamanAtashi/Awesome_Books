let collection = [];

function add(author_name, title) {
	let book = { author_name, title };
	collection.push(book);
}

let new_coll = [];
function remove(author) {
	new_coll = collection.filter((ele) => ele.author_name != author);
}
