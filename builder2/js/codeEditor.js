export class CodeEditor {
    constructor() {
        this.editors = {
            html: this.createEditor('htmlEditor', 'xml'),
            css: this.createEditor('cssEditor', 'css'),
            js: this.createEditor('jsEditor', 'javascript')
        };
        
        this.setupTabSwitching();
        this.setupAutoUpdate();
    }

    createEditor(elementId, mode) {
        return CodeMirror(document.getElementById(elementId), {
            mode: mode,
            theme: 'monokai',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            tabSize: 2,
            lineWrapping: true
        });
    }

    setupTabSwitching() {
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const panel = document.getElementById(tab.dataset.code + 'Editor');
                panel.parentElement.classList.add('active');
                
                this.editors[tab.dataset.code].refresh();
            });
        });
    }

    setupAutoUpdate() {
        Object.entries(this.editors).forEach(([type, editor]) => {
            editor.on('change', () => {
                window.builder.setCustomCode(type, editor.getValue());
            });
        });
    }

    updateContent(content) {
        this.editors.html.setValue(content.html);
        this.editors.css.setValue(content.css);
        this.editors.js.setValue(content.js);
        
        Object.values(this.editors).forEach(editor => editor.refresh());
    }
}