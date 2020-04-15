const vscode = require('vscode');
const translate = require("google-translate-open-api").default;
const languages = require("./language");

// global variables
let defaultLanguage = "tr"

function TranslateSelectedText(selectedText) {
	translate(selectedText, {
		to: defaultLanguage,
	  }).then(res => {
        if (!!res && res.status == 200 && !!res.data) {
			vscode.window.showInformationMessage("Translated: "+res.data[0]);
        } else {
			vscode.window.showErrorMessage("Google Translation API issue. Status: "+res.status);
        }
      })
	  .catch(e =>
        vscode.window.showErrorMessage("Google Translation API issue: " + e.message)
      );
}


function activate(context) {
	let translateSelected = vscode.commands.registerCommand(
		"McahitCali.translateSelected",
		function() {
			const editor = vscode.window.activeTextEditor;
			let selectedText = editor.document.getText(editor.selection);
			TranslateSelectedText(selectedText);
		}
	  );

	  let englishToTurkish = vscode.commands.registerCommand(
		  "McahitCali.enToTr",
		  function () {
			  defaultLanguage = languages.find(lang => lang.name == 'Turkish').value;
		  }
	  );

	  let turkishToEnglish = vscode.commands.registerCommand(
		"McahitCali.trToEn",
		function () {
			defaultLanguage = languages.find(lang => lang.name == 'English').value;
		}
	);
	context.subscriptions.push(translateSelected, englishToTurkish,turkishToEnglish);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
module.exports = {
	activate,
	deactivate
}
