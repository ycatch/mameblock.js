/** mame block .
	Copyright 2015 Yutaka Kachi released under MIT license.
 */
 
(function() {
	var soramame = {};
	var expDialog_hundle = {}; //for Express Line Editor

	/** connect for mameBlock and jquery-sortable =============
	 */
	soramame.init = function(code_area, templateName) {
		$(code_area).load(templateName, function(data) {
			if(data == null){
				$(code_area).append("Error:init, missing template"); 
			} else {
				$('ol.pallet-code').sortable({
					group: 'connect-area',
					drop: false,
					onDragStart: function (item, container, _super) {
						// Duplicate items of the no drop area
						if(!container.options.drop) {
							item.clone(true).insertAfter(item)
						}
						_super(item);
					},
				});

				$('ol.block').sortable({
					group: 'connect-area',
				});

				$('ol.trash-code').sortable({
					group: 'connect-area',
				});
			}
		});
	};
	
	/** clearTrash =============
	 */
	soramame.clearTrash = function() {
		if(window.confirm("Clear trash?")) {
			$("#trash-can").empty();
		}
	};
	
	/** Serialize and transfer from blocks to code.  =============
	*/
	soramame.getCodeBlock = function() {
		var data = "",
			retryCount = 2;

		do {
			data = $('.serialize .code-body').text().replace(/\t+\n/g, "");
			retryCount -= 1;
		} while(retryCount > 0 && data === "")

		if (data === "") {
			data = "Error: getCodeBlock, null" + data;
		} else {
			data = js_beautify(data.replace(/\t+-+/g, "\n"));
		}		

		return data;
	};


	/** Express Line Editor for SoraMame.Block =============
		Using Modal.js of bootstrap
	 */
	var openExpDialog = function(expBody) {
		$('#expModalDialog').modal();
		var textArea = $('#expModalText');
		textArea.attr("size",(expBody.length < 10)? 10 : expBody.length * 2);
		textArea.val(expBody);
	};
	
	$('span.exp-body').click(function() {
		expDialog_hundle = $(this);
		openExpDialog(expDialog_hundle.text());
	})
	
	/** When open dialog, focus on textbox for bootstrap3 */
	$('#expModalDialog').on('shown.bs.modal', function () {  
		$('#expModalText').focus();  
	});  
	
	$('#btn_ok_expModalDialog').click(function() {
		var strTextBox = $('#expModalText').val();
		expDialog_hundle.text(strTextBox);
		var itemName = expDialog_hundle.attr('class').split(" ")[1];
		expDialog_hundle.parent().next().find('span.' + itemName).text(strTextBox)
		$('#expModalDialog').modal('hide');
	});

	/** add Single Global var. */
	if (typeof window.MAME_BLOCK == "undefined") {
		window.MAME_BLOCK = soramame;
	}
	
})()

MAME_BLOCK.app = {
	msg: "Hello SoraMame Block"

};