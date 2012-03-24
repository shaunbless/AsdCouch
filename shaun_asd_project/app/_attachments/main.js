//mobile DOM loader ($) mobile method
$('#register').live('pageshow', function(){
	var rbform = $('#regform');
	var	rberrorslink = $('#rberrorslink');
	var formSave = $('#submit');
	var d = new Date();
	var key = (d.getTime());
	console.log("Yo wake up!");
	// save form function
	formSave.on('click', function(){
		// form validation in jqm
		rbform.validate({
			invalidHandler: function(form, validator){
				rberrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="' + key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldname = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldname + '</li>';
				}
				$("#signuperrors ul").html(html);
			},
			submitHandler: function(){
				var data = rbform.serializeArray();
				console.log(data);
				storeData(data);
			} 
		}); 
	}); 
	
	
	
	var storeData = function (aptData) {
		var _id = 'data' + Math.floor(Math.random() * 1000000001);
		console.log(aptData[0].value);
		var apts = {};
		apts._id = _id;
		apts.fname = (aptData[0].value);
		apts.lname = (aptData[1].value);
		apts.email = (aptData[2].value);
		apts.phnumber = (aptData[3].value);
		apts.month = (aptData[4].value);
		apts.date = (aptData[5].value);
		apts.year = (aptData[6].value);
		apts.uname = (aptData[7].value);
		apts.pass = (aptData[8].value);

		
		$.couch.db('shaunauto').saveDoc(apts, {
			success : function(data){
				alert('The Disc has been saved');
				$.mobile.changePage($('#account'));
			}
		});
		
	}; // ending storeData function
	
	
});



$('#displayPage').live('pageshow', function () {
	$.couch.db("shaunauto").view("app/info", {
		success: function (data) {
			$.each(data.rows, function(index, value) {
				var item = (value.value || value.doc);
				$('#apptData').append(
					$('<li>').append(
						$('<a>').attr("href", "data.html?data=" + item.fname)
						.text(item.fname)
					)
				);
			})
			$('#apptData').listview('refresh');
		}
	});
});

// JSON List
$('#jsondata').bind('click', function(){
	$('#data').empty();
	$('<p>').html('JSON Data Imported').appendTo('#data');
	$.ajax({
		url: 'xhr/info.json',
		type: 'GET',
		dataType: 'json',
		success: function(answer){
        	for (var i=0, j=answer.datas.length; i<j; i++){
				var jdata = answer.datas[i];
				$(''+
					'<div class="datainfo">'+
						'<p>First Name: '+ jdata.fname +'</p>'+
						'<p>Last Name: '+ jdata.lname +'</p>'+
						'<p>Email: '+ jdata.email +'</p>'+
						'<p>Username: '+ jdata.user +'</p>'+
						'<p>Password: '+ jdata.pass +'</p>'+
						'<p>City: '+ jdata.city +'</p>'+
						'<p>State: '+ jdata.state +'</p>'+
						'<p>Miles: '+ jdata.miles +'</p>'+
					'</div>'
				).appendTo('#data');
				console.log(answer);
			}
		}
	});
	return false;
});



//CSV List
$('#csvdata').on('click', function(){
	$('#data').empty();
	$('<p>').html('CSV Data Imported').appendTo('#data');
	 $.ajax({
        type: "GET",
        url: "xhr/info.csv",
        dataType: "text",
        success: function(data) {
        	var allInfo = data.split(/\r\n|\n/);
    		var headers = allInfo[0].split(',');
    		var info = []; 

			for (var i=1; i<allInfo.length; i++) {
				var data = allInfo[i].split(',');
				if (data.length == headers.length) {
					var forminfo = []; 

					for (var j=0; j<headers.length; j++) {
						forminfo.push(data[j]); 
					}
					info.push(forminfo); 
				}

			}

			for (var m=0; m<info.length; m++){
				var acontact = info[m];
			$(''+
					'<div class="datainfo">'+
						'<h3>'+ acontact[0] +'</h3>'+
						'<p>First Name:'+ acontact[1] +'</p>'+
						'<p>Last Name: '+ acontact[2] +'</p>'+
						'<p>Email: '+ acontact[3] +'</p>'+
						'<p>Username: '+ acontact[4] +'</p>'+
						'<p>Password: '+ acontact[5] +'</p>'+
						'<p>City: '+ acontact[6] +'</p>'+
						'<p>State: '+ acontact[4] +'</p>'+
						'<p>Gender: '+ acontact[5] +'</p>'+
						'<p>Time: '+ acontact[6] +'</p>'+
					'</div>'
				).appendTo('#data');
			console.log(info);	
			}
        }
	});
	return false;
});
