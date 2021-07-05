let collection = [];

function add(author, title) {
	collection.push({ [author]: title });
	return collection;
}
