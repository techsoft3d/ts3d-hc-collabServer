var myLayout;


async function msready() {

    hcCollab.initialize(hwv, ui);
    hcCollab.start("default", "guido");

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
                                componentName: 'Explode',
                                isClosable: true,
                                height: 15,
                                componentState: { label: 'C' }
                            },                         
                            {
                                type: 'component',
                                componentName: 'Selection Basket',
                                isClosable: true,
                                height: 25,
                                componentState: { label: 'C' }
                            },
                            {
                                type: 'component',
                                componentName: 'Material Tool',
                                isClosable: true,
                                height: 30,
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

    myLayout.registerComponent('Explode', function (container, componentState) {
        $(container.getElement()).append($("#explodetools"));
    });

    myLayout.registerComponent('Search', function (container, componentState) {
        $(container.getElement()).append($("#searchtoolcontainer"));
    });

    myLayout.registerComponent('Smart Filters', function (container, componentState) {
        $(container.getElement()).append($("#smartfilterscontainer"));
    });

    myLayout.registerComponent('Smart Properties', function (container, componentState) {
        $(container.getElement()).append($("#smartpropertiescontainer"));
    });


    myLayout.registerComponent('Selection Basket', function (container, componentState) {
        $(container.getElement()).append($("#selectionbasketcontainer"));
    });

    myLayout.registerComponent('Material Tool', function (container, componentState) {
        $(container.getElement()).append($("#materialtoolcontainer"));
    });

    myLayout.on('stateChanged', function () {
        if (hwv != null) {
            hwv.resizeCanvas();
            SmartFilterEditor.refresh();
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