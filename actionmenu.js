(function($) {
    $.fn.extend({
        "actionmenu": function(options) {

            //set up default options
            this.options = $.extend({
                "actions": {},
                "el": this,
                "current_action": undefined
            }, options);

            this.launch_menu = function(e) {
                e.preventDefault();

                var bt_el = $(this.options.el);//.find("div.option");

                //removes any other status lists
                $(".status_list").remove();

                //hide the hover options
                /*var el = bt_el.parents(".status").find(".options");*/
                /*$list_el.find(".item").removeClass("hovered");*/
                /*el.parents(".item").addClass("hovered");*/
                /*bt_el.parents(".status").find(".options").hide();*/

                //create popup
                var template = _.template("<div class='status_list'>" +
                        "<div class='options'>" +
                            "<span class='close'>x</span>" +
                                    "<% _.each(action_groups, function(group) { %>" +
                                        "<div class='group'><%= group.group %></div>" +
                                        "<% _.each(group.items, function(item) { %>" +
                                            "<div href='#' class='option <%= item.id %>' status='<%= item.id %>'><%= item.title || item.id %><% if( item.description ) { %><span>- <%= item.description %></span><% } %></div>" +
                                        "<% }); %>" +
                                    "<% }); %>" +
                        "</div>" +
                "</div>");

                var status_list_html = template({ "action_groups": this.options.actions });
                var status_list = $(status_list_html);

                var top_pos = bt_el.offset().top, left_pos = bt_el.offset().left
                status_list.css("top", top_pos);
                status_list.css("left", left_pos);
                $("body").append(status_list);
                

                //calculate if the popup dialog is off screen; if so, move it up until it is on screen
                //this must be done after the element is added to the page, as its height cannot be calculated before
                //the status_list_bottom_pos is calculated relative to the top of the window, not the document
                //i.e. the scrollbar position should not affect the status_list_bottom_pos value
                //add 5px buffer
                var status_list_bottom_pos = $(status_list).height() + $(status_list).offset().top - $(window).scrollTop() + 5;
                var num_offscreen_pixels = status_list_bottom_pos - $(window).height();
                if( num_offscreen_pixels > 0 ) {
                    top_pos -= num_offscreen_pixels;

                    //ensure that top does not go off screen
                    if( (top_pos - $(window).scrollTop()) < 0 ) {
                        top_pos = $(window).scrollTop();
                    }

                    status_list.css("top", top_pos);
                }

                //highlight current status
                status_list.find("[status=" + this.options.current_action + "]").addClass('current');

                /*//hack to hide duplicate button from status list*/
                /*if( item.is_label() ) {*/

                /*//this is the worst hack i've ever written, but it's 3am - marc*/
                /*if( item.get("list") ) {*/
                /*var module_name = $(item.get("list").elem).attr("status_list_name");*/
                /*if( module_name == "feedback" ) { status_list.find(".options .visible").hide(); status_list.find(".options .active").hide(); status_list.find(".options .review").hide(); }*/
                /*}*/

                /*status_list.find(".options .duplicate").hide()*/
                /*status_list.find(".options .answers").hide()*/
                /*}*/

                /*//trigger status change event when user clicks status element*/
                /*$(status_list).find("div.option").unbind("click").bind('click', function(e) {*/

                /*var status = $(this).attr("status");*/

                /*// list.trigger("status_clicked", status, item, list);*/
                /*// list.trigger("status_clicked." + status, item, list);*/


                /*//if the option is a status change, change the item status*/
                /*if( _.indexOf(['active','active_visible','visible','review','inactive'], status) >= 0 ) {*/
                /*item.set({status: status});*/
                /*}*/

                /*$(status_list).trigger("leave");*/

                /*item.trigger("status_clicked", status, item, list);*/

                /*return false;*/
                /*});*/

                /*status_list.bind("leave", function() {*/
                /*$(".status_list").remove();*/
                /*});*/

                /*$("body").click(function(event) {*/
                /*status_list.trigger("leave");*/
                /*bt_el.unbind(event);*/
                /*});*/
                /*$(this).click(function(event) {*/
                /*event.stopPropagation();*/
                /*});*/

                /*item.trigger("status_list_added");*/
            }           

            $(this).bind('click', $.proxy(this.launch_menu, this));
        }
    });
})(jQuery);


