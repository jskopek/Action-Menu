(function($) {
    $.fn.extend({
        "actionmenu": function(data) {
            $(this.el).find('.status span').unbind('click').bind('click', function(event) {
                actionmenu(this, data);
            });
            $(this.el).find('.status span').unbind('mousedown').bind('mousedown', function(event) { return false; }); // prevents conflict with easy_select
        }
    });
})(jQuery);

function actionmenu(item, data) {
    if( !item.get("status_list") ) { return; } //don't do anything if there is no status list to show
    event.stopPropagation();

    list = item.get("list") ? item.get("list") : undefined;
    $list_el = $(this.el).parents(".thm_tree");
        var bt_el = $(this).find("div.option");

        //removes any other status lists
        $(".status_list").remove();

        //makes resizable trees non-resizable, and adds special class to current tree for disabled effect
        if( $().resizable )
        {
            $(".thm_panel_body").resizable("option", "disabled", true);
        }

        //reset on-click styling for all trees
        $(".thm_tree.thm_tree_resize_disabled").removeClass("thm_tree_resize_disabled");
        $(".thm_tree .thm_tree_list_item.hovered").removeClass("hovered");

        //set on-click styling for tree
        $list_el.addClass('thm_tree_resize_disabled');

    //hide the hover options
        var el = bt_el.parents(".status").find(".options");
        $list_el.find(".item").removeClass("hovered");
        el.parents(".item").addClass("hovered");
        bt_el.parents(".status").find(".options").hide();

        //create popup
    var status_list_template = "<div class='status_list'>" +
            "<div class='options'>" +
                "<span class='close'>x</span>" +
                        "{{#status_list}}" +
                        "<div class='group'>{{ group }}</div>" +
                        "{{#items }}" +
                        "<div href='#' class='option {{id}}' status='{{id}}'>{{title}}{{#description}}<span>- {{description}}</span>{{/description}}</div>" +
                        "{{/items}}" +
                        "{{/status_list}}" +
            "</div>" +
    "</div>"
    var status_list_data = {
        status: item.get("status"),
        status_list: item.get("status_list")
    }
    var status_list_html = Mustache.to_html(status_list_template, status_list_data);
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
        if( (top_pos - $(window).scrollTop()) > 0 ) {
            status_list.css("top", top_pos);
        }
    }

    status = item.get("status");
    status_list.find("[status=" + status + "]").addClass('current');

    //hack to hide duplicate button from status list
    if( item.is_label() ) {

        //this is the worst hack i've ever written, but it's 3am - marc
        if( item.get("list") ) {
            var module_name = $(item.get("list").elem).attr("status_list_name");
            if( module_name == "feedback" ) { status_list.find(".options .visible").hide(); status_list.find(".options .active").hide(); status_list.find(".options .review").hide(); }
        }

        status_list.find(".options .duplicate").hide()
        status_list.find(".options .answers").hide()
    }

    //trigger status change event when user clicks status element
    $(status_list).find("div.option").unbind("click").bind('click', function(e) {
        
        var status = $(this).attr("status");

        // list.trigger("status_clicked", status, item, list);
        // list.trigger("status_clicked." + status, item, list);

        // $list_el.trigger("status_clicked." + $(this).attr("status"), item); //compatibility

        //if the option is a status change, change the item status
        if( _.indexOf(['active','active_visible','visible','review','inactive'], status) >= 0 ) {
            item.set({status: status});
        }

        $(status_list).trigger("leave");

        item.trigger("status_clicked", status, item, list);

        return false;
    });

    status_list.bind("leave", function() {
        $(".status_list").remove();
        $list_el.find(".thm_tree_list_item").removeClass("hovered");
        if( $().resizable )
        {
            $(".thm_panel_body").resizable("option", "disabled", false);
        }
        $list_el.removeClass('thm_tree_resize_disabled');
    });

    $("body").click(function(event) {
        status_list.trigger("leave");
        bt_el.unbind(event);
    });
    $(this).click(function(event) {
        event.stopPropagation();
    });

    item.trigger("status_list_added");
}
