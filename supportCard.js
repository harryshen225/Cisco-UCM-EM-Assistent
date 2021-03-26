module.exports = function getSupportCard(fullname) {
    return (
        {
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
                                    "color": "Accent",
                                    "horizontalAlignment": "Center"
                                },
                                {
                                    "type": "TextBlock",
                                    "weight": "Bolder",
                                    "text": "Support Menu",
                                    "wrap": true,
                                    "color": "Light",
                                    "size": "Large",
                                    "spacing": "Small",
                                    "horizontalAlignment": "Center"
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
                            "type": "TextBlock",
                            "text": `Hi ${fullname}, \n You can either create a new ticket here or  from the below link.   `,
                            "wrap": true
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
                                                    "type": "ColumnSet",
                                                    "columns": [
                                                        {
                                                            "type": "Column",
                                                            "width": 5,
                                                            "items": [
                                                                {
                                                                    "type": "Image",
                                                                    "altText": "",
                                                                    "url": "https://developer.webex.com/images/link-icon.png"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type": "Column",
                                                            "width": 95,
                                                            "items": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "[HWL Support Page](https://www.cisco.com/c/en_au/support/index.html)"
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
                                                            "title": "Create Ticket Here",
                                                            "card": {
                                                                "type": "AdaptiveCard",
                                                                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                                                "body": [
                                                                    {
                                                                        "type": "ColumnSet",
                                                                        "columns": [
                                                                            {
                                                                                "type": "Column",
                                                                                "width": 25,
                                                                                "separator": true,
                                                                                "items": [
                                                                                    {
                                                                                        "type": "TextBlock",
                                                                                        "text": "Ticket Title",
                                                                                        "height": "stretch",
                                                                                        "horizontalAlignment": "Left",
                                                                                        "wrap": true
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "type": "Column",
                                                                                "width": 75,
                                                                                "items": [
                                                                                    {
                                                                                        "type": "Input.Text",
                                                                                        "placeholder": "please fill the ticket title here",
                                                                                        "id": "ticket_title"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "ColumnSet",
                                                                        "columns": [
                                                                            {
                                                                                "type": "Column",
                                                                                "width": 25,
                                                                                "items": [
                                                                                    {
                                                                                        "type": "TextBlock",
                                                                                        "text": "Request Type"
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "type": "Column",
                                                                                "width": 75,
                                                                                "items": [
                                                                                    {
                                                                                        "type": "Input.ChoiceSet",
                                                                                        "placeholder": "Please select one of the option",
                                                                                        "choices": [
                                                                                            {
                                                                                                "title": "Laptop",
                                                                                                "value": "laptop"
                                                                                            },
                                                                                            {
                                                                                                "title": "Network",
                                                                                                "value": "network"
                                                                                            },
                                                                                            {
                                                                                                "title": "Accessories",
                                                                                                "value": "accessories"
                                                                                            },
                                                                                            {
                                                                                                "title": "Generic",
                                                                                                "value": "generic"
                                                                                            }
                                                                                        ],
                                                                                        "spacing": "Medium",
                                                                                        "value": "generic",
                                                                                        "wrap": true,
                                                                                        "id": "request_type"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "ColumnSet",
                                                                        "columns": [
                                                                            {
                                                                                "type": "Column",
                                                                                "width": 25,
                                                                                "items": [
                                                                                    {
                                                                                        "type": "TextBlock",
                                                                                        "text": "Description"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "ColumnSet",
                                                                        "columns": [
                                                                            {
                                                                                "type": "Column",
                                                                                "width": "stretch",
                                                                                "items": [
                                                                                    {
                                                                                        "type": "Input.Text",
                                                                                        "placeholder": "Please describe your issue here",
                                                                                        "isMultiline": true,
                                                                                        "id": "description"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "actions": [
                                                                    {
                                                                        "type": "Action.Submit",
                                                                        "title": "Submit Request",
                                                                        "data": {
                                                                            "action": "submit_support"
                                                                        },
                                                                        "id": "submit_support",
                                                                        "style": "destructive"
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
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