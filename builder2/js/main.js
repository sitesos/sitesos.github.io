import { WebsiteBuilder } from './builder2.js';
import { CodeEditor } from './codeEditor.js';

const builder = new WebsiteBuilder();
const codeEditor = new CodeEditor();

// Tab switching logic
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        
        if (button.dataset.tab === 'code') {
            codeEditor.updateContent(builder.getContent());
        }
    });
});