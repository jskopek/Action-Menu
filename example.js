var actions = [{
    "group": "Set Status",
    "items": [
    {
        "id": "active_visible",
        'title':"Active + Visible",
        "description": "Can submit answers. Feedback visible in Content pane"
    },
    {
        "id": "visible",
        'title':"Visible",
        "description": "Cannot submit answer. Question visible in Content pane"
    },
    {
        "id": "active",
        'title':"Active",
        "description": "Can submit answers"
    },
    {
        "id": "review",
        'title':"Review",
        "description": "Cannot submit answers. Can see question and correct answer"
    },
    {
        "id": "inactive",
        'title':"Inactive",
        "description": "Cannot access question"
    }]
}, {
    "group": "Actions",
    "items": [
        { "id": "Preview", "instant": true },
        { "id": "Answers", "instant": true },
        { "id": "Edit", "instant": true },
        { "id": "Duplicate", "instant": true }
    ]
}]

$(document).ready(function() {
    $("#menu").actionmenu({
        "actions": actions,
        "current_action": "active_visible"
    });
    $("#menu").bind("actionmenuchanged", function(e, action) {
        console.log("Action clicked", action);
    });
});
