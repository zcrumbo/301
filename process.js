var form = document.getElementById('commentsForm'),
	formData = formData || {
		comments : [],
		name : []
	},
	list = document.getElementById('results'),
	deleteButton = document.getElementById('delete');

function processForm(event){
	event.preventDefault();
	var tempData = {
		name : event.target.name.value,
		comments : event.target.comments.value
		}
	formData.name.push(event.target.name.value);
	formData.comments.push(event.target.comments.value);
	localStorage.comments = JSON.stringify(formData);
	addCommentToDisplay(tempData);
};

function addCommentToDisplay(comment){
 	if (comment){ //called by processForm - use event target data. 
	console.log(comment)
		var newCommentSet = document.createElement('li'),
			fullComment = document.createTextNode('Name: '+comment.name + ", Comment: "+comment.comments);
		newCommentSet.appendChild(fullComment);
		list.appendChild(newCommentSet);
	}else{ //not being called by form action - check local storage for pre-existing data
		console.log(localStorage)
		if (localStorage.comments){		//if there are values in local storage, add values to formData object and loop through to display them
				formData = JSON.parse(localStorage.comments);
				for (i = 0; i<formData.comments.length; i++) {
					var	newCommentSet = document.createElement('li'),
						fullComment = document.createTextNode('Name: '+formData.name[i] + ", Comment: "+formData.comments[i]);
					newCommentSet.appendChild(fullComment);
					list.appendChild(newCommentSet);
				}

		}
	}
};
function deleteLastComment(lastIndex){
	list.removeChild(list.lastChild);
	formData.name.pop();
	formData.comments.pop();
	localStorage.comments = JSON.stringify(formData);
}

//event listener
form.addEventListener("submit", processForm);	
deleteButton.addEventListener("click", deleteLastComment)
addCommentToDisplay();