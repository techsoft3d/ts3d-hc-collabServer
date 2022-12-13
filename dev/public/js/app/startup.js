var myLayout;
var collaboratorTable;
var componentSetHash = [];


function sendCustomMessage() {

    hcCollab.sendCustomMessage({ customType: "test",text: "Hello" });
}


function setupNodes() {
    selectionarray = [3, 6, 2, 7, 35];
    hwv.model.setNodesOpacity(selectionarray, 0.5);
    hwv.model.setInstanceModifier(Communicator.InstanceModifier.DoNotSelect,
        selectionarray, true);
}



function cameraSync() {
    if (hcCollab.getSyncCamera()) {
        hcCollab.setSyncCamera(false);
        hcCollab.setSyncSelection(false);
   //     hcCollab.setShowCameraWidgets(true);
    }
    else {
        hcCollab.setSyncCamera(true);
        hcCollab.setSyncSelection(true);
 //       hcCollab.setShowCameraWidgets(false);
    }

    hcCollab.sendCustomMessage({ customType: "syncCamera",syncCamera: hcCollab.getSyncCamera() });
    
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


var ttt = 1;
function updateRoomData() {
    hcCollab.updateRoomData({test:ttt});
    ttt++;
}

async function getRoomData() {
    let res = await hcCollab.getRoomData();
    console.log(res);
}



function submitChat() {

    let text = "";

    text+='<div><span style="color:blue;">'+ hcCollab.getLocalUser().name + ' (You) </span>: '+$("#chattextinput").val()+'</div>';    
    $("#chatmessages").append(text);
    $("#chatmessages").scrollTop($("#chatmessages").height()+100);

    hcCollab.submitChat($("#chattextinput").val());

    $("#chattextinput").val("");
   
}



async function hcCollabMessageReceived(msg) {

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
        case "initialState": {
            if (msg.kmValues) {
                hcCollab.setSuspendSend(true);
                for (let i=0;i<msg.kmValues.length;i++) {
                    let kmValue = msg.kmValues[i];
                    let hierachy = KT.KinematicsManager.getHierachyByIndex(kmValue.hierachyIndex);
                    let component = hierachy.getComponentById(kmValue.componentId);                   
                    await component.set(kmValue.value);               
                    componentSetHash[kmValue.hierachyIndex + "@" + kmValue.componentId] = kmValue.value;       
                    await component.getHierachy().updateComponents();     
                }
                hcCollab.setSuspendSend(false);              
            }
            if (msg.syncCamera != undefined) {
                 hcCollab.setSyncCamera(msg.syncCamera);
                 hcCollab.setSyncSelection(msg.syncCamera);
            }
        }
            break;            
        case "sendInitialState": {
                let values = [];
            for (let key in componentSetHash) {
                let split = key.split("@");
                values.push({ hierachyIndex:parseInt(split[0]),componentId: parseInt(split[1]), value: componentSetHash[key]});

             }
             msg.kmValues = values;
             msg.syncCamera = hcCollab.getSyncCamera();
         }      
         break;      
        case "custommessage":
            {
                switch (msg.customType) {
                    case "syncCamera": {
                        hcCollab.setSyncCamera(msg.syncCamera);
                    }
                    break;
                    case "test": {
                        alert("User " + msg.user + " says " + msg.text);
                    }
                        break;
                    case "componentSet": {
                        hcCollab.setSuspendSend(true);
                        let hierachy = KT.KinematicsManager.getHierachyByIndex(msg.hierachyIndex);
                        let component = hierachy.getComponentById(msg.componentId);                   
                        await component.set(msg.value);
                        componentSetHash[msg.hierachyindex + "@" + msg.componentId] = msg.value;       
                        await component.getHierachy().updateComponents();
                        hcCollab.setSuspendSend(false);
                    }
                        break;
                }

            }
            break;
    }
    return true;
}

function setupKinematics() {
    KT.KinematicsManager.initialize(hwv);

    /* Create a new Kinematics Hierachy */
    let hierachy = KT.KinematicsManager.createHierachy();

    /* Add the crankshaft as the first component. It defaults to revolute */
    let root = hierachy.getRootComponent();
    component1 = hierachy.createComponent(root, [34]);

    component1.setCenter(new Communicator.Point3(84.67, 28.49, -20));
    component1.setAxis(new Communicator.Point3(1, 0, 0));


    /* Now lets add the piston to the root component as well. Its movement will be driven by the crankshaft component */
    component3 = hierachy.createComponent(root, [32, 33]);
    component3.setType(KT.componentType.target);
    component3.setCenter(new Communicator.Point3(21.578, 28.385, -40.999));
    component3.setAxis(new Communicator.Point3(0, 0, 1));

    /* Finally we add the push rod which pushes down on the piston */
    /* This component is defined as a piston controller which controls the movement of the piston via the crank movement */
    component2 = hierachy.createComponent(component1, [29, 30, 31]);
    component2.setType(KT.componentType.pistonController);
    component2.setCenter(new Communicator.Point3(21.578, 28.597, -11.00));
    component2.setAxis(new Communicator.Point3(-1, 0, 0));
    component2.getBehavior().setExtraComponent1(component3);


    var componentMoveOperator = new ComponentMoveOperator(hwv);
    let myOperatorComponentMove = hwv.operatorManager.registerCustomOperator(componentMoveOperator);
    hwv.operatorManager.push(myOperatorComponentMove);

}

async function msready() {

    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(),"models/microengine.scs");

//    setupKinematics();
  
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
    hcCollab.connect("default", "User" + Math.floor(Math.random() * 9999));
    hcCollab.setSyncCamera(true);
    hcCollab.setShowCameraWidgets(true);

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
        hcCollab.handleResize();
    });
    myLayout.init();




    var viewermenu = [       
        {
            name: 'Display Stats',
            fun: function () {
                hwv.view.setStatisticsDisplayVisibility(true);
            }
        },             
        {
            name: 'Test Mesh Creation',
            fun: async function () {
                await testMeshCreation();
            }
        },           
        {
            name: 'Update Room Data',
            fun: async function () {
                updateRoomData();
            }
        },           
        {
            name: 'Get Room Data',
            fun: async function () {
                getRoomData();
            }
        },           
               
        
    ];

    $('#viewermenu1button').contextMenu(viewermenu, undefined, {
        'displayAround': 'trigger',
        'containment': '#viewerContainer'
    });


}


async function testMeshCreation() {
    let size = 20;
    const cubeMeshData = new Communicator.MeshData();
    cubeMeshData.setFaceWinding(Communicator.FaceWinding.Clockwise);
    const p1 = new Communicator.Point3(-size, size, size);
    const p2 = new Communicator.Point3(size, size, size);
    const p3 = new Communicator.Point3(-size, -size, size);
    const p4 = new Communicator.Point3(size, -size, size);
    const p5 = new Communicator.Point3(size, size, -size);
    const p6 = new Communicator.Point3(-size, size, -size);
    const p7 = new Communicator.Point3(-size, -size, -size);
    const p8 = new Communicator.Point3(size, -size, -size);
    const points = [
        p1, p2, p3, p2, p4, p3,
        p5, p6, p7, p5, p7, p8,
        p6, p5, p2, p6, p2, p1,
        p7, p4, p8, p7, p3, p4,
        p6, p1, p7, p1, p3, p7,
        p2, p5, p8, p2, p8, p4,
    ];
    const normals = [
        new Communicator.Point3(0, 0, 1),
        new Communicator.Point3(0, 0, -1),
        new Communicator.Point3(0, 1, 0),
        new Communicator.Point3(0, -1, 0),
        new Communicator.Point3(-1, 0, 0),
        new Communicator.Point3(1, 0, 0),
    ];
    const verticexData = [];
    points.forEach((p) => {
        verticexData.push(p.x);
        verticexData.push(p.y);
        verticexData.push(p.z);
    });
    const normalData = [];
    normals.forEach((p) => {
        for (let i = 0; i < 6; ++i) {
            normalData.push(p.x);
            normalData.push(p.y);
            normalData.push(p.z);
        }
    });
    cubeMeshData.addFaces(verticexData, normalData);
  
    const cubeMeshId = await hwv.model.createMesh(cubeMeshData);

    let meshInstanceData = new Communicator.MeshInstanceData(cubeMeshId);
    meshInstanceData.setFaceColor(Communicator.Color.blue());

    let node = hwv.model.createNode(hwv.model.getRootNode(), "meshnode");
    const nodeId = await hwv.model.createMeshInstance(meshInstanceData, node);
    return cubeMeshData;
}