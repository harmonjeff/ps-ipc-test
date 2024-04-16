const { entrypoints } = require("uxp");

// assign code the commands in Photoshop main menu

entrypoints.setup({
   commands: {

   }
});

// assign on click event for all buttons in all panels
document.onload = () => {

   // Third Party
   [...document.body.querySelectorAll('[data-snippet="btnTryIt"]')].forEach(button => button.addEventListener("click", tryIt));
}

// your code snippets
/** Third Party */
async function tryIt() {

   const { app, core, action } = require("photoshop");
   try {
      const { pluginManager } = require("uxp");
      const allPlugins = pluginManager.plugins;
      const plugin = Array.from(allPlugins).find(plugin => plugin.id === "ezgsStandin");
      if (plugin && plugin.enabled) {
          console.log('All commands:', plugin.manifest.commands);
          console.log('All panels:', plugin.manifest.panels);
  
          /* Show the plugin panel; Note that panels can only be made visible -- you can't ask to hide the panel */
          plugin.showPanel("EZGS Standin Standin");
  
          plugin.invokeCommand("addTwoLayers");
          
          /* Send an argument to the command  */
         //  const name = {
         //      firstName: "John",
         //      lastName: "Doe"
         //  };
         //  plugin.invokeCommand("commandWithInput", name);
      } else {
          // prompt the user to install or enable the plugin before trying again
      }
  } catch (e) {
      console.error(e);
  }

}

