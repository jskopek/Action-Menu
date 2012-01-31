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
        { "id": "Preview" },
        { "id": "Answers" },
        { "id": "Edit" },
        { "id": "Duplicate" }
    ]
}]

$(document).ready(function() {
    $("#menu").actionmenu();
});
