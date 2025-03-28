/**
 * Initialize Univer from server's configuration
 * @param {*} config Configuration object to initialize the component
 */
function initUniver(config){
    
    /**
     * config attributes:
     * 
     * hasShort: Bool
     * hasDataValidation: Bool
     * hasFilter: Bool
     * hasConditionalFormatting: Bool
     * hasHyperLink: Bool
     * hasDrawing: Bool
     * hasThreadComment: Bool
     * hasCrosshair: Bool
     * hasWatermark: Bool
     * watermarkLabel: String
     * 
     * newSheetName: String
     * idDiv. string
     */

    const { createUniver } = UniverPresets;
    const { LocaleType, merge } = UniverCore;
    const { defaultTheme } = UniverDesign;

    const { univerAPI } = createUniver({
        locale: LocaleType.EN_US,
        locales: {
            [LocaleType.EN_US]: merge(
                {},
                UniverPresetSheetsCoreEnUS,
                config.hasShort ? UniverPresetSheetsSortEnUS : null,
                config.hasDataValidation ? UniverPresetSheetsDataValidationEnUS : null,
                config.hasFilter ? UniverPresetSheetsFilterEnUS : null,
                config.hasConditionalFormatting ? UniverPresetSheetsConditionalFormattingEnUS : null,
                config.hasHyperLink ? UniverPresetSheetsHyperLinkEnUS : null,
                config.hasThreadComment ? UniverPresetSheetsThreadCommentEnUS : null,
                config.hasDrawing ? UniverPresetSheetsDrawingEnUS : null,
                null, // UniverSheetsCrosshairHighlightEnUS,
                null // UniverWatermarkEnUS
            ),
        },
        theme: defaultTheme,
        presets: getPresets(config),
        plugins: getPlugins(config)
    });

    univerAPI.createUniverSheet({ name: config.newSheetName })
    window.univerAPI = univerAPI;
    window.univerAPI.getUserService = function() { return window.univerAPI.getUserManager()._userManagerService }

    // Funcion para el "Listener": Evento en server que se ejecuta cada vez que el valor en una celda cambia
    window.univerAPI.addEvent(window.univerAPI.Event.SheetEditEnded, async (e) => {
        var info = {
            row: e.row,
            col: e.column,
            unitId: e.workbook.id,
            subUnitId: e.worksheet.getSheetId()
        }
        if (!window.listenerNET.listeners.includes(info))
            return

        var cellValue = e.worksheet.getRange(info.row, info.col).getValue()

        // Aquí manda la señal al "Listener" en servidor, indicando la posición y el valor asignados
        await window.listenerNET.net.invokeMethodAsync("OnDataChanged", info, cellValue)
    })
}

function getPresets(config){
    var presets = []
    const { UniverSheetsCorePreset } = UniverPresetSheetsCore
    presets.push(UniverSheetsCorePreset({ container: config.idDiv }))

    if (config.hasShort){
        const { UniverSheetsSortPreset } = UniverPresetSheetsSort
        presets.push(UniverSheetsSortPreset())
    }

    if (config.hasDataValidation){
        const { UniverSheetsDataValidationPreset } = UniverPresetSheetsDataValidation
        presets.push(UniverSheetsDataValidationPreset())
    }

    if (config.hasFilter){
        const { UniverSheetsFilterPreset } = UniverPresetSheetsFilter
        presets.push(UniverSheetsFilterPreset())
    }

    if (config.hasConditionalFormatting){
        const { UniverSheetsConditionalFormattingPreset } = UniverPresetSheetsConditionalFormatting
        presets.push(UniverSheetsConditionalFormattingPreset())
    }

    if (config.hasHyperLink){
        const { UniverSheetsHyperLinkPreset } = UniverPresetSheetsHyperLink
        presets.push(UniverSheetsHyperLinkPreset())
    }

    if (config.hasDrawing){
        const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing
        presets.push(UniverSheetsDrawingPreset())
    }

    if (config.hasThreadComment){
        const { UniverSheetsThreadCommentPreset } = UniverPresetSheetsThreadComment
        presets.push(UniverSheetsThreadCommentPreset())
    }

    return presets
}

function getPlugins(config){
    var plugins = []
    if (config.hasCrosshair){
        const { UniverSheetsCrosshairHighlightPlugin } = UniverSheetsCrosshairHighlight
        plugins.push(UniverSheetsCrosshairHighlightPlugin)
    }

    if (config.hasWatermark){
        const { UniverWatermarkPlugin } = UniverWatermark
        plugins.push([UniverWatermarkPlugin,
        {
            textWatermarkSettings: {content: config.watermarkLabel}
        }])
    }

    return plugins
}

//UniverPresetSheetsConditionalFormattingEnUS,
// Función para el "ActivityPool": Evento en server que ejecuta los métodos del apuntador de acuerdo al nombre del método y sus respectivos argumentos.
// Devuelve el valor nuevo del apuntador, y arroja nulo en caso de que el método no exista
function getAndExecuteMethod(queue, toReturn){
    var result = null
    for (var i = 0; i < queue.length; i++){
        if (i == 0){
            if (typeof window.univerAPI[queue[i].methodName] === "function"){
                result = window.univerAPI[queue[i].methodName].apply(window.univerAPI, queue[i].args);
            }
            else{
                console.error(`Method ${queue[i].methodName} does not exist on Univer API`);
                return null
            }
            continue;
        }

        if (typeof result[queue[i].methodName] === "function"){
            result = result[queue[i].methodName].apply(result, queue[i].args);
        }
        else{
            console.error(`Method ${queue[i].methodName} does not exist on Univer API`);
            return null
        }
    }
    if (toReturn)
        return result
    return "OK"
}

function isPromise(value) {
    return value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}

/* 
    Additional functions 
*/
function getSheetsInfo(){
    var result = []
    window.univerAPI.getActiveWorkbook().getSheets().forEach(sheet => {
        result.push({
            id: sheet.getId(),
            name: sheet.getName(),
            maxUsed: sheet.getDataRange(),
            tabColor: sheet.getTabColor()
        })
    })
    return result
}

function getCellsStylesInfo(){
    var result = []
    window.univerAPI.getActiveWorkbook().getActiveSheet().getActiveRange().getCellStyles().forEach(styleArray => {
        var arrayStyles = []
        styleArray.forEach(style => {
            if (!style){
                arrayStyles.push(null)
            }
            else{
                arrayStyles.push(style.getValue())
            }
        })
        result.push(arrayStyles)
    })
    return result
}

function insertHyperLink(text, link){
    const range = window.univerAPI.getActiveWorkbook()
        .getActiveSheet()
        .getActiveRange();
    
    // Create hyperlink using newRichText().insertLink
    const richText = window.univerAPI.newRichText()
        .insertLink(text, link);
    
    // Set to cell
    range.setRichTextValueForCell(richText);
}

async function insertComment(comment){
    const range = window.univerAPI.getActiveWorkbook()
        .getActiveSheet()
        .getActiveRange();

    const _comment = window.univerAPI.newTheadComment()
                                    .setContent(window.univerAPI.newRichText().insertText(comment.text.dataStream))
                                    .setDateTime(new Date(comment.dT))
                                    .setId(comment.id)
                                    .setPersonId(comment.userId)
                                    .build()
    await range.addCommentAsync(_comment)
}

function getAllComments(){
    const comments = window.univerAPI.getActiveWorkbook().getActiveSheet().getComments()
    var result = []
    comments.forEach((comment) => { result.push(comment.getCommentData()) });
    return result;
}

function getImagesId(){
    const images = window.univerAPI.getActiveWorkbook().getActiveSheet().getImages()
    var result = []
    images.forEach((img) => { result.push(img.getId()) })
    return result
}

async function getImageById(id, withSource){
    const image = null
    await window.univerAPI.getActiveWorkbook().getActiveSheet().getImageById(id).toBuilder().buildAsync().then(result => {
        if (!withSource){
            result.source = ""
        }
        image = result
    })
    return image
}

/* 
    Listener Functions
 */
function initListenerObject(dotNetLstnr){
    window.listenerNET.net = dotNetLstnr
    window.listenerNET.listeners = []
}

function addListenerRange(listener) { 
    window.listenerNET.listeners.push(listener)
}

function removeListener(listener) {
    var index = window.listenerNET.listeners.indexOf(listener)
    if (index > -1){
        window.listenerNET.listeners.splice(index, 1)
    }
}
