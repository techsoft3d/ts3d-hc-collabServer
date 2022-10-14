var socket = null;
var editFromCollab = false;
var cameraFromCollab = false;
var selectionFromCollab = false;
var visibilityFromCollab = false;
var collaboratorTable;
var editorSelectionFromCollab = false;
var matrixFromCollab = false;
var isolateFromCollab = false;
var activateCadViewFromCollab = false;
var magnitudeFromCollab = false;
var activateMarkupViewFromCollab = false;

var cuttingSectionFromCollab = false;
var peer = null;

var blockWhileRunning = false;
var blockWhileRunning2 = false;

var umtimeout = null;


var users = [];

var screenshareMode = false;

var lockedMaster = false;
var lockedClient = false;

var localUserName;

var collabWindow = null;


var firstRun = true;
var firstRun2 = true;

var lockUser = "";



function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
    lockedMaster = false;
    lockedClient = false;
    
    $("#stopcollabbutton").css({ "display": "none" });
    $("#startcollabbutton").css({ "display": "block" });


    myLayout.root.contentItems[0].contentItems[0].removeChild(myLayout.root.contentItems[0].contentItems[0].contentItems[2], true);

}



function submitChat() {

    let text = "";

    text+='<div><span style="color:blue;">'+ localUserName + ' (You) </span>: '+$("#chattextinput").val()+'</div>';    
    $("#chatmessages").append(text);
    $("#chatmessages").scrollTop($("#chatmessages").height()+100);

    socket.emit('chatmessage', JSON.stringify({user:localUserName, message:$("#chattextinput").val()}));
    $("#chattextinput").val("");
   
}


function copyUrlToClipboard()
{
    let text = "https://3dsandbox.techsoft3d.com/";
    let snippetid = getUrlParameter("snippet");
    if (snippetid) {
       text += "?snippet=" + snippetid + "&connect=true";
    }
    else {
        text +="?connect=true";
    }
    navigator.clipboard.writeText(text);
}


async function startCollabDialog() {


    let snippetid = getUrlParameter("snippet");
    if (snippetid) {
        $("#snippetidtext").html("?snippet=" + snippetid + "&connect=true");
    }
    else {
        $("#snippetidtext").html("?connect=true");
    }
    if (localStorage.getItem("username") != null) {
        $("#username").val(localStorage.getItem("username"));
    }
    else {
        $("#username").val("User");
    }

    $("#usernamedialog").css({ "display": "block" });
}



function cameraChanged(cam)
{
    if (!cameraFromCollab && socket && !blockWhileRunning && !lockedClient) {
        let caminfo = {camera:cam.toJson(), user:localUserName}; 
        socket.emit('camera', JSON.stringify(caminfo));
    }
    else
        cameraFromCollab = false;
}



function selectionChanged(cam)
{
    
    if (socket && !blockWhileRunning && !selectionFromCollab && !lockedClient)
    {   
        let selarray = [];
        let sels = hwv.selectionManager.getResults();
        for (let i=0;i<sels.length;i++)
        {
            selarray.push(sels[i].toJson());
        }
       
        let selectionInfo = {selection:selarray, user:localUserName};
        socket.emit('selection', JSON.stringify(selectionInfo));
    }
    else
    {
        selectionFromCollab = false;
    }
}

async function setNodesVisibilityCustom(nodeIds, visibility, initiallyHiddenStayHidden)
{
    if (socket && !blockWhileRunning && !visibilityFromCollab && !lockedClient)
    {
        let visarrays = {nodeids:nodeIds, onoff:visibility};
        socket.emit('visibility', JSON.stringify(visarrays));

    }
    else
    {
        visibilityFromCollab = false;
    }
    return await hwv.model.setNodesVisibilityCollab(nodeIds,visibility,initiallyHiddenStayHidden);

}

async function resetNodesVisibilityCustom()
{
    if (socket && !blockWhileRunning && !visibilityFromCollab && !lockedClient)
    {
      
        socket.emit('resetvisibilities', "");

    }
    else
    {
        visibilityFromCollab = false;
    }
    return await hwv.model.resetNodesVisibilityCollab();
}

async function setDrawModeCustom(a)
{
    if (socket && !blockWhileRunning && !lockedClient)
    {

        let drawmode = {drawmode:a, user:localUserName};
      
        socket.emit('setdrawmode', JSON.stringify(drawmode));

    }
  
    return await hwv.view.setDrawModeCollab(a);
}

async function setProjectionModeCustom(a)
{
    if (socket && !blockWhileRunning && !lockedClient)
    {

        let projectionmode = {projectionmode:a, user:localUserName};
      
        socket.emit('setprojectionmode', JSON.stringify(projectionmode));

    }
  
    return await hwv.view.setProjectionModeCollab(a);
}



async function resetCustom()
{
    if (socket && !blockWhileRunning && !lockedClient)
    {
      
        socket.emit('reset', "");

    }
    
    return await hwv.model.resetCollab();
}


async function clearCustom()
{
    if (socket && !blockWhileRunning && !lockedClient)
    {
      
        socket.emit('clear', "");

    }
    
    return await hwv.model.clearCollab();
}


async function setNodeMatrixCustom(nodeId, matrix)
{
    if (socket && !blockWhileRunning && !matrixFromCollab && !lockedClient)
    {
      
        let matrixinfo = {nodeid:nodeId, matrix:matrix.toJson(), user:localUserName};
        socket.emit('matrix', JSON.stringify(matrixinfo));

    }
    else
    {
        matrixFromCollab = false;
    }
    return await hwv.model.setNodeMatrixCollab(nodeId, matrix);
}



async function isolateNodesCustom(nodeIds, duration,fitNodes,initiallyHidden)
{
    if (socket && !blockWhileRunning && !isolateFromCollab && !lockedClient)
    {      
        let isolateinfo = {nodeids:nodeIds, duration:duration,fitNodes:fitNodes,initiallyHidden:initiallyHidden};
        socket.emit('isolate', JSON.stringify(isolateinfo));

    }
    else
    {
        isolateFromCollab = false;
    }
    return await hwv.view.isolateNodesCollab(nodeIds, 0,fitNodes,initiallyHidden);
}


async function activateCadViewCustom(nodeId, duration)
{
    if (socket && !blockWhileRunning && !activateCadViewFromCollab && !lockedClient)
    {      
        let cadviewinfo = {nodeid:nodeId, duration:duration};
        socket.emit('cadview', JSON.stringify(cadviewinfo));

    }
    else
    {
        activateCadViewFromCollab = false;
    }
    return await hwv.model.activateCadViewCollab(nodeId, duration);
}



async function setMagnitudeCustom(magnitude)
{
    if (socket && !blockWhileRunning && !magnitudeFromCollab && !lockedClient)
    {      
        let magnitudeinfo = {magnitude:magnitude, user:localUserName};
        socket.emit('explodemagnitude', JSON.stringify(magnitudeinfo));

    }
    else
    {
        magnitudeFromCollab = false;
    }
    return await hwv.explodeManager.setMagnitudeCollab(magnitude);
}



function markupViewCreated(view)
{
    if (socket && !blockWhileRunning && !lockedClient)
    {
      
        let markupinfo = {"id": view.getUniqueId(),"info":hwv.markupManager.exportMarkup(),user:localUserName};
        socket.emit('markup',JSON.stringify(markupinfo));

    }
}



function redlineCreated(redline)
{
    if (socket && !blockWhileRunning && !lockedClient)
    {
        markupview = hwv.markupManager.getActiveMarkupView();
      
        let markupinfo = {"id": markupview.getUniqueId(),"info":hwv.markupManager.exportMarkup(),user:localUserName};
        socket.emit('markup',JSON.stringify(markupinfo));

    }
}



function measurementCreated(redline)
{
    if (socket && !blockWhileRunning && !lockedClient)
    {
        markupview = hwv.markupManager.getActiveMarkupView();
      
        let markupinfo = {"id": null,"info":hwv.markupManager.exportMarkup(),user:localUserName};
        socket.emit('markup',JSON.stringify(markupinfo));

    }
}


async function activateMarkupViewWithPromiseCustom(guid)
{
    if (socket && !blockWhileRunning && !activateMarkupViewFromCollab && !lockedClient)
    {
        markupview = hwv.markupManager.getActiveMarkupView();
      
        let markupinfo = {"id": guid,user:localUserName};
        socket.emit('activatemarkupview',JSON.stringify(markupinfo));
    }
    else{
        activateMarkupViewFromCollab = false;
    }
    hwv.unsetCallbacks({ camera: cameraChanged });
    await hwv.markupManager.activateMarkupViewWithPromiseCollab(guid, 0);
    hwv.setCallbacks({ camera: cameraChanged });
    return;
}

async function activateCustom(csnum,cuttingSection) {

    if (socket && !blockWhileRunning && !cuttingSectionFromCollab && !lockedClient)
    {
        csinfo =cuttingSection.toJson();

      
        let cuttinginfo = {"id": csnum,active:true,csinfo:csinfo,user:localUserName};
        socket.emit('cuttingsection',JSON.stringify(cuttinginfo));
    }    

    await cuttingSection.activateCollab();
}

async function deactivateCustom(csnum,cuttingSection) {

    if (socket && !blockWhileRunning && !cuttingSectionFromCollab && !lockedClient)
    {
        csinfo =cuttingSection.toJson();      
        let cuttinginfo = {"id": csnum,active:false,csinfo:csinfo,user:localUserName};
        socket.emit('cuttingsection',JSON.stringify(cuttinginfo));
    }
   

    await cuttingSection.deactivateCollab();
}



async function updatePlaneCustom(csnum,cuttingSection,a,b,c,d,e) {

    await cuttingSection.updatePlaneCollab(a,b,c,d,e);
    if (socket && !blockWhileRunning && !cuttingSectionFromCollab && !lockedClient)
    {
        csinfo =cuttingSection.toJson();      
        let cuttinginfo = {"id": csnum,active:true,csinfo:csinfo,user:localUserName};
        socket.emit('cuttingsection',JSON.stringify(cuttinginfo));
    }
   

}




async function setPlaneCustom(csnum,cuttingSection,a,b,c) {

    await cuttingSection.setPlaneCollab(a,b,c);
    if (socket && !blockWhileRunning && !cuttingSectionFromCollab && !lockedClient)
    {
        csinfo =cuttingSection.toJson();      
        let cuttinginfo = {"id": csnum,active:true,csinfo:csinfo,user:localUserName};
        socket.emit('cuttingsection',JSON.stringify(cuttinginfo));
    }
   

}




async function loadSubtreeFromScsFileCustom(a,b,c) {

    if (socket && !blockWhileRunning && !lockedClient)
    {
       
        let subtreeinfo = {a:a,b:b,c:c,user:localUserName};
        socket.emit('loadsubtree',JSON.stringify(subtreeinfo));
    }
   
    await hwv.model.loadSubtreeFromScsFileCollab(a,b,c);

}





var lastSelection = null;


function handleLock() {

    if (lockedMaster) {
        socket.emit('unlockSession',"");
        $("#collabLockButton").html("Lock Control");
        lockedMaster = false;
    }
    else {        
        socket.emit('lockSession',localUserName);
        $("#collabLockButton").html("Release Control");
        lockedMaster = true;
    }
}

function handleDisableWhenLocked() {
    $("#collabLockButton").prop("disabled", lockedClient);
}


function showActiveUserMessage(user) {
    $("#activeUserMessage").html("Active User: " + user);
    $("#activeUserMessage").css("display", "block");

    if (umtimeout) {
        clearTimeout(umtimeout);
    }
    
    umtimeout = setTimeout(function () {
        $("#activeUserMessage").css("display", "none");
    }, 1000);
}
export async function startCollab(username) {

    localUserName = $("#username").val();

    localStorage.setItem("username", localUserName);

    if (firstRun2) {
    setInterval(function () {
        let sel = window.editor.getSelection();
        if (sel != lastSelection)
        {
            lastSelection = sel;
            if (socket &&  !editorSelectionFromCollab && !lockedClient)
            {
                socket.emit('editorselectionchanged', JSON.stringify(sel));
            }
            else
            {
                editorSelectionFromCollab = false;
            }
        }

    }, 1000);


    hwv.view.setProjectionModeCollab = hwv.view.setProjectionMode;
    hwv.view.setProjectionMode  = setProjectionModeCustom;

    hwv.view.setDrawModeCollab = hwv.view.setDrawMode;
    hwv.view.setDrawMode  = setDrawModeCustom;

    hwv.markupManager.activateMarkupViewWithPromiseCollab = hwv.markupManager.activateMarkupViewWithPromise; 
    hwv.markupManager.activateMarkupViewWithPromise  = activateMarkupViewWithPromiseCustom;

    hwv.model.loadSubtreeFromScsFileCollab = hwv.model.loadSubtreeFromScsFile; 
    hwv.model.loadSubtreeFromScsFile  = loadSubtreeFromScsFileCustom;

    hwv.model.setNodesVisibilityCollab = hwv.model.setNodesVisibility;
    hwv.model.setNodesVisibility = setNodesVisibilityCustom;


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

    hwv.view.isolateNodesCollab =  hwv.view.isolateNodes;
    hwv.view.isolateNodes = isolateNodesCustom;

    hwv.model.activateCadViewCollab =  hwv.model.activateCadView;
    hwv.model.activateCadView = activateCadViewCustom;


    let cs0 = hwv.cuttingManager.getCuttingSection(0);
    let cs1 = hwv.cuttingManager.getCuttingSection(1);
    let cs2 = hwv.cuttingManager.getCuttingSection(2);
    

    cs0.activateCollab = cs0.activate;
    cs0.activate = function () {
        activateCustom(0,this);
    };
   
    cs1.activateCollab = cs1.activate;
    cs1.activate = function () {
        activateCustom(1,this);
    };

    cs2.activateCollab = cs2.activate;
    cs2.activate = function () {
        activateCustom(2,this);
    };


    cs0.deactivateCollab = cs0.deactivate;
    cs0.deactivate = function () {
        deactivateCustom(0,this);
    };

   
    cs1.deactivateCollab = cs1.deactivate;
    cs1.deactivate = function () {
        deactivateCustom(1,this);
    };

    cs2.deactivateCollab = cs2.deactivate;
    cs2.deactivate = function () {
        deactivateCustom(2,this);
    };


    cs0.updatePlaneCollab = cs0.updatePlane;
    cs0.updatePlane = function (a,b,c,d,e) {
        updatePlaneCustom(0,this,a,b,c,d,e);
    };

    cs1.updatePlaneCollab = cs1.updatePlane;
    cs1.updatePlane = function (a,b,c,d,e) {
        updatePlaneCustom(1,this,a,b,c,d,e);
    };

    cs2.updatePlaneCollab = cs2.updatePlane;
    cs2.updatePlane = function (a,b,c,d,e) {
        updatePlaneCustom(2,this,a,b,c,d,e);
    };

    cs0.setPlaneCollab = cs0.setPlane;
    cs0.setPlane = function (a,b,c) {
        setPlaneCustom(0,this,a,b,c);
    };

    cs1.setPlaneCollab = cs1.setPlane;
    cs1.setPlane = function (a,b,c) {
        setPlaneCustom(1,this,a,b,c);
    };

    cs2.setPlaneCollab = cs2.setPlane;
    cs2.setPlane = function (a,b,c) {
        setPlaneCustom(2,this,a,b,c);
    };




    var button = $("#ui-modelbrowser-minimizebutton");
    button.on("click", function () {
        if (socket && !blockWhileRunning && !lockedClient) {
            let button = $(this);
            if (button.hasClass("minimized"))            
            {
                socket.emit('minimizebrowser', "");
            }
            else
            {
                socket.emit('maximizebrowser', "");
            }
        }
    });
    firstRun2 = false;
    }


    $("#stopcollabbutton").css({ "display": "block" });
    $("#startcollabbutton").css({ "display": "none" });


    $("#usernamedialog").css({ "display": "none" });
    let snippetid = getUrlParameter("snippet");
    if (!snippetid) {        
        snippetid = "1";
    }
    if (snippetid) {
        socket = await io();
        let joininfo = {username: $("#username").val(), roomname: snippetid};
        socket.emit('joinroom', JSON.stringify(joininfo));

        socket.on('changedmessage', function (msg) {
            let es = msg.split("$$GUIDO$$");

            editFromCollab = true;
            editor.setValue(es[0]);
            if (es[1] != "undefined") {
                htmleditor.setValue(es[1]);
            }

            if (es[2] != "undefined") {
                csseditor.setValue(es[2]);
            }

        });

        socket.on('run', function (msg) {      
           let runinfo = JSON.parse(msg);
           showActiveUserMessage(runinfo.user);  
           document.getElementById("reload_environment").checked = runinfo.reset;
           runCode(runinfo.reset);
        });

        socket.on('maximizebrowser', function (msg) {
            ui._modelBrowser._maximizeModelBrowser();
         });

         socket.on('minimizebrowser', function (msg) {
            ui._modelBrowser._minimizeModelBrowser();
         });

         socket.on('lockSession', function (msg) {
            
            lockUser = msg;
            lockedClient = true;
            $("#content").css("pointer-events", "none");
            handleDisableWhenLocked();
         });

         socket.on('unlockSession', function (msg) {
            lockedClient = false;
            $("#content").css("pointer-events", "all");
            handleDisableWhenLocked();
         });


         socket.on('disconnected', function (msg) {
            if (msg == lockUser && lockedClient == true) {
                lockUser = "";
                lockedClient = false;
                $("#content").css("pointer-events", "all");
                handleDisableWhenLocked();
            }
         });


        socket.on('camera', function (msg) {
            let caminfo = JSON.parse(msg);
            let cam = Communicator.Camera.fromJson(caminfo.camera);
            showActiveUserMessage(caminfo.user);
            cameraFromCollab = true;
            hwv.view.setCamera(cam);
         });


         socket.on('chatmessage', function (msg) {
            let chatmessage = JSON.parse(msg);
            let text = "";
            text+='<div><span style="color:green;">'+ chatmessage.user +'</span>: '+ chatmessage.message +'</div>';    
            $("#chatmessages").append(text);
            $("#chatmessages").scrollTop($("#chatmessages").height()+100);
            });



         socket.on('matrix', function (msg) {
            let matrixinfo = JSON.parse(msg);
            showActiveUserMessage(matrixinfo.user);
            matrixFromCollab = true;
            hwv.model.setNodeMatrix(matrixinfo.nodeid, Communicator.Matrix.fromJson(matrixinfo.matrix));
         });

         socket.on('isolate', async function (msg) {
            let isolateinfo = JSON.parse(msg);
            cameraFromCollab = true;
            cuttingSectionFromCollab = true;
            await hwv.view.isolateNodesCollab(isolateinfo.nodeids, 0,
                isolateinfo.fitNodes!=undefined ? isolateinfo.fitNodes : undefined,isolateinfo.initiallyHidden!=undefined ? isolateinfo.initiallyHidden:undefined);
         });

         socket.on('cadview', function (msg) {
            let cadviewinfo = JSON.parse(msg);
            activateCadViewFromCollab = true;
            hwv.model.activateCadView(cadviewinfo.nodeid, cadviewinfo.duration!=undefined ? cadviewinfo.duration : undefined);
         });

         socket.on('cuttingsection', async function (msg) {
            let cuttinginfo = JSON.parse(msg);
            showActiveUserMessage(cuttinginfo.user);


            let cuttingSection = hwv.cuttingManager.getCuttingSection(cuttinginfo.id);
            if (cuttinginfo.active) {
                cuttingSectionFromCollab = true;
                matrixFromCollab = true;
                await cuttingSection.fromJson(cuttinginfo.csinfo);
            }
            else {
                cuttingSection.deactivateCollab();
            }
            cuttingSectionFromCollab = false;

         });

         
         socket.on('explodemagnitude', function (msg) {
            let magnitudeinfo = JSON.parse(msg);
            showActiveUserMessage(magnitudeinfo.user);
            magnitudeFromCollab = true;
            hwv.explodeManager.setMagnitude(magnitudeinfo.magnitude);
         });

         socket.on('loadsubtree', function (msg) {
            let subtreeinfo = JSON.parse(msg);
            showActiveUserMessage(subtreeinfo.user);          
            hwv.model.loadSubtreeFromScsFileCollab(subtreeinfo.a, subtreeinfo.b, subtreeinfo.c);
         });

         socket.on('activatemarkupview', async function (msg) {
            let viewinfo = JSON.parse(msg);
            showActiveUserMessage(viewinfo.user);
            activateMarkupViewFromCollab = true;
            hwv.unsetCallbacks({ camera: cameraChanged });
            await hwv.markupManager.activateMarkupViewWithPromise(viewinfo.id,0);
            hwv.setCallbacks({ camera: cameraChanged });
         });
         

         socket.on('markup', async function (msg) {
            let markup = JSON.parse(msg);
            showActiveUserMessage(markup.user);
            hwv.unsetCallbacks({ viewCreated: markupViewCreated });
            hwv.unsetCallbacks({ redlineCreated: markupViewCreated });
            hwv.markupManager.deleteMarkupView(markup.id);
            await hwv.markupManager.loadMarkupData(markup.info);
            if (markup.id) {
                hwv.markupManager.activateMarkupView(markup.id);
            }
            hwv.markupManager.refreshMarkup();
            hwv.setCallbacks({ viewCreated: markupViewCreated });
            hwv.setCallbacks({ redlineCreated: markupViewCreated });
                             
         });

         socket.on('visibility', function (msg) {
            let visarrays = JSON.parse(msg);
          
            visibilityFromCollab = true;
            hwv.model.setNodesVisibility(visarrays.nodeids, visarrays.onoff);
           
         });


         socket.on('startcall', function (msg) {
                makeCall(msg);           
         });

         socket.on('startshare', function (msg) {
             screenshareMode = true;
            makeCall(msg);           
     });

         
         socket.on('resetvisibilities', function (msg) {
            visibilityFromCollab = true;
            cuttingSectionFromCollab = true;
            hwv.model.resetNodesVisibility();
           
         });

         socket.on('reset', function (msg) {
         
            hwv.model.resetCollab();
           
         });

         socket.on('setdrawmode', function (msg) {
            let drawmodeinfo = JSON.parse(msg);
            showActiveUserMessage(drawmodeinfo.user);
         
            hwv.view.setDrawModeCollab(drawmodeinfo.drawmode);
           
         });


         socket.on('setprojectionmode', function (msg) {
            let projectionmodeinfo = JSON.parse(msg);
            showActiveUserMessage(projectionmodeinfo.user);
         
            hwv.view.setProjectionModeCollab(projectionmodeinfo.projectionmode);
           
         });


         socket.on('clear', function (msg) {
         
            hwv.model.clearCollab();
           
         });


         socket.on('resendedittext', function (msg) {
            socket.emit('changed', editor.getValue() + "$$GUIDO$$" + htmleditor.getValue() + "$$GUIDO$$" + csseditor.getValue());
         });

         socket.on('editorselectionchanged', function (msg) {
            editorSelectionFromCollab = true;
            window.editor.setSelection(JSON.parse(msg));            
         });


         socket.on('selection', function (msg) {
            let selectionInfo = JSON.parse(msg);

            let selarray = selectionInfo.selection;
            showActiveUserMessage(selectionInfo.user);
            selectionFromCollab = true;
            hwv.selectionManager.clear();
            let sels = [];
            for (let i=0;i<selarray.length;i++)
            {
                let faceEntity,lineEntity,pointEntity;
                if (selarray[i].faceEntity)
                    faceEntity = Communicator.Selection.FaceEntity.fromJson(selarray[i].faceEntity);
                if (selarray[i].lineEntity)
                    lineEntity = Communicator.Selection.LineEntity.fromJson(selarray[i].lineEntity);
                if (selarray[i].pointEntity)
                    pointEntity =Communicator.Selection.PointEntity.fromJson(selarray[i].pointEntity);
                
                let item = new Communicator.Selection.SelectionItem.create(selarray[i].nodeId,null,faceEntity,lineEntity,pointEntity);
                sels.push(item);
            }
            for (let i=0;i<sels.length;i++) {
                selectionFromCollab = true;
                hwv.selectionManager.add(sels[i]);            
            }
         });
 

        socket.on('userlist', function (msg) {
            collaboratorTable.clearData();
            users = JSON.parse(msg);

            for (let i=0;i<users.length;i++) {
                var prop;
                if (socket.id == users[i].id)
                    prop = { name: users[i].username + " (You)",id:users[i].id};
                else    
                    prop = { name: users[i].username,id:users[i].id};
                collaboratorTable.addData([prop], false);
            }                    
        });

        addCollabUI();
    }
}


async function makeCall(peer_id)
{
    peer = new Peer();
    peer.on('open', async function () {

    let stream = await getStream();

    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');

    console.log('Calling to ' + peer_id);
    console.log(peer);
            
    var call = peer.call(peer_id, window.localStream);
    
    call.on('stream', function (stream) {
        window.peer_stream = stream;

        onReceiveStream(stream, 'peer-camera');
    });
    updateVideoSize();

    });
}

function onReceiveStream(stream, element_id) {
    // Retrieve the video element according to the desired
    var video = document.getElementById(element_id);
    // Set the given stream as the video source
    video.srcObject = stream;

    // Store a global reference of the stream
    window.peer_stream = stream;
}


async function startCall(screenshare)
{
    screenshareMode = screenshare;

     if (users.length != 2)
         return;
        
    peer = new Peer();
    peer.on('open', function () {
        if (screenshareMode)
            socket.emit('startshare', peer.id);
        else
            socket.emit('startcall', peer.id);
    });



    peer.on('connection', function (connection) {
        conn = connection;
        peer_id = connection.peer;

        // Use the handleMessage to callback when a message comes in
        conn.on('data', handleMessage);
    
    });

    /**
     * Handle the on receive call event
     */
    peer.on('call', function (call) {

        // Answer the call with your own video/audio stream
        call.answer(window.localStream);

        // Receive data
        call.on('stream', function (stream) {
            // Store a global reference of the other user stream
            window.peer_stream = stream;
            // Display the stream of the other user in the peer-camera video element !
            onReceiveStream(stream, 'peer-camera');
        });

        // Handle when the call finishes
        call.on('close', function () {
            alert("The videocall has finished");
        });

        // use call.close() to finish a call

    });

    let stream = await getStream();

    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');
 
    updateVideoSize();

}


async function getStream()
{
    let stream;
    if (screenshareMode)
    {
        stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
        let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        var audioTrack = audioStream.getAudioTracks()[0];
        stream.addTrack( audioTrack );
    }
    else 
    {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    }

    return stream;
}

function updateVideoSize() {
    if (peer) {
        let width = $("#videodiv").width();
        let height = $("#videodiv").height();

        var video = document.getElementById('my-camera');
        if (video) {
            video.setAttribute('height', height);
            video.setAttribute('width', width);
        }

        width = $("#videodiv2").width();
        height = $("#videodiv2").height();
        video =document.getElementById('peer-camera');
        video.setAttribute('height', height);
        video.setAttribute('width', width);
    }
}