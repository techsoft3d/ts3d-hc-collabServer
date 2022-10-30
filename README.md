# ts3d-hc-collabserver [![NPM version](https://badge.fury.io/js/ts3d-hc-collabserver.svg)]

## Overview
This library adds real-time collaboration support to any HOOPS Communicator based application by synchronizing a subset of the HOOPS Communicator API calls between multiple clients. This includes camera interaction, selection, markup & measurement, as well as cutting planes and various model attributes (visibility, color, matrices, etc.). 

For questions/feedback please send an email to guido@techsoft3d.com or post in our [forum](https://forum.techsoft3d.com/). For a 60 day trial of the HOOPS Web Platform go to [Web Platform](https://www.techsoft3d.com/products/hoops/web-platform).



## GitHub Project

The public github project can be found here:  
https://github.com/techsoft3d/ts3d-hc-collabServer


## Install

### Via Github

* Clone above github project and run `npm install` in the root folder. This will install all dependencies.
* Client-side libraries can be found in the ./dist folder
* Add client-side library to your project with a script tag or use module version of library
```
  <script src="./js/hcCollab.min.js"></script>
```



### Via NPM

* Install the server-side library into your existing node project: `npm install ts3d-hc-collabserver`
* Client-side libraries can be found in the ./dist folder of the installed module


## Usage - Server Side

### Standalone
Start server with `npm start`. This will start the standalone collaboration server on port 3001. All websocket communication with the client will happen via this port. In this scenario you will either have to provide the url/port in the client during initialization or proxy the websocket connection from your webserver to the collaboration server.

### As a module
When running the server from your own node project, simply include this module and pass your server object to it:

```
const collab = require('ts3d-hc-collabserver');

var server;
server = http.createServer(app);  
collab.start(server, {allowUserRooms: true});
server.listen(3000);

```
See server/standalone.js for an example on how to use the server as a module in your own node project.


## Usage - Client Side

* After including the client-side library in your project, a gloabl hcCollab object will be available. 
* You should call `hcCollab.init()` to initialize the library as soon as the modelStructureReady callback has triggered in the viewer. The parameter to this call are the webviewer object as well as optionally the default UI object.
* An optional callback can be provided that gets triggered when a new collaboration message has been received. 
* Finally to establish the connection to the collaboration server call `hcCollab.connect()`. This call takes the name of the room you want to connect to, the username of the client as well as an optional room password.

Below is the minimum code required to establish a connection to the collaboration server. After this block of code is executed the local viewer is synced with all other clients that have connected to the same room.

```
hcCollab.initialize(hwv, ui);
hcCollab.setMessageReceivedCallback(hcCollabMessageReceived);
hcCollab.connect("default", "User" + Math.floor(Math.random() * 9999));
```

## Limitations
Currently, this library does not sync ALL webviewer API calls. In particular any geometry creation is currently not synced but there are many other calls that are also not handled. The sync support is mostly geared towards viewing though some model manipulations like changing matrices on a node are also supported. In addition, if a new user joins only the camera is synced automatically, though you can provide your own code to sync other client states. Finally, the default HOOPS Communicator UI in some cases manages its own state that might not reflect the state of the webviewer. For now, it is recommended to use your own, custom UI for the collaboration server.


Please let us know if you run into any problems or require support for specific functionality with regard to syncing. You can also of course add support yourself, either by forking the project or using the custom message mechanism of the library.

## Demo

For a live demo of the this library please check out the [HOOPS Communicator 3D Sandbox](https://3dsandbox.techsoft3d.com). Its collaboration feature has been developed with this library. There is also a demo available as part of this project you can run with `npm run startdemo`. You can access the demo in the browser at http://localhost:3000/demo.html. As soon as the demo it runs it will establish a connection to the collabration server. You can open another browser window to connect as another user. After that, you can then call setupNodes() to make some parts of the model transparent. The demo uses the KinematicsToolkit for a simple interactive animation when clicking and dragging one of the interior parts.

Running and looking through the code of this demo will help you understand how to build a UI around this library and some of its more advanced concepts. The client side code for the demo can be found in the dev/public folder of this project. Please note that this demo is using the development version of the collbaration library. If you want to use the library in your own project you should use the minified version of the library that can be found in the dist folder of this project.


## Advanced Concepts


### Sending your own custom messages
By default the collaboration library will automatically syncronize webviewer calls across clients. However, in some cases you want to send more high level messages to other users. For example, in the 3D Sandbox when running the code in the editor, this is handled as a single custom message, not as a series of individual webviewer calls. In this scenario you most likely want to temporary suppress any webviewer messages from also getting synchronized. This can be done by calling `hcCollab.setSuspendSend(true)` before sending your custom message and then calling `hcCollab.setSuspendSend(false)` after your message has been sent. You have to make sure that all clients also call suspendSend when they receive your message.  
Below is an example on how custom messages are handled in the callback. In the demo we are syncing interactions with the [KinematicsToolkit](https://labs.techsoft3d.com/project/kinematics-toolkit) with other clients. As the calls into those library trigger additional webviewer calls we need to suspend those messages when we send (the code for that can be found in componentMove.js) or receive our custom message. 


```
case "custommessage":
  {
      switch (msg.customType) {
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
```

In addition to sending custom messages, it is also possible to suppress certain standard message types by checking the type and selectively returning `false` at the end of the message callback.  

### Synchronizing initial server state
Currently, the library only synchronizes the current camera automatically when a new user connects to a session. However, you are free to synchronize additional data on connection with other clients. This can be done by adding additional values to the the message objects when a sendInitialState message has been received. This message will be send by the server to only one of the already connected clients.  
See below for how the demo synchronizes the state of the KinematicsToolkit in that case:

```
    switch (msg.type) {    
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
        }
            break;            
        case "sendInitialState": {
                let values = [];
            for (let key in componentSetHash) {
                let split = key.split("@");
                values.push({ hierachyIndex:parseInt(split[0]),componentId: parseInt(split[1]), value: componentSetHash[key]});

             }
             msg.kmValues = values;
         }      
         break;      
```


### Handling Session Locking
It is possible for a user to lock a session with the `lockSession()` command. This will prevent any other clients from sending collaboration messages to the server. However, it does not actually prevent interacting with the webviewer. If you want to disable any interaction for locked clients you have to do this when the lock/unlock message is received. In the demo this is done by simply disabling pointer events on the webviewer div:

```
    switch (msg.type) {    
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
```


### Handling Collaboration UI
The demo project shows how to populate a list of user as well as handle chat messages by specifiying a callback function to the `hcCollab.setMessageReceivedCallback()` function. Using this callback you can detect if a new user has joined the room, an existing user has disconnected or a new text message has been received.  
See below for an example on how to handle those messages:


```
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
    }
   
```


### Proxy Considerations and running on Port 80/443
It is straightforward to proxy the websocket traffic of the collaboration server to a different port/url if you are running the server standalone and all your traffic has to go through a standard port. However, if you are using our streaming server or have another websocket-based service running on that same standard port, it will not be straightforward to differentiate the traffic and one of those services will most likely fail. In that case, you should either run the collaboration server on different port or on a different IP address altogether. If you are running the collaboration server on a different ip address/port from your webserver you need to specify its URL in the client during initialization.


## Disclaimer
**This library is not an officially supported part of HOOPS Communicator and provided as-is.**



## Acknowledgments
### Library:
* [Socket.IO](https://socket.io/)

### Demo:
* [GoldenLayout](https://golden-layout.com/)
* [Tabulator](http://tabulator.info/)


----


# API 

## Server


### **start** 

#### *Description*
Starts the collabration server


#### *Parameters*
* **server** - The server object.
* **config** - A Configuration object. (optional)

#### *Return Value*
the socket.io server object


#### *Example*
```
const http = require('http');
const collab = require('ts3d-hc-collabserver');

const app = express();

var server;
server = http.createServer(app);  
let io =  collab.start(server, {allowUserRooms: true});
server.listen(3001);

```
You can provide an http or https server object to the start function. If you need additional authentication you can leverage the socket.io server object returned by this function to run additional middleware. Please see [this page](https://socket.io/docs/v3/middlewares/) for more information on how to do this.  
The second parameter to this function is the JSON configuration object. Currently it only supports the "allowUserRooms" property. If set to true, users can create their own rooms from the client. If set to false, only rooms that have been created by the server admin will be available. The default value is true.



### **createRoom** 

#### *Description*
Creates a new room on the server.

#### *Parameters*
* **name** - The name of the room
* **password** - The password for the room. (optional)

#### *Return Value*
None

#### *Example*
```
collab.createRoom("default", "1234");
```
Rooms created on the server are permanent and will be available until deleted by the server, while rooms created from the client will be deleted when no clients are connected.



### **deleteRoom** 

#### *Description*
Deletes an existing room on the server.

#### *Parameters*
* **name** - The name of the room

#### *Return Value*
None

#### *Example*
```
collab.deleteRoom("default");
```

## Client


### **initialize** 

#### *Description*
Initializes the collaboration library. This function should be called only once as soon as the modelStructureReady callback has triggered in the viewer.

#### *Parameters*
* **viewer** - The webviewer object.
* **ui** - The standard webviewer ui object (optional).
* **url** - The url to the collab server (only needed if the collab server is not running on the same host as the client). (optional)

#### *Return Value*
None

#### *Example*
```

async function modelStructureReady() {
    hcCollab.initialize(hwv, ui);
}

```
If you provide the  UI object, the collaboration library will sync opening and closing the model browser with other clients. More UI specific syncing might be added in a future version of the library.


### **connect** 

#### *Description*
Connects the local client to the collaboration server.

#### *Parameters*
* **roomname** - The name of the room to connect to. If the room does not exist and client-side room creation is allowed it will be created.
* **username** - The name of the connecting user.
* **password** - The password to the room if necessary (optional).

#### *Return Value*
None

#### *Example*
```
  hcCollab.connect("default", "User", "1234");
```


### **disconnect** 

#### *Description*
Disconnects the local client from the collaboration server.

#### *Parameters*
None
#### *Return Value*
None

#### *Example*
```
  hcCollab.disconnect();
```


### **setMessageReceivedCallback** 

#### *Description*
Sets a callback function that will be executed when a new collaboration message has been received.

#### *Parameters*
* **callback** - Callback function that receives collaboration messages

#### *Return Value*
None

#### *Example*
```
  hcCollab.setMessageReceivedCallback(function msgReceived(msg) {
    console.log(msg);
  });
```


### **getActive** 

#### *Description*
Returns if the local user is currently connected to the collaboration server.

#### *Parameters*
None

#### *Return Value*
True if the local user is connected to the collaboration server, false otherwise.



### **getLocalUser** 

#### *Description*
Returns the name and id of the local user.

#### *Parameters*
None

#### *Return Value*
Local User Object

#### *Example*
```
  let localUser = hcCollab.getLocalUser();
  console.log(localUser.id + ":" + localUser.name);
```


### **lockSession** 

#### *Description*
Locks a session (if not already locked) and prevents other users from interacting with the model

#### *Parameters*

#### *Return Value*
None


### **unlockSession** 

#### *Description*
Unlocks a session (if not already unlocked and locked by the local user) and allows other users to interact with the model

#### *Parameters*

#### *Return Value*
None



### **getLockedMaster** 

#### *Description*
Returns true if the local user has locked the session.

#### *Parameters*
None

#### *Return Value*
True if the local user has locked the session, false otherwise.  

### **getLockedClient** 

#### *Description*
Returns true if the session has been locked by another user.

#### *Parameters*
None

#### *Return Value*
True if the session has been locked by another user, false otherwise.


### **submitChat** 

#### *Description*
Submits a chat message to the collaboration server.

#### *Parameters*
* **text** - The text to send to other connected clients.

#### *Return Value*
None

#### *Example*
```
  hcCollab.submitChat("Hello World");
```


### **sendCustomMessage** 

#### *Description*
Sends a custom message to the collaboration server.

#### *Parameters*
* **message** - The message to send to other connected clients.

#### *Return Value*
None

#### *Example*
```
 hcCollab.sendCustomMessage({ customType: "test",text: "Hello" });
```
The content of the custom messags is completely arbitrary, any valid JSON object that can be stringified is allowed. Just make sure that you don't define `type` and `user` which will both be set by the library before the message is send. In the above example, `customType` and `text` are just examples.



### **setSuspendSend** 

#### *Description*
Suspend or unsuspends sending of webviewer collaboration messages to the collaboration server. 

#### *Parameters*
* **enable** - True to suspend sending, false to unsuspend.

#### *Return Value*
None



### **getSuspendSend** 

#### *Description*
Returns true if sending of webviewer collaboration messages to the collaboration server is currently suspended.

#### *Parameters*
None

#### *Return Value*
True if sending of webviewer collaboration messages to the collaboration server is currently suspended, false otherwise.



















