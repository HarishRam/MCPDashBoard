$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    year: 2016,
    defaultView: 'month',
    month: new Date().getMonth(), // January
    editable: true,
    selectable: true,
    selectHelper: true,
    events: './json/planningData.json',

    select: function (start, end, allDay, event) {

        $("#myModalNorm #eventtitle").val(event.title);
        $("#myModalNorm #startDate").val(start);
        $("#myModalNorm #endDate").val(end);
        $("#myModalNorm").modal('show');

        $('#submitButton').click(function(e){

            e.preventDefault();
            var title = $("#myModalNorm #eventtitle").val(),
                start = $("#myModalNorm #startDate").val(),
                end   = $("#myModalNorm #endDate").val();

            $('#calendar').fullCalendar('updateEvent', {'id': event.id, 'title': title, 'start': start, 'end': end});

            $("#myModalNorm").modal('hide');

            $("#calendar").fullCalendar('renderEvent',
                {
                    title: title,
                    start: start,
                    end: end
                },
                true);

            saveMyData({'id': 0, 'title': title, 'start': start, 'end': end, 'action': "new"});

        });

    },

    eventClick: function(calEvent, jsEvent, view, event) {

        $('#delete').click(function(){
            $('#calendar').fullCalendar('removeEvents', function (event) {
                $("#myModalNorm").modal('hide');
                return event == calEvent;
            });

            $('#calendar').fullCalendar('updateEvent', {'id': calEvent.id, 'title': calEvent.title, 'start': calEvent.start, 'end': calEvent.end});
            saveMyData({'id': calEvent.id, 'title': calEvent.title, 'start': calEvent.start, 'end': calEvent.end, 'action': "delete"});
        }),

        $('#submitButton').click(function(e){
            e.preventDefault();
            $('#calendar').fullCalendar('clientEvents', function(event){

                if (event == calEvent){
                    var title = $("#myModalNorm #eventtitle").val(),
                        start = $("#myModalNorm #startDate").val(),
                        end   = $("#myModalNorm #endDate").val();


                    $("#myModalNorm").modal('hide');

                    $('#calendar').fullCalendar('removeEvents', function (event) {
                        return event == calEvent;
                    });


//                    $('#calendar').fullCalendar('updateEvent', {'id': event.id, 'title': title, 'start': start, 'end': end});

                    $("#calendar").fullCalendar('renderEvent',
                        {
                            title: title,
                            start: start,
                            end: end,
                            color: event.color
                        },
                        true);
                    saveMyData({'id': event.id, 'title': title, 'start': start, 'end': end, 'action': "update"});
                }

            });
        });

    },

    eventResize: function (event, dayDelta, minuteDelta) {
        $("#eventtitle").val(event.title);
        $("#startDate").val(event.start);
        $("#endDate").val(event.end);
//        $("#myModalNorm").modal('show');
        $('#calendar').fullCalendar('updateEvent', {'id': event.id, 'title': event.title, 'start': event.start, 'end': event.end});
        saveMyData({'id': event.id, 'title': event.title, 'start': event.start, 'end': event.end, 'action': "update"});
    },

    eventDrop: function (event, dayDelta, minuteDelta) {
        $("#eventtitle").val(event.title);
        $("#startDate").val(event.start);
        $("#endDate").val(event.end);
//        $("#myModalNorm").modal('show');
        $('#calendar').fullCalendar('updateEvent', {'id': event.id, 'title': event.title, 'start': event.start, 'end': event.end});

        saveMyData({'id': event.id, 'title': event.title, 'start': event.start, 'end': event.end, 'action': "update"});
    },


    eventRender: function (event, element) {

        element.click(function() {
            //$("#myModalNorm").dialog({ modal: true, title: event.title, width:550, height:340});
            $("#eventtitle").val(event.title);
            $("#startDate").val(event.start);
            $("#endDate").val(event.end);
            $("#myModalNorm").modal('show');

        });
    }

});



function saveMyData(event) {
    jQuery.post(
        '/event/save',
        {
            action: event.action,
            id: event.id,
            title: event.title,
            start: event.start,
            end:   event.end
        }
    );
};
