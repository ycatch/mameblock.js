$(function() {
	<!-- # Init -->
	var codeArea = $("#exampleArea");
	var codeText = MAME_BLOCK.init("#loading_area", "mameBlock_template.html");
	/* wait for DOM building */
	var wait0 = setTimeout(function() {
		setCode(MAME_BLOCK.getCodeBlock(), codeArea);
	}, 500);
		
	<!-- # Run -->
	$("#mameRun").click(function() {
		<!-- get code -->
		var codeText = MAME_BLOCK.getCodeBlock();
		var mameExec = new Function(codeText);
		mameExec();
	});
	
	<!-- # View Code -->
	$("#mameCode").click(function() {
		alert(MAME_BLOCK.getCodeBlock());
	});
});