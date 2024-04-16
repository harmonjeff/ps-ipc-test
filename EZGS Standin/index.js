const { entrypoints } = require("uxp");

// assign code the commands in Photoshop main menu

entrypoints.setup({
   commands: {
      addTwoLayers: () => addTwoLayers(),

   }
});

// assign on click event for all buttons in all panels
document.onload = () => {

   // Make two layers
   [...document.body.querySelectorAll('[data-snippet="btnAddTwoLayers"]')]
      .forEach(button => button.addEventListener("click", addTwoLayers));
}

async function addTwoLayers() {
   console.debug('EZGSstandin.addTwoLayers:start');

   const { app, core, action } = require("photoshop");
   const batchPlay = action.batchPlay;

   try {
      await require("photoshop").core.executeAsModal(async (executionControl, descriptor) => {
         console.debug('EZGSstanding-executeAsModal:start')

         // Suspend history state on the target document
         // This will coalesce all changes into a single history state
         let suspensionID = await executionControl.hostControl.suspendHistory({
            "documentID": app.activeDocument.id,
            "name": "Add two layers"
         });

         // create first layer
         await batchPlay(
            [{
               _obj: "make",
               _target: [{
                  _ref: "layer"
               }],
               _options: {
                  dialogOptions: "dontDisplay"
               }
            }], {
            modalBehavior: "execute"
         });

         // create second layer
         await batchPlay([{
            _obj: "make",
            _target: [{
               _ref: "layer"
            }],
            _options: {
               dialogOptions: "dontDisplay"
            }
         }], {
            modalBehavior: "execute"
         });

         // resume the history state
         await executionControl.hostControl.resumeHistory(suspensionID);
         console.debug('EZGSstanding-executeAsModal:done')
      }, {
         "commandName": "Add two layers"
      })
      .then(res => console.debug('EZGSstandin-executeAsModal:res',res))
      .catch(err => { throw new Error('EZGSstanding-executeAsModal:err',err) });

      console.debug('EZGSstandin.addTwoLayers:done');
   } catch (Exception) {
      console.error('EZGSstanding:err',Exception)
      debugger;
   }
}

