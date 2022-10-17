var myLayout;
var collaboratorTable;



function sendCustomMessage() {

    hcCollab.sendCustomMessage({ text: "hello" });
}



function handleLock() {

    if (hcCollab.getLockedMaster()) {
        hcCollab.unlockSession();
        $("#collabLockButton").html("Lock Control");
    }
    else {
        if (!hcCollab.getLockedClient()) {
            hcCollab.lockSession();
            $("#collabLockButton").html("Release Control");
        }
    }
}



function submitChat() {

    let text = "";

    text+='<div><span style="color:blue;">'+ hcCollab.getLocalUser().name + ' (You) </span>: '+$("#chattextinput").val()+'</div>';    
    $("#chatmessages").append(text);
    $("#chatmessages").scrollTop($("#chatmessages").height()+100);

    hcCollab.submitChat($("#chattextinput").val());

    $("#chattextinput").val("");
   
}



function hcCollabMessageReceived(msg) {

    switch (msg.type) {
        case "userlist":
            {
                collaboratorTable.clearData();
                let users = msg.roomusers;
                for (let i = 0; i < users.length; i++) {
                    var prop;
                    if (hcCollab.getLocalUser().id == users[i].id)
                        prop = { name: users[i].username + " (You)", id: users[i].id };
                    else
                        prop = { name: users[i].username, id: users[i].id };
                    collaboratorTable.addData([prop], false);
                }
            }
            break;
        case "chatmessage":
            {
                let text = "";
                text += '<div><span style="color:green;">' + msg.user + '</span>: ' + msg.message + '</div>';
                $("#chatmessages").append(text);
                $("#chatmessages").scrollTop($("#chatmessages").height() + 100);

            }
            break;
        case "lockSession":
            {
                $("#content").css("pointer-events", "none");
                $("#collabLockButton").prop("disabled", true);

            }
            break;
        case "unlockSession":
            {
                $("#content").css("pointer-events", "all");
                $("#collabLockButton").prop("disabled", false);
            }
            break;
            case "custommessage":
                {
                  console.log("reveived" + msg.user + ":" + msg.text);
                }
                break;            
    }
    return true;
}



async function msready() {

    collaboratorTable = new Tabulator("#userlistdiv", {
        layout: "fitColumns",
        columns: [
            {
                title: "ID", field: "id", width: 20, visible: false
            },
            { title: "Name", field: "name", formatter: "plaintext", responsive: 2 },
        ],
    });



    hcCollab.initialize(hwv, ui);

    hcCollab.setMessageReceivedCallback(hcCollabMessageReceived);
    hcCollab.connect("default", "guido");

}

function startup()
{
    createUILayout();
} 

function createUILayout() {

    var config = {
        settings: {
            showPopoutIcon: false,
            showMaximiseIcon: true,
            showCloseIcon: false
        },
        content: [
            {
                type: 'row',
                content: [
                    {
                        type: 'column',
                        content: [{
                            type: 'component',
                            componentName: 'Viewer',
                            isClosable: false,
                            width: 80,
                            componentState: { label: 'A' }
                        }],
                    },
                    {
                        type: 'column',
                        width: 20,
                        height: 35,
                        content: [
                            {
                                type: 'component',
                                componentName: 'Collaborators',
                                isClosable: true,
                                height: 15,
                                componentState: { label: 'C' }
                            },                         
                            {
                                type: 'component',
                                componentName: 'Chat',
                                isClosable: true,
                                height: 25,
                                componentState: { label: 'C' }
                            }
                        ]
                    },                  
                ],
            }]
    };



    myLayout = new GoldenLayout(config);
    myLayout.registerComponent('Viewer', function (container, componentState) {
        $(container.getElement()).append($("#content"));
    });

    myLayout.registerComponent('Collaborators', function (container, componentState) {
        $("#collaboratorwindow").css({ "display": "block" });
        $(container.getElement()).append($("#collaboratorwindow"));
    });

    myLayout.registerComponent('Chat', function (container, componentState) {
        $("#chatwindow").css({ "display": "block" });
        $(container.getElement()).append($("#chatwindow"));
    });

    myLayout.on('stateChanged', function () {
        if (hwv != null) {
            hwv.resizeCanvas();
        }
    });
    myLayout.init();




    var viewermenu = [       
        {
            name: 'Display Stats',
            fun: function () {
                hwv.view.setStatisticsDisplayVisibility(true);
            }
        },                    
        
    ];

    $('#viewermenu1button').contextMenu(viewermenu, undefined, {
        'displayAround': 'trigger',
        'containment': '#viewerContainer'
    });


}