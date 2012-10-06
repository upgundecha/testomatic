// *** Start of auto-generated code *** (please don't modify this section)
///<reference path="C:\Users\Admin\AppData\Local\Temp\EA_IntelliTemp\bncmo32p.js" />
_elem=qtpElemObject;
_util=qtpUtilObject;
// *** End of auto-generated code ***

////////////////////////////////////////////////////////////////////////////////
// Selects specified Tab on a widget
//
// Parameter: Item (Index or Title of the Tab, 
//					 while passing Index prefix # before index value)
// Returns:   Boolean
///////////////////////////////////////////////////////////////////////////////////
function Select(Item) {
    var details = null;
    var success = false;

    if (!Item || typeof (Item) != "string") {
        details = "Cannot select invalid item: " + Item;
        _util.Report(micFail, "Select", toSafeArray(new Array()), details);
        throw Error(details);
    }

    var tabToSelect = -1;

    // Retrieve tab elements.
    var tabs = window.$(_elem).find(".ui-tabs-nav > li");

    if (Item.charAt(0) == '#') {
        // The tab item is specified by index.
        var index = parseInt(Item.substring(1)) - 1;
        if (index < tabs.length && index >= 0)
            tabToSelect = index;
    }
    else {
        // The tab item is specified by name.
        for (var i = 0; i < tabs.length; i++) {
            if (Item == tabs[i].innerText) {
                tabToSelect = i;
                break;
            }
        }
    }

    if (tabToSelect >= 0) {
        // Call the Select method of jQueryUI Tab.
        window.$(_elem).tabs().tabs('select', tabToSelect);
        details = "Selected " + Item;
        _util.Report(micDone, "Select", toSafeArray(new Array(Item)), details);
    }
    else {
        details = "Item " + Item + " does not exist.";
        _util.Report(micFail, "Select", toSafeArray(new Array(Item)), details);
        throw Error(details);
    }
    return true;
}


////////////////////////////////////////////////////////////////////////////////
// This returns property value for specified property
//
// Parameters: Name of the Property
// Returns:   String
///////////////////////////////////////////////////////////////////////////////////
function get_property_value(property) {
    if (property == "selected") {
        return window.$(_elem).find(".ui-tabs-nav > li[class*='ui-tabs-selected']")[0].innerText;
    }

    if (property == "items count") {
        return window.$(_elem).find(".ui-tabs-nav > li").length;
    }

    if (property == "all items") {
        var tabLabels = new Array();
        var tabs = window.$(_elem).find(".ui-tabs-nav > li");
        for (var i = 0; i < tabs.length; i++)
            tabLabels.push(tabs[i].innerText);
        return tabLabels.join(";");
    }

    if (property == "logical name") {
        return _elem.id;
    }
}

////////////////////////////////////////////////////////////////////////////////
// This function registers to listen for events that are specific to this
// control to support recording.
// It registers for clicks on all tabs.
//
// Parameters: none.
// Returns:   Boolean. (In this implementation always true.)
///////////////////////////////////////////////////////////////////////////////////
function AddEventHandler() {
    // Retrieve all of the tabs in the tab strip.
    var tabs = window.$(_elem).find(".ui-tabs-nav > li");

    for (var i = 0; i < tabs.length; i++) {
        var tab = window.$(tabs[i]);
        _util.RegisterForEvent(tab.find("a")[0], "onclick", "onTabClick", tabs[i]);
    }
    return true;
}

//////////////////////////////////////////////////////////////////////////////////
// This is the event handler function called during a recording session when a
// user clicks a tab.
// It retrieves the name of the tab that was clicked and records a step that
// selects the tab.
//
// Name:        onTabClick
// Parameters:  selectedItem - The parameter passed to the RegisterForEvent function,
//              in this case the tab that the user clicked.
//              eventObj - The event object for the onclick event.
// Returns:     Boolean. true if the operation was recorded, otherwise false.
///////////////////////////////////////////////////////////////////////////////////
function onTabClick(selectedItem, eventObj) {
	var tabLabel = trim(window.$(selectedItem).text());
	if (!tabLabel)
		return false;
	
	var arr = new Array();
	arr.push(tabLabel);
	_util.Record("Select", toSafeArray(arr), 0);
	return true;
}



////////////////////////////////////////////////////////////////////////////////
// This returns title of all the Tab on a widget separated by a semicolon 
//
// Parameters: None
// Returns:   String
///////////////////////////////////////////////////////////////////////////////////
function GetItems() {
    var tabLabels = new Array();
    var tabs = window.$(_elem).find(".ui-tabs-nav > li");
    for (var i = 0; i < tabs.length; i++)
        tabLabels.push(tabs[i].innerText);
    return tabLabels.join(";");
}



////////////////////////////////////////////////////////////////////////////////
// This returns title of current selected Tab on widget
//
// Parameters: None
// Returns:   String
///////////////////////////////////////////////////////////////////////////////////
function GetSelectedItem() {
    return window.$(_elem).find(".ui-tabs-nav > li[class*='ui-tabs-selected']")[0].innerText;
}

////////////////////////////////////////////////////////////////////////////////
// This returns count of Tabs on widget
//
// Parameters: None
// Returns:   Integer
///////////////////////////////////////////////////////////////////////////////////
function GetItemCount() {
    return window.$(_elem).find(".ui-tabs-nav > li").length;
}



