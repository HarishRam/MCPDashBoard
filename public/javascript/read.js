$('.btn-circle').click(function(e){
    e.preventDefault();
    var demi_id = e.currentTarget.name;
    var form = $(this);
    $.get("/validate/"+demi_id, function(data) {
        var expected_make_model = $(".btn-small").text(),
            wurfl_details = JSON.parse(data),
            actual_make_model = wurfl_details.brand+"-"+wurfl_details.model;

        if(expected_make_model.includes(actual_make_model.trim())){
                form.removeClass("btn-info");
                form.addClass("btn-success");

                $("div.agent").remove();
                $("div.parent").append("<div class='agent'></div>");
                $("div.agent").append("<p><b>User Agent :</b></p>");
                $("div.agent").text(wurfl_details.user_agent.trim());
        }else{
            $("div.agent").remove();
            $("div.parent").append("<div class='agent'></div>");
            $("div.agent").append("<p><b>User Agent :</b></p>");
            $("div.agent").append("<p>"+wurfl_details.user_agent.trim()+"</p>");
            $("div.agent").append("<p><b>Expected Brand Mode :</b> </p>");
            $("div.agent").append("<p>"+wurfl_details.brand.trim()+"-"+wurfl_details.model.trim()+"</p>");
            form.removeClass("btn-info");
//            $(form.context.childNodes).remove();
            form.addClass("btn-danger");
//            form.append('<li class="fa fa-times"></li>');
        }
    });
});


//<div class="modal-header">
//    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//    <h4 class="modal-title">User Agent</h4>
//</div>