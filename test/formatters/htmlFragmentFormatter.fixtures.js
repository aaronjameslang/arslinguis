var fixtures = module.exports = [];

fixtures.mimeTypes = ['text/html;fragment'];

fixtures.push({
	mimeType: 'text/html;fragment',
	input: [{
		id: "oOvzKAxzTyKJMOATwX08Kg",
		"type" : "user",
		"names": [
			"William Annis"
		],
		"descriptions": [
			"TODO: describe William Annis"
		]
	}],
	output: "\
<ol>\
	<li id="/users/oOvzKAxzTyKJMOATwX08Kg">\
		<a href="#/users/oOvzKAxzTyKJMOATwX08Kg">\
			<a href="/users/oOvzKAxzTyKJMOATwX08Kg">William Annis</a>\
			<span>V-ICON</span>
		</a>\
		<div>
			TODO: describe William Annis
		</div>
	</li>\
</ol>\
"
});

