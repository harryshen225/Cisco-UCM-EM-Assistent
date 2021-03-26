module.exports = function getMainCard(fullname) {
    return ({
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "Image",
                                "url": "http://78d1m1e8gr234gry0naovd78-wpengine.netdna-ssl.com/wp-content/uploads/2019/02/hwl-ebsworth-lawyers-logo-500px-350x92.png",
                                "size": "Medium",
                                "height": "50px"
                            }
                        ],
                        "width": "auto"
                    },
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "HWL Virtual Assistant",
                                "weight": "Lighter",
                                "color": "Accent"
                            },
                            {
                                "type": "TextBlock",
                                "weight": "Bolder",
                                "text": "Main Menu",
                                "wrap": true,
                                "color": "Light",
                                "size": "Large",
                                "spacing": "Small"
                            }
                        ],
                        "width": "stretch"
                    }
                ]
            },
            {
                "type": "Container",
                "items": [
                    {
                        "type": "RichTextBlock",
                        "inlines": [
                            {
                                "type": "TextRun",
                                "text": `Hi ${fullname}, \n I am your personal assistant to help answer basic questions and tasks. If I am not able to answer your question, I will give you links where you can find info.\n Now can we get started? Please click on the following buttons according to your request.`
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Support",
                                                        "style": "positive",
                                                        "id": "get_support_card",
                                                        "data": { "action": "get_support_card"}
                                                    },
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Phone Login",
                                                        "id": "get_login_card",
                                                        "data": { "action": "get_login_card"}
                                                    },
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Train Time Table",
                                                        "id": "get_train_time_table",
                                                        "data": { "action": "get_train_tb_card"}
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.ShowCard",
                                        "title": "How it works",
                                        "card": {
                                            "type": "AdaptiveCard",
                                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                            "body": [
                                                {
                                                    "type": "Container",
                                                    "items": [
                                                        {
                                                            "type": "ColumnSet",
                                                            "columns": [
                                                                {
                                                                    "type": "Column",
                                                                    "width": 45,
                                                                    "id": "",
                                                                    "items": [
                                                                        {
                                                                            "type": "RichTextBlock",
                                                                            "inlines": [
                                                                                {
                                                                                    "type": "TextRun",
                                                                                    "text": "At my current version, I can help you with creating a support ticket, logging you into phones and finding out train time table"
                                                                                }
                                                                            ],
                                                                            "id": "how_it_works_text_1"
                                                                        },
                                                                        {
                                                                            "type": "RichTextBlock",
                                                                            "inlines": [
                                                                                {
                                                                                    "type": "TextRun",
                                                                                    "text": "You can either click the corresponding buttons or send me the following texts for the same requests:"
                                                                                }
                                                                            ],
                                                                            "id": "how_it_works_text_2"
                                                                        },
                                                                        {
                                                                            "type": "ColumnSet",
                                                                            "id": "testt",
                                                                            "columns": [
                                                                                {
                                                                                    "type": "Column",
                                                                                    "width": "stretch",
                                                                                    "items": [
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "Main Menu",
                                                                                            "wrap": true,
                                                                                            "weight": "Bolder",
                                                                                            "color": "Good"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "Support Menu",
                                                                                            "wrap": true,
                                                                                            "weight": "Bolder",
                                                                                            "color": "Good"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "Login Menu",
                                                                                            "wrap": true,
                                                                                            "weight": "Bolder",
                                                                                            "color": "Good"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "Train Timetable Menu",
                                                                                            "wrap": true,
                                                                                            "weight": "Bolder",
                                                                                            "color": "Good"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "Column",
                                                                                    "width": "stretch",
                                                                                    "items": [
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "\\main",
                                                                                            "wrap": true,
                                                                                            "color": "Dark",
                                                                                            "fontType": "Monospace",
                                                                                            "weight": "Bolder"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "\\support",
                                                                                            "wrap": true,
                                                                                            "color": "Dark",
                                                                                            "fontType": "Monospace",
                                                                                            "weight": "Bolder"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "\\login",
                                                                                            "wrap": true,
                                                                                            "color": "Dark",
                                                                                            "fontType": "Monospace",
                                                                                            "weight": "Bolder"
                                                                                        },
                                                                                        {
                                                                                            "type": "TextBlock",
                                                                                            "text": "\\train",
                                                                                            "wrap": true,
                                                                                            "color": "Dark",
                                                                                            "fontType": "Monospace",
                                                                                            "weight": "Bolder"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "verticalContentAlignment": "Center"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        "id": "login_self_card",
                                        "style": "positive"
                                    }
                                ]
                            }
                        ],
                        "type": "Column"
                    }
                ]
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2"
    }
    )
}