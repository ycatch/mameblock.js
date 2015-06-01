/** mame block .
	Copyright 2015 Yutaka Kachi released under MIT license.
 */
 
(function() {
	var soramame = {};
	var expDialog_hundle = {}; //for Express Line Editor

	/** init connect for mameBlock and jquery-sortable =============
	 */
	soramame.init = function(code_area, templateName) {
		$(code_area).load(templateName, function(data) {
			if(data == null){
				$(code_area).append("Error:init, missing template"); 
			} else {
				soramame.blockInit();
			}
		});
	};
	
	/** connect for mameBlock and jquery-sortable =============
	 */
	soramame.blockInit = function() {
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
		
		/** Init Express Editor */
		$("#modal-express").mameModal();

		/** Open express editor */
		$('span.exp-body').click(function(){
			$('#modal-express').trigger('openModal');
			expDialog_hundle = $(this);
			openExpDialog(expDialog_hundle.text());
		});
		
		/** Close express editor */
		$('.modal_close').click(function(e){
			$('#modal-express').trigger('closeModal');
			
			var strTextBox = $('#expModalText').val();
			expDialog_hundle.text(strTextBox);
			var itemName = expDialog_hundle.attr('class').split(" ")[1];
			expDialog_hundle.parent().next().find('span.' + itemName).text(strTextBox)
		});
		
		var openExpDialog = function(expBody) {
			var textArea = $('#expModalText');
			textArea.attr("size", (expBody.length < 10)? 10 : expBody.length * 2);
			textArea.val(expBody).focus();
		}
	}

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
			retryCount = 0;
			retryLimit = 3;

		do {
			data = $('.serialize .code-body').text().replace(/\t+\n/g, "");
			retryCount += 1;
		} while(retryCount <= retryLimit && data === "")

		if (data === "") {
			data = "Error: getCodeBlock, null:" + retryCount;
		} else {
			data = js_beautify(data.replace(/\t+-+/g, "\n"));
		}		

		return data;
	};

	/** add Single Global var. */
	if (typeof window.MAME_BLOCK == "undefined") {
		window.MAME_BLOCK = soramame;
	}
	
})()