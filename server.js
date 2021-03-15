const Framework = require('webex-node-bot-framework');
const webhook = require('webex-node-bot-framework/webhook');
const axios = require('axios');
const https = require('https');
const qs = require('qs');
const libxmljs = require('libxmljs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const parseString = require('xml2js').parseString;

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


// framework options
let config = {
    webhookUrl: 'https://0e6ed6b13ce0.ngrok.io/framework',
    token: 'ZjY5MmI4MTctZmRhMi00MzczLWFmODAtZTM1YjExZmIxZWFkMWVjMDNkMjYtYzk2_P0A1_2264604f-987c-4289-92bf-674df1bbbb86',
    port: 80
};

// init framework
let framework = new Framework(config);
framework.start();

// An initialized event means your webhooks are all registered and the 
// framework has created a bot object for all the spaces your bot is in
framework.on("initialized", function () {
    console.log("Framework initialized successfully! [Press CTRL-C to quit]");
});

// A spawn event is generated when the framework finds a space with your bot in it
// You can use the bot object to send messages to that space
// The id field is the id of the framework
// If addedBy is set, it means that a user has added your bot to a new space
// Otherwise, this bot was in the space before this server instance started
framework.on('spawn', function (bot, id, addedBy) {
    if (!addedBy) {
        // don't say anything here or your bot's spaces will get 
        // spammed every time your server is restarted
        console.log(`Framework created an object for an existing bot in a space called: ${bot.room.title}`);
        // bot.say('Hi Subscriber, I am live now!!`');
        // bot.sendCard(cardBody,
        //     "not working",
        // );


    } else {
        // addedBy is the ID of the user who just added our bot to a new space, 
        // Say hello, and tell users what you do!
        bot.say('Hi there, thanks for talking to me. I can make you log in a phone easier than ever!!');
        bot.sendCard(cardBody,
            "not working",
        );
    }
});

// Process a submitted card
framework.on('attachmentAction', function (bot, trigger) {
    //console.log(trigger.attachmentAction.inputs);
    let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/12.5">  
    <soapenv:Header/>   
    <soapenv:Body>     
    <ns:executeSQLQuery>      
    <sql>        
    select d.name, d.description, n.dnorpattern as DN from device as d,\nnumplan as n, devicenumplanmap as dnpm where dnpm.fkdevice = d.pkid and
    dnpm.fknumplan = n.pkid and d.tkclass = 1 and n.dnorpattern=\'${(trigger.attachmentAction.inputs.action == 'login_custom_user') ? trigger.attachmentAction.inputs.device_number_else : trigger.attachmentAction.inputs.device_number_self}\'</sql>      
    </ns:executeSQLQuery>   
    </soapenv:Body>
    </soapenv:Envelope>`;

    let config = {
        method: 'post',
        url: 'https://198.18.133.3:8443/axl/',
        headers: {
            'SOAPAction': 'CUCM:DB ver=12.5 executeSQLQuery',
            'Content-Type': 'application/javascript',
            'Authorization': 'Basic YWRtaW5pc3RyYXRvcjpkQ2xvdWQxMjMh',
            'Cookie': 'JSESSIONID=CDC79CBD13827540DA32240477A11599; JSESSIONIDSSO=CE65958B18D72ABF40360E5B36B4183F'
        },
        data: data
    };

    // bot.reply(trigger.attachmentAction, `\n${JSON.stringify(trigger.attachmentAction.inputs, null, 2)}`);
    //console.log(/(.+)@/g.exec(trigger.person.emails[0])[1]);
    axiosInstance(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
            parseString(response.data, (err, result) => {
                console.log(JSON.stringify(result,null,0));
                console.log ();
                let queryResultLength = result['soapenv:Envelope']['soapenv:Body'][0]['ns:executeSQLQueryResponse'][0]['return'][0].length;
                if (queryResultLength==0) {
                    bot.reply(trigger.attachmentAction, 'No Device Found with the provided Phone number. Please check again');
                }
                phoneId = result['soapenv:Envelope']['soapenv:Body'][0]['ns:executeSQLQueryResponse'][0]['return'][0]['row'][0].name[0];
                userId = (trigger.attachmentAction.inputs.action == 'login_custom_user') ? trigger.attachmentAction.inputs.username : /(.+)@/g.exec(trigger.person.emails[0])[1]

                let data = qs.stringify({
                    'xml': `<request>\n<appInfo>\n<appID>administrator</appID>\n<appCertificate>dCloud123!</appCertificate>\n</appInfo>\n<login>\n<deviceName>${phoneId}</deviceName>\n<userID>${userId}</userID>\n<deviceProfile>${'DP-' + userId}</deviceProfile>\n<exclusiveDuration>\n<time>60</time>\n</exclusiveDuration>\n</login>\n</request>`
                });
                let config = {
                    method: 'post',
                    url: 'https://198.18.133.3:8443/emservice/EMServiceServlet',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data
                };
                //console.log(data);
                axiosInstance(config)
                    .then(function (response) {
                        //console.log(JSON.stringify(response.data));
                        //bot.reply(trigger.attachmentAction, `\n${JSON.stringify(trigger.attachmentAction.inputs, null, 2)}`);
                        //console.log(response.data);
                        parseString(response.data,(err,result)=>{
                            //console.log(JSON.stringify(result,null,0));
                            if(result.response.failure){
                                error = result['response'].failure[0].error[0]._;
                                //console.log('Login Error: '+error)
                                bot.reply(trigger.attachmentAction, 'Login Unsuccessful: '+error);

                            }else{
                                //bot.reply(trigger.attachmentAction,'User Logged in Successful')
                                //console.log('User Logged in Successful');
                                bot.reply(trigger.attachmentAction, 'User Logged in Successful');
                            }
                        })
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        })
        .catch(function (error) {
            console.log(error);
            console.log('AXL API request failed');
        });

});

var responded = false;
// say hello
framework.hears('hello', function (bot, trigger) {
    bot.say('Hello %s!', trigger.person.displayName);
    responded = true;
});



framework.hears(/\blogin\b/gim, function (bot, trigger) {
    if (!responded) {
        bot.sendCard(cardBody,
            "not working",
        );
        responded = true;
    }else{
        responded = false;
    }
});

// Its a good practice to handle unexpected input
framework.hears(/.*/gim, function (bot, trigger) {
    if (!responded) {
        bot.say('Sorry, I don\'t know how to respond to "%s"', trigger.message.text);
    }
    responded = false;
});

// define express path for incoming webhooks
app.post('/framework', webhook(framework));

// start express server
var server = app.listen(config.port, function () {
    console.log('Framework listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
    console.log('stoppping...');
    server.close();
    framework.stop().then(function () {
        process.exit();
    });
});


let cardBody = {
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
                            "text": "HWL Ebesworth Lawyers",
                            "weight": "Lighter",
                            "color": "Accent"
                        },
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "Phone Login Assistant",
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
                    "type": "TextBlock",
                    "text": "What would you like to do?",
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
                            "type": "ActionSet",
                            "actions": [
                                {
                                    "type": "Action.ShowCard",
                                    "title": "Login for myself",
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
                                                                        "type": "TextBlock",
                                                                        "text": "Device Phone Number",
                                                                        "spacing": "None",
                                                                        "size": "Medium",
                                                                        "color": "Dark",
                                                                        "wrap": true
                                                                    }
                                                                ],
                                                                "verticalContentAlignment": "Center"
                                                            },
                                                            {
                                                                "type": "Column",
                                                                "width": 55,
                                                                "items": [
                                                                    {
                                                                        "type": "Input.Text",
                                                                        "placeholder": "the # displayed on device",
                                                                        "isRequired": true,
                                                                        "errorMessage": "Only Allow Letters",
                                                                        "regex": "[a-zA-Z]+",
                                                                        "$data": "${$root.creator.name}",
                                                                        "maxLength": 20,
                                                                        "id": "device_number_self",
                                                                        "style": "Tel"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "ActionSet",
                                                "spacing": "None",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Login Now",
                                                        "id": "login_self",
                                                        "data": {
                                                            "action": "login_self"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "id": "login_self_card",
                                    "style": "positive"
                                },
                                {
                                    "type": "Action.ShowCard",
                                    "title": "Login for someone else",
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
                                                                        "type": "TextBlock",
                                                                        "text": "Username",
                                                                        "spacing": "None",
                                                                        "size": "Medium",
                                                                        "color": "Dark"
                                                                    }
                                                                ],
                                                                "verticalContentAlignment": "Center"
                                                            },
                                                            {
                                                                "type": "Column",
                                                                "width": 55,
                                                                "items": [
                                                                    {
                                                                        "type": "Input.Text",
                                                                        "placeholder": "e.g john.smith",
                                                                        "isRequired": true,
                                                                        "errorMessage": "Only Allow Letters",
                                                                        "regex": "[a-zA-Z]+",
                                                                        "$data": "${$root.creator.name}",
                                                                        "maxLength": 10,
                                                                        "id": "username"
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
                                                                "width": 45,
                                                                "id": "",
                                                                "items": [
                                                                    {
                                                                        "type": "TextBlock",
                                                                        "text": "Device Phone Number",
                                                                        "spacing": "None",
                                                                        "size": "Medium",
                                                                        "color": "Dark"
                                                                    }
                                                                ],
                                                                "verticalContentAlignment": "Center"
                                                            },
                                                            {
                                                                "type": "Column",
                                                                "width": 55,
                                                                "items": [
                                                                    {
                                                                        "type": "Input.Text",
                                                                        "placeholder": "the # displayed on device",
                                                                        "isRequired": true,
                                                                        "errorMessage": "Only Allow Letters",
                                                                        "regex": "[a-zA-Z]+",
                                                                        "id": "device_number_else",
                                                                        "style": "Tel"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "ActionSet",
                                                "spacing": "None",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Login the User Now",
                                                        "id": "login_custom_user",
                                                        "style": "positive",
                                                        "data": {
                                                            "action": "login_custom_user"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "style": "positive",
                                    "id": "login_custom_user_card"
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