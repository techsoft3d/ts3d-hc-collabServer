var __extends = this && this.__extends || function() {
    var e = function(f, l) {
        e = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, c) {
            e.__proto__ = c
        } || function(e, c) {
            for (var a in c) c.hasOwnProperty(a) && (e[a] = c[a])
        };
        return e(f, l)
    };
    return function(f, l) {
        function h() {
            this.constructor = f
        }
        e(f, l);
        f.prototype = null === l ? Object.create(l) : (h.prototype = l.prototype, new h)
    }
}(),
__awaiter = this && this.__awaiter || function(e, f, l, h) {
    return new(l || (l = Promise))(function(c, a) {
        function b(d) {
            try {
                g(h.next(d))
            } catch (k) {
                a(k)
            }
        }

        function d(d) {
            try {
                g(h["throw"](d))
            } catch (k) {
                a(k)
            }
        }

        function g(a) {
            a.done ? c(a.value) : (new l(function(d) {
                d(a.value)
            })).then(b, d)
        }
        g((h = h.apply(e, f || [])).next())
    })
},
__generator = this && this.__generator || function(e, f) {
    function l(d) {
        return function(b) {
            return h([d, b])
        }
    }

    function h(g) {
        if (a) throw new TypeError("Generator is already executing.");
        for (; c;) try {
            if (a = 1, b && (d = g[0] & 2 ? b["return"] : g[0] ? b["throw"] || ((d = b["return"]) && d.call(b), 0) : b.next) && !(d = d.call(b, g[1])).done) return d;
            if (b = 0, d) g = [g[0] & 2, d.value];
            switch (g[0]) {
                case 0:
                case 1:
                    d =
                        g;
                    break;
                case 4:
                    return c.label++, {
                        value: g[1],
                        done: !1
                    };
                case 5:
                    c.label++;
                    b = g[1];
                    g = [0];
                    continue;
                case 7:
                    g = c.ops.pop();
                    c.trys.pop();
                    continue;
                default:
                    if (!(d = c.trys, d = 0 < d.length && d[d.length - 1]) && (6 === g[0] || 2 === g[0])) {
                        c = 0;
                        continue
                    }
                    if (3 === g[0] && (!d || g[1] > d[0] && g[1] < d[3])) c.label = g[1];
                    else if (6 === g[0] && c.label < d[1]) c.label = d[1], d = g;
                    else if (d && c.label < d[2]) c.label = d[2], c.ops.push(g);
                    else {
                        d[2] && c.ops.pop();
                        c.trys.pop();
                        continue
                    }
            }
            g = f.call(e, c)
        } catch (k) {
            g = [6, k], b = 0
        } finally {
            a = d = 0
        }
        if (g[0] & 5) throw g[1];
        return {
            value: g[0] ?
                g[1] : void 0,
            done: !0
        }
    }
    var c = {
            label: 0,
            sent: function() {
                if (d[0] & 1) throw d[1];
                return d[1]
            },
            trys: [],
            ops: []
        },
        a, b, d, g;
    return g = {
        next: l(0),
        "throw": l(1),
        "return": l(2)
    }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this
    }), g
},
Example;
(function(e) {
var f = function(e) {
    function c(a, b, d, g) {
        var c = e.call(this) || this;
        c._leaderLine = new Communicator.Markup.Shape.Line;
        c._textBox = new Communicator.Markup.Shape.TextBox;
        c._showAsColor = !1;
        c._nodeId = b;
        c._viewer = a;
        c._leaderAnchor = d.copy();
        c._textBoxAnchor = d.copy();
        c._textBox.setTextString(g);
        c._textBox.getBoxPortion().setFillOpacity(1);
        c._textBox.getBoxPortion().setFillColor(Communicator.Color.white());
        c._textBox.getTextPortion().setFillColor(Communicator.Color.red());
        c._textBox.getTextPortion().setFontSize(16);
        c._leaderLine.setStartEndcapType(Communicator.Markup.Shape.EndcapType.Arrowhead);
        return c
    }
    __extends(c, e);
    c.prototype.draw = function() {
        this._behindView = !1;
        var a = this._viewer.view.projectPoint(this._leaderAnchor),
            b = this._viewer.view.projectPoint(this._textBoxAnchor);
        0 >= a.z && (this._behindView = !0);
        0 >= b.z && (this._behindView = !0);
        a = Communicator.Point2.fromPoint3(a);
        b = Communicator.Point2.fromPoint3(b);
        this._leaderLine.set(a, b);
        this._textBox.setPosition(b);
        b = this._viewer.markupManager.getRenderer();
        b.drawLine(this._leaderLine);
        b.drawTextBox(this._textBox)
    };
    c.prototype.hit = function(a) {
        var b = this._viewer.markupManager.getRenderer().measureTextBox(this._textBox),
            d = this._textBox.getPosition();
        return a.x < d.x || a.x > d.x + b.x || a.y < d.y || a.y > d.y + b.y ? !1 : !0
    };
    c.prototype.setShowAsColor = function(a) {
        this._showAsColor = a
    };
    c.prototype.getShowAsColor = function() {
        return this._showAsColor
    };
    c.prototype.getNodeId = function() {
        return this._nodeId
    };
    c.prototype.getLeaderLineAnchor = function() {
        return this._leaderAnchor.copy()
    };
    c.prototype.getTextBoxAnchor =
        function() {
            return this._textBoxAnchor
        };
    c.prototype.setTextBoxAnchor = function(a) {
        this._textBoxAnchor.assign(a)
    };
    c.prototype.setLabel = function(a) {
        this._textBox.setTextString(a)
    };
    c.prototype.getLabel = function() {
        return this._textBox.getTextString()
    };
    return c
}(Communicator.Markup.MarkupItem);
e.AnnotationMarkup = f;
var l = function() {
    function e(c, a) {
        this._annotationMap = {};
        this._viewer = c;
        this._pulseManager = a;
        this._table = document.getElementById("AnnotationRegistry")
    }
    e.prototype.getAnnotation = function(c) {
        return this._annotationMap[c]
    };
    e.prototype.export = function() {
        for (var c = [], a = 0, b = Object.keys(this._annotationMap); a < b.length; a++) {
            var d = this._annotationMap[b[a]];
            c.push({
                name: d.getLabel(),
                position: d.getLeaderLineAnchor().toJson(),
                nodeId: d.getNodeId(),
                showAsColor: d.getShowAsColor()
            })
        }
        return JSON.stringify(c)
    };
    e.prototype.addAnnotation = function(c, a) {
        var b = this;
        this._annotationMap[c] = a;
        var d = document.createElement("tr");
        d.id = c;
        var g = document.createElement("td");
        g.id = c + "-nodeId";
        g.innerText = a.getNodeId().toString();
        d.appendChild(g);
        g = document.createElement("td");
        g.id = c + "-name";
        g.innerText = a.getLabel();
        d.appendChild(g);
        a = document.createElement("td");
        g = document.createElement("button");
        g.innerText = "Rename";
        g.onclick = function() {
            b._renameAnnotation(c)
        };
        a.appendChild(g);
        g = document.createElement("button");
        g.innerText = "Delete";
        g.onclick = function() {
            b._deleteAnnotation(c)
        };
        a.appendChild(g);
        d.appendChild(a);
        a = document.createElement("td");
        g = document.createElement("input");
        g.type = "checkbox";
        g.id = c + "-showAsColor";
        g.classList.add("showAsColor");
        a.appendChild(g);
        g.onchange = function(d) {
            b._onPulseChange(c, d.target)
        };
        d.appendChild(a);
        this._table.appendChild(d)
    };
    e.prototype._onPulseChange = function(c, a) {
        c = this.getAnnotation(c);
        void 0 !== c && (c.setShowAsColor(a.checked), a.checked ? this._pulseManager.add(c.getNodeId(), this._pulseManager.getDefaultColor1(), this._pulseManager.getDefaultColor2(), this._pulseManager.getDefaultPulseTime()) : (this._pulseManager.deletePulse(c.getNodeId()), this._viewer.redraw()))
    };
    e.prototype._renameAnnotation = function(c) {
        var a =
            this._annotationMap[c];
        if (void 0 !== a) {
            var b = prompt("Enter a new name for " + a.getLabel(), a.getLabel());
            null != b && (a.setLabel(b), this._viewer.markupManager.refreshMarkup(), c = document.getElementById(c + "-name"), null !== c && (c.innerText = b))
        }
    };
    e.prototype._deleteAnnotation = function(c) {
        this._viewer.markupManager.unregisterMarkup(c);
        var a = this._annotationMap[c];
        void 0 !== a && (this._pulseManager.deletePulse(a.getNodeId()), delete this._annotationMap[c]);
        c = document.getElementById(c);
        null !== c && null !== c.parentElement &&
            c.parentElement.removeChild(c)
    };
    return e
}();
e.AnnotationRegistry = l;
l = function() {
    function e(c, a) {
        this._previousNodeId = this._activeMarkup = this._previousAnchorPlaneDragPoint = null;
        this._viewer = c;
        this._annotationRegistry = a
    }
    e.prototype.onMouseDown = function(c) {
        return __awaiter(this, void 0, void 0, function() {
            var a, b, d, g, m, k;
            return __generator(this, function(e) {
                switch (e.label) {
                    case 0:
                        return [4, this._viewer.view.pickFromPoint(c.getPosition(), new Communicator.PickConfig(Communicator.SelectionMask.All))];
                    case 1:
                        a =
                            e.sent();
                        if (null !== a && 0 !== a.overlayIndex()) return [2];
                        b = c.getPosition();
                        this._selectAnnotation(b) ? c.setHandled(!0) : null !== a && a.isNodeEntitySelection() && (d = a.getNodeId(), g = a.getPosition(), m = new f(this._viewer, d, g, this._viewer.model.getNodeName(d) + " Connector"), k = this._viewer.markupManager.registerMarkup(m), this._annotationRegistry.addAnnotation(k, m), this._startDraggingAnnotation(m, b), c.setHandled(!0));
                        return [2]
                }
            })
        })
    };
    e.prototype.onMouseMove = function(c) {
        return __awaiter(this, void 0, void 0, function() {
            var a,
                b, d, g, m;
            return __generator(this, function(k) {
                switch (k.label) {
                    case 0:
                        if (null === this._activeMarkup) return [3, 1];
                        a = this._getDragPointOnAnchorPlane(c.getPosition());
                        b = void 0;
                        b = null !== this._previousAnchorPlaneDragPoint && null !== a ? Communicator.Point3.subtract(a, this._previousAnchorPlaneDragPoint) : Communicator.Point3.zero();
                        d = this._activeMarkup.getTextBoxAnchor().add(b);
                        this._activeMarkup.setTextBoxAnchor(d);
                        this._previousAnchorPlaneDragPoint = a;
                        this._viewer.markupManager.refreshMarkup();
                        c.setHandled(!0);
                        return [3,
                            3
                        ];
                    case 1:
                        return [4, this._viewer.view.pickFromPoint(c.getPosition(), new Communicator.PickConfig)];
                    case 2:
                        g = k.sent(), m = g.getNodeId(), m !== this._previousNodeId && (null != this._previousNodeId && this._viewer.model.setNodesHighlighted([this._previousNodeId], !1), null != m && this._viewer.model.setNodesHighlighted([m], !0)), this._previousNodeId = m, k.label = 3;
                    case 3:
                        return [2]
                }
            })
        })
    };
    e.prototype.onMouseUp = function(c) {
        this._previousAnchorPlaneDragPoint = this._activeMarkup = null
    };
    e.prototype._startDraggingAnnotation = function(c,
        a) {
        this._activeMarkup = c;
        this._previousAnchorPlaneDragPoint = this._getDragPointOnAnchorPlane(a)
    };
    e.prototype._selectAnnotation = function(c) {
        var a = this._viewer.markupManager.pickMarkupItem(c);
        return a ? (this._activeMarkup = a, this._previousAnchorPlaneDragPoint = this._getDragPointOnAnchorPlane(c), !0) : !1
    };
    e.prototype.onDeactivate = function() {
        null != this._previousNodeId && this._viewer.model.setNodesHighlighted([this._previousNodeId], !1);
        this._previousNodeId = null
    };
    e.prototype._getDragPointOnAnchorPlane = function(c) {
        if (null ===
            this._activeMarkup) return null;
        var a = this._activeMarkup.getLeaderLineAnchor(),
            b = this._viewer.view.getCamera();
        b = Communicator.Point3.subtract(b.getPosition(), a).normalize();
        a = Communicator.Plane.createFromPointAndNormal(a, b);
        c = this._viewer.view.raycastFromPoint(c);
        if (null === c) return null;
        b = Communicator.Point3.zero();
        return a.intersectsRay(c, b) ? b : null
    };
    return e
}();
e.AnnotationOperator = l
})(Example || (Example = {}));
var Communicator;
(function(e) {
(function(f) {
    (function(l) {
        var h = function() {
            function a(b, d) {
                this.action = b;
                this.element = d
            }
            a.prototype.setEnabled = function(b) {
                b ? $(this.element).removeClass("disabled") : $(this.element).addClass("disabled")
            };
            a.prototype.setText = function(b) {
                this.element.innerHTML = b
            };
            a.prototype.show = function() {
                $(this.element).show()
            };
            a.prototype.hide = function() {
                $(this.element).hide()
            };
            return a
        }();
        l.ContextMenuItem = h;
        var c = function() {
            function a(b, d, a, c, k) {
                var g = this;
                this._activeType = this._activeLayerName = this._activeItemId =
                    null;
                this._separatorCount = 0;
                this._position = null;
                this._modifiers = e.KeyModifiers.None;
                this._viewer = a;
                this._containerId = d;
                this._isolateZoomHelper = c;
                this._colorPicker = k;
                this._menuElement = this._createMenuElement(b);
                this._contextLayer = this._createContextLayer();
                this._initElements();
                this._viewer.setCallbacks({
                    firstModelLoaded: function() {
                        g._onNewModel()
                    },
                    modelSwitched: function() {
                        g._onNewModel()
                    }
                })
            }
            a.prototype._getContextItemMap = function() {
                return this._contextItemMap
            };
            a.prototype._onNewModel = function() {
                this._viewer.sheetManager.isDrawingSheetActive() &&
                    (this._contextItemMap.reset.hide(), void 0 !== this._contextItemMap.meshlevel0 && this._contextItemMap.meshlevel0.hide(), void 0 !== this._contextItemMap.meshlevel1 && this._contextItemMap.meshlevel1.hide(), void 0 !== this._contextItemMap.meshlevel2 && this._contextItemMap.meshlevel2.hide(), $(".contextmenu-separator-3").hide())
            };
            a.prototype._isMenuItemEnabled = function() {
                if (null !== this._activeLayerName || null !== this._activeType || null !== this._activeItemId && !this._viewer.noteTextManager.checkPinInstance(this._activeItemId)) return !0;
                for (var b = 0, d = this._viewer.selectionManager.getResults(); b < d.length; b++)
                    if (1 !== d[b].overlayIndex()) return !0;
                return !1
            };
            a.prototype._isMenuItemVisible = function() {
                var b = this._isItemVisible(this._activeItemId),
                    d = this._isLayerVisibile(this._activeLayerName),
                    a = this._isTypeVisible(this._activeType);
                return b || d || a
            };
            a.prototype._isColorSet = function(b) {
                return __awaiter(this, void 0, void 0, function() {
                    var d, a, c, k;
                    return __generator(this, function(g) {
                        switch (g.label) {
                            case 0:
                                d = this._colorPicker.getColor(), a = !0, c =
                                    0, g.label = 1;
                            case 1:
                                return c < b.length ? [4, this._viewer.model.getNodeColorMap(b[c], e.ElementType.Faces)] : [3, 4];
                            case 2:
                                k = g.sent();
                                if (0 === k.size) return [2, !1];
                                k.forEach(function(b) {
                                    b.equals(d) || (a = !1)
                                });
                                g.label = 3;
                            case 3:
                                return ++c, [3, 1];
                            case 4:
                                return [2, a]
                        }
                    })
                })
            };
            a.prototype._updateMenuItems = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, a, c, k, h, f;
                    return __generator(this, function(g) {
                        switch (g.label) {
                            case 0:
                                return b = this.getContextItemIds(!0, !0, !1), d = this._isMenuItemEnabled(), a = this._isMenuItemVisible(),
                                    this._contextItemMap.visibility.setText(a ? "Hide" : "Show"), this._contextItemMap.visibility.setEnabled(d), this._contextItemMap.isolate.setEnabled(d), this._contextItemMap.zoom.setEnabled(d), this._contextItemMap.transparent.setEnabled(d), k = (c = this._contextItemMap.setColor).setText, [4, this._isColorSet(b)];
                            case 1:
                                return k.apply(c, [(g.sent() ? "Uns" : "S") + "et Color"]), (h = this._viewer.operatorManager.getOperator(e.OperatorId.Handle)) && h.isEnabled && d ? (f = 0 < b.length && h.isEnabled(), this._contextItemMap.handles.setEnabled(f)) :
                                    this._contextItemMap.handles.setEnabled(!1), void 0 !== this._contextItemMap.meshlevel0 && this._contextItemMap.meshlevel0.setEnabled(d), void 0 !== this._contextItemMap.meshlevel1 && this._contextItemMap.meshlevel1.setEnabled(d), void 0 !== this._contextItemMap.meshlevel2 && this._contextItemMap.meshlevel2.setEnabled(d), [2]
                        }
                    })
                })
            };
            a.prototype.setActiveLayerName = function(b) {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return this._activeLayerName = f.LayersTree.getLayerName(b),
                                    [4, this._updateMenuItems()];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            };
            a.prototype.setActiveType = function(b) {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return this._activeType = b, [4, this._updateMenuItems()];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            };
            a.prototype.setActiveItemId = function(b) {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return this._activeItemId = b, [4, this._updateMenuItems()];
                            case 1:
                                return d.sent(),
                                    [2]
                        }
                    })
                })
            };
            a.prototype.showElements = function(b,fromModelBrowser) {  //3DSANDBOX CHANGES
                this._viewer.setContextMenuStatus(!0);
                var d = this._viewer.view.getCanvasSize(),
                    a = $(this._menuElement),
                    c = a.outerWidth(),
                    k = a.outerHeight();
                    
                    var off;
                    if (fromModelBrowser != undefined)
                        var off = $("#content").offset();
                    else
                    {
                        off = {left:0,top:0};
                    }

                void 0 !== k && void 0 !== c && (k > d.y && a.addClass("small"), a = b.y, b = b.x, a + k > d.y && (a = d.y - k - 1), b + c > d.x && (b = d.x - c - 1), $(this._menuElement).css({
                    left: (b-off.left) + "px",
                    top: (a-off.top) + "px",
                    display: "block"
                }));
                $(this._menuElement).show();
                $(this._contextLayer).show()
            };
            a.prototype._onContextLayerClick = function(b) {
                0 === b.button && this.hide()
            };
            a.prototype.hide =
                function() {
                    this._viewer.setContextMenuStatus(!1);
                    this._activeType = this._activeLayerName = this._activeItemId = null;
                    $(this._menuElement).hide();
                    $(this._contextLayer).hide();
                    $(this._menuElement).removeClass("small")
                };
            a.prototype.action = function(b) {
                return __awaiter(this, void 0, void 0, function() {
                    var d;
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return d = this._contextItemMap[b], void 0 === d ? [3, 2] : [4, d.action()];
                            case 1:
                                a.sent(), a.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            a.prototype._doMenuClick = function(b) {
                b =
                    $(b.target);
                b.hasClass("disabled") || (b = b.attr("id"), void 0 !== b && this.action(b), this.hide())
            };
            a.prototype._createMenuElement = function(b) {
                var d = this,
                    a = document.createElement("div");
                a.classList.add("ui-contextmenu");
                a.classList.add(b);
                a.style.position = "absolute";
                a.style.zIndex = "6";
                a.style.display = "none";
                a.oncontextmenu = function() {
                    return !1
                };
                a.ontouchmove = function(d) {
                    d.preventDefault()
                };
                $(a).on("click", ".ui-contextmenu-item", function(b) {
                    d._doMenuClick(b)
                });
                return a
            };
            a.prototype._createContextLayer = function() {
                var b =
                    this,
                    d = document.createElement("div");
                d.style.position = "relative";
                d.style.width = "100%";
                d.style.height = "100%";
                d.style.backgroundColor = "transparent";
                d.style.zIndex = "5";
                d.style.display = "none";
                d.oncontextmenu = function() {
                    return !1
                };
                d.ontouchmove = function(d) {
                    d.preventDefault()
                };
                $(d).on("mousedown", function(d) {
                    b._onContextLayerClick(d)
                });
                return d
            };
            a.prototype._initElements = function() {
                this._createDefaultMenuItems();
                var b = document.getElementById(this._containerId);
                null !== b && (b.appendChild(this._menuElement),
                    b.appendChild(this._contextLayer))
            };
            a.prototype._isMenuItemExecutable = function() {
                return null !== this._activeItemId || null !== this._activeLayerName || null !== this._activeType || 0 < this._viewer.selectionManager.size()
            };
            a.prototype._createDefaultMenuItems = function() {
                var b = this,
                    d = this._viewer.model,
                    a = this._viewer.operatorManager;
                this._contextItemMap = {};
                var c = function(b) {
                    return b.every(function(b) {
                        return d.hasEffectiveGenericType(b, e.StaticGenericType.IfcSpace)
                    })
                };
                this.appendItem("isolate", "Isolate", function() {
                    return __awaiter(b,
                        void 0, void 0,
                        function() {
                            var d;
                            return __generator(this, function(b) {
                                switch (b.label) {
                                    case 0:
                                        if (!this._isMenuItemExecutable()) return [3, 2];
                                        d = this.getContextItemIds(!0, !0);
                                        return [4, this._isolateZoomHelper.isolateNodes(d, c(d) ? !1 : null)];
                                    case 1:
                                        b.sent(), b.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                });
                this.appendItem("zoom", "Zoom", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return this._isMenuItemExecutable() ? [4, this._isolateZoomHelper.fitNodes(this.getContextItemIds(!0,
                                        !0))] : [3, 2];
                                case 1:
                                    d.sent(), d.label = 2;
                                case 2:
                                    return [2]
                            }
                        })
                    })
                });
                this.appendItem("visibility", "Hide", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        var b, a;
                        return __generator(this, function(g) {
                            switch (g.label) {
                                case 0:
                                    if (!this._isMenuItemExecutable()) return [3, 2];
                                    b = !this._isMenuItemVisible();
                                    a = this.getContextItemIds(!0, !0);
                                    return [4, d.setNodesVisibility(a, b, c(a) ? !1 : null)];
                                case 1:
                                    g.sent(), g.label = 2;
                                case 2:
                                    return [2]
                            }
                        })
                    })
                });
                this.appendSeparator();
                this.appendItem("transparent", "Transparent", function() {
                    return __awaiter(b,
                        void 0, void 0,
                        function() {
                            var b, a;
                            return __generator(this, function(g) {
                                switch (g.label) {
                                    case 0:
                                        if (!this._isMenuItemExecutable()) return [3, 2];
                                        b = this.getContextItemIds(!0, !0);
                                        return [4, d.getNodesOpacity([b[0]])];
                                    case 1:
                                        a = g.sent()[0], null === a || 1 === a ? d.setNodesOpacity(b, .5) : d.resetNodesOpacity(b), g.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                });
                this.appendSeparator();
                this.appendItem("setColor", "Set Color", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        var d, b;
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return d =
                                        this.getContextItemIds(!0, !0, !1), 0 < d.length ? [4, this._isColorSet(d)] : [3, 2];
                                case 1:
                                    a.sent() ? this._viewer.model.unsetNodesFaceColor(d) : (b = this._colorPicker.getColor().copy(), this._viewer.model.setNodesFaceColor(d, b)), a.label = 2;
                                case 2:
                                    return [2]
                            }
                        })
                    })
                });
                this.appendItem("modifyColor", "Modify Color", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            this._colorPicker.show();
                            return [2]
                        })
                    })
                });
                this.appendSeparator();
                this.appendItem("handles", "Show Handles", function() {
                    return __awaiter(b,
                        void 0, void 0,
                        function() {
                            var d, b;
                            return __generator(this, function(g) {
                                switch (g.label) {
                                    case 0:
                                        if (!this._isMenuItemExecutable()) return [3, 2];
                                        d = a.getOperator(e.OperatorId.Handle);
                                        b = this.getContextItemIds(!0, !0, !1);
                                        return 0 < b.length ? [4, d.addHandles(b, this._modifiers === e.KeyModifiers.Shift ? null : this._position)] : [3, 2];
                                    case 1:
                                        g.sent(), g.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                });
                this.appendItem("reset", "Reset Model", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        var b;
                        return __generator(this, function(g) {
                            switch (g.label) {
                                case 0:
                                    return b =
                                        a.getOperator(e.OperatorId.Handle), [4, b.removeHandles()];
                                case 1:
                                    return g.sent(), [4, d.reset()];
                                case 2:
                                    return g.sent(), d.unsetNodesFaceColor([this._viewer.model.getAbsoluteRootNode()]), [2]
                            }
                        })
                    })
                });
                if (this._viewer.getCreationParameters().hasOwnProperty("model")) {
                    this.appendSeparator();
                    for (var k = function(a) {
                            h.appendItem("meshlevel" + a, "Mesh Level " + a, function() {
                                return __awaiter(b, void 0, void 0, function() {
                                    return __generator(this, function(g) {
                                        b._isMenuItemExecutable() && d.setMeshLevel(b.getContextItemIds(!0,
                                            !0), a);
                                        return [2]
                                    })
                                })
                            })
                        }, h = this, f = 0; 3 > f; ++f) k(f)
                }
                this.appendSeparator();
                this.appendItem("showall", "Show all", function() {
                    return __awaiter(b, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, this._isolateZoomHelper.showAll()];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                    })
                })
            };
            a.prototype.getContextItemIds = function(b, d, a) {
                void 0 === a && (a = !0);
                var g = this._viewer.selectionManager,
                    c = this._viewer.model,
                    h = c.getAbsoluteRootNode(),
                    f = [];
                if (b) {
                    b = 0;
                    for (var l = g.getResults(); b < l.length; b++) {
                        var n =
                            l[b].getNodeId();
                        c.isNodeLoaded(n) && (a || !a && n !== h) && f.push(n)
                    }
                }
                if (null !== this._activeLayerName && (c = this._viewer.model.getLayerIdsFromName(this._activeLayerName), null !== c))
                    for (b = 0; b < c.length; b++)
                        if (n = this._viewer.model.getNodesFromLayer(c[b]), null !== n)
                            for (l = 0; l < n.length; l++) {
                                var q = n[l],
                                    t = e.Selection.SelectionItem.create(q);
                                g.contains(t) || f.push(q)
                            }
                null !== this._activeType && (n = this._viewer.model.getNodesByGenericType(this._activeType), null !== n && n.forEach(function(d) {
                    var b = e.Selection.SelectionItem.create(d);
                    g.contains(b) || f.push(d)
                }));
                null !== this._activeItemId && (t = e.Selection.SelectionItem.create(this._activeItemId), c = null !== g.containsParent(t), b = -1 !== f.indexOf(this._activeItemId), !d || !a && (a || this._activeItemId === h || 0 !== f.length && (b || c)) || f.push(this._activeItemId));
                return f
            };
            a.prototype.appendItem = function(b, d, a) {
                var g = document.createElement("div");
                g.classList.add("ui-contextmenu-item");
                g.innerHTML = d;
                g.id = b;
                this._menuElement.appendChild(g);
                d = new h(a, g);
                return this._contextItemMap[b] = d
            };
            a.prototype.appendSeparator =
                function() {
                    var b = document.createElement("div");
                    b.classList.add("contextmenu-separator-" + this._separatorCount++);
                    b.classList.add("ui-contextmenu-separator");
                    b.style.width = "100%";
                    b.style.height = "1px";
                    this._menuElement.appendChild(b)
                };
            a.prototype._isItemVisible = function(b) {
                if (null === b) {
                    b = this._viewer.selectionManager.getResults();
                    if (0 === b.length) return !1;
                    b = b[0].getNodeId()
                }
                return this._viewer.model.getNodeVisibility(b)
            };
            a.prototype._isLayerVisibile = function(b) {
                if (null !== b && (b = this._viewer.model.getLayerIdsFromName(b),
                        null !== b))
                    for (var d = 0; d < b.length; d++) {
                        var a = this._viewer.model.getNodesFromLayer(b[d]);
                        if (null !== a)
                            for (var c = 0; c < a.length; c++)
                                if (this._viewer.model.getNodeVisibility(a[c])) return !0
                    }
                return !1
            };
            a.prototype._isTypeVisible = function(b) {
                var d = this,
                    a = !1;
                null !== b && (b = this._viewer.model.getNodesByGenericType(b), null !== b && b.forEach(function(b) {
                    a = a || d._viewer.model.getNodeVisibility(b)
                }));
                return a
            };
            return a
        }();
        l.ContextMenu = c
    })(f.Context || (f.Context = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    (function(e) {
        var f = function() {
            return function() {
                this.referenceGeometry = this.plane = null;
                this.status = 0;
                this.updateReferenceGeometry = !1
            }
        }();
        e.Info = f
    })(e.CuttingPlane || (e.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    (function(e) {
        (function(f) {
            var c = function() {
                function a() {
                    this._planeInfoMap = new Map
                }
                Object.defineProperty(a.prototype, "X", {
                    get: function() {
                        return this.get(0)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "Y", {
                    get: function() {
                        return this.get(1)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "Z", {
                    get: function() {
                        return this.get(2)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "Face", {
                    get: function() {
                        return this.get(3)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                a.prototype.isHidden = function(b) {
                    return 0 === this.get(b).status
                };
                a.prototype.get = function(b) {
                    var d = this._planeInfoMap.get(b);
                    void 0 === d && (d = new e.Info, this._planeInfoMap.set(b, d));
                    return d
                };
                a.prototype.reset = function(b) {
                    b = this.get(b);
                    b.plane = null;
                    b.referenceGeometry = null
                };
                a.prototype.delete = function(b) {
                    this._planeInfoMap.delete(b)
                };
                a.prototype.clear = function() {
                    this._planeInfoMap.clear()
                };
                a.prototype.update = function() {
                    this._planeInfoMap.forEach(function(b) {
                        b.updateReferenceGeometry = !0
                    })
                };
                a.getCuttingStatus = function(b, d) {
                    return 0 <= d.normal.x && 0 <= d.normal.y && 0 <= d.normal.z || 3 === b ? 1 : 2
                };
                a.getPlaneSectionIndex = function(b) {
                    var d = Math.abs(b.normal.x),
                        a = Math.abs(b.normal.y);
                    b = Math.abs(b.normal.z);
                    return 1 === d && 0 === a && 0 === b ? 0 : 0 === d && 1 === a && 0 === b ? 1 : 0 === d && 0 === a && 1 === b ? 2 : 3
                };
                return a
            }();
            f.PlaneInfoManager = c
        })(e.ControllerUtils || (e.ControllerUtils = {}))
    })(e.CuttingPlane || (e.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(f) {
        (function(f) {
            var c = function() {
                function a() {
                    this._useIndividualCuttingSections = !0;
                    this._cuttingManager = null
                }
                Object.defineProperty(a.prototype, "useIndividualCuttingSections", {
                    get: function() {
                        return this._useIndividualCuttingSections
                    },
                    set: function(b) {
                        this._useIndividualCuttingSections = b
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "X", {
                    get: function() {
                        if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                        return this._cuttingManager.getCuttingSection(0)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "Y", {
                    get: function() {
                        if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                        return this._cuttingManager.getCuttingSection(1)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "Z", {
                    get: function() {
                        if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                        return this._cuttingManager.getCuttingSection(2)
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype,
                    "Face", {
                        get: function() {
                            if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                            return this._cuttingManager.getCuttingSection(3)
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                Object.defineProperty(a.prototype, "activeStates", {
                    get: function() {
                        return [this.isActive(0), this.isActive(1), this.isActive(2), this.isActive(3)]
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "planes", {
                    get: function() {
                        var b = this;
                        return 1 < this.X.getCount() ? Array(4).slice().map(function(d, a) {
                            return b.X.getPlane(a)
                        }) : [this.X, this.Y, this.Z, this.Face].map(function(d) {
                            return d.getPlane(0)
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "referenceGeometry", {
                    get: function() {
                        var b = this;
                        return 1 < this.X.getCount() ? Array(4).slice().map(function(d, a) {
                            return b.X.getReferenceGeometry(a)
                        }) : [this.X, this.Y, this.Z, this.Face].map(function(d) {
                            return d.getReferenceGeometry(0)
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                });
                a.prototype.get = function(b) {
                    if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                    return this._cuttingManager.getCuttingSection(b)
                };
                a.prototype.getCount = function() {
                    return [this.X, this.Y, this.Z, this.Face].reduce(function(b, d) {
                        return b + d.getCount()
                    }, 0)
                };
                a.prototype.init = function(b) {
                    this._cuttingManager = b.cuttingManager
                };
                a.prototype.isActive = function(b) {
                    if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                    return this.get(b).isActive()
                };
                a.prototype.activate = function(b) {
                    return __awaiter(this, void 0, void 0, function() {
                        var d;
                        return __generator(this, function(a) {
                            d =
                                this.get(b);
                            return 0 < d.getCount() ? [2, d.activate()] : [2]
                        })
                    })
                };
                a.prototype.activateAll = function(b) {
                    return __awaiter(this, void 0, void 0, function() {
                        var d = this;
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return [4, Promise.all([0, 1, 2, 3].map(function(a, g) {
                                        return !b || b[g] ? d.activate(a) : null
                                    }).filter(Boolean))];
                                case 1:
                                    return a.sent(), [2]
                            }
                        })
                    })
                };
                a.prototype.deactivate = function(b) {
                    return this.get(this.getCuttingSectionIndex(b)).deactivate()
                };
                a.prototype.reset = function() {
                    this._useIndividualCuttingSections = !0
                };
                a.prototype.getCuttingSectionIndex = function(b) {
                    return this.useIndividualCuttingSections ? b : 0
                };
                a.prototype.clear = function(b) {
                    return __awaiter(this, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            return [2, this.get(b).clear()]
                        })
                    })
                };
                a.prototype.clearAll = function() {
                    return __awaiter(this, void 0, void 0, function() {
                        var b, d = this;
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return b = [0, 1, 2, 3].map(function(b) {
                                        return __awaiter(d, void 0, void 0, function() {
                                            return __generator(this, function(d) {
                                                return [2,
                                                    this.clear(b)
                                                ]
                                            })
                                        })
                                    }), [4, Promise.all(b)];
                                case 1:
                                    return a.sent(), [2]
                            }
                        })
                    })
                };
                a.prototype.getPlaneIndex = function(b, d) {
                    if (this._useIndividualCuttingSections) {
                        var a = this.get(this.getCuttingSectionIndex(b));
                        if (a.getPlane(0)) return 0
                    } else {
                        a = this.get(0);
                        for (var c = a.getCount(), k = 0; k < c; k++) {
                            var e = a.getPlane(k);
                            if (e && (e.normal.x && 0 === b || e.normal.y && 1 === b || e.normal.z && 2 === b || 3 === b && d && e.normal.equals(d))) return k
                        }
                    }
                    return -1
                };
                a.prototype.getPlaneAndGeometry = function(b, d) {
                    var a = this.get(this.getCuttingSectionIndex(b));
                    if (0 >= a.getCount()) return {
                        plane: null,
                        referenceGeometry: null
                    };
                    d = this.getPlaneIndex(b, d);
                    b = a.getPlane(d);
                    a = a.getReferenceGeometry(d);
                    return {
                        plane: b,
                        referenceGeometry: a
                    }
                };
                a.prototype.getReferenceGeometry = function(b, d) {
                    if (!this._cuttingManager) throw Error("Ui.CuttingSectionManager as not been initialized");
                    switch (b) {
                        case 0:
                            var a = e.Axis.X;
                            break;
                        case 1:
                            a = e.Axis.Y;
                            break;
                        case 2:
                            a = e.Axis.Z
                    }
                    return void 0 !== a ? this._cuttingManager.createReferenceGeometryFromAxis(a, d) : []
                };
                a.prototype.addPlane = function(b, d, a) {
                    return __awaiter(this,
                        void 0, void 0,
                        function() {
                            return __generator(this, function(g) {
                                switch (g.label) {
                                    case 0:
                                        return [4, this.get(b).addPlane(d, a)];
                                    case 1:
                                        return g.sent(), [2]
                                }
                            })
                        })
                };
                return a
            }();
            f.CuttingSectionManager = c
        })(f.ControllerUtils || (f.ControllerUtils = {}))
    })(f.CuttingPlane || (f.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(f) {
        (function(f) {
            var c = function() {
                function a() {
                    this._modelBounding = new e.Box
                }
                Object.defineProperty(a.prototype, "box", {
                    get: function() {
                        return this._modelBounding
                    },
                    enumerable: !0,
                    configurable: !0
                });
                a.prototype.init = function(b) {
                    return __awaiter(this, void 0, void 0, function() {
                        var d;
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return d = this, [4, b.model.getModelBounding(!0, !1)];
                                case 1:
                                    return d._modelBounding = a.sent(), [2]
                            }
                        })
                    })
                };
                a.prototype.update = function(b) {
                    return __awaiter(this,
                        void 0, void 0,
                        function() {
                            var d, a, c;
                            return __generator(this, function(g) {
                                switch (g.label) {
                                    case 0:
                                        return [4, b.model.getModelBounding(!0, !1)];
                                    case 1:
                                        return d = g.sent(), a = this._modelBounding.min.equalsWithTolerance(d.min, .01), c = this._modelBounding.max.equalsWithTolerance(d.max, .01), a && c ? [2, !1] : (this._modelBounding = d, [2, !0])
                                }
                            })
                        })
                };
                return a
            }();
            f.BoundingManager = c
        })(f.ControllerUtils || (f.ControllerUtils = {}))
    })(f.CuttingPlane || (f.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    (function(e) {
        (function(e) {
            var c = function() {
                function a() {
                    this._faceSelection = null
                }
                a.prototype.reset = function(b) {
                    void 0 === b && (b = null);
                    this._faceSelection = b
                };
                Object.defineProperty(a.prototype, "isSet", {
                    get: function() {
                        return null !== this._faceSelection
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype, "normal", {
                    get: function() {
                        return this._faceSelection ? this._faceSelection.getFaceEntity().getNormal() : void 0
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(a.prototype,
                    "position", {
                        get: function() {
                            return this._faceSelection ? this._faceSelection.getPosition() : void 0
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                a.prototype.getReferenceGeometry = function(b, d) {
                    return this.isSet ? b.cuttingManager.createReferenceGeometryFromFaceNormal(this.normal, this.position, d) : []
                };
                return a
            }();
            e.FaceSelectionManager = c
        })(e.ControllerUtils || (e.ControllerUtils = {}))
    })(e.CuttingPlane || (e.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(f) {
        (function(f) {
            function c(b, d) {
                var a = this,
                    m = d.payload,
                    k = function(d) {
                        return "update triggered" === d.name
                    };
                switch (d.name) {
                    case "init":
                        e.Util.delayCall(function() {
                            return __awaiter(a, void 0, void 0, function() {
                                return __generator(this, function(d) {
                                    switch (d.label) {
                                        case 0:
                                            return b.name = "updating", [4, b.controller.init()];
                                        case 1:
                                            d.sent();
                                            if (k(b)) return c(b, {
                                                name: "update",
                                                payload: m
                                            }), [2];
                                            b.name = "outdated";
                                            return [2]
                                    }
                                })
                            })
                        });
                        break;
                    case "update":
                        if ("not initialized" === b.name) throw Error("CuttingPlane.Controller.StateMachine has not been initialized");
                        if (k(b)) break;
                        else if ("updating" === b.name) {
                            b.name = "update triggered";
                            break
                        }
                        e.Util.delayCall(function() {
                            return __awaiter(a, void 0, void 0, function() {
                                return __generator(this, function(d) {
                                    switch (d.label) {
                                        case 0:
                                            return b.name = "updating", [4, b.controller.update()];
                                        case 1:
                                            d.sent();
                                            if (k(b)) return c(b, {
                                                name: "update",
                                                payload: m
                                            }), [2];
                                            b.name = "up to date";
                                            return [2]
                                    }
                                })
                            })
                        });
                        break;
                    case "refresh":
                        if ("not initialized" === b.name) throw Error("CuttingPlane.Controller.StateMachine has not been initialized");
                        e.Util.delayCall(function() {
                            return __awaiter(a,
                                void 0, void 0,
                                function() {
                                    return __generator(this, function(d) {
                                        switch (d.label) {
                                            case 0:
                                                return b.name = "updating", [4, b.controller.refresh()];
                                            case 1:
                                                d.sent();
                                                if (k(b)) return c(b, {
                                                    name: "update",
                                                    payload: m
                                                }), [2];
                                                b.name = "up to date";
                                                return [2]
                                        }
                                    })
                                })
                        });
                        break;
                    case "clear":
                        if ("not initialized" === b.name) throw Error("CuttingPlane.Controller.StateMachine has not been initialized");
                        e.Util.delayCall(function() {
                            return __awaiter(a, void 0, void 0, function() {
                                return __generator(this, function(d) {
                                    switch (d.label) {
                                        case 0:
                                            return b.name =
                                                "updating", [4, b.controller.clear()];
                                        case 1:
                                            d.sent();
                                            if (k(b)) return c(b, {
                                                name: "update",
                                                payload: m
                                            }), [2];
                                            b.name = "up to date";
                                            return [2]
                                    }
                                })
                            })
                        })
                }
                return b
            }
            var a = function(b) {
                function d(d) {
                    return b.call(this, {
                        name: "not initialized",
                        controller: d
                    }, c) || this
                }
                __extends(d, b);
                return d
            }(e.Util.StateMachine);
            f.StateMachine = a;
            f.defaultReducer = c
        })(f.ControllerUtils || (f.ControllerUtils = {}))
    })(f.CuttingPlane || (f.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(f) {
        var h = function() {
            function c(a) {
                var b = this;
                this._planeInfoMgr = new f.ControllerUtils.PlaneInfoManager;
                this._cuttingSectionsMgr = new f.ControllerUtils.CuttingSectionManager;
                this._modelBoundingMgr = new f.ControllerUtils.BoundingManager;
                this._faceSelectionMgr = new f.ControllerUtils.FaceSelectionManager;
                this._showReferenceGeometry = !0;
                this._pendingFuncs = {};
                this._viewer = a;
                this._stateMachine = new f.ControllerUtils.StateMachine(this);
                this._viewer.setCallbacks({
                    assemblyTreeReady: function() {
                        return b._stateMachine.handle("init")
                    },
                    visibilityChanged: function() {
                        return b._stateMachine.handle("update")
                    },
                    hwfParseComplete: function() {
                        return b._stateMachine.handle("update")
                    },
                    firstModelLoaded: function() {
                        return b._stateMachine.handle("refresh")
                    },
                    modelSwitched: function() {
                        return b._stateMachine.handle("refresh")
                    },
                    modelSwitchStart: function() {
                        return b._stateMachine.handle("clear")
                    }
                })
            }
            c.prototype.init = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._initSection()];
                            case 1:
                                return a.sent(), [4, this._updateBoundingBox()];
                            case 2:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            c.prototype.update = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._updateBoundingBox()];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            c.prototype.refresh = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._updateBoundingBox()];
                            case 1:
                                return a.sent(), [4, this.resetCuttingPlanes()];
                            case 2:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            c.prototype.clear = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._cuttingSectionsMgr.clearAll()];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            Object.defineProperty(c.prototype, "individualCuttingSectionEnabled", {
                get: function() {
                    return this._cuttingSectionsMgr.useIndividualCuttingSections
                },
                enumerable: !0,
                configurable: !0
            });
            c.prototype.getPlaneStatus = function(a) {
                return this._planeInfoMgr.get(a).status
            };
            c.prototype.onSectionsChanged = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a, b, d, g, c, k, e, h;
                    return __generator(this, function(m) {
                        switch (m.label) {
                            case 0:
                                a = this._cuttingSectionsMgr.planes;
                                b = this._cuttingSectionsMgr.referenceGeometry;
                                d = 0 === a.filter(function(d) {
                                    return null === d
                                }).length;
                                g = 0 === b.filter(function(d) {
                                    return null !== d
                                }).length;
                                this._showReferenceGeometry = !d || !g;
                                this._cuttingSectionsMgr.useIndividualCuttingSections = 1 >= this._cuttingSectionsMgr.X.getCount();
                                this._resetCuttingData();
                                for (c = 0; c < a.length; ++c) k = a[c], null !== k && (e = f.ControllerUtils.PlaneInfoManager.getPlaneSectionIndex(k), h = this._planeInfoMgr.get(e), 0 === h.status && (h.status = f.ControllerUtils.PlaneInfoManager.getCuttingStatus(e, k), h.plane = k, h.referenceGeometry = b[c]));
                                this._viewer.pauseRendering();
                                return [4, this._cuttingSectionsMgr.clearAll()];
                            case 1:
                                return m.sent(), [4, this._restorePlanes()];
                            case 2:
                                return m.sent(), this._viewer.resumeRendering(), [2]
                        }
                    })
                })
            };
            c.prototype.getReferenceGeometryEnabled = function() {
                return this._showReferenceGeometry
            };
            c.prototype._updateBoundingBox = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a, b;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, this._modelBoundingMgr.update(this._viewer)];
                            case 1:
                                a = d.sent();
                                if (!a) return [3, 4];
                                this._planeInfoMgr.update();
                                b = this._cuttingSectionsMgr.activeStates;
                                this._storePlanes();
                                return [4, this._cuttingSectionsMgr.clearAll()];
                            case 2:
                                return d.sent(), [4, this._restorePlanes(b)];
                            case 3:
                                d.sent(), d.label = 4;
                            case 4:
                                return [2]
                        }
                    })
                })
            };
            c.prototype._resetCuttingData =
                function() {
                    this._planeInfoMgr.clear();
                    this._cuttingSectionsMgr.reset();
                    this._faceSelectionMgr.reset()
                };
            c.prototype.resetCuttingPlanes = function() {
                this._resetCuttingData();
                this._showReferenceGeometry = !0;
                return this._cuttingSectionsMgr.clearAll()
            };
            c.prototype._initSection = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, Promise.all([this._modelBoundingMgr.init(this._viewer), this._cuttingSectionsMgr.init(this._viewer), this._triggerPendingFuncs()])];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            c.prototype._triggerPendingFuncs = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                if (!this._pendingFuncs.inverted) return [3, 2];
                                a = this._pendingFuncs.inverted;
                                delete this._pendingFuncs.inverted;
                                return [4, a()];
                            case 1:
                                b.sent(), b.label = 2;
                            case 2:
                                if (!this._pendingFuncs.visibility) return [3, 4];
                                a = this._pendingFuncs.visibility;
                                delete this._pendingFuncs.visibility;
                                return [4, a()];
                            case 3:
                                b.sent(), b.label = 4;
                            case 4:
                                return [2]
                        }
                    })
                })
            };
            c.prototype.toggle = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, g;
                    return __generator(this, function(c) {
                        switch (c.label) {
                            case 0:
                                b = this._planeInfoMgr.get(a);
                                d = b.status;
                                switch (d) {
                                    case 0:
                                        return [3, 1];
                                    case 1:
                                        return [3, 8];
                                    case 2:
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 1:
                                if (3 !== a) return [3, 5];
                                g = this._viewer.selectionManager.getLast();
                                if (null === g || !g.isFaceSelection()) return [3, 4];
                                this._faceSelectionMgr.reset(g);
                                return [4, this._cuttingSectionsMgr.Face.clear()];
                            case 2:
                                return c.sent(), b.status = 1, [4, this.setCuttingPlaneVisibility(!0,
                                    a)];
                            case 3:
                                c.sent(), c.label = 4;
                            case 4:
                                return [3, 7];
                            case 5:
                                return b.status = 1, [4, this.setCuttingPlaneVisibility(!0, a)];
                            case 6:
                                c.sent(), c.label = 7;
                            case 7:
                                return [3, 12];
                            case 8:
                                return b.status = 2, [4, this.setCuttingPlaneInverted(a)];
                            case 9:
                                return c.sent(), [3, 12];
                            case 10:
                                return b.status = 0, [4, this.setCuttingPlaneVisibility(!1, a)];
                            case 11:
                                return c.sent(), [3, 12];
                            case 12:
                                return [2]
                        }
                    })
                })
            };
            c.prototype.getCount = function() {
                return this._cuttingSectionsMgr.getCount()
            };
            c.prototype.setCuttingPlaneVisibility = function(a, b) {
                return __awaiter(this,
                    void 0, void 0,
                    function() {
                        var d, g, c, k, e, f = this;
                        return __generator(this, function(m) {
                            switch (m.label) {
                                case 0:
                                    d = this._cuttingSectionsMgr.getCuttingSectionIndex(b);
                                    g = this._cuttingSectionsMgr.get(d);
                                    if (void 0 === g) return this._pendingFuncs.visibility = function() {
                                        return __awaiter(f, void 0, void 0, function() {
                                            return __generator(this, function(d) {
                                                switch (d.label) {
                                                    case 0:
                                                        return [4, this.setCuttingPlaneVisibility(a, b)];
                                                    case 1:
                                                        return d.sent(), [2]
                                                }
                                            })
                                        })
                                    }, [2];
                                    this._viewer.delayCapping();
                                    if (!a) return [3, 2];
                                    c = this._planeInfoMgr.get(b);
                                    null === c.plane && (c.plane = this._generateCuttingPlane(b), c.referenceGeometry = this._generateReferenceGeometry(b));
                                    return [4, this._setSection(b)];
                                case 1:
                                    return m.sent(), [3, 4];
                                case 2:
                                    return [4, this.refreshPlaneGeometry()];
                                case 3:
                                    m.sent(), m.label = 4;
                                case 4:
                                    return k = this.getCount(), e = this._cuttingSectionsMgr.isActive(b), 0 < k && !e ? [4, this._cuttingSectionsMgr.activateAll()] : [3, 6];
                                case 5:
                                    return m.sent(), [3, 8];
                                case 6:
                                    return e && 0 === k ? [4, this._cuttingSectionsMgr.deactivate(b)] : [3, 8];
                                case 7:
                                    m.sent(), m.label = 8;
                                case 8:
                                    return [2]
                            }
                        })
                    })
            };
            c.prototype.setCuttingPlaneInverted = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, g, c = this;
                    return __generator(this, function(m) {
                        switch (m.label) {
                            case 0:
                                b = this._cuttingSectionsMgr.get(this._cuttingSectionsMgr.getCuttingSectionIndex(a));
                                if (void 0 === b) return this._pendingFuncs.inverted = function() {
                                    return __awaiter(c, void 0, void 0, function() {
                                        return __generator(this, function(d) {
                                            switch (d.label) {
                                                case 0:
                                                    return [4, this.setCuttingPlaneInverted(a)];
                                                case 1:
                                                    return d.sent(), [2]
                                            }
                                        })
                                    })
                                }, [2];
                                this._viewer.delayCapping();
                                d = this._cuttingSectionsMgr.getPlaneIndex(a, this._faceSelectionMgr.normal);
                                g = b.getPlane(d);
                                if (!g) return [3, 2];
                                g.normal.negate();
                                g.d *= -1;
                                return [4, b.updatePlane(d, g, new e.Matrix, !1, !1)];
                            case 1:
                                m.sent(), m.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            c.prototype.toggleReferenceGeometry = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                if (!(0 < this.getCount())) return [3, 2];
                                this._showReferenceGeometry = !this._showReferenceGeometry;
                                return [4, this.refreshPlaneGeometry()];
                            case 1:
                                a.sent(), a.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            c.prototype.refreshPlaneGeometry = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return this._storePlanes(), [4, this._cuttingSectionsMgr.clearAll()];
                            case 1:
                                return a.sent(), [4, this._restorePlanes()];
                            case 2:
                                return a.sent(), [2]
                        }
                    })
                })
            };
            c.prototype.toggleCuttingMode = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                if (!(1 <
                                        this.getCount())) return [3, 3];
                                this._storePlanes();
                                return [4, this._cuttingSectionsMgr.clearAll()];
                            case 1:
                                return a.sent(), this._cuttingSectionsMgr.useIndividualCuttingSections = !this._cuttingSectionsMgr.useIndividualCuttingSections, [4, this._restorePlanes()];
                            case 2:
                                a.sent(), a.label = 3;
                            case 3:
                                return [2]
                        }
                    })
                })
            };
            c.prototype._setSection = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, g;
                    return __generator(this, function(c) {
                        b = this._planeInfoMgr.get(a);
                        d = b.plane;
                        g = b.referenceGeometry;
                        return null ===
                            d ? [2] : [2, this._cuttingSectionsMgr.addPlane(a, d, g)]
                    })
                })
            };
            c.prototype._restorePlane = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                b = this._planeInfoMgr.get(a);
                                if (void 0 === b || null === b.plane || 0 === b.status) return [3, 2];
                                if (null === b.referenceGeometry || b.updateReferenceGeometry) b.referenceGeometry = this._generateReferenceGeometry(a);
                                return [4, this._setSection(a)];
                            case 1:
                                d.sent(), d.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            c.prototype._restorePlanes =
                function(a) {
                    return __awaiter(this, void 0, void 0, function() {
                        return __generator(this, function(b) {
                            switch (b.label) {
                                case 0:
                                    return [4, Promise.all([this._restorePlane(0), this._restorePlane(1), this._restorePlane(2), this._restorePlane(3)])];
                                case 1:
                                    return b.sent(), [4, this._cuttingSectionsMgr.activateAll(a)];
                                case 2:
                                    return b.sent(), [2]
                            }
                        })
                    })
                };
            c.prototype._storePlanes = function() {
                var a = this,
                    b = new Map([0, 1, 2, 3].map(function(d) {
                        a._planeInfoMgr.reset(d);
                        return [d, a._planeInfoMgr.get(d)]
                    }).filter(function(d) {
                        return !a._planeInfoMgr.isHidden(d[0])
                    })),
                    d = this._faceSelectionMgr.normal;
                b.forEach(function(b, c) {
                    c = a._cuttingSectionsMgr.getPlaneAndGeometry(c, d);
                    var g = c.referenceGeometry;
                    b.plane = c.plane;
                    b.referenceGeometry = g
                })
            };
            c.prototype._generateReferenceGeometry = function(a) {
                return 3 === a ? this._faceSelectionMgr.getReferenceGeometry(this._viewer, this._modelBoundingMgr.box) : this._cuttingSectionsMgr.getReferenceGeometry(a, this._modelBoundingMgr.box)
            };
            c.prototype._generateCuttingPlane = function(a) {
                var b = new e.Plane,
                    d = this._modelBoundingMgr.box;
                switch (a) {
                    case 0:
                        b.normal.set(1,
                            0, 0);
                        b.d = -d.max.x;
                        break;
                    case 1:
                        b.normal.set(0, 1, 0);
                        b.d = -d.max.y;
                        break;
                    case 2:
                        b.normal.set(0, 0, 1);
                        b.d = -d.max.z;
                        break;
                    case 3:
                        if (this._faceSelectionMgr.isSet) b.setFromPointAndNormal(this._faceSelectionMgr.position, this._faceSelectionMgr.normal);
                        else return null
                }
                return b
            };
            return c
        }();
        f.Controller = h
    })(f.CuttingPlane || (f.CuttingPlane = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    var f = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        __extends(c, e);
        return c
    }(e.CuttingPlane.Info);
    e.CuttingPlaneInfo = f;
    f = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        __extends(c, e);
        c.prototype.getIndividualCuttingSectionEnabled = function() {
            return this.individualCuttingSectionEnabled
        };
        c.prototype.getPlaneInfo = function(a) {
            return this._planeInfoMgr.get(a)
        };
        return c
    }(e.CuttingPlane.Controller);
    e.CuttingPlaneController = f
})(e.Ui ||
    (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
function f(f, c) {
    var a = f.model,
        b = f.sheetManager.getActiveSheetId();
    if (null !== b) {
        var d = a.getNodeParent(b),
            g = a.getNodeChildren(d);
        e.Util.filterInPlace(c, function(d) {
            for (; null !== d && d !== b;) {
                if (-1 !== g.indexOf(d)) return !1;
                d = f.model.getNodeParent(d)
            }
            return !0
        })
    }
}
e._filterActiveSheetNodeIds = f;
var l = function() {
    function h(c) {
        var a = this;
        this._camera = null;
        this._deselectOnZoom = this._deselectOnIsolate = !0;
        this._isolateStatus = !1;
        this._viewer = c;
        this._noteTextManager = this._viewer.noteTextManager;
        this._viewer.setCallbacks({
            modelSwitched: function() {
                a._camera =
                    null
            }
        })
    }
    h.prototype._setCamera = function(c) {
        null === this._camera && (this._camera = c)
    };
    h.prototype.setDeselectOnIsolate = function(c) {
        this._deselectOnIsolate = c
    };
    h.prototype.getIsolateStatus = function() {
        return this._isolateStatus
    };
    h.prototype.isolateNodes = function(c, a) {
        void 0 === a && (a = null);
        var b = this._viewer.view;
        this._setCamera(b.getCamera());
        f(this._viewer, c);
        c = b.isolateNodes(c, e.DefaultTransitionDuration, !this._viewer.sheetManager.isDrawingSheetActive(), a);
        this._deselectOnIsolate && this._viewer.selectionManager.clear();
        this._isolateStatus = !0;
        return c
    };
    h.prototype.fitNodes = function(c) {
        var a = this._viewer.view;
        this._setCamera(a.getCamera());
        c = a.fitNodes(c);
        this._deselectOnZoom && this._viewer.selectionManager.clear();
        return c
    };
    h.prototype.showAll = function() {
        var c = this._viewer.model;
        if (this._viewer.sheetManager.isDrawingSheetActive()) {
            var a = this._viewer.sheetManager.getActiveSheetId();
            return null !== a ? this.isolateNodes([a]) : Promise.resolve()
        }
        a = [];
        c.isDrawing() ? (c = this._viewer.sheetManager.get3DNodes(), a.push(this.isolateNodes(c))) :
            a.push(c.resetNodesVisibility());
        null !== this._camera && (this._viewer.view.setCamera(this._camera, e.DefaultTransitionDuration), this._camera = null);
        this._isolateStatus = !1;
        a.push(this._updatePinVisibility());
        return e.Util.waitForAll(a)
    };
    h.prototype._updatePinVisibility = function() {
        this._noteTextManager.setIsolateActive(this._isolateStatus);
        return this._noteTextManager.updatePinVisibility()
    };
    return h
}();
e.IsolateZoomHelper = l
})(Communicator || (Communicator = {}));
(function(e) {
var f = function() {
        return function(e, c, a, b) {
            this.progress = this.direction = 0;
            this.id = e;
            this.color1 = c.copy();
            this.color2 = a.copy();
            this.duration = b
        }
    }(),
    l = function() {
        function e(c) {
            this._pulseInfoMap = {};
            this._defaultColor1 = Communicator.Color.red();
            this._defaultColor2 = new Communicator.Color(175, 0, 0);
            this._defaultPulseTime = 1E3;
            this._viewer = c
        }
        e.prototype.start = function() {
            var c = this;
            setTimeout(function() {
                c.update()
            }, 30)
        };
        e.prototype.deletePulse = function(c) {
            this._pulseInfoMap.hasOwnProperty(c.toString()) &&
                (this._viewer.model.unsetNodesFaceColor([c]), delete this._pulseInfoMap[c])
        };
        e.prototype.add = function(c, a, b, d) {
            this.deletePulse(c);
            a = new f(c, a, b, d);
            this._pulseInfoMap[c] = a
        };
        e.prototype.update = function() {
            null == this._previousTime && (this._previousTime = Date.now());
            for (var c = Date.now(), a = c - this._previousTime, b = {}, d = !1, g = 0, m = Object.keys(this._pulseInfoMap); g < m.length; g++) {
                var k = this._pulseInfoMap[m[g]];
                d = !0;
                k.progress = Math.min(k.progress + a, k.duration);
                var e = k.progress / k.duration;
                if (0 === k.direction) {
                    var f =
                        k.color1;
                    var h = k.color2
                } else f = k.color2, h = k.color1;
                e = new Communicator.Color(f.r + (h.r - f.r) * e, f.g + (h.g - f.g) * e, f.b + (h.b - f.b) * e);
                b[k.id] = e;
                k.progress >= k.duration && (k.direction = 0 === k.direction ? 1 : 0, k.progress = 0)
            }
            d && (this._viewer.model.setNodesColors(b), this._viewer.redraw());
            this._previousTime = c;
            this.start()
        };
        e.prototype.getDefaultColor1 = function() {
            return this._defaultColor1.copy()
        };
        e.prototype.getDefaultColor2 = function() {
            return this._defaultColor2.copy()
        };
        e.prototype.getDefaultPulseTime = function() {
            return this._defaultPulseTime
        };
        return e
    }();
e.PulseManager = l
})(Example || (Example = {}));
(function(e) {
(function(f) {
    var l = function(f) {
        function c(a, b, d, g) {
            a = f.call(this, "rightclick", a, b, d, g) || this;
            a._initEvents();
            return a
        }
        __extends(c, f);
        c.prototype._initEvents = function() {
            var a = this;
            this._viewer.setCallbacks({
                contextMenu: function(b, d) {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return this._modifiers = d, [4, this.doContext(b)];
                                case 1:
                                    return a.sent(), [2]
                            }
                        })
                    })
                }
            })
        };
        c.prototype.doContext = function(a) {
            return __awaiter(this, void 0, void 0,
                function() {
                    var b, d, g;
                    return __generator(this, function(c) {
                        switch (c.label) {
                            case 0:
                                return b = new e.PickConfig(e.SelectionMask.All), [4, this._viewer.view.pickFromPoint(a, b)];
                            case 1:
                                return d = c.sent(), d.isNodeSelection() && (g = this._viewer.model.getNodeType(d.getNodeId())), void 0 !== g && g !== e.NodeType.Pmi && g !== e.NodeType.PmiBody && 1 !== d.overlayIndex() ? [3, 3] : [4, this.setActiveItemId(null)];
                            case 2:
                                return c.sent(), [3, 5];
                            case 3:
                                return [4, this.setActiveItemId(d.getNodeId())];
                            case 4:
                                c.sent(), c.label = 5;
                            case 5:
                                return this._position =
                                    d.getPosition(), this.showElements(a), [2]
                        }
                    })
                })
        };
        c.prototype._onContextLayerClick = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(b) {
                    switch (b.label) {
                        case 0:
                            return 2 !== a.button ? [3, 2] : [4, this.doContext(new e.Point2(a.pageX, a.pageY))];
                        case 1:
                            return b.sent(), [3, 3];
                        case 2:
                            f.prototype._onContextLayerClick.call(this, a), b.label = 3;
                        case 3:
                            return [2]
                    }
                })
            })
        };
        return c
    }(f.Context.ContextMenu);
    f.RightClickContextMenu = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function() {
        function f(c, a) {
            var b = this;
            this._bottomLeftOffset = new e.Point2(10, 10);
            this._opacity = .5;
            this._spinnerImageUrl = "css/images/spinner.gif";
            this._spinnerSize = new e.Point2(31, 31);
            this._viewer = a;
            this._container = document.getElementById(c);
            this._initContainer();
            this._viewer.setCallbacks({
                streamingActivated: function() {
                    b._onStreamingActivated()
                },
                streamingDeactivated: function() {
                    b._onStreamingDeactivated()
                },
                _shutdownBegin: function() {
                    b._onStreamingDeactivated()
                }
            })
        }
        f.prototype.show =
            function() {
                this._container.style.display = "block"
            };
        f.prototype.hide = function() {
            this._container.style.display = "none"
        };
        f.prototype.setBottomLeftOffset = function(c) {
            this._bottomLeftOffset.assign(c);
            this._container.style.left = this._bottomLeftOffset.x + "px";
            this._container.style.bottom = this._bottomLeftOffset.y + "px"
        };
        f.prototype.getBottomLeftOffset = function() {
            return this._bottomLeftOffset.copy()
        };
        f.prototype.setSpinnerImage = function(c, a) {
            this._spinnerImageUrl = c;
            this._spinnerSize.assign(a);
            this._container.style.backgroundImage =
                "url(" + this._spinnerImageUrl + ")";
            this._container.style.width = this._spinnerSize.x + "px";
            this._container.style.height = this._spinnerSize.y + '"px'
        };
        f.prototype._initContainer = function() {
            this._container.style.position = "absolute";
            this._container.style.width = this._spinnerSize.x + "px";
            this._container.style.height = this._spinnerSize.y + "px";
            this._container.style.left = this._bottomLeftOffset.x + "px";
            this._container.style.bottom = this._bottomLeftOffset.y + "px";
            this._container.style.backgroundImage = "url(" + this._spinnerImageUrl +
                ")";
            this._container.style.opacity = "" + this._opacity
        };
        f.prototype._onStreamingActivated = function() {
            this.show()
        };
        f.prototype._onStreamingDeactivated = function() {
            this.hide()
        };
        return f
    }();
    f.StreamingIndicator = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    var f = function() {
        function e(c) {
            this._containerId = c;
            this._textDiv = e._createTextDiv();
            this._windowElement = e._createWindowElement();
            this._headerDiv = e._createHeaderDiv();
            this._initElements()
        }
        e._createWindowElement = function() {
            var c = document.createElement("div");
            c.classList.add("ui-timeout-window");
            c.classList.add("desktop-ui-window");
            return c
        };
        e._createHeaderDiv = function() {
            var c = document.createElement("div");
            c.classList.add("desktop-ui-window-header");
            return c
        };
        e._createTextDiv =
            function() {
                return document.createElement("div")
            };
        e.prototype._initElements = function() {
            var c = this,
                a = document.createElement("div");
            a.classList.add("desktop-ui-window-content");
            a.appendChild(this._textDiv);
            var b = document.createElement("div");
            b.classList.add("desktop-ui-window-divider");
            a.appendChild(b);
            b = document.createElement("button");
            b.innerHTML = "Ok";
            $(b).button().on("click", function() {
                c._onOkButtonClick()
            });
            a.appendChild(b);
            this._windowElement.appendChild(this._headerDiv);
            this._windowElement.appendChild(a);
            a = document.getElementById(this._containerId);
            null !== a && a.appendChild(this._windowElement)
        };
        e.prototype._onOkButtonClick = function() {
            this.hide()
        };
        e.prototype.show = function() {
            $(this._windowElement).show()
        };
        e.prototype.hide = function() {
            $(this._windowElement).hide()
        };
        e.prototype.setText = function(c) {
            $(this._textDiv).empty();
            this._textDiv.appendChild(document.createTextNode(c))
        };
        e.prototype.setTitle = function(c) {
            $(this._headerDiv).empty();
            this._headerDiv.appendChild(document.createTextNode(c))
        };
        return e
    }();
    e.UiDialog = f
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    var f = function(e) {
        function c(a, b) {
            var d = e.call(this, a) || this;
            d._viewer = b;
            d._viewer.setCallbacks({
                timeoutWarning: function() {
                    d._onTimeoutWarning()
                },
                timeout: function() {
                    d._onTimeout()
                }
            });
            d.setTitle("Timeout Warning");
            return d
        }
        __extends(c, e);
        c.prototype._onTimeoutWarning = function() {
            this.setText("Your session will expire soon. Press Ok to stay connected.");
            this.show()
        };
        c.prototype._onOkButtonClick = function() {
            this._viewer.resetClientTimeout();
            e.prototype._onOkButtonClick.call(this)
        };
        c.prototype._onTimeout = function() {
            this.setText("Your session has been disconnected due to inactivity.");
            this.show()
        };
        return c
    }(e.UiDialog);
    e.TimeoutWarningDialog = f
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function() {
        function h(c, a, b) {
            var d = this;
            void 0 === b && (b = e.ScreenConfiguration.Desktop);
            this._toolbarSelector = "#toolBar";
            this._screenElementSelector = "#content";
            this._cuttingPlaneXSelector = "#cuttingplane-x";
            this._cuttingPlaneYSelector = "#cuttingplane-y";
            this._cuttingPlaneZSelector = "#cuttingplane-z";
            this._cuttingPlaneFaceSelector = "#cuttingplane-face";
            this._cuttingPlaneVisibilitySelector = "#cuttingplane-section";
            this._cuttingPlaneGroupToggle = "#cuttingplane-toggle";
            this._cuttingPlaneResetSelector =
                "#cuttingplane-reset";
            this._selectedClass = "selected";
            this._disabledClass = "disabled";
            this._invertedClass = "inverted";
            this._submenuHeightOffset = 10;
            this._viewOrientationDuration = 500;
            this._activeSubmenu = null;
            this._actionsNullary = new Map;
            this._actionsBoolean = new Map;
            this._isInitialized = !1;
            this._viewer = c;
            this._noteTextManager = this._viewer.noteTextManager;
            this._screenConfiguration = b;
            this._cuttingPlaneController = a;
            this._viewerSettings = new f.Desktop.ViewerSettings(c);
            this._viewer.setCallbacks({
                selectionArray: function(b) {
                    0 <
                        b.length ? (b = b[b.length - 1].getSelection(), null !== b && b.isFaceSelection() && ($(d._cuttingPlaneFaceSelector).removeClass(d._disabledClass), $("#view-face").removeClass(d._disabledClass))) : ($(d._cuttingPlaneFaceSelector).addClass(d._disabledClass), $("#view-face").addClass(d._disabledClass))
                },
                cuttingSectionsLoaded: function() {
                    return d._cuttingPlaneController.onSectionsChanged().then(function() {
                        d._updateCuttingPlaneIcons()
                    })
                }
            })
        }
        h.prototype.init = function() {
            var c = this;
            this._isInitialized || (this._initIcons(),
                this._removeNonApplicableIcons(), $(".hoops-tool").on("click", function(a) {
                    a.preventDefault();
                    c._processButtonClick(a);
                    return !1
                }), $(".submenu-icon").on("click", function(a) {
                    a.preventDefault();
                    c._submenuIconClick(a.target);
                    return !1
                }), $(this._toolbarSelector).on("touchmove", function(a) {
                    a.originalEvent && a.originalEvent.preventDefault()
                }), $(this._toolbarSelector).on("mouseenter", function() {
                    c._mouseEnter()
                }), $(this._toolbarSelector).on("mouseleave", function() {
                    c._mouseLeave()
                }), $(".tool-icon, .submenu-icon").on("mouseenter",
                    function(a) {
                        c._mouseEnterItem(a)
                    }), $(".tool-icon, .submenu-icon").on("mouseleave", function(a) {
                    c._mouseLeaveItem(a)
                }), $(window).on("resize", function() {
                    c.reposition()
                }), $(this._toolbarSelector).on("click", function() {
                    null !== c._activeSubmenu && c._hideActiveSubmenu()
                }), $(".toolbar-cp-plane").on("click", function(a) {
                    return __awaiter(c, void 0, void 0, function() {
                        return __generator(this, function(b) {
                            switch (b.label) {
                                case 0:
                                    return [4, this._cuttingPlaneButtonClick(a)];
                                case 1:
                                    return b.sent(), [2]
                            }
                        })
                    })
                }), this._viewer.setCallbacks({
                    modelSwitched: function() {
                        c._hideActiveSubmenu()
                    }
                }),
                this._initSliders(), this._initActions(), this._initSnapshot(), this.updateEdgeFaceButton(), this.reposition(), this.show(), this._isInitialized = !0)
        };
        h.prototype._getViewerSettings = function() {
            return this._viewerSettings
        };
        h.prototype.disableSubmenuItem = function(c) {
            var a = this;
            "string" === typeof c ? $("#submenus .toolbar-" + c).addClass(this._disabledClass) : "object" === typeof c && $.each(c, function(b, d) {
                $("#submenus .toolbar-" + d).addClass(a._disabledClass)
            })
        };
        h.prototype.enableSubmenuItem = function(c) {
            var a = this;
            "string" ===
            typeof c ? $("#submenus .toolbar-" + c).removeClass(this._disabledClass) : "object" === typeof c && $.each(c, function(b, d) {
                $("#submenus .toolbar-" + d).removeClass(a._disabledClass)
            })
        };
        h.prototype.setCorrespondingButtonForSubmenuItem = function(c) {
            c = $("#submenus .toolbar-" + c);
            this._activateSubmenuItem(c)
        };
        h.prototype._mouseEnterItem = function(c) {
            c = $(c.target);
            c.hasClass(this._disabledClass) || c.addClass("hover")
        };
        h.prototype._mouseLeaveItem = function(c) {
            $(c.target).removeClass("hover")
        };
        h.prototype.show = function() {
            $(this._toolbarSelector).show()
        };
        h.prototype.hide = function() {
            $(this._toolbarSelector).hide()
        };
        h.prototype._initSliders = function() {
            var c = this;
            $("#explosion-slider").slider({
                orientation: "vertical",
                min: 0,
                max: 200,
                value: 0,
                slide: function(a, b) {
                    return __awaiter(c, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, this._onExplosionSlider((b.value || 0) / 100)];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                    })
                }
            })
        };
        h.prototype._mouseEnter = function() {
            if (null === this._activeSubmenu) {
                var c = $(this._toolbarSelector).find(".toolbar-tools");
                c.stop();
                c.css({
                    opacity: 1
                })
            }
        };
        h.prototype._mouseLeave = function() {
            null === this._activeSubmenu && $(".toolbar-tools").animate({
                opacity: .6
            }, 500, function() {})
        };
        h.prototype.reposition = function() {
            var c = $(this._toolbarSelector),
                a = $(this._screenElementSelector);
            if (void 0 !== c && void 0 !== a) {
                a = a.width();
                var b = c.width();
                void 0 !== b && void 0 !== a && c.css({
                    left: a / 2 - b / 2 + "px",
                    bottom: "15px"
                })
            }
        };
        h.prototype._processButtonClick = function(c) {
            if (null !== this._activeSubmenu) this._hideActiveSubmenu();
            else if (null !== c) {
                c = c.target;
                var a = $(c).closest(".hoops-tool");
                a.hasClass("toolbar-radio") ? a.hasClass("active-tool") ? this._showSubmenu(c) : ($(this._toolbarSelector).find(".active-tool").removeClass("active-tool"), a.addClass("active-tool"), this._performNullaryAction(a.data("operatorclass"))) : a.hasClass("toolbar-menu") ? this._showSubmenu(c) : a.hasClass("toolbar-menu-toggle") ? this._toggleMenuTool(a) : this._performNullaryAction(a.data("operatorclass"))
            }
        };
        h.prototype._toggleMenuTool = function(c) {
            var a = $("#" + c.data("submenu"));
            a.is(":visible") ?
                (a.hide(), this._performBooleanAction(c.data("operatorclass"), !1)) : (this._alignMenuToTool(a, c), this._performBooleanAction(c.data("operatorclass"), !0))
        };
        h.prototype._startModal = function() {
            var c = this;
            $("body").append("<div id='toolbar-modal' class='toolbar-modal-overlay'></div>");
            $("#toolbar-modal").on("click", function() {
                c._hideActiveSubmenu()
            })
        };
        h.prototype._alignMenuToTool = function(c, a) {
            a = a.position().left;
            this._screenConfiguration === e.ScreenConfiguration.Mobile && (a /= 1.74);
            var b = c.width(),
                d = c.height();
            void 0 !== b && void 0 !== d && c.css({
                display: "block",
                left: a - b / 2 + 20 + "px",
                top: -(this._submenuHeightOffset + d) + "px"
            })
        };
        h.prototype._showSubmenu = function(c) {
            this._hideActiveSubmenu();
            c = $(c).closest(".hoops-tool");
            var a = c.data("submenu");
            a && (a = $(this._toolbarSelector + " #submenus #" + a), a.hasClass(this._disabledClass) || (this._alignMenuToTool(a, c), this._activeSubmenu = a[0], this._startModal(), $(this._toolbarSelector).find(".toolbar-tools").css({
                opacity: .3
            })))
        };
        h.prototype._hideActiveSubmenu = function() {
            $("#toolbar-modal").remove();
            null !== this._activeSubmenu && ($(this._activeSubmenu).hide(), $(this._toolbarSelector).find(".toolbar-tools").css({
                opacity: 1
            }));
            this._activeSubmenu = null
        };
        h.prototype._activateSubmenuItem = function(c) {
            var a = c.closest(".toolbar-submenu"),
                b = c.data("operatorclass");
            if ("string" !== typeof b) throw new e.CommunicatorError("Invalid submenuItem.");
            a = $("#" + a.data("button"));
            var d = a.find(".tool-icon");
            d.length && (d.removeClass(a.data("operatorclass").toString()), d.addClass(b), a.data("operatorclass", b), c = c.attr("title"),
                void 0 !== c && a.attr("title", c));
            return b
        };
        h.prototype._submenuIconClick = function(c) {
            c = $(c);
            c.hasClass(this._disabledClass) || (c = this._activateSubmenuItem(c), this._hideActiveSubmenu(), this._performNullaryAction(c))
        };
        h.prototype._initIcons = function() {
            $(this._toolbarSelector).find(".hoops-tool").each(function() {
                var c = $(this);
                c.find(".tool-icon").addClass(c.data("operatorclass").toString())
            });
            $(this._toolbarSelector).find(".submenu-icon").each(function() {
                var c = $(this);
                c.addClass(c.data("operatorclass").toString())
            })
        };
        h.prototype._removeNonApplicableIcons = function() {
            this._screenConfiguration === e.ScreenConfiguration.Mobile && $("#snapshot-button").remove()
        };
        h.prototype.setSubmenuEnabled = function(c, a) {
            c = $("#" + c);
            var b = $("#" + c.data("submenu"));
            a ? (c.find(".smarrow").show(), b.removeClass(this._disabledClass)) : (c.find(".smarrow").hide(), b.addClass(this._disabledClass))
        };
        h.prototype._performNullaryAction = function(c) {
            (c = this._actionsNullary.get(c)) && c()
        };
        h.prototype._performBooleanAction = function(c, a) {
            (c = this._actionsBoolean.get(c)) &&
            c(a)
        };
        h.prototype._renderModeClick = function(c) {
            var a = this._viewer.view;
            switch (c) {
                case "toolbar-shaded":
                    a.setDrawMode(e.DrawMode.Shaded);
                    break;
                case "toolbar-wireframe":
                    a.setDrawMode(e.DrawMode.Wireframe);
                    break;
                case "toolbar-hidden-line":
                    a.setDrawMode(e.DrawMode.HiddenLine);
                    break;
                case "toolbar-xray":
                    a.setDrawMode(e.DrawMode.XRay);
                    break;
                default:
                case "toolbar-wireframeshaded":
                    a.setDrawMode(e.DrawMode.WireframeOnShaded)
            }
        };
        h.prototype._initSnapshot = function() {
            $("#snapshot-dialog-cancel-button").button().on("click",
                function() {
                    $("#snapshot-dialog").hide()
                })
        };
        h.prototype._doSnapshot = function() {
            return __awaiter(this, void 0, void 0, function() {
                var c, a, b, d, g, m, k, f, h, l, n, q;
                return __generator(this, function(w) {
                    switch (w.label) {
                        case 0:
                            c = this._viewer.view.getCanvasSize();
                            a = c.x / c.y;
                            b = 480;
                            d = a * b;
                            g = $("#content");
                            m = g.width();
                            k = g.height();
                            if (void 0 === k || void 0 === m) return [3, 2];
                            b = .7 * k;
                            d = .7 * m;
                            f = d + 40;
                            h = new e.SnapshotConfig(c.x, c.y);
                            return [4, this._viewer.takeSnapshot(h)];
                        case 1:
                            l = w.sent(), n = (m - d) / 2, q = $("#snapshot-dialog"), $("#snapshot-dialog-image").attr("src",
                                l.src).attr("width", f).attr("height", b + 40), q.css({
                                top: "45px",
                                left: n + "px"
                            }), q.show(), w.label = 2;
                        case 2:
                            return [2]
                    }
                })
            })
        };
        h.prototype._setRedlineOperator = function(c) {
            this._viewer.operatorManager.set(c, 1)
        };
        h.prototype._initActions = function() {
            var c = this,
                a = this._viewer.view,
                b = this._viewer.operatorManager;
            this._actionsNullary.set("toolbar-home", function() {
                c._viewer.reset();
                if (!c._viewer.sheetManager.isDrawingSheetActive()) {
                    c._noteTextManager.setIsolateActive(!1);
                    c._noteTextManager.updatePinVisibility();
                    var d =
                        b.getOperator(e.OperatorId.Handle);
                    null !== d && d.removeHandles && d.removeHandles()
                }
            });
            this._actionsNullary.set("toolbar-redline-circle", function() {
                c._setRedlineOperator(e.OperatorId.RedlineCircle)
            });
            this._actionsNullary.set("toolbar-redline-freehand", function() {
                c._setRedlineOperator(e.OperatorId.RedlinePolyline)
            });
            this._actionsNullary.set("toolbar-redline-rectangle", function() {
                c._setRedlineOperator(e.OperatorId.RedlineRectangle)
            });
            this._actionsNullary.set("toolbar-redline-note", function() {
                c._setRedlineOperator(e.OperatorId.RedlineText)
            });
            this._actionsNullary.set("toolbar-note", function() {
                b.set(e.OperatorId.Note, 1)
            });
            this._actionsNullary.set("toolbar-select", function() {
                b.set(e.OperatorId.Select, 1)
            });
            this._actionsNullary.set("toolbar-area-select", function() {
                b.set(e.OperatorId.AreaSelect, 1)
            });
            this._actionsNullary.set("toolbar-orbit", function() {
                b.set(e.OperatorId.Navigate, 0)
            });
            this._actionsNullary.set("toolbar-turntable", function() {
                b.set(e.OperatorId.Turntable, 0)
            });
            this._actionsNullary.set("toolbar-walk", function() {
                b.set(e.OperatorId.WalkMode,
                    0)
            });
            this._actionsNullary.set("toolbar-face", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, this._orientToFace()];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-measure-point", function() {
                b.set(e.OperatorId.MeasurePointPointDistance, 1)
            });
            this._actionsNullary.set("toolbar-measure-edge", function() {
                b.set(e.OperatorId.MeasureEdgeLength, 1)
            });
            this._actionsNullary.set("toolbar-measure-distance", function() {
                b.set(e.OperatorId.MeasureFaceFaceDistance,
                    1)
            });
            this._actionsNullary.set("toolbar-measure-angle", function() {
                b.set(e.OperatorId.MeasureFaceFaceAngle, 1)
            });
            this._actionsNullary.set("toolbar-cuttingplane", function() {});
            this._actionsBoolean.set("toolbar-explode", function(d) {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                return [4, this._explosionButtonClick(d)];
                            case 1:
                                return b.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-settings", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this,
                        function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, this._settingsButtonClick()];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                })
            });
            this._actionsNullary.set("toolbar-wireframeshaded", function() {
                c._renderModeClick("toolbar-wireframeshaded")
            });
            this._actionsNullary.set("toolbar-shaded", function() {
                c._renderModeClick("toolbar-shaded")
            });
            this._actionsNullary.set("toolbar-wireframe", function() {
                c._renderModeClick("toolbar-wireframe")
            });
            this._actionsNullary.set("toolbar-hidden-line", function() {
                c._renderModeClick("toolbar-hidden-line")
            });
            this._actionsNullary.set("toolbar-xray", function() {
                c._renderModeClick("toolbar-xray")
            });
            this._actionsNullary.set("toolbar-front", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, a.setViewOrientation(e.ViewOrientation.Front, this._viewOrientationDuration)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-back", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4,
                                    a.setViewOrientation(e.ViewOrientation.Back, this._viewOrientationDuration)
                                ];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-left", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, a.setViewOrientation(e.ViewOrientation.Left, this._viewOrientationDuration)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-right", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this,
                        function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, a.setViewOrientation(e.ViewOrientation.Right, this._viewOrientationDuration)];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                })
            });
            this._actionsNullary.set("toolbar-bottom", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, a.setViewOrientation(e.ViewOrientation.Bottom, this._viewOrientationDuration)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-top", function() {
                return __awaiter(c,
                    void 0, void 0,
                    function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, a.setViewOrientation(e.ViewOrientation.Top, this._viewOrientationDuration)];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                    })
            });
            this._actionsNullary.set("toolbar-iso", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, a.setViewOrientation(e.ViewOrientation.Iso, this._viewOrientationDuration)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            });
            this._actionsNullary.set("toolbar-ortho",
                function() {
                    a.setProjectionMode(e.Projection.Orthographic)
                });
            this._actionsNullary.set("toolbar-persp", function() {
                a.setProjectionMode(e.Projection.Perspective)
            });
            this._actionsNullary.set("toolbar-snapshot", function() {
                return __awaiter(c, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return [4, this._doSnapshot()];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            })
        };
        h.prototype._onExplosionSlider = function(c) {
            return this._viewer.explodeManager.setMagnitude(c)
        };
        h.prototype._explosionButtonClick =
            function(c) {
                var a = this._viewer.explodeManager;
                return c && !a.getActive() ? a.start() : Promise.resolve()
            };
        h.prototype._settingsButtonClick = function() {
            return this._viewerSettings.show()
        };
        h.prototype.updateEdgeFaceButton = function() {
            var c = this._viewer.view,
                a = c.getLineVisibility();
            c = c.getFaceVisibility();
            a && c ? this.setCorrespondingButtonForSubmenuItem("wireframeshaded") : !a && c ? this.setCorrespondingButtonForSubmenuItem("shaded") : this.setCorrespondingButtonForSubmenuItem("wireframe")
        };
        h.prototype._cuttingPlaneButtonClick =
            function(c) {
                var a = this;
                c = $(c.target).closest(".toolbar-cp-plane").data("plane");
                var b = this._getAxis(c);
                return (null !== b ? this._cuttingPlaneController.toggle(b) : "section" === c ? this._cuttingPlaneController.toggleReferenceGeometry() : "toggle" === c ? this._cuttingPlaneController.toggleCuttingMode() : "reset" === c ? this._cuttingPlaneController.resetCuttingPlanes() : Promise.resolve()).then(function() {
                    a._updateCuttingPlaneIcons()
                })
            };
        h.prototype._getAxis = function(c) {
            switch (c) {
                case "x":
                    return 0;
                case "y":
                    return 1;
                case "z":
                    return 2;
                case "face":
                    return 3;
                default:
                    return null
            }
        };
        h.prototype._updateCuttingPlaneIcons = function() {
            var c = this._cuttingPlaneController.getReferenceGeometryEnabled(),
                a = this._cuttingPlaneController.individualCuttingSectionEnabled,
                b = this._cuttingPlaneController.getCount();
            this._updateCuttingPlaneIcon(0, this._cuttingPlaneXSelector);
            this._updateCuttingPlaneIcon(1, this._cuttingPlaneYSelector);
            this._updateCuttingPlaneIcon(2, this._cuttingPlaneZSelector);
            this._updateCuttingPlaneIcon(3, this._cuttingPlaneFaceSelector);
            a ? $(this._cuttingPlaneGroupToggle).removeClass(this._selectedClass) : $(this._cuttingPlaneGroupToggle).addClass(this._selectedClass);
            0 < b ? (c ? $(this._cuttingPlaneVisibilitySelector).removeClass(this._selectedClass) : $(this._cuttingPlaneVisibilitySelector).addClass(this._selectedClass), $(this._cuttingPlaneVisibilitySelector).removeClass(this._disabledClass), $(this._cuttingPlaneResetSelector).removeClass(this._disabledClass)) : ($(this._cuttingPlaneVisibilitySelector).addClass(this._disabledClass), $(this._cuttingPlaneResetSelector).addClass(this._disabledClass));
            1 < b ? $(this._cuttingPlaneGroupToggle).removeClass(this._disabledClass) : $(this._cuttingPlaneGroupToggle).addClass(this._disabledClass)
        };
        h.prototype._updateCuttingPlaneIcon = function(c, a) {
            a = $(a);
            a.removeClass(this._selectedClass);
            a.removeClass(this._invertedClass);
            c = this._cuttingPlaneController.getPlaneStatus(c);
            1 === c ? a.addClass(this._selectedClass) : 2 === c && a.addClass(this._invertedClass)
        };
        h.prototype._orientToFace = function() {
            var c = this._viewer.selectionManager.getLast();
            if (null !== c && c.isFaceSelection()) {
                var a =
                    this._viewer.view,
                    b = c.getFaceEntity().getNormal(),
                    d = c.getPosition(),
                    g = a.getCamera(),
                    m = e.Point3.cross(b, new e.Point3(0, 1, 0));
                .001 > m.length() && (m = e.Point3.cross(b, new e.Point3(1, 0, 0)));
                var k = g.getPosition().subtract(g.getTarget()).length();
                g.setTarget(d);
                g.setPosition(e.Point3.add(d, e.Point3.scale(b, k)));
                g.setUp(m);
                return a.fitBounding(c.getFaceEntity().getBounding(), e.DefaultTransitionDuration, g)
            }
            return Promise.resolve()
        };
        return h
    }();
    f.Toolbar = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function() {
        function h(c, a) {
            this._colorPickerId = "colorPicker";
            this._colorPickerHeaderId = "colorPickerHeader";
            this._colorPickerFooterId = "colorPickerFooter";
            this._colorPickerOkId = "colorPickerOk";
            this._colorPickerCancelId = "colorPickerCancel";
            this._colorPickerApplyId = "colorPickerApply";
            this._colorPickerInputId = "colorPickerInput";
            this._colorPickerActiveColorId = "colorPickerActiveColor";
            this._colorPickerActiveColorLabelId = "colorPickerActiveColorLabel";
            this._colorPickerActiveColorSwatchId =
                "colorPickerActiveColorSwatch";
            this._color = e.Color.black();
            this._viewer = c;
            this._colorPicker = this._createColorPickerWindow(a);
            this._initElements()
        }
        h.prototype._createColorPickerWindow = function(c) {
            var a = document.createElement("div");
            a.id = this._colorPickerId;
            a.classList.add("desktop-ui-window");
            var b = document.createElement("div");
            b.id = this._colorPickerHeaderId;
            b.classList.add("desktop-ui-window-header");
            b.innerHTML = "Color Picker";
            var d = document.createElement("div");
            d.classList.add("desktop-ui-window-content");
            var g = document.createElement("div");
            g.id = this._colorPickerActiveColorId;
            d.appendChild(g);
            var m = document.createElement("span");
            m.id = this._colorPickerActiveColorLabelId;
            m.innerHTML = "Active Color:";
            g.appendChild(m);
            m = document.createElement("span");
            m.id = this._colorPickerActiveColorSwatchId;
            m.style.backgroundColor = f.cssHexStringFromColor(this._color);
            g.appendChild(m);
            g = document.createElement("input");
            g.id = this._colorPickerInputId;
            g.type = "text";
            g.classList.add("color-picker");
            d.appendChild(g);
            m = document.createElement("div");
            m.id = this._colorPickerFooterId;
            m.classList.add("desktop-ui-window-footer");
            var k = document.createElement("button");
            k.id = this._colorPickerOkId;
            k.innerHTML = "Ok";
            m.appendChild(k);
            k = document.createElement("button");
            k.id = this._colorPickerCancelId;
            k.innerHTML = "Cancel";
            m.appendChild(k);
            k = document.createElement("button");
            k.id = this._colorPickerApplyId;
            k.innerHTML = "Apply";
            m.appendChild(k);
            a.appendChild(b);
            a.appendChild(d);
            a.appendChild(m);
            $("#" + c).append(a);
            $(g).minicolors({
                position: "bottom left",
                format: "rgb",
                control: "hue",
                defaultValue: f.rgbStringFromColor(this._color),
                inline: !0
            });
            return $(a)
        };
        h.prototype._initElements = function() {
            var c = this;
            this._colorPicker.draggable({
                handle: "#" + this._colorPickerHeaderId
            });
            $("#" + this._colorPickerOkId).on("click", function() {
                c._updateColor();
                c.hide()
            });
            $("#" + this._colorPickerCancelId).on("click", function() {
                c.hide()
            });
            $("#" + this._colorPickerApplyId).on("click", function() {
                c._updateColor()
            })
        };
        h.prototype._updateColor = function() {
            this._color.assign(f.colorFromRgbString(f.getValueAsString("#" +
                this._colorPickerInputId)));
            $("#" + this._colorPickerActiveColorSwatchId).css("background", f.cssHexStringFromColor(this._color))
        };
        h.prototype.show = function() {
            f.centerWindow(this._colorPickerId, this._viewer.view.getCanvasSize());
            this._colorPicker.show()
        };
        h.prototype.hide = function() {
            this._colorPicker.hide()
        };
        h.prototype.getColor = function() {
            return this._color.copy()
        };
        return h
    }();
    f.ColorPicker = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(l) {
        var h;
        (function(a) {
            a[a.Model = 0] = "Model";
            a[a.CadView = 1] = "CadView";
            a[a.Sheets = 2] = "Sheets";
            a[a.Configurations = 3] = "Configurations";
            a[a.Layers = 4] = "Layers";
            a[a.Filters = 5] = "Filters";
            a[a.Types = 6] = "Types";
            a[a.BCF = 7] = "BCF";
            a[a.Relationships = 8] = "Relationships"
        })(h = l.Tree || (l.Tree = {}));
        var c = function() {
            function a(b, d, a, c, k) {
                var g = this;
                this._treeMap = new Map;
                this._scrollTreeMap = new Map;
                this._elementIdMap = new Map;
                this._browserWindowMargin = 3;
                this._scrollRefreshTimer = new e.Util.Timer;
                this._scrollRefreshTimestamp = 0;
                this._scrollRefreshInterval = 300;
                this._minimized = !0;
                this._modelHasRelationships = !1;
                this._elementId = b;
                this._containerId = d;
                this._viewer = a;
                this._isolateZoomHelper = c;
                this._colorPicker = k;
                this._canvasSize = this._viewer.view.getCanvasSize();
                this._header = this._createHeader();
                this._browserWindow = this._createBrowserWindow();
                this._createPropertyWindow();
                $(this._browserWindow).resizable({
                    resize: function(d, b) {
                        g.onResize(b.size.height)
                    },
                    minWidth: 35,
                    minHeight: 37,
                    handles: "e"
                });
                this._elementIdMap.set(h.Model,
                    "modelTree");
                this._elementIdMap.set(h.CadView, "cadViewTree");
                this._elementIdMap.set(h.Sheets, "sheetsTree");
                this._elementIdMap.set(h.Configurations, "configurationsTree");
                this._elementIdMap.set(h.Layers, "layersTree");
                this._elementIdMap.set(h.Filters, "filtersTree");
                this._elementIdMap.set(h.Types, "typesTree");
                this._elementIdMap.set(h.BCF, "bcfTree");
                this._elementIdMap.forEach(function(d, b) {
                    g._addTree(d, b)
                });
                this._contextMenu = new l.ModelBrowserContextMenu(this._containerId, this._viewer, this._treeMap, this._isolateZoomHelper,
                    this._colorPicker);
                this._initEvents();
                this._minimizeModelBrowser()
            }
            a.prototype._computeRelationshipTreeVisibility = function(b) {
                for (var d = 0; d < b.length; d++) {
                    var a = b[d];
                    a = this._viewer.model._getModelStructure().hasRelationships(a);
                    if (!this._modelHasRelationships && a) {
                        this._modelHasRelationships = !0;
                        this._updateRelationshipsTreeVisibility();
                        break
                    }
                }
            };
            a.prototype._initEvents = function() {
                var b = this,
                    d = function(d) {
                        b._showTree(h.Model);
                        b._computeRelationshipTreeVisibility(d)
                    };
                this._viewer.setCallbacks({
                    modelStructureLoadBegin: function() {
                        b._onModelStructureLoadBegin()
                    },
                    modelStructureParseBegin: function() {
                        b._onModelStructureParsingBegin()
                    },
                    assemblyTreeReady: function() {
                        b._onAssemblyTreeReady()
                    },
                    firstModelLoaded: d,
                    modelSwitched: function(b, a) {
                        d(a)
                    },
                    frameDrawn: function() {
                        b._canvasSize = b._viewer.view.getCanvasSize();
                        b.onResize(b._canvasSize.y)
                    },
                    subtreeLoaded: function(d) {
                        b._computeRelationshipTreeVisibility(d)
                    }
                });
                this._registerScrollRefreshCallbacks();
                $("#contextMenuButton").on("click", function(d) {
                    d = new e.Point2(d.clientX, d.clientY);
                    b._viewer.trigger("contextMenu", d, e.KeyModifiers.None)
                })
            };
            a.prototype._registerScrollRefreshCallbacks = function() {
                var b = this;
                this._treeMap.forEach(function(d) {
                    d instanceof f.ViewTree && (d.registerCallback("expand", function() {
                        b._refreshBrowserScroll()
                    }), d.registerCallback("collapse", function() {
                        b._refreshBrowserScroll()
                    }), d.registerCallback("addChild", function() {
                        b._refreshBrowserScroll()
                    }))
                });
                this._relationshipTree.registerCallback("expand", function() {
                    b._refreshBrowserScroll()
                });
                this._relationshipTree.registerCallback("collapse", function() {
                    b._refreshBrowserScroll()
                });
                this._relationshipTree.registerCallback("addChild", function() {
                    b._refreshBrowserScroll()
                })
            };
            a.prototype._refreshBrowserScroll = function() {
                var b = this,
                    d = ++this._scrollRefreshTimestamp;
                this._scrollRefreshTimer.isIdle(0) && this._scrollRefreshTimer.set(this._scrollRefreshInterval, function() {
                    b._scrollTreeMap.forEach(function(d) {
                        d.refresh()
                    });
                    d !== b._scrollRefreshTimestamp && b._refreshBrowserScroll()
                })
            };
            a.prototype._setPropertyWindowVisibility = function(b) {
                b ? this._propertyWindow.classList.remove("hidden") : this._propertyWindow.classList.add("hidden");
                this.onResize(this._viewer.view.getCanvasSize().y)
            };
            a.prototype._updateRelationshipsTreeVisibility = function() {
                this._setRelationshipsWindowVisibility(this._modelHasRelationships)
            };
            a.prototype._setRelationshipsWindowVisibility = function(b) {
                b ? this._relationshipsWindow.classList.remove("hidden") : this._relationshipsWindow.classList.add("hidden");
                this.onResize(this._viewer.view.getCanvasSize().y)
            };
            a.prototype._setTreeVisibility = function(b, d) {
                var a = b.getElementId(),
                    c = $("#" + a + "ScrollContainer");
                a = $("#" + a +
                    "Tab");
                d ? (c.show(), a.addClass("browser-tab-selected"), b instanceof f.BCFTree ? (this._setPropertyWindowVisibility(!1), this._setRelationshipsWindowVisibility(!1)) : (this._setPropertyWindowVisibility(!0), this._updateRelationshipsTreeVisibility())) : (c.hide(), a && a.removeClass("browser-tab-selected"))
            };
            a.prototype._showTree = function(b) {
                var d = this;
                this._treeMap.forEach(function(a, c) {
                    d._setTreeVisibility(a, c === b)
                });
                this._refreshBrowserScroll()
            };
            a.prototype._getContextMenu = function() {
                return this._contextMenu
            };
            a.prototype._addTree = function(b, d) {
                var a = this._initializeIScroll(b);
                this._scrollTreeMap.set(d, a);
                var c;
                d === h.Model ? c = new f.ModelTree(this._viewer, b, a) : d === h.CadView ? c = new f.CadViewTree(this._viewer, b, a) : d === h.Sheets ? c = new f.SheetsTree(this._viewer, b, a) : d === h.Configurations ? c = new f.ConfigurationsTree(this._viewer, b, a) : d === h.Layers ? c = new f.LayersTree(this._viewer, b, a) : d === h.Filters ? c = new f.FiltersTree(this._viewer, b, a) : d === h.Types ? c = new f.TypesTree(this._viewer, b, a) : d === h.BCF ? c = new f.BCFTree(this._viewer,
                    b, a) : d === h.Relationships ? c = new f.RelationshipsTree(this._viewer, b, a) : e.Util.TypeAssertNever(d);
                this._treeMap.set(d, c)
            };
            a.prototype._createBrowserWindow = function() {
                var b = document.getElementById(this._elementId);
                $(b).on("touchmove", function(d) {
                    d.originalEvent && d.originalEvent.preventDefault()
                });
                b.classList.add("ui-modelbrowser-window");
                b.classList.add("desktop-ui-window");
                b.classList.add("ui-modelbrowser-small");
                b.style.position = "absolute";
                var d = $(window).width();
                void 0 !== d && (b.style.width = Math.max(d /
                    4, 400) + "px");
                b.style.top = this._browserWindowMargin + "px";
                b.style.left = this._browserWindowMargin + "px";
                b.appendChild(this._header);
                return b
            };
            a.prototype._createDiv = function(b, d) {
                var a = document.createElement("div");
                a.id = b;
                for (b = 0; b < d.length; b++) a.classList.add(d[b]);
                return a
            };
            a.prototype._createHeader = function() {
                var b = this,
                    d = this._createDiv("ui-modelbrowser-header", ["ui-modelbrowser-header", "desktop-ui-window-header"]),
                    a = document.createElement("table"),
                    c = document.createElement("tr");
                a.appendChild(c);
                var k = document.createElement("td");
                k.classList.add("ui-modelbrowser-minimizetd");
                this._minimizeButton = this._createDiv("ui-modelbrowser-minimizebutton", ["ui-modelbrowser-minimizebutton", "minimized"]);
                this._minimizeButton.onclick = function() {
                    b._onMinimizeButtonClick()
                };
                k.appendChild(this._minimizeButton);
                c.appendChild(k);
                k = document.createElement("td");
                k.id = "modelBrowserLabel";
                k.innerHTML = "";
                c.appendChild(k);
                k = this._createDiv("contextMenuButton", ["ui-modeltree-icon", "menu"]);
                c.appendChild(k);
                d.appendChild(a);
                this._content = this._createDiv("modelTreeContainer", ["ui-modelbrowser-content", "desktop-ui-window-content"]);
                this._content.style.overflow = "auto";
                a = this._createDiv("modelBrowserLoadingDiv", []);
                a.innerHTML = "Loading...";
                this._content.appendChild(a);
                this._createIScrollWrapper(this._content, "modelTree");
                this._createIScrollWrapper(this._content, "cadViewTree");
                this._createIScrollWrapper(this._content, "sheetsTree");
                this._createIScrollWrapper(this._content, "configurationsTree");
                this._createIScrollWrapper(this._content,
                    "layersTree");
                this._createIScrollWrapper(this._content, "filtersTree");
                this._createIScrollWrapper(this._content, "typesTree");
                this._createIScrollWrapper(this._content, "bcfTree");
                this._modelBrowserTabs = this._createDiv("modelBrowserTabs", []);
                this._createBrowserTab("modelTreeTab", "Model Tree", !0, h.Model);
                this._createBrowserTab("cadViewTreeTab", "Views", !1, h.CadView);
                this._createBrowserTab("sheetsTreeTab", "Sheets", !1, h.Sheets);
                this._createBrowserTab("configurationsTreeTab", "Configurations", !1, h.Configurations);
                this._createBrowserTab("layersTreeTab", "Layers", !1, h.Layers);
                this._createBrowserTab("relationTreeTab", "Relations", !1, h.Relationships);
                this._createBrowserTab("filtersTreeTab", "Filters", !1, h.Filters);
                this._createBrowserTab("typesTreeTab", "Types", !1, h.Types);
                this._createBrowserTab("bcfTreeTab", "BCF", !1, h.BCF);
                d.appendChild(this._modelBrowserTabs);
                return d
            };
            a.prototype._createIScrollWrapper = function(b, d) {
                var a = this._createDiv(d + "ScrollContainer", []);
                a.classList.add("tree-scroll-container");
                a.appendChild(this._createDiv(d,
                    []));
                b.appendChild(a)
            };
            a.prototype._createBrowserTab = function(b, d, a, c) {
                var g = this,
                    m = document.createElement("label");
                m.id = b;
                m.textContent = d;
                m.classList.add("ui-modelbrowser-tab");
                m.classList.add("hidden");
                a && m.classList.add("browser-tab-selected");
                m.onclick = function(d) {
                    g._showTree(c)
                };
                this._modelBrowserTabs.appendChild(m);
                return m
            };
            a.prototype._initializeIScroll = function(b) {
                b = $("#" + b + "ScrollContainer").get(0);
                return new IScroll(b, {
                    mouseWheel: !0,
                    scrollbars: !0,
                    interactiveScrollbars: !0,
                    preventDefault: !1
                })
            };
            a.prototype._createRelationshipTree = function(b) {
                this._createIScrollWrapper(b, "relationshipsTree");
                b = this._initializeIScroll("relationshipsTree");
                this._scrollTreeMap.set(h.Relationships, b);
                b = new f.RelationshipsTree(this._viewer, "relationshipsTree", b);
                this._setTreeVisibility(b, !0);
                return b
            };
            a.prototype._createPropertyWindow = function() {
                var b = this;
                this._propertyWindow = document.createElement("div");
                this._propertyWindow.classList.add("propertyWindow");
                this._propertyWindow.id = "propertyWindow";
                var d = document.createElement("div");
                d.id = "propertyContainer";
                this._propertyWindow.appendChild(d);
                this._treePropertyContainer = document.createElement("div");
                this._treePropertyContainer.id = "treePropertyContainer";
                this._relationshipsWindow = document.createElement("div");
                this._relationshipsWindow.classList.add("relationshipsWindow", "hidden");
                this._relationshipsWindow.id = "relationshipsWindow";
                this._treePropertyContainer.appendChild(this._content);
                this._treePropertyContainer.appendChild(this._relationshipsWindow);
                this._treePropertyContainer.appendChild(this._propertyWindow);
                this._browserWindow.appendChild(this._treePropertyContainer);
                this._relationshipTree = this._createRelationshipTree(this._relationshipsWindow);
                $(this._propertyWindow).resizable({
                    resize: function() {
                        b.onResizeElement(b._viewer.view.getCanvasSize().y, b._relationshipsWindow)
                    },
                    handles: "n"
                });
                $(this._relationshipsWindow).resizable({
                    resize: function() {
                        b.onResizeElement(b._viewer.view.getCanvasSize().y, b._content)
                    },
                    handles: "n"
                })
            };
            a.prototype._onMinimizeButtonClick = function() {
                this._minimized ? this._maximizeModelBrowser() :
                    this._minimizeModelBrowser()
            };
            a.prototype._maximizeModelBrowser = function() {
                var b = this;
                this._minimized = !1;
                this.freeze(!1);
                var d = jQuery(this._minimizeButton);
                d.addClass("maximized");
                d.removeClass("minimized");
                jQuery(this._content).slideDown({
                    progress: function() {
                        b._onSlide();
                        $("#modelBrowserWindow").removeClass("ui-modelbrowser-small")
                    },
                    complete: function() {
                        $(b._browserWindow).children(".ui-resizable-handle").show()
                    },
                    duration: f.DefaultUiTransitionDuration
                });
                this._refreshBrowserScroll()
            };
            a.prototype._minimizeModelBrowser =
                function() {
                    var b = this;
                    this._minimized = !0;
                    this.freeze(!0);
                    var d = jQuery(this._minimizeButton);
                    d.removeClass("maximized");
                    d.addClass("minimized");
                    jQuery(this._content).slideUp({
                        progress: function() {
                            b._onSlide();
                            $("#modelBrowserWindow").addClass("ui-modelbrowser-small")
                        },
                        complete: function() {
                            $(b._browserWindow).children(".ui-resizable-handle").hide()
                        },
                        duration: f.DefaultUiTransitionDuration
                    });
                    this._refreshBrowserScroll()
                };
            a.prototype.onResize = function(b) {
                var d = $(this._header).outerHeight(),
                    a = $(this._propertyWindow).outerHeight(),
                    c = $(this._relationshipsWindow).outerHeight();
                void 0 !== d && void 0 !== a && void 0 !== c && (this._treePropertyContainer.style.height = b - d - 2 * this._browserWindowMargin + "px", d = b - d - a - c - 2 * this._browserWindowMargin, this._browserWindow.style.height = b - 2 * this._browserWindowMargin + "px", this._content.style.height = d + "px", this._refreshBrowserScroll())
            };
            a.prototype.onResizeElement = function(b, d) {
                var a = $(this._header).outerHeight(),
                    c = $(this._content).outerHeight(),
                    k = $(this._propertyWindow).outerHeight(),
                    e = $(this._relationshipsWindow).outerHeight();
                $(d).hasClass("hidden") && (d = this._content);
                var f = $(d).outerHeight(),
                    h = $(d).height();
                void 0 !== a && void 0 !== k && void 0 !== e && void 0 !== c && void 0 !== f && void 0 !== h && (this._treePropertyContainer.style.height = b - a - 2 * this._browserWindowMargin + "px", a = b - a - k - e - c + f - 2 * this._browserWindowMargin - (f - h), 0 > a && (a = 0), this._browserWindow.style.height = b - 2 * this._browserWindowMargin + "px", d.style.height = a + "px", this._refreshBrowserScroll())
            };
            a.prototype._onSlide = function() {
                var b = $(this._header).outerHeight(),
                    d = $(this._content).outerHeight(),
                    a = $(this._propertyWindow).outerHeight(),
                    c = $(this._relationshipsWindow).outerHeight();
                void 0 !== b && void 0 !== d && void 0 !== a && void 0 !== c && (this._browserWindow.style.height = d + b + a + c + "px")
            };
            a.prototype._onModelStructureParsingBegin = function() {
                $("#modelBrowserLoadingDiv").html("Parsing...")
            };
            a.prototype._onModelStructureLoadBegin = function() {
                $("#" + this._elementId).show()
            };
            a.prototype._onAssemblyTreeReady = function() {
                $("#modelBrowserLoadingDiv").remove();
                this._showTree(h.Model);
                var b = $(this._elementId).height();
                if (void 0 !== b) this.onResize(b)
            };
            a.prototype.freeze = function(b) {
                this._getTree(h.Model).freezeExpansion(b)
            };
            a.prototype.enablePartSelection = function(b) {
                this._getTree(h.Model).enablePartSelection(b)
            };
            a.prototype.updateSelection = function(b) {
                this._getTree(h.Model).updateSelection(b)
            };
            a.prototype._getTree = function(b) {
                return this._treeMap.get(b)
            };
            return a
        }();
        l.ModelBrowser = c
    })(f.Desktop || (f.Desktop = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
var __assign = this && this.__assign || function() {
__assign = Object.assign || function(e) {
    for (var f, l = 1, h = arguments.length; l < h; l++) {
        f = arguments[l];
        for (var c in f) Object.prototype.hasOwnProperty.call(f, c) && (e[c] = f[c])
    }
    return e
};
return __assign.apply(this, arguments)
};
(function(e) {
(function(f) {
    (function(l) {
        var h;
        (function(a) {
            a[a.Generic = 0] = "Generic";
            a[a.Bim = 1] = "Bim";
            a[a.Drawing = 2] = "Drawing"
        })(h || (h = {}));
        var c = function() {
            function a(b, d) {
                var a = this;
                this._toolbar = this._modelBrowser = null;
                this._modelType = h.Generic;
                this._uiModelType = null;
                this._suppressMissingModelDialog = !1;
                this._viewer = b;
                this._params = __assign({}, d);
                if (void 0 === this._params.containerId) throw new e.ParseError("Must supply 'containerId'.");
                this._colorPicker = new f.ColorPicker(this._viewer, this._params.containerId);
                d = this._getWithDefault(this._params.screenConfiguration, e.ScreenConfiguration.Desktop);
                b = this._getWithDefault(this._params.showModelBrowser, !0);
                var c = this._getWithDefault(this._params.showToolbar, !0);
                if (d === e.ScreenConfiguration.Mobile) {
                    var k = this._viewer.view,
                        w = k.getAxisTriad();
                    k = k.getNavCube();
                    w.setAnchor(e.OverlayAnchor.UpperRightCorner);
                    k.setAnchor(e.OverlayAnchor.UpperLeftCorner);
                    $("body").addClass("mobile");
                    (w = this._viewer.operatorManager.getOperator(e.OperatorId.Handle)) && w.setHandleSize(3)
                }
                this._cuttingPlaneController =
                    new f.CuttingPlane.Controller(this._viewer);
                this._isolateZoomHelper = new e.IsolateZoomHelper(this._viewer);
                c && (this._toolbar = new f.Toolbar(this._viewer, this._cuttingPlaneController, d), this._toolbar.init());
                d = document.getElementById("content");
                d.oncontextmenu = function() {
                    return !1
                };
                b && (b = document.createElement("div"), b.id = "modelBrowserWindow", d.appendChild(b), this._modelBrowser = new l.ModelBrowser(b.id, d.id, this._viewer, this._isolateZoomHelper, this._colorPicker));
                new l.PropertyWindow(this._viewer);
                b = document.createElement("div");
                b.id = "streamingIndicator";
                d.appendChild(b);
                this._viewer.getRendererType() === e.RendererType.Client && new f.StreamingIndicator(b.id, this._viewer);
                this._contextMenu = new f.RightClickContextMenu(d.id, this._viewer, this._isolateZoomHelper, this._colorPicker);
                new f.TimeoutWarningDialog(d.id, this._viewer);
                this._viewer.setCallbacks({
                    sceneReady: function() {
                        a._onSceneReady()
                    },
                    firstModelLoaded: function(d) {
                        a._modelType = a._determineModelType(d);
                        a._configureUi(a._modelType)
                    },
                    modelSwitched: function(d) {
                        d && (a._modelType =
                            h.Generic, a._configureUi(a._modelType))
                    },
                    sheetActivated: function() {
                        a._configureUi(h.Drawing)
                    },
                    sheetDeactivated: function() {
                        a._configureUi(a._modelType)
                    },
                    modelLoadFailure: function(d, b) {
                        if (!a._suppressMissingModelDialog) {
                            var c = new f.UiDialog("content");
                            c.setTitle("Model Load Error");
                            var g = "Unable to load ";
                            c.setText((d ? g + ("'" + d + "'") : g + "model") + (": " + b));
                            c.show()
                        }
                    },
                    modelLoadBegin: function() {
                        a._suppressMissingModelDialog = !1
                    },
                    missingModel: function(d) {
                        if (!a._suppressMissingModelDialog) {
                            a._suppressMissingModelDialog = !0;
                            var b = new f.UiDialog("content");
                            b.setTitle("Missing Model Error");
                            b.setText("Unable to load '" + (d + "'"));
                            b.show()
                        }
                    },
                    webGlContextLost: function() {
                        var d = new f.UiDialog("content");
                        d.setTitle("Fatal Error");
                        d.setText("WebGL context lost. Rendering cannot continue.");
                        d.show()
                    },
                    XHRonloadend: function(d, b, a) {
                        404 === b && (d = new f.UiDialog("content"), d.setTitle("404 Error"), d.setText("Unable to load " + a), d.show())
                    },
                    incrementalSelectionBatchBegin: function() {
                        a.freezeModelBrowser(!0);
                        a.enableModelBrowserPartSelection(!1)
                    },
                    incrementalSelectionBatchEnd: function() {
                        a.freezeModelBrowser(!1);
                        a.enableModelBrowserPartSelection(!0)
                    },
                    incrementalSelectionEnd: function() {
                        null !== a._modelBrowser && a._modelBrowser.updateSelection(null)
                    }
                })
            }
            a.prototype._getWithDefault = function(b, d) {
                return void 0 === b ? d : b
            };
            a.prototype._determineModelType = function(b) {
                var d = h.Generic;
                this._viewer.sheetManager.isDrawingSheetActive() ? d = h.Drawing : this._isBim(b) && (d = h.Bim);
                return d
            };
            a.prototype._isBim = function(b) {
                return 0 < b.length && (b = this._viewer.model.getModelFileTypeFromNode(b[0]),
                    b === e.FileType.Ifc || b === e.FileType.Revit) ? !0 : !1
            };
            a.prototype._configureUi = function(b) {
                if (this._uiModelType !== b) {
                    this._uiModelType = b;
                    var d = this._viewer.view.getAxisTriad(),
                        a = this._viewer.view.getNavCube();
                    b === h.Drawing ? (d.disable(), a.disable(), this._viewer.view.setDrawMode(e.DrawMode.WireframeOnShaded)) : (d.enable(), b === h.Bim ? this._viewer.view.setBackfacesVisible(!0) : a.enable());
                    this._configureToolbar(b);
                    this._configureModelBrowser(b)
                }
            };
            a.prototype._configureToolbar = function(b) {
                null !== this._toolbar &&
                    (b === h.Drawing ? ($("#cuttingplane-button").hide(), $("#cuttingplane-submenu").hide(), $("#explode-button").hide(), $("#explode-slider").hide(), $("#explode-submenu").hide(), $("#view-button").hide(), $("#view-submenu").hide(), $("#camera-button").hide(), $("#camera-submenu").hide(), $("#tool_separator_4").hide(), $("#tool_separator_1").hide(), $("#edgeface-button").hide(), $("#edgeface-submenu").hide()) : ($("#cuttingplane-button").show(), $("#explode-button").show(), $("#view-button").show(), $("#camera-button").show(),
                        $("#tool_separator_4").show(), $("#tool_separator_1").show(), $("#edgeface-button").show()), this._toolbar.reposition())
            };
            a.prototype._configureModelBrowser = function(b) {
                null !== this._modelBrowser && (b === h.Drawing ? $(".ui-modeltree").addClass("drawing") : $(".ui-modeltree").removeClass("drawing"))
            };
            a.prototype._onSceneReady = function() {
                var b = this;
                this._viewer.focusInput(!0);
                var d = this._viewer.selectionManager;
                d.setNodeSelectionColor(a._defaultPartSelectionColor);
                d.setNodeSelectionOutlineColor(a._defaultPartSelectionOutlineColor);
                d = this._viewer.view;
                d.setXRayColor(e.ElementType.Faces, a._defaultXRayColor);
                d.setXRayColor(e.ElementType.Lines, a._defaultXRayColor);
                d.setXRayColor(e.ElementType.Points, a._defaultXRayColor);
                d.setBackgroundColor(a._defaultBackgroundColor, a._defaultBackgroundColor);
                this._viewer.getViewElement().addEventListener("mouseenter", function() {
                    b._viewer.focusInput(!0)
                })
            };
            a.prototype.setDeselectOnIsolate = function(b) {
                this._isolateZoomHelper.setDeselectOnIsolate(b)
            };
            a.prototype.freezeModelBrowser = function(b) {
                null !==
                    this._modelBrowser && this._modelBrowser.freeze(b)
            };
            a.prototype.enableModelBrowserPartSelection = function(b) {
                null !== this._modelBrowser && this._modelBrowser.enablePartSelection(b)
            };
            a.prototype._getContextMenu = function() {
                return this._contextMenu
            };
            a.prototype._getModelBrowser = function() {
                return this._modelBrowser
            };
            a.prototype._getToolbar = function() {
                return this._toolbar
            };
            a._defaultBackgroundColor = e.Color.white();
            a._defaultPartSelectionColor = e.Color.createFromFloat(0, .8, 0);
            a._defaultPartSelectionOutlineColor =
                e.Color.createFromFloat(0, .8, 0);
            a._defaultXRayColor = e.Color.createFromFloat(0, .9, 0);
            return a
        }();
        l.DesktopUi = c
    })(f.Desktop || (f.Desktop = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(l) {
        var h = function(c) {
            function a(b, d, a, m, e) {
                b = c.call(this, "modelbrowser", b, d, m, e) || this;
                b._treeMap = a;
                b._initEvents();
                return b
            }
            __extends(a, c);
            a.prototype._initEvents = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d = this;
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._registerContextMenuCallback(l.Tree.Model)];
                            case 1:
                                return a.sent(), [4, this._registerContextMenuCallback(l.Tree.Layers)];
                            case 2:
                                return a.sent(), [4, this._registerContextMenuCallback(l.Tree.Types)];
                            case 3:
                                return a.sent(), this._viewer.getStreamingMode() === e.StreamingMode.OnDemand && (b = function() {
                                    return __awaiter(d, void 0, void 0, function() {
                                        return __generator(this, function(d) {
                                            switch (d.label) {
                                                case 0:
                                                    return [4, this._viewer.model.requestNodes(this.getContextItemIds(!1, !0))];
                                                case 1:
                                                    return d.sent(), [2]
                                            }
                                        })
                                    })
                                }, this.appendSeparator(), this.appendItem("request", "Request", b)), [2]
                        }
                    })
                })
            };
            a.prototype._registerContextMenuCallback = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var d, b = this;
                    return __generator(this,
                        function(c) {
                            d = this._treeMap.get(a);
                            void 0 !== d && d instanceof f.ViewTree && d.registerCallback("context", function(d, a) {
                                return __awaiter(b, void 0, void 0, function() {
                                    return __generator(this, function(b) {
                                        switch (b.label) {
                                            case 0:
                                                return [4, this._onTreeContext(d, a)];
                                            case 1:
                                                return b.sent(), [2]
                                        }
                                    })
                                })
                            });
                            return [2]
                        })
                })
            };
            a.prototype._onTreeContext = function(a, d) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, c, e;
                    return __generator(this, function(g) {
                        switch (g.label) {
                            case 0:
                                b = a.split(f.ModelTree.separator);
                                c = b[0];
                                switch (c) {
                                    case "layer":
                                        return [3,
                                            1
                                        ];
                                    case "types":
                                        return [3, 3];
                                    case "typespart":
                                        return [3, 5];
                                    case "layerpart":
                                        return [3, 5];
                                    case "part":
                                        return [3, 5]
                                }
                                return [3, 7];
                            case 1:
                                return [4, this.setActiveLayerName(a)];
                            case 2:
                                return g.sent(), [3, 8];
                            case 3:
                                return [4, this.setActiveType(b[1])];
                            case 4:
                                return g.sent(), [3, 8];
                            case 5:
                                return e = parseInt(b[1], 10), [4, this.setActiveItemId(e)];
                            case 6:
                                return g.sent(), [3, 8];
                            case 7:
                                return [2];
                            case 8:
                                return this._position = null, this.showElements(d,true), [2] //3DSANDBOX CHANGES
                        }
                    })
                })
            };
            a.prototype._onContextLayerClick = function(a) {
                this.hide()
            };
            return a
        }(f.Context.ContextMenu);
        l.ModelBrowserContextMenu = h
    })(f.Desktop || (f.Desktop = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    (function(e) {
        function f(a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }
        var c = function() {
            function a(a) {
                var d = this;
                this._incrementalSelectionActive = this._assemblyTreeReadyOccurred = !1;
                this._viewer = a;
                this._propertyWindow = $("#propertyContainer");
                a = function() {
                    return __awaiter(d, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            this._update();
                            return [2]
                        })
                    })
                };
                this._viewer.setCallbacks({
                    assemblyTreeReady: function() {
                        d._onModelStructureReady()
                    },
                    firstModelLoaded: a,
                    modelSwitched: a,
                    selectionArray: function(a) {
                        return __awaiter(d, void 0, void 0, function() {
                            return __generator(this, function(d) {
                                switch (d.label) {
                                    case 0:
                                        return 0 < a.length ? [4, this._onPartSelection(a[a.length - 1])] : [3, 2];
                                    case 1:
                                        d.sent(), d.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                    },
                    incrementalSelectionBatchBegin: function() {
                        d._incrementalSelectionActive = !0
                    },
                    incrementalSelectionBatchEnd: function() {
                        d._incrementalSelectionActive = !1
                    }
                })
            }
            a.prototype._update = function(a) {
                void 0 === a && (a = "&lt;no properties to display&gt;");
                this._propertyWindow.html(a)
            };
            a.prototype._onModelStructureReady = function() {
                this._assemblyTreeReadyOccurred = !0;
                this._update()
            };
            a.prototype._createRow = function(a, d, c) {
                void 0 === c && (c = "");
                var b = document.createElement("tr");
                b.id = "propertyTableRow_" + a + "_" + d;
                0 < c.length && b.classList.add(c);
                c = document.createElement("td");
                c.id = "propertyDiv_" + a;
                c.innerHTML = a;
                a = document.createElement("td");
                a.id = "propertyDiv_" + d;
                a.innerHTML = d;
                b.appendChild(c);
                b.appendChild(a);
                return b
            };
            a.prototype._onPartSelection = function(a) {
                return __awaiter(this,
                    void 0, void 0,
                    function() {
                        var d, b, c, e, h, l, p, n, q, t, u, v, r, x, z, y, B;
                        return __generator(this, function(g) {
                            switch (g.label) {
                                case 0:
                                    if (!this._assemblyTreeReadyOccurred || this._incrementalSelectionActive) return [2];
                                    this._update();
                                    d = this._viewer.model;
                                    b = a.getSelection().getNodeId();
                                    if (null === b || !d.isNodeLoaded(b)) return [2];
                                    c = d.getNodeName(b);
                                    h = e = null;
                                    return [4, d.getNodeProperties(b)];
                                case 1:
                                    l = g.sent();
                                    p = [];
                                    if (null !== l && (p = Object.keys(l), 0 < p.length))
                                        for (e = document.createElement("table"), e.id = "propertyTable", e.appendChild(this._createRow("Property",
                                                "Value", "headerRow")), e.appendChild(this._createRow("Name", null !== c ? c : "unnamed")), n = 0, q = p; n < q.length; n++) t = q[n], u = f(t), v = f(l[t]), e.appendChild(this._createRow(u, v));
                                    r = d.getNodeUserDataIndices(b);
                                    if (0 < r.length)
                                        for (h = document.createElement("table"), h.id = "propertyTable", h.appendChild(this._createRow("User Data Index", "User Data Size", "headerRow")), x = 0, z = r; x < z.length; x++) y = z[x], B = d.getNodeUserData(b, y), u = "number" === typeof y ? "0x" + y.toString(16).toUpperCase() : "0x" + y, v = "" + B.length, h.appendChild(this._createRow(u,
                                            v));
                                    if (null === e && null === h) return [2];
                                    this._update("");
                                    null !== e && this._propertyWindow.append(e);
                                    null !== h && this._propertyWindow.append(h);
                                    return [2]
                            }
                        })
                    })
            };
            return a
        }();
        e.PropertyWindow = c
    })(e.Desktop || (e.Desktop = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    f.DefaultUiTransitionDuration = 400;
    f.colorFromRgbString = function(f) {
        f = f.replace(/[^\d,]/g, "").split(",");
        return new e.Color(Number(f[0]), Number(f[1]), Number(f[2]))
    };
    f.rgbStringFromColor = function(e) {
        return e ? "rgb(" + Math.round(e.r) + "," + Math.round(e.g) + "," + Math.round(e.b) + ")" : ""
    };
    f.cssHexStringFromColor = function(e) {
        var f = function(c) {
            c = c.toString(16);
            return 1 === c.length ? "0" + c : c
        };
        return "#" + f(e.r) + f(e.g) + f(e.b)
    };
    f.getValueAsString = function(e) {
        e = $(e).val();
        return "string" === typeof e ?
            e : ""
    };
    f.centerWindow = function(e, f) {
        e = $("#" + e);
        var c = e.width(),
            a = e.height();
        void 0 !== c && void 0 !== a && e.css({
            left: (f.x - c) / 2 + "px",
            top: (f.y - a) / 2 + "px"
        })
    }
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(l) {
        var h;
        (function(a) {
            a[a.General = 0] = "General";
            a[a.Walk = 1] = "Walk";
            a[a.Drawing = 2] = "Drawing";
            a[a.Floorplan = 3] = "Floorplan"
        })(h = l.SettingTab || (l.SettingTab = {}));
        var c = function() {
            function a(a) {
                this._versionInfo = !0;
                this._splatRenderingEnabled = !1;
                this._splatRenderingSize = .003;
                this._splatRenderingPointSizeUnit = e.PointSizeUnit.ProportionOfBoundingDiagonal;
                this._floorplanActive = !1;
                this._honorSceneVisibility = !0;
                this._walkSpeedUnits = 1;
                this._generalTabLabelId = "#settings-tab-label-general";
                this._walkTabLabelId = "#settings-tab-label-walk";
                this._drawingTabLabelId = "#settings-tab-label-drawing";
                this._floorplanTabLabelId = "#settings-tab-label-floorplan";
                this._generalTabId = "#settings-tab-general";
                this._walkTabId = "#settings-tab-walk";
                this._drawingTabId = "#settings-tab-drawing";
                this._floorplanTabId = "#settings-tab-floorplan";
                this._walkKeyIdsMap = new Map;
                this._viewer = a;
                a = this._viewer.view;
                this._navCube = a.getNavCube();
                this._axisTriad = a.getAxisTriad();
                this._viewerSettingsSelector = "viewer-settings-dialog";
                this._initElements()
            }
            a.prototype.show = function() {
                var a = this._updateSettings();
                document.body.classList.contains("mobile") && this._scaleForMobile();
                f.centerWindow(this._viewerSettingsSelector, this._viewer.view.getCanvasSize());
                $("#" + this._viewerSettingsSelector).show();
                return a
            };
            a.prototype.hide = function() {
                $("#" + this._viewerSettingsSelector).hide()
            };
            a.prototype._scaleForMobile = function() {
                var a = $("#" + this._viewerSettingsSelector),
                    d = $("#" + this._viewerSettingsSelector + " .hoops-ui-window-body"),
                    c = this._viewer.view.getCanvasSize(),
                    m = a.width();
                void 0 !== m && 1.8 * m > c.x && d.css("width", c.x / 1.8);
                m = a.height();
                if (void 0 !== m && 1.8 * m > c.y) {
                    a.show();
                    m = $("#" + this._viewerSettingsSelector + " .hoops-ui-window-header").get(0).offsetHeight;
                    var e = $("#" + this._viewerSettingsSelector + " .hoops-ui-window-footer").get(0).offsetHeight;
                    a.hide();
                    d.css("height", c.y / 1.8 - 1.4 * (m + e))
                }
            };
            a.prototype._initElements = function() {
                var a = this;
                this._walkKeyIdsMap.set(e.WalkDirection.Up, "walk-key-up");
                this._walkKeyIdsMap.set(e.WalkDirection.Down, "walk-key-down");
                this._walkKeyIdsMap.set(e.WalkDirection.Left,
                    "walk-key-left");
                this._walkKeyIdsMap.set(e.WalkDirection.Right, "walk-key-right");
                this._walkKeyIdsMap.set(e.WalkDirection.Forward, "walk-key-forward");
                this._walkKeyIdsMap.set(e.WalkDirection.Backward, "walk-key-backward");
                this._walkKeyIdsMap.set(e.WalkDirection.TiltUp, "walk-key-tilt-up");
                this._walkKeyIdsMap.set(e.WalkDirection.TiltDown, "walk-key-tilt-down");
                this._walkKeyIdsMap.set(e.WalkDirection.RotateLeft, "walk-key-rotate-left");
                this._walkKeyIdsMap.set(e.WalkDirection.RotateRight, "walk-key-rotate-right");
                $("#viewer-settings-dialog").draggable({
                    handle: ".hoops-ui-window-header"
                });
                $("INPUT.color-picker").each(function() {
                    $(this).minicolors({
                        position: $(this).attr("data-position") || "bottom left",
                        format: "rgb",
                        control: "hue"
                    })
                });
                $("#viewer-settings-ok-button").on("click", function() {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, this._applySettings()];
                                case 1:
                                    return d.sent(), this.hide(), [2]
                            }
                        })
                    })
                });
                $("#viewer-settings-cancel-button").on("click",
                    function() {
                        a.hide()
                    });
                $("#viewer-settings-apply-button").on("click", function() {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    return [4, this._applySettings()];
                                case 1:
                                    return d.sent(), [2]
                            }
                        })
                    })
                });
                $("#settings-pmi-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-pmi-enabled", ["settings-pmi-color-style"], ["settings-pmi-color"], $("#settings-pmi-enabled").prop("checked"))
                });
                $("#settings-splat-rendering-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-splat-rendering-enabled",
                        ["settings-splat-enabled-style"], ["settings-splat-rendering-size", "settings-splat-rendering-point-size-unit"], $("#settings-splat-rendering-enabled").prop("checked"))
                });
                $("#settings-mouse-look-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-mouse-look-enabled", ["settings-mouse-look-style"], ["settings-mouse-look-speed"], $("#settings-mouse-look-enabled").prop("checked"))
                });
                $("#settings-bim-mode-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-bim-mode-enabled", [], [], $("#settings-bim-mode-enabled").prop("checked"))
                });
                $("#settings-bloom-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-bloom-enabled", ["settings-bloom-style"], ["settings-bloom-intensity", "settings-bloom-threshold"], $("#settings-bloom-enabled").prop("checked"))
                });
                $("#settings-shadow-enabled").on("click", function() {
                    a._updateEnabledStyle("settings-shadow-enabled", ["settings-shadow-style"], ["settings-shadow-blur-samples", "settings-shadow-interactive"], $("#settings-shadow-enabled").prop("checked"))
                });
                $("#settings-silhouette-enabled").on("click",
                    function() {
                        a._updateEnabledStyle("settings-silhouette-enabled", [], [], $("#settings-silhouette-enabled").prop("checked"))
                    });
                this._viewer.setCallbacks({
                    firstModelLoaded: function() {
                        return __awaiter(a, void 0, void 0, function() {
                            var d, a, b;
                            return __generator(this, function(c) {
                                switch (c.label) {
                                    case 0:
                                        return d = this._viewer.operatorManager, a = d.getOperator(e.OperatorId.KeyboardWalk), b = a.getWalkSpeed(), 0 >= b ? [4, a.resetDefaultWalkSpeeds()] : [3, 2];
                                    case 1:
                                        c.sent(), this._updateWalkSettingsHelper(), c.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                    },
                    modelSwitchStart: function() {
                        a._honorSceneVisibility = !0
                    }
                });
                $("#settings-walk-mode").on("change", function() {
                    var d = parseInt(f.getValueAsString("#settings-walk-mode"), 10);
                    a._updateKeyboardWalkModeStyle(d)
                });
                $(this._generalTabLabelId).on("click", function() {
                    a._switchTab(h.General)
                });
                $(this._walkTabLabelId).on("click", function() {
                    a._switchTab(h.Walk)
                });
                $(this._drawingTabLabelId).on("click", function() {
                    a._switchTab(h.Drawing)
                });
                $(this._floorplanTabLabelId).on("click", function() {
                    a._switchTab(h.Floorplan)
                })
            };
            a.prototype._switchTab = function(a) {
                var d = $(this._generalTabLabelId),
                    b = $(this._walkTabLabelId),
                    c = $(this._drawingTabLabelId),
                    e = $(this._floorplanTabLabelId),
                    f = $(this._generalTabId),
                    l = $(this._walkTabId),
                    p = $(this._drawingTabId),
                    n = $(this._floorplanTabId);
                d.removeClass("selected");
                f.removeClass("selected");
                l.removeClass("selected");
                b.removeClass("selected");
                p.removeClass("selected");
                c.removeClass("selected");
                n.removeClass("selected");
                e.removeClass("selected");
                switch (a) {
                    case h.General:
                        d.addClass("selected");
                        f.addClass("selected");
                        break;
                    case h.Walk:
                        l.addClass("selected");
                        b.addClass("selected");
                        break;
                    case h.Drawing:
                        p.addClass("selected");
                        c.addClass("selected");
                        break;
                    case h.Floorplan:
                        n.addClass("selected"), e.addClass("selected")
                }
            };
            a.prototype._updateSettings = function() {
                var a = this,
                    d = this._viewer.view,
                    c = this._viewer.model,
                    m = this._viewer.selectionManager,
                    k = this._viewer.cuttingManager,
                    h = this._viewer.measureManager,
                    l = this._viewer.operatorManager;
                this._versionInfo && ($("#settings-format-version").html(this._viewer.getFormatVersionString()),
                    $("#settings-viewer-version").html(this._viewer.getViewerVersionString()), this._versionInfo = !1);
                var p = d.getBackgroundColor();
                var n = null === p.top ? f.colorFromRgbString("rgb(192,220,248)") : p.top;
                p = null === p.bottom ? f.colorFromRgbString("rgb(192,220,248)") : p.bottom;
                var q = m.getNodeSelectionColor(),
                    t = m.getNodeElementSelectionColor();
                h = h.getMeasurementColor();
                var u = d.getProjectionMode(),
                    v = d.getBackfacesVisible(),
                    r = d.getHiddenLineSettings().getObscuredLineOpacity(),
                    x = k.getCappingGeometryVisibility();
                m = m.getHighlightFaceElementSelection() &&
                    m.getHighlightLineElementSelection();
                var z = k.getCappingFaceColor();
                k = k.getCappingLineColor();
                var y = d.getAmbientOcclusionEnabled(),
                    B = d.getAmbientOcclusionRadius(),
                    D = d.getAntiAliasingMode() === e.AntiAliasingMode.SMAA,
                    E = d.getBloomEnabled(),
                    F = d.getBloomIntensityScale(),
                    G = d.getBloomThreshold(),
                    H = d.getSilhouetteEnabled(),
                    I = d.getSimpleReflectionEnabled(),
                    J = d.getSimpleShadowEnabled(),
                    K = d.getSimpleShadowInteractiveUpdateEnabled(),
                    L = d.getSimpleShadowBlurSamples(),
                    M = c.getPmiColor();
                c = c.getPmiColorOverride();
                l = l.getOperator(e.OperatorId.Orbit).getOrbitFallbackMode() === e.OrbitFallbackMode.CameraTarget ? !0 : !1;
                var N = this._axisTriad.getEnabled(),
                    O = this._navCube.getEnabled(),
                    A = [];
                A.push(this._updateWalkSettings());
                this._updateDrawingSettings();
                this._updateFloorplanSettings();
                $("#settings-selection-color-body").minicolors("value", f.rgbStringFromColor(q));
                $("#settings-selection-color-face-line").minicolors("value", f.rgbStringFromColor(t));
                $("#settings-background-top").minicolors("value", f.rgbStringFromColor(n));
                $("#settings-background-bottom").minicolors("value", f.rgbStringFromColor(p));
                $("#settings-measurement-color").minicolors("value", f.rgbStringFromColor(h));
                $("#settings-capping-face-color").minicolors("value", f.rgbStringFromColor(z));
                $("#settings-capping-line-color").minicolors("value", f.rgbStringFromColor(k));
                $("#settings-projection-mode").val("" + u);
                $("#settings-show-backfaces").prop("checked", v);
                $("#settings-show-capping-geometry").prop("checked", x);
                $("#settings-enable-face-line-selection").prop("checked",
                    m);
                $("#settings-orbit-mode").prop("checked", l);
                $("#settings-select-scene-invisible").prop("checked", this._honorSceneVisibility);
                $("#settings-ambient-occlusion").prop("checked", y);
                $("#settings-ambient-occlusion-radius").val("" + B);
                $("#settings-anti-aliasing").prop("checked", D);
                $("#settings-bloom-intensity").val("" + F);
                $("#settings-bloom-threshold").val("" + G);
                $("#settings-axis-triad").prop("checked", N);
                $("#settings-nav-cube").prop("checked", O);
                $("#settings-silhouette-enabled").prop("checked", H);
                $("#settings-reflection-enabled").prop("checked",
                    I);
                $("#settings-shadow-interactive").prop("checked", K);
                $("#settings-shadow-blur-samples").val(L);
                $("#settings-pmi-color").minicolors("value", f.rgbStringFromColor(M));
                c !== $("#settings-pmi-enabled").prop("checked") && $("#settings-pmi-enabled").trigger("click");
                A.push(this._viewer.getMinimumFramerate().then(function(a) {
                    $("#settings-framerate").val("" + a)
                }));
                void 0 !== r ? $("#settings-hidden-line-opacity").val("" + r) : $("#settings-hidden-line-opacity").val("");
                E !== $("#settings-bloom-enabled").prop("checked") &&
                    $("#settings-bloom-enabled").trigger("click");
                J !== $("#settings-shadow-enabled").prop("checked") && $("#settings-shadow-enabled").trigger("click");
                A.push(d.getPointSize().then(function(d) {
                    var b = d[0];
                    d = d[1];
                    a._splatRenderingEnabled = 1 !== b || d !== e.PointSizeUnit.ScreenPixels;
                    a._splatRenderingEnabled !== $("#settings-splat-rendering-enabled").prop("checked") && $("#settings-splat-rendering-enabled").trigger("click");
                    a._splatRenderingEnabled && (a._splatRenderingSize = b, a._splatRenderingPointSizeUnit = d);
                    b = $("#settings-splat-rendering-size");
                    Number(b.prop("step")) > a._splatRenderingSize && b.prop("step", "" + a._splatRenderingSize / 3);
                    b.val("" + a._splatRenderingSize);
                    $("#settings-splat-rendering-point-size-unit").val("" + a._splatRenderingPointSizeUnit)
                }));
                A.push(d.getEyeDomeLightingEnabled().then(function(a) {
                    $("#settings-eye-dome-lighting-enabled").prop("checked", a)
                }));
                return e.Util.waitForAll(A)
            };
            a.prototype._applySettings = function() {
                var a = [],
                    d = this._viewer.view,
                    c = this._viewer.model,
                    m = this._viewer.cuttingManager,
                    k = this._viewer.selectionManager;
                a.push(this._applyWalkSettings());
                var h = f.colorFromRgbString(f.getValueAsString("#settings-background-top")),
                    l = f.colorFromRgbString(f.getValueAsString("#settings-background-bottom"));
                this._viewer.view.setBackgroundColor(h, l);
                h = f.colorFromRgbString(f.getValueAsString("#settings-selection-color-body"));
                k.setNodeSelectionColor(h);
                k.setNodeSelectionOutlineColor(h);
                h = f.colorFromRgbString(f.getValueAsString("#settings-selection-color-face-line"));
                k.setNodeElementSelectionColor(h);
                k.setNodeElementSelectionOutlineColor(h);
                h = $("#settings-enable-face-line-selection").prop("checked");
                k.setHighlightFaceElementSelection(h);
                k.setHighlightLineElementSelection(h);
                this._viewer.measureManager.setMeasurementColor(f.colorFromRgbString(f.getValueAsString("#settings-measurement-color")));
                k = f.colorFromRgbString(f.getValueAsString("#settings-pmi-color"));
                h = $("#settings-pmi-enabled").prop("checked");
                k && h ? (c.setPmiColor(k), c.setPmiColorOverride(!0)) : c.setPmiColorOverride(!1);
                a.push(m.setCappingFaceColor(f.colorFromRgbString(f.getValueAsString("#settings-capping-face-color"))));
                a.push(m.setCappingLineColor(f.colorFromRgbString(f.getValueAsString("#settings-capping-line-color"))));
                d.setProjectionMode(parseInt(f.getValueAsString("#settings-projection-mode"), 10));
                c = $("#settings-show-backfaces").prop("checked");
                d.setBackfacesVisible(c);
                c = $("#settings-show-capping-geometry").prop("checked");
                a.push(m.setCappingGeometryVisibility(c));
                (m = parseInt(f.getValueAsString("#settings-framerate"), 10)) && 0 < m && this._viewer.setMinimumFramerate(m);
                m = parseFloat(f.getValueAsString("#settings-hidden-line-opacity"));
                d.getHiddenLineSettings().setObscuredLineOpacity(m);
                d.getDrawMode() === e.DrawMode.HiddenLine && d.setDrawMode(e.DrawMode.HiddenLine);
                m = this._viewer.operatorManager.getOperator(e.OperatorId.Orbit);
                c = $("#settings-orbit-mode").prop("checked");
                m.setOrbitFallbackMode(c ? e.OrbitFallbackMode.CameraTarget : e.OrbitFallbackMode.ModelCenter);
                m = (this._honorSceneVisibility = $("#settings-select-scene-invisible").prop("checked")) ? e.SelectionMask.None : e.SelectionMask.All;
                c = this._viewer.operatorManager.getOperator(e.OperatorId.Select);
                k = c.getPickConfig();
                k.forceEffectiveSceneVisibilityMask = m;
                c.setPickConfig(k);
                this._viewer.operatorManager.getOperator(e.OperatorId.AreaSelect).setForceEffectiveSceneVisibilityMask(m);
                this._viewer.operatorManager.getOperator(e.OperatorId.RayDrillSelect).setForceEffectiveSceneVisibilityMask(m);
                d.setAmbientOcclusionEnabled($("#settings-ambient-occlusion").prop("checked"));
                d.setAmbientOcclusionRadius(parseFloat(f.getValueAsString("#settings-ambient-occlusion-radius")));
                $("#settings-anti-aliasing").prop("checked") ?
                    d.setAntiAliasingMode(e.AntiAliasingMode.SMAA) : d.setAntiAliasingMode(e.AntiAliasingMode.None);
                d.setBloomEnabled($("#settings-bloom-enabled").prop("checked"));
                d.setBloomIntensityScale(parseFloat(f.getValueAsString("#settings-bloom-intensity")));
                d.setBloomThreshold(parseFloat(f.getValueAsString("#settings-bloom-threshold")));
                d.setSilhouetteEnabled($("#settings-silhouette-enabled").prop("checked"));
                d.setSimpleReflectionEnabled($("#settings-reflection-enabled").prop("checked"));
                d.setSimpleShadowEnabled($("#settings-shadow-enabled").prop("checked"));
                d.setSimpleShadowInteractiveUpdateEnabled($("#settings-shadow-interactive").prop("checked"));
                d.setSimpleShadowBlurSamples(parseInt(f.getValueAsString("#settings-shadow-blur-samples"), 10));
                $("#settings-axis-triad").prop("checked") ? this._axisTriad.enable() : this._axisTriad.disable();
                $("#settings-nav-cube").prop("checked") ? this._navCube.enable() : this._navCube.disable();
                $("#settings-splat-rendering-enabled").prop("checked") ? (this._splatRenderingEnabled = !0, this._splatRenderingSize = parseFloat(f.getValueAsString("#settings-splat-rendering-size")),
                    this._splatRenderingPointSizeUnit = parseInt(f.getValueAsString("#settings-splat-rendering-point-size-unit"), 10), d.setPointSize(this._splatRenderingSize, this._splatRenderingPointSizeUnit)) : (this._splatRenderingEnabled = !1, d.setPointSize(1, e.PointSizeUnit.ScreenPixels));
                d.setEyeDomeLightingEnabled($("#settings-eye-dome-lighting-enabled").prop("checked"));
                a.push(this._applyDrawingSettings());
                a.push(this._applyFloorplanSettings());
                return e.Util.waitForAll(a)
            };
            a.prototype._applyWalkKeyText = function(a, d) {
                d <
                    e.KeyCode.a || d > e.KeyCode.z || (a = this._walkKeyIdsMap.get(a), d = e.KeyCode[d].toUpperCase(), $("#" + a).html(d))
            };
            a.prototype._applyWalkSettings = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a, d, c, m, k, h, l, p, n, q, t, u, v = this;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                return a = this._viewer.operatorManager, d = a.getOperator(e.OperatorId.KeyboardWalk), c = a.getOperator(e.OperatorId.WalkMode), m = parseInt(f.getValueAsString("#settings-walk-mode"), 10), [4, c.setWalkMode(m)];
                            case 1:
                                return b.sent(),
                                    k = parseInt(f.getValueAsString("#settings-walk-rotation"), 10), h = parseFloat(f.getValueAsString("#settings-walk-speed")) * this._walkSpeedUnits, l = parseFloat(f.getValueAsString("#settings-walk-elevation")) * this._walkSpeedUnits, p = parseInt(f.getValueAsString("#settings-walk-view-angle"), 10), n = $("#settings-mouse-look-enabled").prop("checked"), q = parseInt(f.getValueAsString("#settings-mouse-look-speed"), 10), t = $("#settings-bim-mode-enabled").prop("checked"), $("#walk-navigation-keys .walk-key").html(""), u = d.getKeyMapping(),
                                    u.forEach(function(a, d) {
                                        v._applyWalkKeyText(a, d)
                                    }), 0 !== h ? [3, 3] : [4, c.resetDefaultWalkSpeeds()];
                            case 2:
                                return b.sent(), this._updateWalkSettingsHelper(), [3, 4];
                            case 3:
                                c.setRotationSpeed(k), c.setWalkSpeed(h), c.setElevationSpeed(l), c.setViewAngle(p), m === e.WalkMode.Keyboard && (d.setMouseLookEnabled(n), d.setMouseLookSpeed(q)), b.label = 4;
                            case 4:
                                return t ? [4, this._viewer.model.registerIfcNodes(this._viewer.model.getAbsoluteRootNode())] : [3, 7];
                            case 5:
                                return b.sent(), [4, c.setBimModeEnabled(!0)];
                            case 6:
                                return b.sent(),
                                    [3, 9];
                            case 7:
                                return [4, c.setBimModeEnabled(!1)];
                            case 8:
                                b.sent(), b.label = 9;
                            case 9:
                                return [2]
                        }
                    })
                })
            };
            a.prototype._updateKeyboardWalkModeStyle = function(a) {
                this._updateEnabledStyle(null, ["walk-mouse-look-text", "settings-mouse-look-style", "walk-navigation-keys"], ["settings-mouse-look-enabled", "settings-mouse-look-speed"], a === e.WalkMode.Keyboard)
            };
            a.prototype._updateWalkSpeedUnits = function(a) {
                this._walkSpeedUnits = Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
                a = "m";
                .001 >= this._walkSpeedUnits ? a = "&micro;m" :
                    1 >= this._walkSpeedUnits ? a = "mm" : 10 >= this._walkSpeedUnits ? a = "cm" : this._walkSpeedUnits = 1E3;
                $("#walk-speed-units").html(a);
                $("#elevation-speed-units").html(a)
            };
            a.prototype._updateWalkSettingsHelper = function() {
                var a = this._viewer.operatorManager,
                    d = a.getOperator(e.OperatorId.KeyboardWalk),
                    c = a.getOperator(e.OperatorId.WalkMode);
                a = d.getRotationSpeed();
                var m = d.getWalkSpeed(),
                    k = d.getElevationSpeed(),
                    f = d.getViewAngle(),
                    h = d.getMouseLookEnabled(),
                    l = d.getMouseLookSpeed();
                d = d.isBimModeEnabled();
                c = c.getWalkMode();
                this._updateWalkSpeedUnits(m);
                $("#settings-walk-mode").val("" + c);
                $("#settings-walk-rotation").val("" + a);
                $("#settings-walk-speed").val((m / this._walkSpeedUnits).toFixed(1));
                $("#settings-walk-elevation").val((k / this._walkSpeedUnits).toFixed(1));
                $("#settings-walk-view-angle").val("" + f);
                $("#settings-mouse-look-speed").val("" + l);
                this._updateEnabledStyle("settings-mouse-look-enabled", ["settings-mouse-look-style"], ["settings-mouse-look-speed"], h);
                this._updateEnabledStyle("settings-bim-mode-enabled", [], [],
                    d);
                this._updateKeyboardWalkModeStyle(c)
            };
            a.prototype._updateWalkSettings = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a, d, c;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                return a = this._viewer.operatorManager, d = a.getOperator(e.OperatorId.KeyboardWalk), c = d.getWalkSpeed(), 0 !== c ? [3, 2] : [4, d.resetDefaultWalkSpeeds()];
                            case 1:
                                b.sent(), b.label = 2;
                            case 2:
                                return this._updateWalkSettingsHelper(), [2]
                        }
                    })
                })
            };
            a.prototype._updateDrawingSettings = function() {
                var a = this._viewer.sheetManager.getSheetBackgroundColor(),
                    d = this._viewer.sheetManager.getSheetColor(),
                    c = this._viewer.sheetManager.getSheetShadowColor(),
                    e = this._viewer.sheetManager.getBackgroundSheetEnabled();
                $("#settings-drawing-background").minicolors("value", f.rgbStringFromColor(a));
                $("#settings-drawing-sheet").minicolors("value", f.rgbStringFromColor(d));
                $("#settings-drawing-sheet-shadow").minicolors("value", f.rgbStringFromColor(c));
                $("#settings-drawing-background-enabled").prop("checked", e)
            };
            a.prototype._applyDrawingSettings = function() {
                return __awaiter(this,
                    void 0, void 0,
                    function() {
                        var a, d, c, e;
                        return __generator(this, function(b) {
                            switch (b.label) {
                                case 0:
                                    return a = f.colorFromRgbString(f.getValueAsString("#settings-drawing-background")), d = f.colorFromRgbString(f.getValueAsString("#settings-drawing-sheet")), c = f.colorFromRgbString(f.getValueAsString("#settings-drawing-sheet-shadow")), e = $("#settings-drawing-background-enabled").prop("checked"), [4, this._viewer.sheetManager.setBackgroundSheetEnabled(e)];
                                case 1:
                                    return b.sent(), [4, this._viewer.sheetManager.setSheetColors(a,
                                        d, c)];
                                case 2:
                                    return b.sent(), [2]
                            }
                        })
                    })
            };
            a.prototype._updateFloorplanSettings = function() {
                var a = this._viewer.floorplanManager,
                    d = a.getConfiguration();
                this._floorplanActive = a = a.isActive();
                $("#settings-floorplan-active").prop("checked", a);
                $("#settings-floorplan-track-camera").prop("checked", d.trackCameraEnabled);
                switch (d.floorplanOrientation) {
                    case e.FloorplanOrientation.NorthUp:
                        $("#settings-floorplan-orientation").val("0");
                        break;
                    case e.FloorplanOrientation.AvatarUp:
                        $("#settings-floorplan-orientation").val("1")
                }
                switch (d.autoActivate) {
                    case e.FloorplanAutoActivation.Bim:
                        $("#settings-floorplan-auto-activate").val("0");
                        break;
                    case e.FloorplanAutoActivation.BimWalk:
                        $("#settings-floorplan-auto-activate").val("1");
                        break;
                    case e.FloorplanAutoActivation.Never:
                        $("#settings-floorplan-auto-activate").val("2")
                }
                $("#settings-floorplan-feet-per-pixel").val("" + d.overlayFeetPerPixel);
                $("#settings-floorplan-zoom").val("" + d.zoomLevel);
                $("#settings-floorplan-background-opacity").val("" + d.backgroundOpacity);
                $("#settings-floorplan-border-opacity").val("" + d.borderOpacity);
                $("#settings-floorplan-avatar-opacity").val("" + d.avatarOpacity);
                $("#settings-floorplan-background-color").minicolors("value", f.rgbStringFromColor(d.backgroundColor));
                $("#settings-floorplan-border-color").minicolors("value", f.rgbStringFromColor(d.borderColor));
                $("#settings-floorplan-avatar-color").minicolors("value", f.rgbStringFromColor(d.avatarColor));
                $("#settings-floorplan-avatar-outline-color").minicolors("value", f.rgbStringFromColor(d.avatarOutlineColor));
                this._updateEnabledStyle(null, ["settings-floorplan-zoom-style"], ["settings-floorplan-zoom"], d.trackCameraEnabled);
                this._updateEnabledStyle(null, ["settings-floorplan-feet-per-pixel-style"], ["settings-floorplan-feet-per-pixel"], d.trackCameraEnabled)
            };
            a.prototype._applyFloorplanSettings = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var a, d, c, m, k, h, l, p, n, q, t, u, v, r, x;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                a = $("#settings-floorplan-active").prop("checked");
                                d = $("#settings-floorplan-track-camera").prop("checked");
                                switch ($("#settings-floorplan-orientation").val()) {
                                    case "0":
                                        c = e.FloorplanOrientation.NorthUp;
                                        break;
                                    case "1":
                                        c = e.FloorplanOrientation.AvatarUp;
                                        break;
                                    default:
                                        c = e.FloorplanOrientation.NorthUp
                                }
                                switch ($("#settings-floorplan-auto-activate").val()) {
                                    case "0":
                                        m = e.FloorplanAutoActivation.Bim;
                                        break;
                                    case "1":
                                        m = e.FloorplanAutoActivation.BimWalk;
                                        break;
                                    case "2":
                                        m = e.FloorplanAutoActivation.Never;
                                        break;
                                    default:
                                        m = e.FloorplanAutoActivation.BimWalk
                                }
                                k = parseFloat(f.getValueAsString("#settings-floorplan-feet-per-pixel"));
                                h = parseFloat(f.getValueAsString("#settings-floorplan-zoom"));
                                l = parseFloat(f.getValueAsString("#settings-floorplan-background-opacity"));
                                p = parseFloat(f.getValueAsString("#settings-floorplan-border-opacity"));
                                n = parseFloat(f.getValueAsString("#settings-floorplan-avatar-opacity"));
                                q = f.colorFromRgbString(f.getValueAsString("#settings-floorplan-background-color"));
                                t = f.colorFromRgbString(f.getValueAsString("#settings-floorplan-border-color"));
                                u = f.colorFromRgbString(f.getValueAsString("#settings-floorplan-avatar-color"));
                                v = f.colorFromRgbString(f.getValueAsString("#settings-floorplan-avatar-outline-color"));
                                r = this._viewer.floorplanManager.getConfiguration();
                                r.trackCameraEnabled = d;
                                r.floorplanOrientation = c;
                                r.autoActivate = m;
                                r.overlayFeetPerPixel = k;
                                r.zoomLevel = h;
                                r.backgroundOpacity = l;
                                r.borderOpacity = p;
                                r.avatarOpacity = n;
                                r.backgroundColor = q;
                                r.borderColor = t;
                                r.avatarColor = u;
                                r.avatarOutlineColor = v;
                                this._updateEnabledStyle(null, ["settings-floorplan-zoom-style"], ["settings-floorplan-zoom"], d);
                                this._updateEnabledStyle(null, ["settings-floorplan-feet-per-pixel-style"], ["settings-floorplan-feet-per-pixel"], d);
                                return [4, this._viewer.floorplanManager.setConfiguration(r)];
                            case 1:
                                b.sent();
                                if (!a || this._floorplanActive) return [3, 3];
                                this._floorplanActive = !0;
                                return [4, this._viewer.floorplanManager.activate()];
                            case 2:
                                return b.sent(), [3, 5];
                            case 3:
                                if (a || !this._floorplanActive) return [3, 5];
                                this._floorplanActive = !1;
                                return [4, this._viewer.floorplanManager.deactivate()];
                            case 4:
                                b.sent(), b.label = 5;
                            case 5:
                                return x = this._viewer.floorplanManager.isActive(), $("#settings-floorplan-active").prop("checked", x), [2]
                        }
                    })
                })
            };
            a.prototype._updateEnabledStyle = function(a, d, c, e) {
                null !== a && $("#" + a).prop("checked",
                    e);
                if (e)
                    for (var b = 0; b < d.length; b++) a = d[b], $("#" + a).removeClass("grayed-out");
                else
                    for (b = 0; b < d.length; b++) a = d[b], $("#" + a).addClass("grayed-out");
                for (d = 0; d < c.length; d++) $("#" + c[d]).prop("disabled", !e)
            };
            return a
        }();
        l.ViewerSettings = c
    })(f.Desktop || (f.Desktop = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(e) {
    var f = function() {
        function f(c, a, b) {
            this._maxNodeChildrenSize = 300;
            this._tree = new e.Control.TreeControl(a, c, f.separator, b);
            this._internalId = a + "Id";
            this._viewer = c
        }
        f.prototype.getElementId = function() {
            return this._tree.getElementId()
        };
        f.prototype.registerCallback = function(c, a) {
            this._tree.registerCallback(c, a)
        };
        f.prototype._splitHtmlId = function(c) {
            return this._splitHtmlIdParts(c, f.separator)
        };
        f.prototype._splitHtmlIdParts = function(c, a) {
            var b = c.lastIndexOf(a);
            return -1 === b ? ["", c] : [c.substring(0, b), c.substring(b + a.length)]
        };
        f.prototype.hideTab = function() {
            $("#" + this.getElementId() + "Tab").hide()
        };
        f.prototype.showTab = function() {
            $("#" + this.getElementId() + "Tab").show()
        };
        f.prototype._getTreeControl = function() {
            return this._tree
        };
        f.separator = "_";
        f.visibilityPrefix = "visibility";
        return f
    }();
    e.ViewTree = f
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function() {
        function f(c, a, b) {
            this._idCount = 0;
            this._viewpointIdMap = new Map;
            this._bcfIdMap = new Map;
            this._topicGuidMap = new Map;
            this._topicTitleGuidMap = new Map;
            this._topicCommentsGuidMap = new Map;
            this._commentGuidMap = new Map;
            this._viewer = c;
            this._elementId = a;
            this._scroll = b;
            this._listRoot = document.createElement("ul");
            this._bcfDataList = document.createElement("select");
            this._initEvents()
        }
        f.prototype.hideTab = function() {
            $("#" + this._elementId + "Tab").hide()
        };
        f.prototype.showTab =
            function() {
                $("#" + this._elementId + "Tab").show()
            };
        f.prototype.getElementId = function() {
            return this._elementId
        };
        f.prototype._refreshScroll = function() {
            this._scroll && this._scroll.refresh()
        };
        f.prototype._showBCFData = function(c) {
            jQuery("#" + c).show();
            this._bcfIdMap.forEach(function(a, b) {
                b !== c && jQuery("#" + b).hide()
            });
            this._refreshScroll()
        };
        f.prototype._events = function(c) {
            var a = this;
            $(c).on("click", ".ui-bcf-topic", function(b) {
                return __awaiter(a, void 0, void 0, function() {
                    var a, c;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return a =
                                    jQuery(b.target), c = a.closest(".viewpoint, .comment").get(0), void 0 === c ? [3, 2] : [4, this._onTreeSelectItem(c.id)];
                            case 1:
                                d.sent(), d.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            });
            $(c).on("change", "select", function(b) {
                (b = jQuery(b.target).closest("select").get(0)) && a._showBCFData(b.value)
            })
        };
        f.prototype._addBCFComment = function(c, a, b) {
            return __awaiter(this, void 0, void 0, function() {
                var d, g, m, f, h, l, p;
                return __generator(this, function(k) {
                    switch (k.label) {
                        case 0:
                            return d = c.getMarkup(), g = new Date, m = "", f = e.UUID.create(), h = f + ".bcfv",
                                [4, e.BCFViewpoint.createViewpoint(this._viewer, h, b)];
                        case 1:
                            return l = k.sent(), c.setViewpoint(h, l), p = f + ".png", [4, this._addSnapshot(c, p)];
                        case 2:
                            return k.sent(), d.addViewpoint(f, h, p), [2, d.addComment(g, m, a, f)]
                    }
                })
            })
        };
        f.prototype._addSnapshot = function(c, a) {
            return __awaiter(this, void 0, void 0, function() {
                var b;
                return __generator(this, function(d) {
                    switch (d.label) {
                        case 0:
                            return [4, this._viewer.takeSnapshot()];
                        case 1:
                            return b = d.sent(), c.addSnapshot(a, e.BCFSnapshot.snapshotDataFromImage(b)), [2]
                    }
                })
            })
        };
        f.prototype._removeBcf =
            function(c) {
                this._viewer.BCFManager.removeBCFData(c)
            };
        f.prototype._buildRemoveBCF = function(c) {
            var a = this,
                b = document.createElement("div");
            b.classList.add("ui-bcf-input");
            var d = document.createElement("button");
            d.textContent = "Remove BCF";
            b.appendChild(d);
            d.onclick = function() {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        this._removeBcf(c);
                        return [2]
                    })
                })
            };
            return b
        };
        f.prototype._addBcf = function(c) {
            return __awaiter(this, void 0, void 0, function() {
                var a, b, d;
                return __generator(this,
                    function(g) {
                        switch (g.label) {
                            case 0:
                                return a = this._viewer, b = a.BCFManager, d = b.createBCFData(c), [4, this._addTopic(d, c)];
                            case 1:
                                return g.sent(), [2, d]
                        }
                    })
            })
        };
        f.prototype._buildAddBCF = function() {
            var c = this,
                a = document.createElement("div");
            a.classList.add("ui-bcf-input");
            var b = document.createElement("label");
            b.textContent = "BCF Name: ";
            b.htmlFor = "bcf_name";
            var d = document.createElement("input");
            d.id = "bcf_name";
            d.placeholder = "BCF Name...";
            var g = document.createElement("button");
            g.textContent = "Add BCF";
            a.appendChild(b);
            a.appendChild(d);
            a.appendChild(g);
            g.onclick = function() {
                return __awaiter(c, void 0, void 0, function() {
                    var a;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                a = d.value;
                                if (!(0 < a.length)) return [3, 2];
                                d.value = "";
                                return [4, this._addBcf(a)];
                            case 1:
                                b.sent(), b.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            return a
        };
        f.prototype._buildOpenBCF = function() {
            var c = this,
                a = document.createElement("div");
            a.classList.add("ui-bcf-input");
            var b = document.createElement("input");
            b.type = "file";
            b.accept = ".bcf,.bcfzip";
            b.multiple = !0;
            a.appendChild(b);
            b.onchange = function() {
                return __awaiter(c, void 0, void 0, function() {
                    var a, c, e, f = this;
                    return __generator(this, function(d) {
                        a = b.files;
                        if (null !== a)
                            for (c = function(d) {
                                    var b = a[d],
                                        c = new FileReader;
                                    c.onload = function() {
                                        return __awaiter(f, void 0, void 0, function() {
                                            var a;
                                            return __generator(this, function(d) {
                                                switch (d.label) {
                                                    case 0:
                                                        return a = c.result, null === a || "object" !== typeof a ? [3, 2] : [4, this._viewer.BCFManager.addBCFFromBuffer(a, b.name.split(".")[0])];
                                                    case 1:
                                                        d.sent(), d.label = 2;
                                                    case 2:
                                                        return [2]
                                                }
                                            })
                                        })
                                    };
                                    c.readAsArrayBuffer(b)
                                }, e = 0; e < a.length; ++e) c(e);
                        b.value = "";
                        return [2]
                    })
                })
            };
            return a
        };
        f.prototype._addTopic = function(c, a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, g, m, f;
                return __generator(this, function(k) {
                    switch (k.label) {
                        case 0:
                            return b = this._viewer.markupManager.getActiveMarkupView(), [4, e.BCFTopic.createTopic(this._viewer, c.getId(), c.getFilename(), a, b)];
                        case 1:
                            return d = k.sent(), c.addTopic(d.getTopicId(), d), g = this._buildTopic(c, d), m = this._getBcfHtmlId(c.getId()), null !== m && (f = document.getElementById(m),
                                null !== f && f.appendChild(g)), [2, d]
                    }
                })
            })
        };
        f.prototype._buildAddTopic = function(c) {
            var a = this,
                b = document.createElement("div");
            b.classList.add("ui-bcf-input");
            var d = document.createElement("label");
            d.textContent = "Topic Title: ";
            d.htmlFor = "topic_title";
            var g = document.createElement("input");
            g.id = "topic_title";
            g.placeholder = "Topic Title...";
            var e = document.createElement("button");
            e.textContent = "Add Topic";
            b.appendChild(d);
            b.appendChild(g);
            b.appendChild(e);
            e.onclick = function() {
                return __awaiter(a, void 0, void 0,
                    function() {
                        var a;
                        return __generator(this, function(d) {
                            switch (d.label) {
                                case 0:
                                    a = g.value;
                                    if (!(0 < a.length)) return [3, 2];
                                    g.value = "";
                                    return [4, this._addTopic(c, a)];
                                case 1:
                                    d.sent(), d.label = 2;
                                case 2:
                                    return [2]
                            }
                        })
                    })
            };
            return b
        };
        f.prototype._initEvents = function() {
            var c = this,
                a = document.getElementById(this._elementId);
            if (null === a) throw new e.CommunicatorError("container is null");
            this._events(a);
            a.appendChild(this._buildAddBCF());
            a.appendChild(this._buildOpenBCF());
            this._listRoot.classList.add("ui-modeltree");
            this._listRoot.classList.add("ui-modeltree-item");
            a.appendChild(this._bcfDataList);
            a.appendChild(this._listRoot);
            this._viewer.setCallbacks({
                firstModelLoaded: function(a) {
                    var d = c._viewer.model;
                    a.forEach(function(a) {
                        d.getModelFileTypeFromNode(a) === e.FileType.Ifc && c.showTab()
                    })
                },
                bcfLoaded: function(a, d) {
                    c.showTab();
                    c._appendBCF(a, d)
                },
                bcfRemoved: function(a) {
                    c._removeBCF(a)
                }
            })
        };
        f.prototype._buildBCFNode = function(c) {
            var a = document.createElement("li");
            a.classList.add("ui-modeltree-item");
            a.id = c;
            return a
        };
        f.prototype._buildDiv = function(c, a, b) {
            var d = document.createElement("div");
            void 0 !== b && d.classList.add(b);
            d.id = c;
            d.innerHTML = a;
            return d
        };
        f.prototype._buildEditDiv = function(c, a, b, d, g) {
            var e = document.createElement("input");
            e.classList.add("ui-bcf-edit");
            void 0 !== g && e.classList.add(g);
            e.id = c;
            e.value = a;
            e.placeholder = b;
            e.onblur = function() {
                void 0 !== d && null !== e.textContent && d(e.textContent)
            };
            return e
        };
        f.prototype._buildImage = function(c) {
            var a = document.createElement("img");
            a.id = this._getId();
            a.src = c;
            return a
        };
        f.prototype._buildDeleteComment = function(c, a, b) {
            var d = this,
                g = document.createElement("button");
            g.classList.add("ui-bcf-comment-delete");
            g.textContent = "Delete";
            g.onclick = function() {
                d._deleteComment(c, a, b)
            };
            return g
        };
        f.prototype._buildEditComment = function(c, a) {
            var b = this,
                d = document.createElement("button");
            d.textContent = "Edit";
            d.onclick = function() {
                if ("true" === c.contentEditable) {
                    c.contentEditable = "false";
                    d.textContent = "Edit";
                    var g = c.textContent;
                    null !== g && b._setCommentText(a, g)
                } else c.contentEditable = "true", d.textContent = "Save"
            };
            return d
        };
        f.prototype._buildComment = function(c, a) {
            var b = this._getId(),
                d = this._getViewpointFromComment(c, a);
            null !== d && this._viewpointIdMap.set(b, d);
            d = this._buildDiv(b, "", "comment");
            var g = "Created by " + a.getAuthor(),
                e = this._formatDate(a.getDate()),
                f = a.getText();
            d.appendChild(this._buildDiv(this._getId(), g));
            d.appendChild(this._buildDiv(this._getId(), e));
            g = a.getViewpointGuid();
            null !== g && (g = c.getMarkup().getViewpoints().get(g), void 0 !== g && (g = g.getSnapshotFilename(), null !== g && (g = c.getSnapshot(g), null !== g && d.appendChild(this._buildImage(g.getUrl())))));
            g = this._getId();
            this._commentGuidMap.set(a.getId(),
                g);
            f = this._buildDiv(g, f);
            d.appendChild(f);
            d.appendChild(this._buildEditComment(f, a));
            d.appendChild(this._buildDeleteComment(c, a, b));
            return d
        };
        f.prototype._addComment = function(c, a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, g, e, f;
                return __generator(this, function(m) {
                    switch (m.label) {
                        case 0:
                            return b = this._viewer.markupManager.getActiveMarkupView(), [4, this._addBCFComment(c, a, b)];
                        case 1:
                            return d = m.sent(), g = this._buildComment(c, d), e = this._topicCommentsGuidMap.get(c.getTopicId()), void 0 !== e &&
                                (f = document.getElementById(e), null !== f && f.appendChild(g)), [2, d]
                    }
                })
            })
        };
        f.prototype._deleteComment = function(c, a, b) {
            b = document.getElementById(b);
            null !== b && null !== b.parentElement && (b.parentElement.removeChild(b), c.getMarkup().deleteComment(a.getId()), this._refreshScroll())
        };
        f.prototype._setCommentText = function(c, a) {
            var b = this._commentGuidMap.get(c.getId());
            void 0 !== b && (b = document.getElementById(b), null !== b && (c.setText(a), b.textContent = a, this._refreshScroll()))
        };
        f.prototype._buildAddComment = function(c) {
            var a =
                this,
                b = this._buildDiv(this._getId(), ""),
                d = document.createElement("textarea");
            d.style.width = "100%";
            b.appendChild(d);
            var g = document.createElement("button");
            g.textContent = "Add Comment";
            b.appendChild(g);
            g.onclick = function() {
                return __awaiter(a, void 0, void 0, function() {
                    var a;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                return a = d.value, d.value = "", 0 < a.length ? [4, this._addComment(c, a)] : [3, 2];
                            case 1:
                                b.sent(), b.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            return b
        };
        f.prototype._buildTopicData = function(c, a) {
            var b =
                document.createElement("div");
            b.classList.add("topic-data");
            b.innerHTML = void 0 !== a && null !== a ? "<b>" + c + "</b>: " + a : "<b>" + c + "</b>: -";
            return b
        };
        f.prototype._formatDate = function(c) {
            return void 0 === c ? "-" : c.toDateString()
        };
        f.prototype._deleteTopic = function(c, a) {
            var b = this._topicGuidMap.get(a.getTopicId());
            void 0 !== b && (b = document.getElementById(b), null !== b && null !== b.parentElement && b.parentElement.removeChild(b));
            return c.getTopics().delete(a.getTopicId())
        };
        f.prototype._buildDeleteTopic = function(c, a) {
            var b =
                this,
                d = document.createElement("button");
            d.textContent = "Delete Topic";
            d.classList.add("ui-bcf-delete");
            d.onclick = function() {
                return __awaiter(b, void 0, void 0, function() {
                    return __generator(this, function(d) {
                        this._deleteTopic(c, a);
                        return [2]
                    })
                })
            };
            return d
        };
        f.prototype._setTopicTitle = function(c, a) {
            var b = this._topicTitleGuidMap.get(c.getTopicId());
            void 0 !== b && (b = document.getElementById(b), null !== b && (b.textContent = a));
            c.getMarkup().setTopicTitle(a)
        };
        f.prototype._buildTopic = function(c, a) {
            var b = this,
                d = this._getId(),
                g = a.getTopicId();
            this._topicGuidMap.set(g, d);
            d = this._buildDiv(d, "", "ui-bcf-topic");
            var e = a.getMarkup(),
                f = e.getTopicTitle(),
                h = d.appendChild(this._buildDiv(this._getId(), "", "index-and-title")),
                l = e.getTopicIndex();
            null !== l && (l = "<b>Index</b>: " + l, h.appendChild(this._buildDiv(this._getId(), l, "index")));
            l = this._getId();
            this._topicTitleGuidMap.set(g, l);
            h.appendChild(this._buildEditDiv(l, f, "Topic Title", function(d) {
                b._setTopicTitle(a, d)
            }, "title"));
            f = a.getViewpoint("viewpoint.bcfv");
            null !== f && (h = this._getId(),
                this._viewpointIdMap.set(h, f), h = this._buildDiv(h, "", "viewpoint"), f = a.getSnapshot(f.getFilename()), null !== f && h.appendChild(this._buildImage(f.getUrl())), d.appendChild(h));
            f = this._buildDiv(this._getId(), "");
            f.appendChild(this._buildTopicData("Author", e.getTopicCreationAuthor()));
            f.appendChild(this._buildTopicData("Description", e.getTopicDescription()));
            f.appendChild(this._buildTopicData("Created", this._formatDate(e.getTopicCreationDate())));
            f.appendChild(this._buildTopicData("Type", e.getTopicType()));
            f.appendChild(this._buildTopicData("Priority", e.getTopicPriority()));
            f.appendChild(this._buildTopicData("Stage", e.getTopicStage()));
            f.appendChild(this._buildTopicData("TopicId", a.getTopicId()));
            d.appendChild(f);
            e = this._getId();
            var p = this._buildDiv(e, "");
            this._topicCommentsGuidMap.set(g, e);
            a.getMarkup().getComments().forEach(function(d) {
                p.appendChild(b._buildComment(a, d))
            });
            d.appendChild(p);
            g = this._buildAddComment(a);
            g.appendChild(this._buildDeleteTopic(c, a));
            d.appendChild(g);
            return d
        };
        f.prototype._buildSelectOption =
            function(c, a) {
                var b = document.createElement("option");
                b.id = this._getSelectId(a);
                b.value = a;
                b.textContent = c;
                return b
            };
        f.prototype._appendBCF = function(c, a) {
            var b = this,
                d = this._viewer.BCFManager.getBCFData(c);
            if (null !== d) {
                var g = this._getId();
                this._showBCFData(g);
                this._bcfIdMap.set(g, c);
                this._bcfDataList.appendChild(this._buildSelectOption(c + ". " + a, g));
                this._bcfDataList.value = g;
                var e = this._buildBCFNode(g);
                this._listRoot.appendChild(e);
                e.appendChild(this._buildRemoveBCF(d.getId()));
                e.appendChild(this._buildAddTopic(d));
                d.getTopics().forEach(function(a) {
                    a = b._buildTopic(d, a);
                    e.appendChild(a)
                });
                this._refreshScroll()
            }
        };
        f.prototype._getBcfHtmlId = function(c) {
            var a = null;
            this._bcfIdMap.forEach(function(b, d) {
                c === b && (a = d)
            });
            return a
        };
        f.prototype._removeBCF = function(c) {
            c = this._getBcfHtmlId(c);
            null !== c && (this._bcfIdMap.delete(c), $("#" + c).remove(), $("#" + this._getSelectId(c)).remove(), c = this._bcfDataList.value, 0 < c.length && this._showBCFData(c))
        };
        f.prototype._getViewpointFromComment = function(c, a) {
            a = a.getViewpointGuid();
            return null !==
                a && (a = c.getMarkup().getViewpoints().get(a), void 0 !== a && (a = a.getViewpointFilename(), null !== a)) ? c.getViewpoint(a) : null
        };
        f.prototype._getId = function() {
            return "bcf_" + ++this._idCount
        };
        f.prototype._getSelectId = function(c) {
            return "select_" + c
        };
        f.prototype._onTreeSelectItem = function(c) {
            return __awaiter(this, void 0, void 0, function() {
                var a;
                return __generator(this, function(b) {
                    switch (b.label) {
                        case 0:
                            return a = this._getViewpoint(c), null === a ? [3, 2] : [4, a.activate()];
                        case 1:
                            b.sent(), b.label = 2;
                        case 2:
                            return [2]
                    }
                })
            })
        };
        f.prototype._getViewpoint = function(c) {
            return this._viewpointIdMap.get(c) || null
        };
        return f
    }();
    f.BCFTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._annotationViewsString = "annotationViews";
            a._annotationViewsLabel = "Annotation Views";
            a._viewFolderCreated = !1;
            a._lastSelectedhtmlId = null;
            a._cadViewIds = new Set;
            a._tree.setCreateVisibilityItems(!1);
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype._initEvents = function() {
            var a = this;
            this._viewer.setCallbacks({
                firstModelLoaded: function(b, d) {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(a) {
                            d ||
                                this._updateCadViews();
                            return [2]
                        })
                    })
                },
                subtreeLoaded: function() {
                    a._updateCadViews()
                },
                configurationActivated: function() {
                    a._tree.clear();
                    a._cadViewIds.clear();
                    a._viewFolderCreated = !1;
                    a._updateCadViews()
                },
                modelSwitched: function() {
                    a._modelSwitched()
                },
                sheetActivated: function() {
                    if (a._viewer.model.isDrawing()) {
                        if (null != a._lastSelectedhtmlId) {
                            var b = document.getElementById(a._lastSelectedhtmlId);
                            null !== b && b.classList.remove("selected")
                        }
                        a.hideTab()
                    }
                },
                sheetDeactivated: function() {
                    a._viewer.model.isDrawing() &&
                        a.showTab()
                },
                cadViewCreated: function(b, d) {
                    var c = new Map;
                    c.set(b, d);
                    a._addCadViews(c)
                }
            });
            this._tree.registerCallback("selectItem", function(b) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onTreeSelectItem(b)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._modelSwitched = function() {
            this._tree.clear();
            this._cadViewIds.clear();
            this._viewFolderCreated = !1;
            this._updateCadViews()
        };
        c.prototype._updateCadViews = function() {
            var a = this._viewer.model.getCadViewMap();
            this._addCadViews(a)
        };
        c.prototype._addCadViews = function(a) {
            this._createCadViewNodes(a);
            0 >= a.size ? this.hideTab() : this.showTab();
            this._tree.expandInitialNodes(this._internalId);
            this._tree.expandInitialNodes(this._internalId + this._annotationViewsString)
        };
        c.prototype._allowView = function(a) {
            var b = this._viewer.model.getActiveCadConfiguration();
            a = this._viewer.model.getCadViewConfiguration(a);
            return null === b || null === a || a === b
        };
        c.prototype._createCadViewNodes = function(a) {
            var b = this;
            if (0 !== a.size) {
                this._viewFolderCreated ||
                    (this._tree.appendTopLevelElement("Views", this._internalId, "viewfolder", !0), this._viewFolderCreated = !0);
                var d = this._viewer.model,
                    c = !0 === this._viewer.getCreationParameters().enableShatteredModelUiViews,
                    e = function(a) {
                        return b._allowView(a) && (c || !d.isWithinExternalModel(a))
                    };
                a.forEach(function(a, c) {
                    b._cadViewIds.has(c) || !e(c) || d.isAnnotationView(c) || (b._cadViewIds.add(c), b._tree.addChild(a, b._cadViewId(c), b._internalId, "view", !1, f.Desktop.Tree.CadView))
                });
                a.forEach(function(a, c) {
                    !b._cadViewIds.has(c) &&
                        e(c) && d.isAnnotationView(c) && null === document.getElementById(b._internalId + b._annotationViewsString) && b._tree.addChild(b._annotationViewsLabel, b._internalId + b._annotationViewsString, b._internalId, "viewfolder", !0, f.Desktop.Tree.CadView)
                });
                a.forEach(function(a, c) {
                    !b._cadViewIds.has(c) && e(c) && d.isAnnotationView(c) && (b._cadViewIds.add(c), a = a.split("# Annotation View")[0], b._tree.addChild(a, b._cadViewId(c), b._internalId + b._annotationViewsString, "view", !1, f.Desktop.Tree.CadView))
                })
            }
        };
        c.prototype._onTreeSelectItem =
            function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, c;
                    return __generator(this, function(g) {
                        switch (g.label) {
                            case 0:
                                b = this._splitHtmlId(a);
                                if (b[0] !== this._internalId) return [3, 3];
                                d = this._viewer.operatorManager.getOperator(e.OperatorId.Handle);
                                return [4, d.removeHandles()];
                            case 1:
                                return g.sent(), [4, this._viewer.model.activateCadView(parseInt(b[1], 10))];
                            case 2:
                                g.sent(), g.label = 3;
                            case 3:
                                return c = document.getElementById(a), null !== c && ("LI" === c.tagName && a !== this._internalId && a !== this._internalId +
                                    this._annotationViewsString ? (c.classList.add("selected"), this._lastSelectedhtmlId = a) : c.classList.remove("selected")), [2]
                        }
                    })
                })
            };
        c.prototype._cadViewId = function(a) {
            return this._internalId + f.ViewTree.separator + a
        };
        return c
    }(f.ViewTree);
    f.CadViewTree = l;
    f.CADViewTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._tree.setCreateVisibilityItems(!1);
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype._initEvents = function() {
            var a = this;
            this._viewer.setCallbacks({
                firstModelLoaded: function() {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return [4, this._onNewModel()];
                                case 1:
                                    return a.sent(), [2]
                            }
                        })
                    })
                },
                modelSwitched: function() {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this,
                            function(a) {
                                switch (a.label) {
                                    case 0:
                                        return [4, this._modelSwitched()];
                                    case 1:
                                        return a.sent(), [2]
                                }
                            })
                    })
                },
                configurationActivated: function(b) {
                    a._tree.selectItem(a._configurationsId(b), !1)
                }
            });
            this._tree.registerCallback("selectItem", function(b) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onTreeSelectItem(b)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._modelSwitched = function() {
            return this._onNewModel()
        };
        c.prototype._onNewModel = function() {
            return __awaiter(this,
                void 0, void 0,
                function() {
                    var a;
                    return __generator(this, function(b) {
                        switch (b.label) {
                            case 0:
                                return a = this._viewer.model, [4, a.cadConfigurationsEnabled()];
                            case 1:
                                if (!b.sent()) return [3, 4];
                                if (!this._createConfigurationNodes()) return [3, 3];
                                this.showTab();
                                return [4, a.activateDefaultCadConfiguration()];
                            case 2:
                                return b.sent(), [3, 4];
                            case 3:
                                this.hideTab(), b.label = 4;
                            case 4:
                                return null === a.getDefaultCadView() ? [3, 6] : [4, a.activateDefaultCadView()];
                            case 5:
                                b.sent(), b.label = 6;
                            case 6:
                                return [2]
                        }
                    })
                })
        };
        c.prototype._createConfigurationNodes =
            function() {
                var a = this._viewer.model.getCadConfigurations(),
                    b = Object.keys(a);
                if (0 < b.length) {
                    this._tree.appendTopLevelElement("Configurations", this._internalId, "configurations", !0);
                    for (var d = 0; d < b.length; d++) {
                        var c = parseInt(b[d], 10);
                        this._tree.addChild(a[c], this._configurationsId(c), this._internalId, "view", !1, f.Desktop.Tree.Configurations)
                    }
                    this._tree.expandInitialNodes(this._internalId);
                    return !0
                }
                return !1
            };
        c.prototype._onTreeSelectItem = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b;
                return __generator(this, function(d) {
                    switch (d.label) {
                        case 0:
                            return b = this._splitHtmlId(a), this._internalId !== b[0] ? [3, 3] : [4, this._viewer.operatorManager.getOperator(e.OperatorId.Handle).removeHandles()];
                        case 1:
                            return d.sent(), [4, this._viewer.model.activateCadConfiguration(parseInt(b[1], 10))];
                        case 2:
                            d.sent(), d.label = 3;
                        case 3:
                            return [2]
                    }
                })
            })
        };
        c.prototype._configurationsId = function(a) {
            return this._internalId + f.ViewTree.separator + a
        };
        return c
    }(f.ViewTree);
    f.ConfigurationsTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator ||
(Communicator = {}));
(function(e) {
(function(e) {
    var f = function(f) {
        function c(a, b, d) {
            a = f.call(this, a, b, d) || this;
            a._tree.setCreateVisibilityItems(!1);
            a._initEvents();
            return a
        }
        __extends(c, f);
        c.prototype._initEvents = function() {
            var a = this,
                b = function() {
                    a._onNewModel()
                };
            this._viewer.setCallbacks({
                assemblyTreeReady: b,
                firstModelLoaded: b,
                modelSwitched: b,
                subtreeLoaded: b
            });
            this._tree.registerCallback("selectItem", function(d) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onTreeSelectItem(d)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._onTreeSelectItem = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d;
                return __generator(this, function(c) {
                    switch (c.label) {
                        case 0:
                            b = document.getElementById(a);
                            if (null === b) return [2];
                            d = this._splitHtmlId(a);
                            return d[0] !== this._internalId ? [3, 2] : [4, this._setFilter(parseInt(d[1], 10))];
                        case 1:
                            c.sent(), c.label = 2;
                        case 2:
                            return [2]
                    }
                })
            })
        };
        c.prototype._setFilter = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, c;
                return __generator(this,
                    function(g) {
                        switch (g.label) {
                            case 0:
                                return [4, this._viewer.model];
                            case 1:
                                b = g.sent();
                                d = b.getNodesFromFiltersId([a]);
                                if (null === d) return [3, 10];
                                c = [];
                                d.nodeIds.forEach(function(a) {
                                    c.push(a)
                                });
                                return [4, this._viewer.pauseRendering()];
                            case 2:
                                return g.sent(), [4, b.reset()];
                            case 3:
                                return g.sent(), d.isInclusive ? [4, b.setNodesVisibility([b.getAbsoluteRootNode()], !1)] : [3, 6];
                            case 4:
                                return g.sent(), [4, b.setNodesVisibility(c, !0)];
                            case 5:
                                return g.sent(), [3, 8];
                            case 6:
                                return [4, b.setNodesVisibility(c, !1)];
                            case 7:
                                g.sent(),
                                    g.label = 8;
                            case 8:
                                return [4, this._viewer.resumeRendering()];
                            case 9:
                                g.sent(), g.label = 10;
                            case 10:
                                return [2]
                        }
                    })
            })
        };
        c.prototype._onNewModel = function() {
            var a = this;
            this._tree.clear();
            var b = this._viewer.model.getFilters();
            b.forEach(function(d, b) {
                a._tree.appendTopLevelElement(d, a.getFilterId(b), "assembly", !1)
            });
            0 < b.size ? this.showTab() : this.hideTab()
        };
        c.prototype.getFilterId = function(a) {
            return this._internalId + e.ViewTree.separator + a
        };
        return c
    }(e.ViewTree);
    e.FiltersTree = f
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._layerNames = [];
            a._layerParts = new Set;
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype._initEvents = function() {
            var a = this,
                b = function() {
                    a._onNewModel()
                };
            this._viewer.setCallbacks({
                firstModelLoaded: b,
                modelSwitched: b,
                subtreeLoaded: b,
                selectionArray: function(d) {
                    if (0 !== a._layerNames.length) {
                        a._tree.updateSelection(d);
                        for (var b = 0; b < d.length; b++) {
                            var c = d[b].getSelection().getNodeId();
                            if (null !== c) {
                                for (var e = 0, f = a._viewer.model.getNodeChildren(c); e <
                                    f.length; e++) a._expandPart(f[e]);
                                a._expandPart(c)
                            }
                        }
                    }
                },
                visibilityChanged: function() {
                    a._tree.updateLayersVisibilityIcons()
                }
            });
            this._tree.registerCallback("selectItem", function(d, b) {
                a._onTreeSelectItem(d, b)
            });
            this._tree.registerCallback("loadChildren", function(d) {
                a._loadNodeChildren(d)
            })
        };
        c.prototype._onTreeSelectItem = function(a, b) {
            void 0 === b && (b = e.SelectionMode.Set);
            if (null !== document.getElementById(a)) switch (this._splitHtmlId(a)[0]) {
                case "layerpart":
                    this._selectLayerPart(a, b);
                    break;
                case "layer":
                    this._selectLayer(a,
                        b)
            }
        };
        c.prototype._selectLayerPart = function(a, b) {
            a = c.getPartId(a);
            null !== a && this._viewer.selectPart(a, b)
        };
        c.prototype._selectLayer = function(a, b) {
            a = c.getLayerName(a);
            null !== a && this._viewer.selectionManager.selectLayer(a, b)
        };
        c.prototype._onNewModel = function() {
            var a = this,
                b = this._viewer.model;
            this._tree.clear();
            this._layerParts.clear();
            this._layerNames = b.getUniqueLayerNames().sort();
            this._layerNames.filter(function(d) {
                var g = c._createLayerId();
                c._layerIdMap.set(g, d);
                c._idLayerMap.set(d, g);
                var e = b.getLayerIdsFromName(d);
                return null !== e && 0 < e.length ? (a._tree.appendTopLevelElement(d, g, "assembly", !0, !1), !0) : !1
            });
            0 < this._layerNames.length ? this.showTab() : this.hideTab()
        };
        c.prototype._loadNodeChildren = function(a) {
            var b = c.getLayerName(a);
            null !== b && (a = c.getLayerId(b), null !== a && (b = this._viewer.model.getNodesFromLayerName(b, !0), null !== b && (b.length < this._maxNodeChildrenSize ? this._addLayerParts(a, b) : this._addLayerPartContainers(a, b))))
        };
        c.prototype._addLayerParts = function(a, b) {
            var d = this,
                g = this._viewer.model,
                m = g.isDrawing();
            b.forEach(function(b) {
                var k =
                    g.getNodeType(b),
                    h = g.getModelFileTypeFromNode(b);
                m || h === e.FileType.Dwg || k !== e.NodeType.BodyInstance || (k = g.getNodeParent(b), null !== k && (b = k));
                k = g.getNodeName(b);
                h = c._createPartId(b);
                c._layerPartIdMap.set(h, b);
                c._idLayerPartMap.set(b, h);
                d._layerParts.has(b) || (d._layerParts.add(b), d._tree.addChild(k, h, a, "assembly", !1, f.Desktop.Tree.Layers))
            })
        };
        c.prototype._addLayerPartContainers = function(a, b) {
            for (var d = Math.ceil(b.length / this._maxNodeChildrenSize), g = [], e = 0; e < d; ++e) {
                var k = e * this._maxNodeChildrenSize,
                    h =
                    Math.min(k + this._maxNodeChildrenSize, b.length),
                    l = "Child Nodes " + k + " - " + h,
                    p = c._createContainerId();
                g.push(p);
                this._tree.addChild(l, p, a, "container", !0, f.Desktop.Tree.Layers);
                this._addLayerParts(p, b.slice(k, h))
            }
            c._layerContainersMap.set(a, g)
        };
        c.prototype._expandPart = function(a) {
            if (this._viewer.model.isNodeLoaded(a)) {
                var b = this._viewer.model.getNodeLayerId(a);
                if (null !== b) {
                    var d = this._viewer.model.getLayerName(b);
                    if (null !== d && (b = c.getLayerId(d), null !== b)) {
                        var g = this._viewer.model.getNodesFromLayerName(d,
                            !0);
                        null !== g && (d = null, g.length >= this._maxNodeChildrenSize && (a = g.indexOf(a), a = Math.floor(a / this._maxNodeChildrenSize), g = c._layerContainersMap.get(b), void 0 !== g && a < g.length && (d = g[a])), this._tree.expandChildren(b), null !== d && this._tree.expandChildren(d))
                    }
                }
            }
        };
        c._createLayerId = function() {
            return "" + c.layerPrefix + c.separator + ++this._idCount
        };
        c._createContainerId = function() {
            return "" + c.layerPartContainerPrefix + c.separator + ++this._idCount
        };
        c._createPartId = function(a) {
            return "" + c.layerPartPrefix + c.separator +
                a
        };
        c.getLayerName = function(a) {
            return this._layerIdMap.get(a) || null
        };
        c.getLayerId = function(a) {
            return this._idLayerMap.get(a) || null
        };
        c.getPartId = function(a) {
            return this._layerPartIdMap.get(a) || null
        };
        c.getLayerPartId = function(a) {
            return this._idLayerPartMap.get(a) || null
        };
        c.layerPrefix = "layer";
        c.layerPartPrefix = "layerpart";
        c.layerPartContainerPrefix = "layerpartcontainer";
        c._idCount = 0;
        c._layerIdMap = new Map;
        c._idLayerMap = new Map;
        c._layerPartIdMap = new Map;
        c._idLayerPartMap = new Map;
        c._layerContainersMap = new Map;
        return c
    }(f.ViewTree);
    f.LayersTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._lastModelRoot = null;
            a._startedWithoutModelStructure = !1;
            a._partSelectionEnabled = !0;
            a._currentSheetId = null;
            a._measurementFolderId = "measurementitems";
            a._updateVisibilityStateTimer = new e.Util.Timer;
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype.freezeExpansion = function(a) {
            this._tree.freezeExpansion(a)
        };
        c.prototype.modelStructurePresent = function() {
            var a = this._viewer.model;
            return "No product structure" !== a.getNodeName(a.getAbsoluteRootNode())
        };
        c.prototype.enablePartSelection = function(a) {
            this._partSelectionEnabled = a
        };
        c.prototype._initEvents = function() {
            var a = this,
                b = function() {
                    a._reset()
                };
            this._viewer.setCallbacks({
                assemblyTreeReady: function() {
                    a._onNewModel()
                },
                firstModelLoaded: b,
                hwfParseComplete: b,
                modelSwitched: b,
                selectionArray: function(d) {
                    a._onPartSelection(d)
                },
                visibilityChanged: function() {
                    a._tree.getVisibilityControl().updateModelTreeVisibilityState()
                },
                viewCreated: function(d) {
                    a._onNewView(d)
                },
                viewLoaded: function(d) {
                    a._onNewView(d)
                },
                subtreeLoaded: function(d) {
                    a._onSubtreeLoaded(d);
                    a._tree.getVisibilityControl().updateModelTreeVisibilityState()
                },
                subtreeDeleted: function(d) {
                    a._onSubtreeDeleted(d)
                },
                modelSwitchStart: function() {
                    a._tree.clear()
                },
                measurementCreated: function(d) {
                    a._onNewMeasurement(d)
                },
                measurementLoaded: function(d) {
                    a._onNewMeasurement(d)
                },
                measurementDeleted: function(d) {
                    a._onDeleteMeasurement(d)
                },
                measurementShown: function() {
                    a._tree.updateMeasurementVisibilityIcons()
                },
                measurementHidden: function() {
                    a._tree.updateMeasurementVisibilityIcons()
                },
                sheetActivated: function(d) {
                    d !==
                        a._currentSheetId && (a._currentSheetId = d, a._refreshModelTree(d))
                },
                sheetDeactivated: function() {
                    a._reset()
                },
                configurationActivated: function(d) {
                    a._refreshModelTree(d)
                }
            });
            this._tree.registerCallback("loadChildren", function(d) {
                a._loadNodeChildren(d)
            });
            this._tree.registerCallback("selectItem", function(d, b) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onTreeSelectItem(d, b)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._refreshModelTree =
            function(a) {
                this._tree.clear();
                var b = this._viewer.model,
                    d = b.getAbsoluteRootNode(),
                    c = b.getNodeName(d);
                this._tree.appendTopLevelElement(c, this._partId(d), "modelroot", 0 < b.getNodeChildren(d).length, !1, !0);
                this._tree.addChild(b.getNodeName(a), this._partId(a), this._partId(d), "part", !0, f.Desktop.Tree.Model);
                this._tree.expandInitialNodes(this._partId(d));
                this._refreshMarkupViews()
            };
        c.prototype._reset = function() {
            this._tree.clear();
            this._currentSheetId = null;
            this._onNewModel()
        };
        c.prototype._onNewModel = function() {
            var a =
                this._viewer.model,
                b = a.getAbsoluteRootNode(),
                d = a.getNodeName(b);
            this.showTab();
            this._startedWithoutModelStructure = !this.modelStructurePresent();
            this._lastModelRoot = this._tree.appendTopLevelElement(d, this._partId(b), "modelroot", 0 < a.getNodeChildren(b).length);
            this._viewer.sheetManager.isDrawingSheetActive() || this._tree.expandInitialNodes(this._partId(b));
            this._refreshMarkupViews()
        };
        c.prototype._createMarkupViewFolderIfNecessary = function() {
            0 === $("#markupviews").length && this._tree.appendTopLevelElement("Markup Views",
                "markupviews", "viewfolder", !1)
        };
        c.prototype._createMeasurementFolderIfNecessary = function() {
            0 === $("#" + this._measurementFolderId).length && this._tree.appendTopLevelElement("Measurements", this._measurementFolderId, "measurement", !1)
        };
        c.prototype._parentChildrenLoaded = function(a) {
            a = this._partId(a);
            return this._tree.childrenAreLoaded(a)
        };
        c.prototype._onSubtreeLoaded = function(a) {
            for (var b = this._viewer.model, d = 0; d < a.length; d++) {
                var c = a[d];
                if (!b.getOutOfHierarchy(c)) {
                    var e = b.getNodeParent(c);
                    if (null === e) console.assert(null !==
                        this._lastModelRoot), this._lastModelRoot = this._tree._insertNodeAfter(b.getNodeName(c), this._partId(c), "modelroot", this._lastModelRoot, !0);
                    else {
                        var k = e;
                        do {
                            if (this._parentChildrenLoaded(e)) {
                                k === e && this._tree.addChild(b.getNodeName(c), this._partId(c), this._partId(e), "assembly", !0, f.Desktop.Tree.Model);
                                this._tree.preloadChildrenIfNecessary(this._partId(c));
                                break
                            }
                            c = e;
                            e = b.getNodeParent(c)
                        } while (null !== e)
                    }
                }
            }
            this._startedWithoutModelStructure && (a = this._tree.getRoot(), null !== a.firstChild && a.removeChild(a.firstChild),
                a = this._tree.getPartVisibilityRoot(), null !== a.firstChild && a.removeChild(a.firstChild))
        };
        c.prototype._onSubtreeDeleted = function(a) {
            for (var b = 0; b < a.length; b++) this._tree.deleteNode(this._partId(a[b]))
        };
        c.prototype._buildTreePathForNode = function(a) {
            for (var b = this._viewer.model, d = [], c = b.getNodeParent(a); null !== c && (!this._viewer.sheetManager.isDrawingSheetActive() || null === this._currentSheetId || c !== this._currentSheetId && a !== this._currentSheetId);) d.push(c), c = b.getNodeParent(c);
            d.reverse();
            return d
        };
        c.prototype._expandCorrectContainerForNodeId =
            function(a) {
                var b = this._viewer.model,
                    d = b.getNodeParent(a);
                null !== d && (a = b.getNodeChildren(d).indexOf(a), 0 <= a && this._tree.expandChildren(this._containerId(d, Math.floor(a / this._maxNodeChildrenSize))))
            };
        c.prototype._expandPmiFolder = function(a) {
            a = this._viewer.model.getNodeParent(a);
            null !== a && this._tree.expandChildren(this._pmiFolderId(a))
        };
        c.prototype._isInsideContainer = function(a) {
            a = this._viewer.model.getNodeParent(a);
            if (null === a) return !1;
            a = this._containerId(a, 0);
            return 0 < $("#" + a).length
        };
        c.prototype._isInsidePmiFolder =
            function(a) {
                a = this._viewer.model.getNodeParent(a);
                if (null === a) return !1;
                a = this._pmiFolderId(a);
                return 0 < $("#" + a).length
            };
        c.prototype._expandPart = function(a) {
            if (this._viewer.model.isNodeLoaded(a)) {
                for (var b = 0, d = this._buildTreePathForNode(a); b < d.length; b++) {
                    var c = d[b];
                    this._isInsideContainer(c) && this._expandCorrectContainerForNodeId(c);
                    c = $("#" + this._partId(c)).attr("id");
                    void 0 !== c && this._tree.expandChildren(c)
                }
                this._isInsideContainer(a) && this._expandCorrectContainerForNodeId(a);
                this._isInsidePmiFolder(a) &&
                    this._expandPmiFolder(a);
                this._tree.selectItem(this._partId(a), !1)
            }
        };
        c.prototype._onPartSelection = function(a) {
            if (this._partSelectionEnabled) {
                for (var b = 0; b < a.length; b++) {
                    var d = a[b].getSelection().getNodeId();
                    null === d ? this._tree.selectItem(null, !1) : this._expandPart(d)
                }
                0 === a.length && this._tree.updateSelection(null)
            }
        };
        c.prototype._createContainerNodes = function(a, b) {
            for (var d = 1, c = this._maxNodeChildrenSize, e = 0; !(this._tree.addChild("Child Nodes " + d + " - " + Math.min(c, b.length), this._containerId(a, e), this._partId(a),
                    "container", !0, f.Desktop.Tree.Model), d += this._maxNodeChildrenSize, ++e, c >= b.length);) c += this._maxNodeChildrenSize
        };
        c.prototype._loadAssemblyNodeChildren = function(a) {
            var b = this._viewer.model.getNodeChildren(a);
            b.length > this._maxNodeChildrenSize ? this._createContainerNodes(a, b) : (a = this._partId(a), this._processNodeChildren(b, a))
        };
        c.prototype._loadContainerChildren = function(a) {
            var b = this._viewer.model,
                d = this._splitHtmlId(a);
            d = this._splitContainerId(d[1]);
            b = b.getNodeChildren(parseInt(d[0], 10));
            d = this._maxNodeChildrenSize *
                parseInt(d[1], 10);
            b = b.slice(d, d + this._maxNodeChildrenSize);
            this._processNodeChildren(b, a)
        };
        c.prototype._processNodeChildren = function(a, b) {
            for (var d = this, c = this._viewer.model, m = null, k = 0; k < a.length; k++) {
                var h = a[k],
                    l = c.getNodeName(h),
                    p = b,
                    n = "assembly",
                    q = !1;
                switch (c.getNodeType(h)) {
                    case e.NodeType.Body:
                    case e.NodeType.BodyInstance:
                        n = "body";
                        break;
                    case e.NodeType.Pmi:
                        if (null === m) {
                            var t = this._viewer.model.getNodeParent(h);
                            null !== t && (m = this._tree.addChild("PMI", this._pmiFolderId(t), b, "modelroot", !0, f.Desktop.Tree.Model,
                                !0, !0))
                        }
                        null !== m && (p = m.id, n = "assembly");
                        break;
                    case e.NodeType.DrawingSheet:
                        this._viewer.sheetManager.isDrawingSheetActive() || (q = !0)
                }
                q || this._tree.addChild(l, this._partId(h), p, n, 0 < c.getNodeChildren(h).length, f.Desktop.Tree.Model)
            }
            0 < a.length && this._updateVisibilityStateTimer.set(50, function() {
                d._tree.getVisibilityControl().updateModelTreeVisibilityState()
            })
        };
        c.prototype._loadNodeChildren = function(a) {
            var b = this._splitHtmlId(a);
            switch (b["" === b[0] ? 1 : 0]) {
                case "part":
                    a = parseInt(b[1], 10);
                    this._loadAssemblyNodeChildren(a);
                    break;
                case "container":
                    this._loadContainerChildren(a);
                    break;
                case "markupviews":
                case "measurementitems":
                case "pmipart":
                    break;
                default:
                    console.assert(!1)
            }
        };
        c.prototype._onTreeSelectItem = function(a, b) {
            void 0 === b && (b = e.SelectionMode.Set);
            return __awaiter(this, void 0, void 0, function() {
                var d, c, e, f;
                return __generator(this, function(g) {
                    switch (g.label) {
                        case 0:
                            d = document.getElementById(a);
                            if (null === d) return [2];
                            "LI" === d.tagName && "markupviews" !== a ? d.classList.add("selected") : (c = document.getElementById("markupviews"),
                                null !== c && c.classList.remove("selected"));
                            0 === a.lastIndexOf("pmi", 0) && d.classList.contains("ui-modeltree-item") && d.classList.remove("selected");
                            e = this._splitHtmlId(a);
                            f = e[0];
                            switch (f) {
                                case "part":
                                    return [3, 1];
                                case "markupview":
                                    return [3, 2];
                                case "container":
                                    return [3, 4]
                            }
                            return [3, 5];
                        case 1:
                            return this._viewer.selectPart(parseInt(e[1], 10), b), [3, 5];
                        case 2:
                            return [4, this._viewer.markupManager.activateMarkupViewWithPromise(e[1])];
                        case 3:
                            return g.sent(), [3, 5];
                        case 4:
                            return this._onContainerClick(e[1]), [3, 5];
                        case 5:
                            return [2]
                    }
                })
            })
        };
        c.prototype._onContainerClick = function(a) {};
        c.prototype._onNewView = function(a) {
            this._createMarkupViewFolderIfNecessary();
            this._addMarkupView(a)
        };
        c.prototype._refreshMarkupViews = function() {
            for (var a = this._viewer.markupManager, b = 0, d = a.getMarkupViewKeys(); b < d.length; b++) {
                var c = a.getMarkupView(d[b]);
                null !== c && this._addMarkupView(c)
            }
        };
        c.prototype._addMarkupView = function(a) {
            this._createMarkupViewFolderIfNecessary();
            var b = this._viewId(a.getUniqueId());
            this._tree.addChild(a.getName(),
                b, "markupviews", "view", !1, f.Desktop.Tree.Model)
        };
        c.prototype._onNewMeasurement = function(a) {
            this._createMeasurementFolderIfNecessary();
            var b = this._measurementId(a._getId());
            this._tree.addChild(a.getName(), b, this._measurementFolderId, "measurement", !1, f.Desktop.Tree.Model);
            this._updateMeasurementsFolderVisibility();
            this._tree.updateMeasurementVisibilityIcons()
        };
        c.prototype._onDeleteMeasurement = function(a) {
            a = this._measurementId(a._getId());
            this._tree.deleteNode(a);
            this._tree.deleteNode("visibility" + c.separator +
                a);
            this._updateMeasurementsFolderVisibility()
        };
        c.prototype._updateMeasurementsFolderVisibility = function() {
            var a = this._viewer.measureManager.getAllMeasurements(),
                b = document.getElementById(this._measurementFolderId);
            null !== b && (b.style.display = a.length ? "inherit" : "none");
            b = document.getElementById("visibility" + c.separator + this._measurementFolderId);
            null !== b && (b.style.display = a.length ? "inherit" : "none")
        };
        c.prototype._measurementId = function(a) {
            return "measurement" + c.separator + a
        };
        c.prototype._partId = function(a) {
            return "part" +
                c.separator + a
        };
        c.prototype._pmiFolderId = function(a) {
            return "pmipartfolder" + c.separator + a
        };
        c.prototype._viewId = function(a) {
            return "markupview" + c.separator + a
        };
        c.prototype._containerId = function(a, b) {
            console.assert(0 <= b);
            return "container" + c.separator + a + "-" + b
        };
        c.prototype._splitContainerId = function(a) {
            return this._splitHtmlIdParts(a, "-")
        };
        c.prototype.updateSelection = function(a) {
            this._tree.updateSelection(a)
        };
        return c
    }(f.ViewTree);
    f.ModelTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._currentNodeId = 0;
            a._currentBimNodeId = "0";
            a._tree.setCreateVisibilityItems(!1);
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype._initEvents = function() {
            var a = this,
                b = function() {
                    a._onNewModel()
                };
            this._viewer.setCallbacks({
                firstModelLoaded: b,
                modelSwitched: b,
                subtreeLoaded: b,
                selectionArray: function(d) {
                    return __awaiter(a, void 0, void 0, function() {
                        return __generator(this, function(a) {
                            switch (a.label) {
                                case 0:
                                    return [4,
                                        this._onTreeSelectItem(d)
                                    ];
                                case 1:
                                    return a.sent(), [2]
                            }
                        })
                    })
                }
            });
            this._tree.registerCallback("loadChildren", function(d) {
                a._loadNodeChildren(d)
            });
            this._tree.registerCallback("selectItem", function(d) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onclickItemButton(d)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            });
            this._tree.registerCallback("clickItemButton", function(d) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4,
                                    this._onSelectRelationships(d)
                                ];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._onTreeSelectItem = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, c, e, f;
                return __generator(this, function(g) {
                    b = 0;
                    for (d = a; b < d.length; b++) c = d[b], e = c.getSelection().getNodeId(), null === e ? this._tree.selectItem(null, !1) : (f = this._viewer.model.getBimIdFromNode(e), null !== f && (this._currentNodeId = e, this._currentBimNodeId = f, this._update()));
                    return [2]
                })
            })
        };
        c.prototype._translateTypeRelationshipToString = function(a) {
            var b =
                "Type Unknown";
            a !== e.RelationshipType.Undefined && (b = e.RelationshipType[a]);
            return b
        };
        c.prototype._translateStringTypeToRelationshipType = function(a) {
            switch (a) {
                case "ContainedInSpatialStructure":
                    a = e.RelationshipType.ContainedInSpatialStructure;
                    break;
                case "FillsElement":
                    a = e.RelationshipType.FillsElement;
                    break;
                case "Aggregates":
                    a = e.RelationshipType.Aggregates;
                    break;
                case "VoidsElement":
                    a = e.RelationshipType.VoidsElement;
                    break;
                case "SpaceBoundary":
                    a = e.RelationshipType.SpaceBoundary;
                    break;
                case "ConnectsPathElements":
                    a =
                        e.RelationshipType.ConnectsPathElements;
                    break;
                default:
                    a = e.RelationshipType.Undefined
            }
            return a
        };
        c._createIdNode = function(a) {
            return "" + c.RelationshipPartPrefix + c.separator + a + c.separator + ++this._idCount
        };
        c._createIdType = function() {
            return "" + c.RelationshipTypePrefix + c.separator + ++this._idCount
        };
        c.getRelationshipTypeName = function(a) {
            return this._idNameMap.get(a) || null
        };
        c.getRelationshipTypeId = function(a) {
            return this._nameIdMap.get(a) || null
        };
        c.prototype._onNewModel = function() {
            var a = this._viewer.model;
            this._tree.clear();
            this._currentNodeId = a.getAbsoluteRootNode();
            this._currentBimNodeId = this._currentNodeId.toString()
        };
        c.prototype._update = function() {
            this._tree.clear();
            for (var a = 0, b = this._viewer.model.getRelationshipTypesFromBimId(this._currentNodeId, this._currentBimNodeId); a < b.length; a++) {
                var d = b[a],
                    g = c._createIdType();
                d = this._translateTypeRelationshipToString(d);
                c._idNameMap.set(g, d);
                c._nameIdMap.set(d, g);
                this._tree.appendTopLevelElement(d, g, "assembly", !0, !1)
            }
        };
        c.prototype._loadNodeChildren = function(a) {
            a = c.getRelationshipTypeName(a);
            if (null !== a) {
                var b = c.getRelationshipTypeId(a);
                null !== b && this._addRelationships(b, a)
            }
        };
        c.prototype._addRelationships = function(a, b) {
            b = this._translateStringTypeToRelationshipType(b);
            for (var d = this._viewer.model.getBimIdConnectedElements(this._currentNodeId, this._currentBimNodeId, b), g = 0, e = d.relatings; g < e.length; g++) {
                var k = e[g],
                    h = k;
                b = '<button class="ui-model-tree-relationships-button" type="button" id="buttonRight"><b>\u2190</b></button>';
                k = c._createIdNode(k);
                h = this._viewer.model.getBimInfoFromBimId(this._currentNodeId,
                    h);
                c._idNameMap.set(k, h.name);
                c._idNameMap.set(h.name, k);
                b = b.concat(" ");
                b = b.concat(h.name);
                this._tree.addChild(b, k, a, "assembly", !1, f.Desktop.Tree.Relationships, h.connected)
            }
            g = 0;
            for (d = d.relateds; g < d.length; g++) h = k = d[g], b = '<button class="ui-model-tree-relationships-button" type="button" id="buttonRight"><b>\u2192</b> </button>', k = c._createIdNode(k), h = this._viewer.model.getBimInfoFromBimId(this._currentNodeId, h), c._idNameMap.set(k, h.name), c._idNameMap.set(h.name, k), b = b.concat(" "), b = b.concat(h.name),
                this._tree.addChild(b, k, a, "assembly", !1, f.Desktop.Tree.Relationships, h.connected)
        };
        c.prototype._onclickItemButton = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, g, e;
                return __generator(this, function(f) {
                    b = document.getElementById(a);
                    if (null === b) return [2];
                    d = this._splitHtmlId(a);
                    0 < d.length && (g = this._splitHtmlIdParts(d[0], c.separator), g[0] === c.RelationshipPartPrefix && (e = this._viewer.model.getNodeIdFromBimId(this._currentNodeId, g[1]), null !== e && (this._viewer.model.resetModelHighlight(),
                        this._viewer.model.setNodesHighlighted([e], !0))));
                    return [2]
                })
            })
        };
        c.prototype._onSelectRelationships = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d, g;
                return __generator(this, function(f) {
                    b = this._splitHtmlId(a);
                    0 < b.length && (d = this._splitHtmlIdParts(b[0], c.separator), d[0] === c.RelationshipPartPrefix && (g = this._viewer.model.getNodeIdFromBimId(this._currentNodeId, d[1]), this._viewer.selectPart(g, e.SelectionMode.Set)));
                    return [2]
                })
            })
        };
        c.RelationshipPrefix = "relships";
        c.RelationshipTypePrefix =
            "relshipsType";
        c.RelationshipPartPrefix = "relshipsPart";
        c._idCount = 0;
        c._nameIdMap = new Map;
        c._idNameMap = new Map;
        return c
    }(f.ViewTree);
    f.RelationshipsTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function(h) {
        function c(a, b, d) {
            a = h.call(this, a, b, d) || this;
            a._currentSheetId = null;
            a._3dSheetId = "" + a._internalId + f.ViewTree.separator + "3D";
            a._tree.setCreateVisibilityItems(!1);
            a._initEvents();
            return a
        }
        __extends(c, h);
        c.prototype._initEvents = function() {
            var a = this,
                b = function() {
                    a._onNewModel()
                };
            this._viewer.setCallbacks({
                assemblyTreeReady: b,
                firstModelLoaded: b,
                modelSwitched: b,
                sheetActivated: function(d) {
                    a._onSheetActivated(d)
                },
                sheetDeactivated: function() {
                    a._onSheetDeactivated()
                }
            });
            this._tree.registerCallback("selectItem", function(d) {
                return __awaiter(a, void 0, void 0, function() {
                    return __generator(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return [4, this._onTreeSelectItem(d)];
                            case 1:
                                return a.sent(), [2]
                        }
                    })
                })
            })
        };
        c.prototype._setCurrentSheetId = function(a) {
            var b = $("#" + this._currentSheetId);
            null !== b && b.removeClass("selected-sheet");
            b = $("#" + a);
            null !== b && b.addClass("selected-sheet");
            this._currentSheetId = a
        };
        c.prototype._onNewModel = function() {
            this._tree.clear();
            if (this._viewer.model.isDrawing()) {
                for (var a =
                        this._viewer.model, b = 0, d = this._viewer.sheetManager.getSheetIds(); b < d.length; b++) {
                    var c = d[b],
                        e = a.getNodeName(c);
                    c = this._sheetTreeId(c);
                    this._tree.appendTopLevelElement(e, c, "sheet", !1)
                }
                0 < this._viewer.sheetManager.get3DNodes().length && (this._tree.appendTopLevelElement("3D Model", this._3dSheetId, "sheet", !1, !1, !1), this._currentSheetId = this._3dSheetId);
                this.showTab()
            } else this.hideTab()
        };
        c.prototype._onSheetActivated = function(a) {
            this._setCurrentSheetId(this._sheetTreeId(a))
        };
        c.prototype._onSheetDeactivated =
            function() {
                this._setCurrentSheetId(this._3dSheetId)
            };
        c.prototype._onTreeSelectItem = function(a) {
            return __awaiter(this, void 0, void 0, function() {
                var b, d;
                return __generator(this, function(c) {
                    switch (c.label) {
                        case 0:
                            return a !== this._3dSheetId ? [3, 1] : [2, this._viewer.sheetManager.deactivateSheets()];
                        case 1:
                            b = this._splitHtmlId(a);
                            d = parseInt(b[1], 10);
                            if (this._currentSheetId !== this._3dSheetId) return [3, 3];
                            this._viewer.model.setViewAxes(new e.Point3(0, 0, 1), new e.Point3(0, 1, 0));
                            return [4, this._viewer.setViewOrientation(e.ViewOrientation.Front,
                                0)];
                        case 2:
                            c.sent(), c.label = 3;
                        case 3:
                            return [2, this._viewer.sheetManager.setActiveSheetId(d)]
                    }
                })
            })
        };
        c.prototype._sheetTreeId = function(a) {
            return "" + this._internalId + f.ViewTree.separator + a
        };
        return c
    }(f.ViewTree);
    f.SheetsTree = l
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    (function(l) {
        var h = function() {
                return function(a) {
                    this.guid = this.nodeId = null;
                    "number" === typeof a ? this.nodeId = a : this.guid = a
                }
            }(),
            c = function() {
                function a(a) {
                    var d = this;
                    this._fullHiddenParentIds = [];
                    this._partialHiddenParentIds = [];
                    this._assemblyTreeReadyOccurred = !1;
                    this._viewer = a;
                    var b = function() {
                        d.updateModelTreeVisibilityState();
                        return Promise.resolve()
                    };
                    this._viewer.setCallbacks({
                        _assemblyTreeReady: function() {
                            d._assemblyTreeReadyOccurred = !0;
                            return b()
                        },
                        firstModelLoaded: b
                    })
                }
                a.prototype._clearStyles = function() {
                    for (var a = 0, b = this._fullHiddenParentIds; a < b.length; a++) {
                        var c = b[a];
                        this._removeVisibilityHiddenClass(c, "partHidden")
                    }
                    a = this._fullHiddenParentIds.length = 0;
                    for (b = this._partialHiddenParentIds; a < b.length; a++) c = b[a], this._removeVisibilityHiddenClass(c, "partialHidden");
                    this._partialHiddenParentIds.length = 0
                };
                a.prototype._applyStyles = function() {
                    for (var a = 0, b = this._fullHiddenParentIds; a < b.length; a++) {
                        var c = b[a];
                        this._addVisibilityHiddenClass(c, "partHidden")
                    }
                    a = 0;
                    for (b = this._partialHiddenParentIds; a <
                        b.length; a++) c = b[a], this._addVisibilityHiddenClass(c, "partialHidden")
                };
                a.prototype.updateModelTreeVisibilityState = function() {
                    if (this._assemblyTreeReadyOccurred) {
                        this._clearStyles();
                        for (var a = this._viewer.model, b = [a.getAbsoluteRootNode()], c = 0; c < b.length; c++) {
                            var f = b[c],
                                h = a.getBranchVisibility(f);
                            if (h === e.BranchVisibility.Hidden) this._fullHiddenParentIds.push(f);
                            else if (h === e.BranchVisibility.Mixed)
                                for (this._partialHiddenParentIds.push(f), h = 0, f = a.getNodeChildren(f); h < f.length; h++) b.push(f[h])
                        }
                        this._applyStyles()
                    }
                };
                a.prototype._getVisibilityItem = function(a) {
                    return $("#visibility" + f.ViewTree.separator + "part" + f.ViewTree.separator + a)
                };
                a.prototype._addVisibilityHiddenClass = function(a, b) {
                    this._getVisibilityItem(a).addClass(b)
                };
                a.prototype._removeVisibilityHiddenClass = function(a, b) {
                    this._getVisibilityItem(a).removeClass(b)
                };
                return a
            }();
        l.VisibilityControl = c;
        var a = function() {
            function a(a, b, f, k) {
                this._lastItemId = null;
                this._selectedPartItems = [];
                this._futureHighlightIds = new Set;
                this._futureMixedIds = new Set;
                this._selectedItemsParentIds = [];
                this._selectedLayers = [];
                this._mixedItemsLayer = new Set;
                this._selectedTypes = [];
                this._futureMixedTypesIds = [];
                this._mixedTypes = new Set;
                this._callbacks = new Map;
                this._childrenLoaded = new Set;
                this._loadedNodes = new Set;
                this._touchTimer = new e.Util.Timer;
                this._freezeExpansion = !1;
                this._scrollTimer = new e.Util.Timer;
                this._selectionLabelHighlightTimer = new e.Util.Timer;
                this._createVisibilityItems = !0;
                this._elementId = a;
                this._viewer = b;
                this._treeScroll = k;
                this._separator = f;
                this._visibilityControl = new c(b);
                this._partVisibilityRoot =
                    document.createElement("ul");
                this._listRoot = document.createElement("ul");
                this._init()
            }
            a.prototype.setCreateVisibilityItems = function(a) {
                this._createVisibilityItems = a
            };
            a.prototype.getElementId = function() {
                return this._elementId
            };
            a.prototype.getRoot = function() {
                return this._listRoot
            };
            a.prototype.getPartVisibilityRoot = function() {
                return this._partVisibilityRoot
            };
            a.prototype.getVisibilityControl = function() {
                return this._visibilityControl
            };
            a.prototype.registerCallback = function(a, b) {
                this._callbacks.has(a) ||
                    this._callbacks.set(a, []);
                this._callbacks.get(a).push(b)
            };
            a.prototype._triggerCallback = function(a) {
                for (var d = [], b = 1; b < arguments.length; b++) d[b - 1] = arguments[b];
                if (b = this._callbacks.get(a))
                    for (var c = 0; c < b.length; c++) b[c].apply(null, d)
            };
            a.prototype.deleteNode = function(a) {
                a = "#" === a.charAt(0) ? a.slice(1) : a;
                jQuery("#" + a).remove();
                jQuery("#visibility" + this._separator + a).remove()
            };
            a.prototype._getTaggedId = function(a, b, c) {
                return null !== c && "Annotation Views" === c && b === f.Desktop.Tree.CadView ? new h("Annotation Views") :
                    this._parseTaggedId(a)
            };
            a.prototype.addChild = function(a, b, c, e, h, l, p, n) {
                void 0 === p && (p = !0);
                void 0 === n && (n = !1);
                var d = this._getTaggedId(b, l, a);
                if (null === d) return null;
                if (l === f.Desktop.Tree.Model && "container" !== e && null !== d.nodeId) {
                    if (this._loadedNodes.has(d.nodeId) && !n) return null;
                    this._loadedNodes.add(d.nodeId)
                }
                null === a && (a = "unnamed");
                this._addVisibilityToggleChild(b, c, e);
                c = jQuery("#" + c);
                c.children(".ui-modeltree-container").children(".ui-modeltree-expandNode").css("visibility", "visible");
                var g = c.children("ul"),
                    m = n = !1;
                null !== d.nodeId && (n = this._futureHighlightIds.has(d.nodeId), m = this._futureMixedIds.has(d.nodeId), n && this._futureHighlightIds.delete(d.nodeId), m && this._futureMixedIds.delete(d.nodeId));
                a = this._buildNode(a, b, e, h, n, m, p, l === f.Desktop.Tree.Relationships);
                0 === g.length ? (e = document.createElement("ul"), e.classList.add("ui-modeltree-children"), c.append(e), e.appendChild(a)) : g.get(0).appendChild(a);
                n && (b = this._getListItem(b), null !== b && this._selectedPartItems.push(b));
                this._triggerCallback("addChild");
                return a
            };
            a.prototype._addVisibilityToggleChild = function(a, b, c) {
                b = jQuery("#visibility" + this._separator + b);
                b.children(".ui-modeltree-visibility-container").css("visibility", "visible");
                var d = b.children("ul");
                0 === d.length ? (d = document.createElement("ul"), d.classList.add("ui-modeltree-visibility-children"), b.append(d)) : d = d.get(0);
                a = this._buildPartVisibilityNode(a, c);
                null !== a && d.appendChild(a)
            };
            a.prototype._buildPartVisibilityNode = function(a, b) {
                if (!this._createVisibilityItems) return null;
                var d = document.createElement("div");
                d.classList.add("ui-modeltree-partVisibility-icon");
                var c = document.createElement("li");
                c.classList.add("ui-modeltree-item");
                c.classList.add("visibility");
                c.id = "" + f.ViewTree.visibilityPrefix + f.ViewTree.separator + a;
                c.appendChild(d);
                if ("measurement" !== b) {
                    b = void 0;
                    a = a.split(this._separator).pop();
                    void 0 !== a && (b = parseInt(a, 10));
                    if (void 0 === b || isNaN(b)) return c;
                    a = this._viewer.model.getNodeType(b);
                    if (a === e.NodeType.Pmi || a === e.NodeType.PmiBody) c.style.visibility = "hidden"
                }
                return c
            };
            a.prototype.freezeExpansion =
                function(a) {
                    this._freezeExpansion = a
                };
            a.prototype.updateSelection = function(a) {
                null === a && (a = this._viewer.selectionManager.getResults());
                a = a.map(function(a) {
                    return a instanceof e.Event.NodeSelectionEvent && (a = a.getSelection(), !a.isNodeSelection()) ? (console.assert(!1), e.InvalidNodeId) : a.getNodeId()
                });
                this._updateTreeSelectionHighlight(a);
                this._doUnfreezeSelection(a)
            };
            a.prototype.collapseAllChildren = function(a) {
                this._freezeExpansion || ($("#" + a + " .ui-modeltree-children").hide(), $("#" + a + " .ui-modeltree-visibility-children").hide(),
                    $("#" + a + " .expanded").removeClass("expanded"))
            };
            a.prototype._expandChildren = function(a, b) {
                var d = $("#" + a);
                this.preloadChildrenIfNecessary(a);
                if (!this._freezeExpansion || b) 0 < d.length && (d.children(".ui-modeltree-children").show(), d.children(".ui-modeltree-container").children(".ui-modeltree-expandNode").addClass("expanded")), this._expandVisibilityChildren(a)
            };
            a.prototype.expandChildren = function(a) {
                this._expandChildren(a, !1)
            };
            a.prototype._expandVisibilityChildren = function(a) {
                a = $("#visibility" + (this._separator +
                    a));
                0 < a.length && (a = a.children(".ui-modeltree-visibility-children"), a.addClass("visible"), a.show())
            };
            a.prototype.collapseChildren = function(a) {
                this._collapseVisibilityChildren(a);
                a = $("#" + a);
                0 < a.length && a.children(".ui-modeltree-children").hide()
            };
            a.prototype._collapseVisibilityChildren = function(a) {
                a = $("#visibility" + this._separator + a);
                0 < a.length && a.children(".ui-modeltree-visibility-children").hide()
            };
            a.prototype._buildNode = function(a, b, c, e, f, h, l, n) {
                void 0 === f && (f = !1);
                void 0 === h && (h = !1);
                void 0 === l &&
                    (l = !0);
                void 0 === n && (n = !1);
                var d = document.createElement("li");
                d.classList.add("ui-modeltree-item");
                f && d.classList.add("selected");
                h && d.classList.add("mixed");
                d.id = b;
                b = document.createElement("div");
                b.classList.add("ui-modeltree-container");
                b.style.whiteSpace = "nowrap";
                f = document.createElement("div");
                f.classList.add("ui-modeltree-expandNode");
                e || (f.style.visibility = "hidden");
                b.appendChild(f);
                e = document.createElement("div");
                e.classList.add("ui-modeltree-icon");
                e.classList.add(c);
                b.appendChild(e);
                c = document.createElement("div");
                !1 === n ? l && c.classList.add("ui-modeltree-label") : l ? c.classList.add("ui-modeltree-relationships-label") : c.classList.add("ui-modeltree-relationships-label_unaccess");
                c.innerHTML = $("<div>").text(a).html();
                c.title = a;
                b.appendChild(c);
                a = document.createElement("div");
                a.classList.add("ui-mixedselection-icon");
                b.appendChild(a);
                d.appendChild(b);
                return d
            };
            a.prototype.childrenAreLoaded = function(a) {
                return this._childrenLoaded.has(a)
            };
            a.prototype.preloadChildrenIfNecessary = function(a) {
                null === a || this._childrenLoaded.has(a) ||
                    (this._triggerCallback("loadChildren", a), this._childrenLoaded.add(a))
            };
            a.prototype._processExpandClick = function(a) {
                a = jQuery(a.target);
                var d = a.parents(".ui-modeltree-item").get(0).id;
                a.hasClass("expanded") ? this._collapseListItem(d) : this._expandListItem(d)
            };
            a.prototype._collapseListItem = function(a) {
                this.collapseChildren(a);
                $("#" + a).find(".ui-modeltree-expandNode").first().removeClass("expanded");
                this._triggerCallback("collapse", a)
            };
            a.prototype._expandListItem = function(a) {
                this.expandChildren(a);
                $("#" +
                    a).find(".ui-modeltree-expandNode").first().addClass("expanded");
                this._triggerCallback("expand", a)
            };
            a.prototype.selectItem = function(a, b) {
                void 0 === b && (b = !0);
                this._doSelection(a, b)
            };
            a.prototype.highlightItem = function(a, b) {
                void 0 === b && (b = !0);
                this._doHighlight(a, b)
            };
            a.prototype._getListItem = function(a) {
                a = $(this._listRoot).find("#" + a);
                return 0 < a.length ? a : null
            };
            a.prototype._updateNonSelectionHighlight = function(a) {
                void 0 !== this._$lastNonSelectionItem && this._$lastNonSelectionItem.removeClass("selected");
                a.addClass("selected");
                this._$lastNonSelectionItem = a
            };
            a.prototype._doUnfreezeSelection = function(a) {
                for (var d = 0; d < a.length; d++) {
                    var b = a[d],
                        c = this._viewer.model.getNodeParent(b),
                        e = this._getListItem("part" + f.ViewTree.separator + b);
                    null === e || e.hasClass("selected") ? null === e && this._futureHighlightIds.add(b) : (e.addClass("selected"), this._selectedPartItems.push(e));
                    null !== c && (e = f.LayersTree.getLayerPartId(c), null !== e && (e = this._getListItem(e), null === e || e.hasClass("selected") ? null === e && this._futureHighlightIds.add(c) :
                        (e.addClass("selected"), this._selectedPartItems.push(e))), c = this._getListItem(f.TypesTree.getComponentPartId(c)), null === c || c.hasClass("selected") || (c.addClass("selected"), this._selectedPartItems.push(c)));
                    b = this._getListItem(f.TypesTree.getComponentPartId(b));
                    null === b || b.hasClass("selected") || (b.addClass("selected"), this._selectedPartItems.push(b))
                }
            };
            a.prototype._doSelection = function(a, b) {
                var d = this;
                void 0 === b && (b = !0);
                if (null !== a) {
                    var c = a.split(this._separator),
                        g = "part" === c[0],
                        h = "layerpart" === c[0],
                        l = "typespart" === c[0],
                        n = $("#" + a),
                        q = !1;
                    if (g || h || l) {
                        n.addClass("selected");
                        c = 0;
                        for (g = this._selectedPartItems; c < g.length; c++)
                            if (h = g[c].get(0), void 0 !== h && a === h.id) {
                                q = !0;
                                break
                            } q || this._selectedPartItems.push(n)
                    } else if (0 !== a.lastIndexOf("sheet", 0)) {
                        if (0 === a.lastIndexOf("container", 0) || c[0] === f.LayersTree.layerPartContainerPrefix) return;
                        this._updateNonSelectionHighlight(n)
                    }
                    b && (this._lastItemId = a, q = q && 1 === this._selectedPartItems.length, this._triggerCallback("selectItem", a, "undefined" !== typeof key && (key.ctrl ||
                        key.command) || q ? e.SelectionMode.Toggle : e.SelectionMode.Set));
                    this._lastItemId === a || this._freezeExpansion || b || this._scrollToItem(n)
                }
                this._lastItemId = a;
                this._selectionLabelHighlightTimer.set(30, function() {
                    var a = d._viewer.selectionManager.getResults().map(function(a) {
                        return a.getNodeId()
                    });
                    d._updateTreeSelectionHighlight(a)
                })
            };
            a.prototype._doHighlight = function(a, b) {
                void 0 === b && (b = !0);
                var d = $("#" + a);
                this._updateNonSelectionHighlight(d);
                b && null !== a && this._triggerCallback("selectItem", a, e.SelectionMode.Set)
            };
            a.prototype._doSelectIfcItem = function(a, b) {
                void 0 === b && (b = !0);
                var d = $("#" + a);
                this._updateNonSelectionHighlight(d);
                b && null !== a && this._triggerCallback("clickItemButton", a)
            };
            a.prototype._scrollToItem = function(b) {
                var d = this;
                this._scrollTimer.set(a._ScrollToItemDelayMs, function() {
                    var a = b.offset(),
                        c = $("#modelTreeContainer").innerHeight();
                    void 0 !== a && void 0 !== c && (a = a.top, 6 > a || a > c) && (d._scrollTimer.clear(), d._treeScroll && (d._treeScroll.refresh(), d._treeScroll.scrollToElement(b.get(0), f.DefaultUiTransitionDuration,
                        !0, !0)))
                })
            };
            a.prototype._parseTaggedId = function(a) {
                var b = this._parseUuid(a);
                if (null !== b) return new h(b);
                a = this._parseNodeId(a);
                return null !== a ? new h(a) : null
            };
            a.prototype._parseNodeId = function(a) {
                a = a.split(this._separator);
                if (2 > a.length || "measurement" === a[0] || "markupview" === a[0]) return null;
                a = a[a.length - 1];
                return void 0 === a || (a = parseInt(a, 10), isNaN(a)) ? null : a
            };
            a.prototype._parseUuid = function(a) {
                a = a.split(this._separator).pop();
                return void 0 !== a && 36 === a.length ? a : null
            };
            a.prototype._parseMeasurementId =
                function(a) {
                    return a.split(this._separator).pop()
                };
            a.prototype._parseVisibilityLayerName = function(a) {
                a = a.split("" + f.ViewTree.visibilityPrefix + f.ViewTree.separator);
                return 2 !== a.length ? null : f.LayersTree.getLayerName(a[1])
            };
            a.prototype._parseVisibilityLayerNodeId = function(a) {
                a = a.split("" + f.ViewTree.visibilityPrefix + f.ViewTree.separator);
                return 2 !== a.length ? null : f.LayersTree.getPartId(a[1])
            };
            a.prototype._updateLayerTreeSelectionHighlight = function(a) {
                for (var b = this, d = 0, c = this._selectedLayers; d < c.length; d++) {
                    var e =
                        c[d];
                    $("#" + f.LayersTree.getLayerId(e)).removeClass("selected")
                }
                this._mixedItemsLayer.forEach(function(a) {
                    a = b._viewer.model.getLayerName(a);
                    null !== a && $("#" + f.LayersTree.getLayerId(a)).addClass("mixed")
                });
                this._selectedLayers = this._viewer.selectionManager.getSelectedLayers();
                d = 0;
                for (c = this._selectedLayers; d < c.length; d++) e = c[d], $("#" + f.LayersTree.getLayerId(e)).addClass("selected"), $("#" + f.LayersTree.getLayerId(e)).removeClass("mixed");
                for (e = 0; e < a.length; e++) $("#" + f.LayersTree.getLayerPartId(a[e])).addClass("selected")
            };
            a.prototype._addMixedTypeClass = function(a) {
                a = this._viewer.model.getNodeGenericType(a);
                return null === a || this._mixedTypes.has(a) ? !1 : ($("#" + f.TypesTree.getGenericTypeId(a)).addClass("mixed"), this._mixedTypes.add(a), !0)
            };
            a.prototype._updateTypesTreeSelectionHighlight = function() {
                for (var a = 0, b = this._selectedTypes; a < b.length; a++) {
                    var c = b[a];
                    $("#" + f.TypesTree.getGenericTypeId(c)).removeClass("selected")
                }
                c = 0;
                for (a = this._futureMixedTypesIds; c < a.length; c++) b = a[c], this._addMixedTypeClass(b) || (b = this._viewer.model.getNodeParent(b),
                    null !== b && this._addMixedTypeClass(b));
                this._selectedTypes = this._viewer.selectionManager.getSelectedTypes();
                a = 0;
                for (b = this._selectedTypes; a < b.length; a++) c = b[a], c = $("#" + f.TypesTree.getGenericTypeId(c)), c.addClass("selected"), c.removeClass("mixed")
            };
            a.prototype._updateTreeSelectionHighlight = function(a) {
                var b = this;
                this._futureHighlightIds.forEach(function(d) {
                    0 <= a.indexOf(d) && b._futureHighlightIds.delete(d)
                });
                for (var d = 0, c = this._selectedItemsParentIds; d < c.length; d++) {
                    var h = c[d];
                    $("#part" + f.ViewTree.separator +
                        h).removeClass("mixed")
                }
                this._selectedItemsParentIds.length = 0;
                this._futureMixedIds.clear();
                this._mixedItemsLayer.forEach(function(a) {
                    a = b._viewer.model.getLayerName(a);
                    null !== a && $("#" + f.LayersTree.getLayerId(a)).removeClass("mixed")
                });
                this._mixedItemsLayer.clear();
                this._mixedTypes.forEach(function(a) {
                    $("#" + f.TypesTree.getGenericTypeId(a)).removeClass("mixed")
                });
                this._mixedTypes.clear();
                this._futureMixedTypesIds = [];
                e.Util.filterInPlace(this._selectedPartItems, function(d) {
                    d = d.get(0);
                    if (void 0 !== d) {
                        d =
                            b._parseNodeId(d.id);
                        if (null === d) return !1;
                        if (0 > a.indexOf(d)) return $("#part" + f.ViewTree.separator + d).removeClass("selected"), $("#typespart" + f.ViewTree.separator + d).removeClass("selected"), (d = f.LayersTree.getLayerPartId(d)) && $("#" + d).removeClass("selected"), !1
                    }
                    return !0
                });
                for (d = 0; d < a.length; d++) h = a[d], this._updateParentIdList(h), this._updateMixedLayers(h), this._updateMixedTypes(h);
                d = 0;
                for (c = this._selectedItemsParentIds; d < c.length; d++) {
                    h = c[d];
                    var l = this._getListItem("part" + f.ViewTree.separator + h);
                    null ===
                        l || l.hasClass("mixed") ? this._futureMixedIds.add(h) : l.addClass("mixed")
                }
                this._updateLayerTreeSelectionHighlight(a);
                this._updateTypesTreeSelectionHighlight()
            };
            a.prototype._updateParentIdList = function(a) {
                var b = this._viewer.model;
                if (b.isNodeLoaded(a))
                    for (a = b.getNodeParent(a); null !== a && -1 === this._selectedItemsParentIds.indexOf(a);) this._selectedItemsParentIds.push(a), a = b.getNodeParent(a)
            };
            a.prototype._updateMixedLayers = function(a) {
                for (var b = this, d = function(a) {
                        a = b._viewer.model.getNodeLayerId(a);
                        null !==
                            a && b._mixedItemsLayer.add(a)
                    }, c = 0, e = this._viewer.model.getNodeChildren(a); c < e.length; c++) d(e[c]);
                d(a)
            };
            a.prototype._updateMixedTypes = function(a) {
                this._futureMixedTypesIds.push(a)
            };
            a.prototype._processLabelContext = function(a, b) {
                var d = jQuery(a.target).closest(".ui-modeltree-item");
                b || (b = new e.Point2(a.clientX, a.clientY));
                a = d.get(0).id;
                this._triggerCallback("context", a, b)
            };
            a.prototype._processLabelClick = function(a) {
                a = jQuery(a.target).closest(".ui-modeltree-item");
                this._doSelection(a.get(0).id, !0)
            };
            a.prototype._processLabelRSClick =
                function(a) {
                    a = jQuery(a.target).closest(".ui-modeltree-item");
                    this._doHighlight(a.get(0).id, !0)
                };
            a.prototype._processLabelRSClickButton = function(a) {
                a = jQuery(a.target).closest(".ui-modeltree-item");
                this._doSelectIfcItem(a.get(0).id, !0)
            };
            a.prototype.appendTopLevelElement = function(a, b, c, e, f, h) {
                void 0 === f && (f = !0);
                void 0 === h && (h = !1);
                null === a && (a = "unnamed");
                a = this._buildNode(a, b, c, e);
                "part" === b.substring(0, 4) && this._listRoot.firstChild ? this._listRoot.insertBefore(a, this._listRoot.firstChild) : this._listRoot.appendChild(a);
                c = this._buildPartVisibilityNode(b, c);
                null !== c && this._partVisibilityRoot.appendChild(c);
                f && this.preloadChildrenIfNecessary(b);
                h && this._childrenLoaded.add(b);
                return a
            };
            a.prototype.insertNodeAfter = function(a, b, c, e, f) {
                return this._insertNodeAfter(a, b, c, e, f)
            };
            a.prototype._insertNodeAfter = function(a, b, c, f, h) {
                null === a && (a = "unnamed");
                if (null === f.parentNode) throw new e.CommunicatorError("element.parentNode is null");
                a = this._buildNode(a, b, c, h);
                f.nextSibling ? f.parentNode.insertBefore(a, f.nextSibling) : f.parentNode.appendChild(a);
                this.preloadChildrenIfNecessary(b);
                return a
            };
            a.prototype.clear = function() {
                for (; this._listRoot.firstChild;) this._listRoot.removeChild(this._listRoot.firstChild);
                for (; this._partVisibilityRoot.firstChild;) this._partVisibilityRoot.removeChild(this._partVisibilityRoot.firstChild);
                this._childrenLoaded.clear();
                this._loadedNodes.clear()
            };
            a.prototype.expandInitialNodes = function(a) {
                for (var b = []; 1 >= b.length;) {
                    b = this._getChildItemsFromModelTreeItem($("#" + a));
                    if (0 === b.length) break;
                    this._expandChildren(a, !0);
                    a =
                        b[0].id;
                    this.preloadChildrenIfNecessary(a)
                }
            };
            a.prototype._processVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b;
                    return __generator(this, function(d) {
                        b = a.split(this._separator)[1];
                        switch (b) {
                            case "part":
                                return [2, this._processPartVisibilityClick(a)];
                            case "measurement":
                                return [2, this._processMeasurementVisibilityClick(a)];
                            case "layer":
                                return [2, this._processLayerVisibilityClick(a)];
                            case "layerpart":
                                return [2, this._processLayerPartVisibilityClick(a)];
                            case "types":
                                return [2,
                                    this._processTypesVisibilityClick(a)
                                ];
                            case "typespart":
                                return [2, this._processTypesPartVisibilityClick(a)]
                        }
                        return [2]
                    })
                })
            };
            a.prototype._processPartVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return b = this._parseNodeId(a), null === b ? [3, 2] : [4, this._processPartVisibility(b)];
                            case 1:
                                d.sent(), d.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            a.prototype._processPartVisibility = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b,
                        d, c;
                    return __generator(this, function(f) {
                        switch (f.label) {
                            case 0:
                                return b = this._viewer.model, d = b.getNodeVisibility(a), c = b.hasEffectiveGenericType(a, e.StaticGenericType.IfcSpace), [4, b.setNodesVisibility([a], !d, c ? !1 : null)];
                            case 1:
                                return f.sent(), [2]
                        }
                    })
                })
            };
            a.prototype._processMeasurementVisibilityClick = function(a) {
                var b = this._parseMeasurementId(a);
                a = this._viewer.measureManager.getAllMeasurements();
                if ("measurementitems" === b) {
                    var d = !0;
                    for (b = 0; b < a.length; b++) {
                        var c = a[b];
                        if (c.getVisibility()) {
                            d = !1;
                            break
                        }
                    }
                    for (b =
                        0; b < a.length; b++) c = a[b], c.setVisibility(d)
                } else
                    for (var e = 0; e < a.length; e++) c = a[e], b === c._getId() && (d = c.getVisibility(), c.setVisibility(!d))
            };
            a.prototype._processTypesVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return b = a.split(this._separator).pop(), void 0 === b ? [2] : [4, this._processTypesVisibility(b)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            };
            a.prototype._processTypesVisibility = function(a) {
                return __awaiter(this, void 0,
                    void 0,
                    function() {
                        var b, d, c, f;
                        return __generator(this, function(g) {
                            switch (g.label) {
                                case 0:
                                    b = this._viewer.model;
                                    d = !1;
                                    c = b.getNodesByGenericType(a);
                                    if (null === c) return [3, 2];
                                    f = [];
                                    c.forEach(function(a) {
                                        d = d || b.getNodeVisibility(a);
                                        f.push(a)
                                    });
                                    return [4, b.setNodesVisibility(f, !d, a === e.StaticGenericType.IfcSpace ? !1 : null)];
                                case 1:
                                    g.sent(), this.updateTypesVisibilityIcons(), g.label = 2;
                                case 2:
                                    return [2]
                            }
                        })
                    })
            };
            a.prototype._processTypesPartVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b;
                    return __generator(this, function(d) {
                        switch (d.label) {
                            case 0:
                                return b = this._parseNodeId(a), null === b ? [2] : [4, this._processTypesPartVisibility(b)];
                            case 1:
                                return d.sent(), [2]
                        }
                    })
                })
            };
            a.prototype._processTypesPartVisibility = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, c;
                    return __generator(this, function(f) {
                        switch (f.label) {
                            case 0:
                                return b = this._viewer.model, [4, b.getNodeVisibility(a)];
                            case 1:
                                return d = f.sent(), c = b.hasEffectiveGenericType(a, e.StaticGenericType.IfcSpace), [4, b.setNodesVisibility([a],
                                    !d, c ? !1 : null)];
                            case 2:
                                return f.sent(), [2]
                        }
                    })
                })
            };
            a.prototype.updateTypesVisibilityIcons = function() {
                var a = this._viewer.model;
                a.getGenericTypeIdMap().forEach(function(b, d) {
                    var c = !1,
                        e = !1;
                    b.forEach(function(b) {
                        var d = $("#visibility" + f.ViewTree.separator + f.TypesTree.getComponentPartId(b));
                        d.removeClass("partHidden");
                        a.getNodeVisibility(b) ? e = !0 : (c = !0, d.addClass("partHidden"))
                    });
                    b = $("#visibility" + f.ViewTree.separator + f.TypesTree.getGenericTypeId(d));
                    b.removeClass(["partHidden", "partialHidden"]);
                    c && e ? b.addClass("partialHidden") :
                        c && b.addClass("partHidden")
                })
            };
            a.prototype._processLayerVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, c, f;
                    return __generator(this, function(g) {
                        switch (g.label) {
                            case 0:
                                b = this._parseVisibilityLayerName(a);
                                if (!b) return [2];
                                d = !1;
                                c = this._viewer.model.getNodesFromLayerName(b, !0);
                                if (null === c) return [3, 2];
                                for (f = 0; f < c.length && !(d = d || this._viewer.model.getNodeVisibility(c[f])); ++f);
                                e._filterActiveSheetNodeIds(this._viewer, c);
                                return 0 < c.length ? [4, this._viewer.model.setNodesVisibility(c,
                                    !d, null)] : [3, 2];
                            case 1:
                                g.sent(), g.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            a.prototype._processLayerPartVisibilityClick = function(a) {
                return __awaiter(this, void 0, void 0, function() {
                    var b, d, c;
                    return __generator(this, function(f) {
                        switch (f.label) {
                            case 0:
                                b = this._parseVisibilityLayerNodeId(a);
                                if (null === b) return [3, 2];
                                d = this._viewer.model.getNodeVisibility(b);
                                c = [b];
                                e._filterActiveSheetNodeIds(this._viewer, c);
                                return 0 < c.length ? [4, this._viewer.model.setNodesVisibility(c, !d, null)] : [3, 2];
                            case 1:
                                f.sent(), f.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
            a.prototype.updateLayersVisibilityIcons = function() {
                var a = this;
                this._viewer.model.getUniqueLayerNames().forEach(function(b) {
                    var d = a._viewer.model.getNodesFromLayerName(b, !0);
                    if (null !== d) {
                        for (var c = !1, e = !1, g = 0; g < d.length; ++g) {
                            var h = d[g];
                            a._viewer.model.isDrawing() || (h = a._viewer.model.getNodeParent(d[g]));
                            null !== h && (h = $("#visibility" + f.ViewTree.separator + f.LayersTree.getLayerPartId(h)), h.removeClass("partHidden"), a._viewer.model.getNodeVisibility(d[g]) ? e = !0 : (c = !0, h.addClass("partHidden")))
                        }
                        b = $("#visibility" +
                            f.ViewTree.separator + f.LayersTree.getLayerId(b));
                        b.removeClass(["partHidden", "partialHidden"]);
                        c && e ? b.addClass("partialHidden") : c && b.addClass("partHidden")
                    }
                })
            };
            a.prototype.updateMeasurementVisibilityIcons = function() {
                for (var a = this._viewer.measureManager.getAllMeasurements(), b = 0, c = 0; c < a.length; c++) {
                    var e = a[c],
                        h = e.getVisibility();
                    e = $("#visibility" + f.ViewTree.separator + "measurement" + f.ViewTree.separator + e._getId());
                    h ? e.removeClass("partHidden") : (b++, e.addClass("partHidden"))
                }
                c = $("#visibility" + f.ViewTree.separator +
                    "measurementitems");
                b === a.length ? (c.removeClass("partialHidden"), c.addClass("partHidden")) : 0 < b && b < a.length ? (c.removeClass("partHidden"), c.addClass("partialHidden")) : (c.removeClass("partialHidden"), c.removeClass("partHidden"));
                this._viewer.markupManager.updateLater()
            };
            a.prototype._init = function() {
                var a = this,
                    b = document.getElementById(this._elementId);
                if (null === b) throw new e.CommunicatorError("container is null");
                this._partVisibilityRoot.classList.add("ui-visibility-toggle");
                b.appendChild(this._partVisibilityRoot);
                this._listRoot.classList.add("ui-modeltree");
                this._listRoot.classList.add("ui-modeltree-item");
                b.appendChild(this._listRoot);
                $(b).on("click", ".ui-modeltree-label", function(b) {
                    a._processLabelClick(b)
                });
                $(b).on("click", ".ui-modeltree-relationships-label", function(b) {
                    a._processLabelRSClick(b)
                });
                $(b).on("click", ".ui-model-tree-relationships-button", function(b) {
                    a._processLabelRSClickButton(b)
                });
                $(b).on("click", ".ui-modeltree-expandNode", function(b) {
                    a._processExpandClick(b)
                });
                $(b).on("click", ".ui-modeltree-partVisibility-icon",
                    function(b) {
                        return __awaiter(a, void 0, void 0, function() {
                            var a, c, d;
                            return __generator(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return a = jQuery(b.target), c = a.closest(".ui-modeltree-item"), d = c[0].id, [4, this._processVisibilityClick(d)];
                                    case 1:
                                        return e.sent(), [2]
                                }
                            })
                        })
                    });
                $(b).on("click", "#contextMenuButton", function(b) {
                    a._processLabelContext(b)
                });
                $(b).on("mouseup", ".ui-modeltree-label, .ui-modeltree-icon", function(b) {
                    2 === b.button && a._processLabelContext(b)
                });
                $(b).on("touchstart", function(b) {
                    a._touchTimer.set(1E3,
                        function() {
                            var c = b.originalEvent;
                            c = new e.Point2(c.touches[0].pageX, c.touches[0].pageY);
                            a._processLabelContext(b, c)
                        })
                });
                $(b).on("touchmove", function(b) {
                    a._touchTimer.clear()
                });
                $(b).on("touchend", function(b) {
                    a._touchTimer.clear()
                });
                $(b).on("contextmenu", ".ui-modeltree-label", function(a) {
                    a.preventDefault()
                })
            };
            a.prototype._getChildItemsFromModelTreeItem = function(a) {
                a = a.children(".ui-modeltree-children").children(".ui-modeltree-item");
                return $.makeArray(a)
            };
            a._ScrollToItemDelayMs = 10;
            return a
        }();
        l.TreeControl =
            a
    })(f.Control || (f.Control = {}))
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));
(function(e) {
(function(f) {
    var l = function() {
            return function(c, a) {
                this.genericType = c;
                this.index = a
            }
        }(),
        h = function(c) {
            function a(a, d, e) {
                a = c.call(this, a, d, e) || this;
                a._containerMap = new Map;
                a._initEvents();
                return a
            }
            __extends(a, c);
            a.prototype._initEvents = function() {
                var a = this,
                    c = function() {
                        return a._onNewModel()
                    };
                this._viewer.setCallbacks({
                    modelStructureReady: c,
                    modelLoaded: c,
                    selectionArray: function(b) {
                        0 < a._ifcNodesMap.size && a._tree.updateSelection(b)
                    },
                    visibilityChanged: function() {
                        a._tree.updateTypesVisibilityIcons()
                    }
                });
                this._tree.registerCallback("selectItem", function(b, c) {
                    a._onTreeSelectItem(b, c)
                });
                this._tree.registerCallback("loadChildren", function(b) {
                    a._loadNodeChildren(b)
                })
            };
            a.prototype._onTreeSelectItem = function(a, c) {
                void 0 === c && (c = e.SelectionMode.Set);
                null !== document.getElementById(a) && (a = this._splitHtmlId(a)[1], "IFC" === a.substr(0, 3) ? this._selectIfcComponent(a, c) : this._viewer.selectPart(parseInt(a, 10), c))
            };
            a.prototype._loadNodeChildren = function(a) {
                switch (this._splitHtmlId(a)[0]) {
                    case "types":
                        this._loadGenericTypeChildren(a);
                        break;
                    case "container":
                        this._loadContainerChildren(a)
                }
            };
            a.prototype._loadGenericTypeChildren = function(a) {
                var b = this,
                    c = this._splitHtmlId(a)[1],
                    e = this._ifcNodesMap.get(c);
                void 0 !== e && (e.size > this._maxNodeChildrenSize ? this._createContainerNodes(a, c) : e.forEach(function(c) {
                    b._addChildPart(c, a)
                }))
            };
            a.prototype._loadContainerChildren = function(a) {
                var b = this._splitHtmlId(a)[1];
                b = this._containerMap.get(b);
                if (void 0 !== b) {
                    var c = b.index;
                    b = this._ifcNodesMap.get(b.genericType);
                    if (void 0 !== b) {
                        var f = c * this._maxNodeChildrenSize,
                            h = b.size - f < this._maxNodeChildrenSize ? b.size : f + this._maxNodeChildrenSize;
                        c = 0;
                        for (b = e.Util.setToArray(b).slice(f, h); c < b.length; c++) this._addChildPart(b[c], a)
                    }
                }
            };
            a.prototype._addChildPart = function(b, c) {
                var d = a.getComponentPartId(b);
                b = this._viewer.model.getNodeName(b);
                this._tree.addChild(b, d, c, "part", !1, f.Desktop.Tree.Types)
            };
            a.prototype._createContainerNodes = function(b, c) {
                var d = this._ifcNodesMap.get(c);
                if (void 0 === d) console.assert(!1, "Tried to create a container for nodes of a non-existent GenericType");
                else
                    for (var h = 0; h < d.size; h += this._maxNodeChildrenSize) {
                        var k = "Child nodes " + h + " - " + (h + this._maxNodeChildrenSize > d.size ? d.size - 1 : h + this._maxNodeChildrenSize - 1),
                            w = h / this._maxNodeChildrenSize,
                            C = e.UUID.create();
                        this._tree.addChild(k, a.getContainerId(C), b, "container", !0, f.Desktop.Tree.Types);
                        k = new l(c, w);
                        this._containerMap.set(C, k)
                    }
            };
            a.prototype._selectIfcComponent = function(a, c) {
                this._viewer.selectionManager.selectType(a, c)
            };
            a.prototype._onNewModel = function() {
                return __awaiter(this, void 0, void 0, function() {
                    var b,
                        c = this;
                    return __generator(this, function(d) {
                        b = this._viewer.model;
                        this._tree.clear();
                        this._ifcNodesMap = b.getGenericTypeIdMap();
                        this._ifcNodesMap.forEach(function(b, d) {
                            b = a.getGenericTypeId(d);
                            c._tree.appendTopLevelElement(d, b, "assembly", !0, !1)
                        });
                        0 === this._ifcNodesMap.size ? this.hideTab() : this.showTab();
                        return [2]
                    })
                })
            };
            a.getComponentPartId = function(a) {
                return "typespart" + f.ViewTree.separator + a
            };
            a.getGenericTypeId = function(a) {
                return "types" + f.ViewTree.separator + a
            };
            a.getContainerId = function(a) {
                return "container" +
                    f.ModelTree.separator + a
            };
            return a
        }(f.ViewTree);
    f.TypesTree = h
})(e.Ui || (e.Ui = {}))
})(Communicator || (Communicator = {}));