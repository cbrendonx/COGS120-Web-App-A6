var family = [
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 0},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 1},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 2},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 3},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 4},
];

$(document).ready(function() {
	displayList();
});

function displayList() {

	// compile the template
	var source   = $("#list-template").html();
	var template = Handlebars.compile(source);

	var parentDiv = $("#family-list");

	// now iterate through the complexData list and keep appending:
	for (var i = 0; i < family.length; i++) {
		var curData = family[i];
		var curHtml = template(curData);
		parentDiv.append(curHtml);

		$("#list" + i).hide();
		$("#input" + i).hide();
		$("#cancel" + i).hide();

		$("#name" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(4);
			var list = $("#list" + index);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			if (!list.is(":visible")) {
				list.show(500);
			}

			else {
				list.hide(500);
				input.hide(500);
				cancel.hide(500);
			}
		});

		$("#disown" + i).click(function() {
			$(this).parent().hide(1000, function() {
				var person = $(this).attr("id");
				var index = person.substr(6);
				family.splice(index, 1);
				reindex(family);
				$(this).parent().html("");

				displayList();
			});
		});

		$("#add" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(3);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			if (!input.is(":visible")) {
				input.show(500);
				cancel.show(500);
			} else if (input.is(":visible")) {
				console.log("Enter!");
				var id = this.getAttribute("id");
				var index = id.substr(3);
				console.log(index);
				// var content = $("#content" + index);
				// var subIndex = $("#content" + index + " p").length;

				console.log(document.getElementById("input" + index));
				var text = document.getElementById("input" + index).value;

				text = text.trim();

				if (text === "") {
					alert("Please enter something valid");
				}

				else {
					family[index]["entry"].push(text);
					displayContent(index);

					// Clears the input field.
					$("#input" + index).val("");
				}
			}
		});

		$("#cancel" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(6);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			if (input.is(":visible")) {
				input.hide(500);
				cancel.hide(500);
			}
		});

		$("#input" + i).keypress(function(event) {
			if (event.which == 13) {
				console.log("Enter!");
				var id = this.getAttribute("id");
				var index = id.substr(5);
				console.log(index);
				// var content = $("#content" + index);
				// var subIndex = $("#content" + index + " p").length;

				console.log(document.getElementById("input" + index));
				var text = document.getElementById("input" + index).value;

				text = text.trim();

				if (text === "") {
					alert("Please enter something valid");
				}

				else {
					family[index]["entry"].push(text);
					displayContent(index);

					// Clears the input field.
					$("#input" + index).val("");
				}
			}
		});

		var content = $("#content" + i + " p");
		for (var j = 0; j < content.length; j++) {
			$("#rm" + i + j).click(removeHandler);
		}
	}
}

function displayContent(index) {

	var content = $("#content" + index);

	// Clears the div.
	content.html("");

	// Repopulates.
	var array = family[index]["entry"];
	for (var i = 0; i < array.length; i++) {
		content.append("<p id='p" + index + i + "'' class='card'><button id='rm" + index + i + "'' class='remove-btn'>&times</button> " + array[i] + "</p>");

		// Attaches a click handler to the remove button.
		$("#rm" + index + i).click(removeHandler);
			
	}
}

function removeHandler() {

	console.log(this);

	if (confirm("Are you sure you want to delete the item(s)")) {
	
		// Captures the id of the content div.
		var id = $(this).parent().parent().attr("id");
		console.log(id);

		// Calculates the indicies.
		var index = id.substr("content".length);
		var subIndex = $(this).attr("id").substr(("rm" + index).length);
		console.log(index);
		console.log(subIndex);

		// Removes the entry from the entry array.
		family[index]["entry"].splice(subIndex, 1);

		// Clears the div and repopulates.
		displayContent(index);
	}
}

function reindex(array) {
	for (var i = 0; i < array.length; i++) {
		array[i]["index"] = i;
	}
}