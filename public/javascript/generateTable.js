var addDataToTable = (function() {


    function uploadData(years){
        $.ajax({
            url: '/json/'+years.selector,
            success: function(data){
                console.log('res ', data);
                loadData = JSON.parse(data);
                return loadData;
            },
            cache: false
        }).then(function() {
            appendTableTags();
            modalDialogsTags();
        }).fail(function(jqXHR, textStatus, error) {
           console.log(jqXHR.responseText);
        }).done(function() {
           console.log("Ajax request is completed");
        });
    }

    function appendTableTags(){

     var table = $dTable.DataTable({order: [[ 0, "desc" ]],responsive: true,dom: 'Blfrtip',buttons: ['excelHtml5','csvHtml5','pdfHtml5']});

        loadData.forEach(function(tickets){
            var html = "";
            html += "<tr class='odd gradeX' role='row'>";
           // html += "<td data-toggle='modal' data-target='#"+tickets.ticket_id+"' class='btn btn-info'>"+tickets.ticket_id+"</td>";
            html += "<td data-toggle='modal' class='btn btn-info'> <a href =https://jira.dev.bbc.co.uk/browse/"+tickets.ticket_id+" target="+"_blank>"+tickets.ticket_id+"</a></td>"
            html += "<td>"+tickets.Device_Title+"</td>";

            if(tickets.project_name === 'IPLTVCERT')
            {
            html += "<td><a id='btn-id' target='_blank' href='https://jira.dev.bbc.co.uk/browse/"+tickets.user_agent+"' " +
                "class='btn btn-small btn-info'>"+tickets.Brand_model+"</a>";
            html += "<button data-toggle='modal' data-target='#uadialog"+tickets.user_agent+"' " +
                "class='btn btn-info btn-circle' type='button' name='"+tickets.user_agent+"'>UA</button></td>";
                html += "<td><textarea rows='2' cols='20'>"+tickets.Models+"</textarea></td>";
            //    html += appendSubtasks(tickets.Task_status);

                html += "<td>"+tickets.consolidated_report+"</td>";
                html += "<td>"+tickets.Labels+"</td>";
                html += "<td>"+tickets.Deployed_Status+"</td>";
            }
            else 
            { 
                html += "<td>"+tickets.Models+"</td>"; 

                 html += "<td> <a href =https://bbc-ramseries5000.realassetmgt.com/spa/#/searchResults/1?term="+tickets.AssetNumber+" target="+"_blank>"+tickets.AssetNumber+"</a></td>"
          //      html += "<td>"+tickets.RAMURL+"</td>";
                html += "<td>"+tickets.TestRail+"</td>";
             // html += "<td><a href =\""+tickets.RAMURL+"\">RAM URL</a></td>";
                html += appendSubtasks(tickets.Task_status);
                html += "<td>"+tickets.Labels+"</td>";
               // html += "<select autofocus><option value="+"tickets.Labels"+">Platforms</option></select>";
                
            }


//            html += "<td>"+tickets.consolidated_report+"</td>";
//            html += "<td>"+tickets.Labels+"</td>";
//            html += "<td>"+tickets.Deployed_Status+"</td>";

            html += "</tr>";
            table.row.add($(html)).draw(false);
        });

    }

    function appendSubtasks(tasks){
        var colTasks = "";

        for(var i=0;i<tasks.length;i++){
            var status = tasks[i].match(/pass|fail/i);
            if (status != null){
                var currentStatus = status.pop();
                colTasks +="<td class='"+currentStatus.toLowerCase()+"'>"+currentStatus+"</td>";
            }else{
                colTasks +="<td>"+tasks[i]+"</td>";
            }
        }
        return colTasks;
    }

    function modalDialogsTags(){
        var modalDialog="";
        loadData.forEach(function(tickets){
            modalDialog += "<div class='modal fade' id='"+tickets.ticket_id+"' tabindex='-1' role='dialog' " +
                "aria-labelledby='Label"+tickets.ticket_id+"'>";
            modalDialog += "<div class='modal-dialog' role='document'> <div class='modal-content'> <div class='modal-header'>";
            modalDialog += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                "<span aria-hidden='true'>&times;</span></button>";
            modalDialog += "<h4 class='modal-title' id='Label"+tickets.ticket_id+"'>"+tickets.ticket_id+"</h4></div>";
            modalDialog += "<div class='modal-body'>";

            if(tickets.Description != null && tickets.Description.indexOf("\r\n")!=-1){
                tickets.Description.split("\r\n").forEach(function(data){
                    modalDialog += "<p>"+data+"</p>";
                });
            }else{
                modalDialog += "<p>"+tickets.Description+"</p>";
            }

            modalDialog += "</div></div></div></div>";

            if(tickets.project_name === 'IPLTVCERT'){
            modalDialog += "<div class='modal fade' id='uadialog"+tickets.user_agent+"' tabindex='-1' role='dialog' " +
                "aria-labelledby='agent-"+tickets.user_agent+"'>";
            modalDialog += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>";
            modalDialog += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                "<span aria-hidden='true'>&times;</span></button>";
            modalDialog += "<h4 class='modal-title'>User Agent</h4></div>";
            modalDialog += "<div class='modal-body parent'><div class='agent'></div></div></div></div></div>";
            }

        });
        $modal.html(modalDialog);
    }

    function init(opts){
       $dTable = $(opts.dataTables);
       $modal = $(opts.modal_dialog);
       $yearToFetch = $(opts.dataToFetch);

        uploadData($yearToFetch);
    }

    var loadData = [],
        $modal,
        $dTable,
        $yearToFetch,

         addingData = {
        uploadData: uploadData,
        init: init
    };

    return addingData;

})();


//$(document).ready(function(){
//
//    addDataToTable.init({
////       tdbody: "#datatable",
//       dataTables: "#dataTables-example",
//       modal_dialog: "#modalDialog",
//       dataToFetch: "2016"
//    });
//});


//$(document).ready(function(){
//
//    addDataToTable.init({
//        dataTables: "#dataTables-example",
//        modal_dialog: "#modalDialog",
//        dataToFetch: "yearDataToFetch"
//        });
//});