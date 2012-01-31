(function($) {
    $.fn.extend({
        "actionmenu": function(options) {

            //set up default options
            this.options = $.extend({
                "actions": {},
                "current_action": undefined
            }, options);


            this.launch_menu = function(e) {
                e.preventDefault();
                e.stopPropagation();

                var bt_el = $(this).find("div.option");

                //removes any other status lists
                $(".actionmenu_popup").remove();

                //hide the hover options
                /*var el = bt_el.parents(".status").find(".options");*/
                /*$list_el.find(".item").removeClass("hovered");*/
                /*el.parents(".item").addClass("hovered");*/
                /*bt_el.parents(".status").find(".options").hide();*/

                //create popup
                var template = _.template("<div class='actionmenu actionmenu_popup'>" +
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
                var actionmenu = $(status_list_html);

                var top_pos = bt_el.offset().top, left_pos = bt_el.offset().left
                actionmenu.css("top", top_pos);
                actionmenu.css("left", left_pos);
                $("body").append(actionmenu);
                

                //calculate if the popup dialog is off screen; if so, move it up until it is on screen
                //this must be done after the element is added to the page, as its height cannot be calculated before
                //the status_list_bottom_pos is calculated relative to the top of the window, not the document
                //i.e. the scrollbar position should not affect the status_list_bottom_pos value
                //add 5px buffer
                var status_list_bottom_pos = $(actionmenu).height() + $(actionmenu).offset().top - $(window).scrollTop() + 5;
                var num_offscreen_pixels = status_list_bottom_pos - $(window).height();
                if( num_offscreen_pixels > 0 ) {
                    top_pos -= num_offscreen_pixels;

                    //ensure that top does not go off screen
                    if( (top_pos - $(window).scrollTop()) < 0 ) {
                        top_pos = $(window).scrollTop();
                    }

                    actionmenu.css("top", top_pos);
                }

                //highlight current status
                actionmenu.find("[status=" + this.options.current_action + "]").addClass('current');

                //trigger status change event when user clicks status element
                $(actionmenu).find("div.option").bind('click', $.proxy(function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var action = $(e.currentTarget).attr("status");
                    this.options.current_action = action;
                    this.trigger("actionmenuchanged", action);

                    this.trigger("leave");
                }, this));

                this.bind("leave", function() { $(".actionmenu_popup").remove(); });
                $(window).bind("click",$.proxy(function(event) { this.trigger("leave"); }, this));
            }           

            this.render_current_action = function() {
                var el = $(this).find(".option");
                if( this.options.current_action ) { el.attr("status", this.options.current_action ); }
            }

            //initialize
            $(this).addClass("actionmenu actionmenu_button");
            $(this).html("<span class='" + (this.options.actions.length ? "modifiable" : "") +"'>" +
                    "<div href='#' class='option'>Actions</div>" +
                    "</span>");

            this.render_current_action();
            $(this).bind("actionmenuchanged", $.proxy(this.render_current_action, this));

            $(this).bind('click', $.proxy(this.launch_menu, this));
        }
    });
})(jQuery);


