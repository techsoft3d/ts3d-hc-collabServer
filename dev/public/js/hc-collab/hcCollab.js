var socket = null;
var cameraFromCollab = false;

var suspendSend = false;
var suspendInternal = false;

var lockedMaster = false;
var lockedClient = false;
var lockUser = "";

var localUserName;

var viewer;
var viewerui = null;

var messageReceivedCallback = null;

var socketURL;

var queueInterval = null;
var messageQueue = [];
var messageProcessing = false;

export function getActive() {
    return socket ? true : false;
}

export function disconnect() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
    lockedMaster = false;
    lockedClient = false;

}

export function getLocalUser() {
    if (socket) {
        return {id:socket.id, name:localUserName};
    }   
}

export function getLockedMaster() {
    return lockedMaster;
}

export function getLockedClient() {
    return lockedClient;
}

export function lockSession() {
    if (socket && !lockedMaster && !lockedClient) {
        socket.emit('lockSession',"");
    }
    lockedMaster = true;
}

export function unlockSession() {
    if (socket && lockedMaster ) {
        socket.emit('unlockSession',"");
    }
    lockedMaster = false;
}
    
export function submitChat(chatmessage) {

    socket.emit('chatmessage', JSON.stringify({ user: localUserName, message: chatmessage }));

}

export function setSuspendSend(value) {
    suspendSend = value;
}

export function getSuspendSend(value) {
    return suspendSend;
}


export function sendCustomMessage(message) {
    if (socket) {
        message.type = "custommessage";
        message.user = localUserName;
        socket.emit("hcmessage", JSON.stringify(message));
    }
}

function sendMessage(messageType, message) {
    if (socket) {
        message.type = messageType;
        message.user = localUserName;
        socket.emit("hcmessage", JSON.stringify(message));
    }
}

export function setMessageReceivedCallback(callback) {
    messageReceivedCallback = callback;    
}

function cameraChanged(cam) {
    if (!suspendInternal && socket && !suspendSend && !lockedClient) {
        let message = { camera: cam.toJson()};
        sendMessage("camera", message);
    }
   
}

function selectionChanged(cam) {

    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        let selarray = [];
        let sels = hwv.selectionManager.getResults();
        for (let i = 0; i < sels.length; i++) {
            selarray.push(sels[i].toJson());
        }

        sendMessage('selection',  { selection: selarray});
    }
    
}

async function setNodesVisibilityCustom(nodeIds, visibility, initiallyHiddenStayHidden) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('visibility', { nodeids: nodeIds, onoff: visibility });

    }    
    return await viewer.model.setNodesVisibilityCollab(nodeIds, visibility, initiallyHiddenStayHidden);
}


async function setNodesOpacityCustom(nodeIds, opacity) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('opacity', { nodeids: nodeIds, opacity: opacity });

    }    
    return await viewer.model.setNodesOpacityCollab(nodeIds, opacity);
}


async function resetNodesOpacityCustom(nodeIds) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('resetopacity', { nodeids: nodeIds});

    }    
    return await viewer.model.resetNodesOpacityCollab(nodeIds);
}


async function setInstanceModifierCustom(a,b,c) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('setInstanceModifier', { a:a,b:b,c:c });

    }    
    return await viewer.model.setInstanceModifierCollab(a,b,c);
}


async function resetNodesVisibilityCustom() {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('resetvisibilities', {});

    }   
    return await viewer.model.resetNodesVisibilityCollab();
}

async function setDrawModeCustom(a) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('setdrawmode', { drawmode: a});

    }

    return await viewer.view.setDrawModeCollab(a);
}

async function setProjectionModeCustom(a) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('setprojectionmode', { projectionmode: a});

    }

    return await viewer.view.setProjectionModeCollab(a);
}

async function resetCustom() {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('reset', {});

    }
    return await viewer.model.resetCollab();
}

async function clearCustom() {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('clear', {});

    }

    return await viewer.model.clearCollab();
}

async function setNodeMatrixCustom(nodeId, matrix) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        let matrixinfo = { nodeid: nodeId, matrix: matrix.toJson(), user: localUserName };
        sendMessage('matrix',  { nodeid: nodeId, matrix: matrix.toJson()});

    }
    
    return await viewer.model.setNodeMatrixCollab(nodeId, matrix);
}

async function isolateNodesCustom(nodeIds, duration, fitNodes, initiallyHidden) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        let isolateinfo = { nodeids: nodeIds, duration: duration, fitNodes: fitNodes, initiallyHidden: initiallyHidden };
        sendMessage('isolate', { nodeids: nodeIds, duration: duration, fitNodes: fitNodes, initiallyHidden: initiallyHidden });

    }
   
    return await viewer.view.isolateNodesCollab(nodeIds, 0, fitNodes, initiallyHidden);
}

async function activateCadViewCustom(nodeId, duration) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('cadview', { nodeid: nodeId, duration: duration });

    }
   
    return await viewer.model.activateCadViewCollab(nodeId, duration);
}

async function setMagnitudeCustom(magnitude) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('explodemagnitude', { magnitude: magnitude});

    }
   
    return await viewer.explodeManager.setMagnitudeCollab(magnitude);
}

function markupViewCreated(view) {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        sendMessage('markup', { "id": view.getUniqueId(), "info": viewer.markupManager.exportMarkup() });
    }
}

function redlineCreated() {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {
        let markupview = viewer.markupManager.getActiveMarkupView();
        sendMessage('markup', { "id": markupview.getUniqueId(), "info": viewer.markupManager.exportMarkup()});

    }
}

function measurementCreated() {
    if (socket && !suspendSend && !suspendInternal && !lockedClient) {        
        sendMessage('markup',  { "id": null, "info": viewer.markupManager.exportMarkup() });
    }
}

async function activateMarkupViewWithPromiseCustom(guid) {
    if (socket && !suspendSend && !suspendInternal  && !lockedClient) {
       
        sendMessage('activatemarkupview', { "id": guid});
    }
   
    viewer.unsetCallbacks({ camera: cameraChanged });
    await viewer.markupManager.activateMarkupViewWithPromiseCollab(guid, 0);
    viewer.setCallbacks({ camera: cameraChanged });
}

async function activateCustom(csnum, cuttingSection) {

    if (socket && !suspendSend && !suspendInternal  && !lockedClient) {
       let csinfo = cuttingSection.toJson();
       sendMessage('cuttingsection', { "id": csnum, active: true, csinfo: csinfo});
    }

    await cuttingSection.activateCollab();
}

async function deactivateCustom(csnum, cuttingSection) {

    if (socket && !suspendSend && !suspendInternal  && !lockedClient) {
        let csinfo = cuttingSection.toJson();
        sendMessage('cuttingsection', { "id": csnum, active: false, csinfo: csinfo});
    }


    await cuttingSection.deactivateCollab();
}

async function updatePlaneCustom(csnum, cuttingSection, a, b, c, d, e) {

    await cuttingSection.updatePlaneCollab(a, b, c, d, e);
    if (socket && !suspendSend && !suspendInternal  && !lockedClient) {
        let csinfo = cuttingSection.toJson();
        sendMessage('cuttingsection', { "id": csnum, active: true, csinfo: csinfo });
    }


}

async function setPlaneCustom(csnum, cuttingSection, a, b, c) {

    await cuttingSection.setPlaneCollab(a, b, c);
    if (socket && !suspendSend && !suspendInternal  && !lockedClient) {
        let csinfo = cuttingSection.toJson();
        sendMessage('cuttingsection', { "id": csnum, active: true, csinfo: csinfo });
    }
}

async function loadSubtreeFromScsFileCustom(a, b, c) {

    if (socket && !suspendSend && !suspendInternal && !lockedClient) {

        sendMessage('loadsubtree', { a: a, b: b, c: c});
    }
    await viewer.model.loadSubtreeFromScsFileCollab(a, b, c);
}

export function initialize(hwv,ui,url) {

    socketURL = url;

    viewer = hwv;
    viewerui = ui;

    hwv.setCallbacks({
        camera: cameraChanged,
         selectionArray: selectionChanged,
         viewCreated: markupViewCreated,
         redlineCreated: redlineCreated,
         measurementCreated: measurementCreated,
    });

    hwv.view.setProjectionModeCollab = hwv.view.setProjectionMode;
    hwv.view.setProjectionMode = setProjectionModeCustom;

    hwv.view.setDrawModeCollab = hwv.view.setDrawMode;
    hwv.view.setDrawMode = setDrawModeCustom;

    hwv.markupManager.activateMarkupViewWithPromiseCollab = hwv.markupManager.activateMarkupViewWithPromise;
    hwv.markupManager.activateMarkupViewWithPromise = activateMarkupViewWithPromiseCustom;

    hwv.model.loadSubtreeFromScsFileCollab = hwv.model.loadSubtreeFromScsFile;
    hwv.model.loadSubtreeFromScsFile = loadSubtreeFromScsFileCustom;

    hwv.model.setNodesVisibilityCollab = hwv.model.setNodesVisibility;
    hwv.model.setNodesVisibility = setNodesVisibilityCustom;

    hwv.model.setNodesOpacityCollab = hwv.model.setNodesOpacity;
    hwv.model.setNodesOpacity = setNodesOpacityCustom;

    hwv.model.resetNodesOpacityCollab = hwv.model.resetNodesOpacity;
    hwv.model.resetNodesOpacity = resetNodesOpacityCustom;


    hwv.model.setInstanceModifierCollab = hwv.model.setInstanceModifier;
    hwv.model.setInstanceModifier = setInstanceModifierCustom;

    hwv.explodeManager.setMagnitudeCollab = hwv.explodeManager.setMagnitude;
    hwv.explodeManager.setMagnitude = setMagnitudeCustom;

    hwv.model.resetNodesVisibilityCollab = hwv.model.resetNodesVisibility;
    hwv.model.resetNodesVisibility = resetNodesVisibilityCustom;

    hwv.model.resetCollab = hwv.model.reset;
    hwv.model.reset = resetCustom;

    hwv.model.clearCollab = hwv.model.clear;
    hwv.model.clear = clearCustom;

    hwv.model.setNodeMatrixCollab = hwv.model.setNodeMatrix;
    hwv.model.setNodeMatrix = setNodeMatrixCustom;

    hwv.view.isolateNodesCollab = hwv.view.isolateNodes;
    hwv.view.isolateNodes = isolateNodesCustom;

    hwv.model.activateCadViewCollab = hwv.model.activateCadView;
    hwv.model.activateCadView = activateCadViewCustom;


    let cs0 = hwv.cuttingManager.getCuttingSection(0);
    let cs1 = hwv.cuttingManager.getCuttingSection(1);
    let cs2 = hwv.cuttingManager.getCuttingSection(2);

    if (cs0) {
        cs0.activateCollab = cs0.activate;
        cs0.activate = function () {
            activateCustom(0, this);
        };

        cs0.deactivateCollab = cs0.deactivate;
        cs0.deactivate = function () {
            deactivateCustom(0, this);
        };

        cs0.updatePlaneCollab = cs0.updatePlane;
        cs0.updatePlane = function (a, b, c, d, e) {
            updatePlaneCustom(0, this, a, b, c, d, e);
        };

        cs0.setPlaneCollab = cs0.setPlane;
        cs0.setPlane = function (a, b, c) {
            setPlaneCustom(0, this, a, b, c);
        };
    }

    if (cs1) {
        cs1.activateCollab = cs1.activate;
        cs1.activate = function () {
            activateCustom(1, this);
        };

        cs1.deactivateCollab = cs1.deactivate;
        cs1.deactivate = function () {
            deactivateCustom(1, this);
        };

        cs1.updatePlaneCollab = cs1.updatePlane;
        cs1.updatePlane = function (a, b, c, d, e) {
            updatePlaneCustom(1, this, a, b, c, d, e);
        };

        cs1.setPlaneCollab = cs1.setPlane;
        cs1.setPlane = function (a, b, c) {
            setPlaneCustom(1, this, a, b, c);
        };
    }

    if (cs2) {
        cs2.activateCollab = cs2.activate;
        cs2.activate = function () {
            activateCustom(2, this);
        };

        cs2.deactivateCollab = cs2.deactivate;
        cs2.deactivate = function () {
            deactivateCustom(2, this);
        };

        cs2.updatePlaneCollab = cs2.updatePlane;
        cs2.updatePlane = function (a, b, c, d, e) {
            updatePlaneCustom(2, this, a, b, c, d, e);
        };

        cs2.setPlaneCollab = cs2.setPlane;
        cs2.setPlane = function (a, b, c) {
            setPlaneCustom(2, this, a, b, c);
        };
    }

    if (viewerui) {
        var button = $("#ui-modelbrowser-minimizebutton");
        if (button) {
            button.on("click", function () {
                if (socket && !suspendSend && !lockedClient) {
                    let button = $(this);
                    if (button.hasClass("minimized")) {
                        sendMessage('minimizebrowser', {});
                    }
                    else {
                        sendMessage('maximizebrowser', {});
                    }
                }
            });
        }
    }

}

function handleMessageQueue(message) {

    messageQueue.push(message);
    
    if (!queueInterval) {

        let queueInterval = setInterval(async function () {
            if (messageQueue.length > 0) {
                if (!messageProcessing) {
                    messageProcessing = true;
                    let message = messageQueue.shift();
                    await handleMessage(message);
                    messageProcessing = false;
                }

            }
            else {
                clearInterval(queueInterval);
                queueInterval = null;
            }

        }, 10);
    }
}

async function handleMessage(message) {
    suspendInternal  = true;
    switch (message.type) {                
        case "camera": {
            let cam = Communicator.Camera.fromJson(message.camera);
            cameraFromCollab = true;
            await viewer.view.setCamera(cam);
        }
            break;
        case "setprojectionmode": {
            await viewer.view.setProjectionModeCollab(message.projectionmode);
        }
            break;
        case "selection": {
            let selarray = message.selection;
            viewer.selectionManager.clear();
            let sels = [];
            for (let i = 0; i < selarray.length; i++) {
                let faceEntity, lineEntity, pointEntity;
                if (selarray[i].faceEntity)
                    faceEntity = Communicator.Selection.FaceEntity.fromJson(selarray[i].faceEntity);
                if (selarray[i].lineEntity)
                    lineEntity = Communicator.Selection.LineEntity.fromJson(selarray[i].lineEntity);
                if (selarray[i].pointEntity)
                    pointEntity = Communicator.Selection.PointEntity.fromJson(selarray[i].pointEntity);

                let item = new Communicator.Selection.SelectionItem.create(selarray[i].nodeId, null, faceEntity, lineEntity, pointEntity);
                sels.push(item);
            }
            for (let i = 0; i < sels.length; i++) {
                await viewer.selectionManager.add(sels[i]);
            }
        }
            break;
        case "setdrawmode": {
            await viewer.view.setDrawModeCollab(message.drawmode);
        }
            break;
        case "activatemarkupview": {
            viewer.unsetCallbacks({ camera: cameraChanged });
            await viewer.markupManager.activateMarkupViewWithPromise(message.id, 0);
            viewer.setCallbacks({ camera: cameraChanged });
        }
            break;
        case "markup": {
            viewer.unsetCallbacks({ viewCreated: markupViewCreated });
            viewer.unsetCallbacks({ redlineCreated: markupViewCreated });
            viewer.markupManager.deleteMarkupView(message.id);
            await viewer.markupManager.loadMarkupData(message.info);
            if (message.id) {
                viewer.markupManager.activateMarkupView(message.id);
            }
            viewer.markupManager.refreshMarkup();
            viewer.setCallbacks({ viewCreated: markupViewCreated });
            viewer.setCallbacks({ redlineCreated: markupViewCreated });
        }
            break;
        case "loadsubtree": {
            viewer.unsetCallbacks({ camera: cameraChanged });
            await hwv.model.loadSubtreeFromScsFileCollab(message.a, message.b, message.c);
            viewer.setCallbacks({ camera: cameraChanged });

        }
            break;
        case "visibility": {
            await viewer.model.setNodesVisibilityCollab(message.nodeids, message.onoff);

        }
            break;
        case "opacity": {
            await viewer.model.setNodesOpacityCollab(message.nodeids, message.opacity);

        }
            break;
        case "resetopacity": {
            await viewer.model.resetNodesOpacityCollab(message.nodeids, message.opacity);

        }
            break;
        case "setInstanceModifier": {
            await viewer.model.setInstanceModifierCollab(message.a, message.b, message.c);
        }
            break;
        case "explodemagnitude": {
            await viewer.explodeManager.setMagnitudeCollab(message.magnitude);
        }
            break;
        case "resetvisibilities": {
            await viewer.model.resetNodesVisibilityCollab();
        }
            break;
        case "reset": {
            viewer.model.resetCollab();
        }
            break;
        case "clear": {
            viewer.unsetCallbacks({ camera: cameraChanged });
            await viewer.model.clearCollab();
            viewer.setCallbacks({ camera: cameraChanged });
        }
            break;
        case "matrix" : {             
            await viewer.model.setNodeMatrixCollab(message.nodeid, Communicator.Matrix.fromJson(message.matrix));
        }
            break;
        case "isolate": {           
            await viewer.view.isolateNodesCollab(message.nodeids, 0,
                message.fitNodes != undefined ? message.fitNodes : undefined, message.initiallyHidden != undefined ? message.initiallyHidden : undefined);
        }
            break;
        case "cadview": {
            viewer.model.activateCadViewCollab(message.nodeid, message.duration != undefined ? message.duration : undefined);

        }
            break;
        case "cuttingsection": {
            let cuttingSection = viewer.cuttingManager.getCuttingSection(message.id);
            if (message.active) {
                await cuttingSection.fromJson(message.csinfo);
            }
            else {
                cuttingSection.deactivateCollab();
            }
        }
            break;
        case "minimizebrowser": {
            await viewerui._modelBrowser._minimizeModelBrowser();
        }
            break;
        case "maximizebrowser": {
            await viewerui._modelBrowser._maximizeModelBrowser();
        }
            break;
    }

    suspendInternal = false;
}


export async function connect(roomname, username, password) {

    localUserName = username;

    socket = await io(socketURL);
    let joininfo = { username: username, roomname: roomname, password:password };
    socket.emit('joinroom', JSON.stringify(joininfo));

    socket.on('hcmessage', async function (msg) {

        let message = JSON.parse(msg);
        if (messageReceivedCallback) {
            let  keepRunning = messageReceivedCallback(message);
            if (!keepRunning) {
                return;
            }
        }

        switch (message.type) {                
            case "camera": 
              
            case "setprojectionmode": 
             
            case "selection": 
            case "setdrawmode": 
               
            case "activatemarkupview": 
            case "markup": 
            case "loadsubtree": 
            case "visibility": 
            case "opacity":                
            case "resetopacity":                
            case "setInstanceModifier":                
            case "explodemagnitude": 
            case "resetvisibilities": 
            case "reset": 
            case "clear": 
            case "matrix":
            case "isolate":
            case "cadview":
            case "cuttingsection": 
            case "minimizebrowser": 
            case "maximizebrowser": 
                handleMessageQueue(message);
        }
    });


    socket.on('initialState', function (msg) {
        let state = JSON.parse(msg);
        state.type = "initialState";
        if (messageReceivedCallback) {
            let  keepRunning = messageReceivedCallback(state);
            if (!keepRunning) {
                return;
            }
        }

        if (state.camera) {
            let cam = Communicator.Camera.fromJson(state.camera);
            cameraFromCollab = true;
            viewer.view.setCamera(cam);
        }
       
    });

    socket.on('sendInitialState', function (msg) {
      
        let state = { type:'sendInitialState', camera: viewer.view.getCamera().toJson() };
        if (messageReceivedCallback) {
            let  keepRunning = messageReceivedCallback(state);
            if (!keepRunning) {
                return;
            }
        }

        socket.emit('initialState',JSON.stringify({recepient: msg, state:state}));

    });

    socket.on('lockSession', function (msg) {
                  
        let message = {user: msg, type: "lockSession"};
        if (messageReceivedCallback) {
            let  keepRunning = messageReceivedCallback(message);
            if (!keepRunning) {
                return;
            }
        }  

        lockUser = msg;
        lockedClient = true;
    });

    socket.on('unlockSession', function (msg) {
        let message = {type: "unlockSession"};
        if (messageReceivedCallback) {
            let  keepRunning = messageReceivedCallback(message);
            if (!keepRunning) {
                return;
            }
        }   
        lockedClient = false;        
    });

    socket.on("disconnect", () => {
        lockUser = "";
        lockedClient = false;
        disconnect();
        let message = {type: "connectionLost"};
        if (messageReceivedCallback) {
            messageReceivedCallback(message);
        }     
     
      });

    socket.on('disconnected', function (msg) {
        if (msg == lockUser && lockedClient == true) {
            lockUser = "";
            lockedClient = false;
        }

        let message = {user: msg, type: "disconnected"};
        if (messageReceivedCallback) {
            messageReceivedCallback(message);
        }     
    });

    socket.on('chatmessage', function (msg) {
        let message = JSON.parse(msg);
        message.type = "chatmessage";

        if (messageReceivedCallback) {
            messageReceivedCallback(message);
        }     
      
    });

    socket.on('userlist', function (msg) {
        let message = JSON.parse(msg);
        message.type = "userlist";

        if (messageReceivedCallback) {
            messageReceivedCallback(message);
        }     
    });
}