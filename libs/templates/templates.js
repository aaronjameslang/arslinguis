var Handlebars = require("handlebars");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['body'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials.main,depth0,{"name":"main","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials.footer,depth0,{"name":"footer","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['footer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<footer>\n</footer>\n";
},"useData":true});
templates['head'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<head>\n</head>\n";
},"useData":true});
templates['header'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<header>\n	<nav>\n		<a>Ars Linguis</a>\n		<form>\n			<input type=\"text\" placeholder=\"Search\"></input>\n			<input type=\"submit\"></input>\n		</form>\n		<a>Login</a>\n	</nav>\n</header>\n";
},"useData":true});
templates['helpers.js'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "var Handlebars = require('handlebars');\n\nHandlebars.registerHelper('name', function() {\n	if (this.name) return this.name;\n\n	return this.names[0];\n});\n";
},"useData":true});
templates['htmlDoc'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<!doctype HTML>\n<html>\n"
    + ((stack1 = this.invokePartial(partials.head,depth0,{"name":"head","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials.body,depth0,{"name":"body","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</html>\n";
},"usePartial":true,"useData":true});
templates['init.js'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['main'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<main>\n	<h1>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n</main>\n";
},"useData":true});

//# sourceMappingURL=libs/templates/templates.js.map
