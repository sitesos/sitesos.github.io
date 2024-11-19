import { elements } from './elements.js';

export class WebsiteBuilder {
    constructor() {
        this.canvas = document.querySelector('.canvas-content');
        this.selectedElement = null;
        this.customJS = '';
        this.customCSS = '';
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupPropertyEditor();
        this.setupExport();
        this.setupSave();
    }

    setupDragAndDrop() {
        const elementItems = document.querySelectorAll('.element');
        elementItems.forEach(element => {
            element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.type);
            });
        });

        this.canvas.addEventListener('dragover', (e) => e.preventDefault());
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('text/plain');
            this.createElement(type, e.clientX, e.clientY);
        });
    }

    createElement(type) {
        const element = document.createElement('div');
        element.className = 'draggable';
        element.draggable = true;
        
        const elementConfig = elements[type] || elements.paragraph;
        element.innerHTML = elementConfig.html;
        
        if (elementConfig.className) {
            element.children[0].className = elementConfig.className;
        }

        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(element);
        });

        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'move');
            this.selectElement(element);
        });

        this.canvas.appendChild(element);
        this.selectElement(element);
    }

    selectElement(element) {
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
        }
        this.selectedElement = element;
        element.classList.add('selected');
        this.updatePropertyEditor();
    }

    setupPropertyEditor() {
        this.propertyEditor = document.getElementById('propertyEditor');
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.draggable') && !e.target.closest('.properties')) {
                if (this.selectedElement) {
                    this.selectedElement.classList.remove('selected');
                    this.selectedElement = null;
                    this.updatePropertyEditor();
                }
            }
        });
    }

    updatePropertyEditor() {
        const editor = this.propertyEditor;
        editor.innerHTML = '';

        if (!this.selectedElement) return;

        const element = this.selectedElement.children[0];
        const properties = this.createPropertyControls(element);
        editor.appendChild(properties);
    }

    createPropertyControls(element) {
        const container = document.createElement('div');
        
        // Common properties
        if (element.tagName !== 'HR') {
            this.addStyleProperty(container, element, 'margin', 'Margin');
            this.addStyleProperty(container, element, 'padding', 'Padding');
            this.addStyleProperty(container, element, 'background-color', 'Background Color', 'color');
            this.addStyleProperty(container, element, 'color', 'Text Color', 'color');
        }

        // Element-specific properties
        if (element.tagName !== 'IMG' && element.tagName !== 'HR') {
            this.addTextProperty(container, element);
        }

        if (element.tagName === 'IMG') {
            this.addImageProperties(container, element);
        }

        if (element.tagName === 'A') {
            this.addLinkProperties(container, element);
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Element';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            this.selectedElement.remove();
            this.selectedElement = null;
            this.updatePropertyEditor();
        };
        container.appendChild(deleteBtn);

        return container;
    }

    addStyleProperty(container, element, property, label, type = 'text') {
        const group = document.createElement('div');
        group.className = 'property-group';
        group.innerHTML = `
            <label>${label}</label>
            <input type="${type}" value="${element.style[property] || ''}" />
        `;
        group.querySelector('input').addEventListener('input', (e) => {
            element.style[property] = e.target.value;
        });
        container.appendChild(group);
    }

    addTextProperty(container, element) {
        const group = document.createElement('div');
        group.className = 'property-group';
        group.innerHTML = `
            <label>Text Content</label>
            <input type="text" value="${element.innerText}" />
        `;
        group.querySelector('input').addEventListener('input', (e) => {
            element.innerText = e.target.value;
        });
        container.appendChild(group);
    }

    addImageProperties(container, element) {
        const group = document.createElement('div');
        group.className = 'property-group';
        group.innerHTML = `
            <label>Image URL</label>
            <input type="text" value="${element.src}" />
            <label>Alt Text</label>
            <input type="text" value="${element.alt}" />
        `;
        const [srcInput, altInput] = group.querySelectorAll('input');
        srcInput.addEventListener('input', (e) => element.src = e.target.value);
        altInput.addEventListener('input', (e) => element.alt = e.target.value);
        container.appendChild(group);
    }

    addLinkProperties(container, element) {
        const group = document.createElement('div');
        group.className = 'property-group';
        group.innerHTML = `
            <label>Link URL</label>
            <input type="text" value="${element.href}" />
            <label>Target</label>
            <select>
                <option value="_self" ${element.target === '_self' ? 'selected' : ''}>Same Window</option>
                <option value="_blank" ${element.target === '_blank' ? 'selected' : ''}>New Window</option>
            </select>
        `;
        group.querySelector('input').addEventListener('input', (e) => element.href = e.target.value);
        group.querySelector('select').addEventListener('change', (e) => element.target = e.target.value);
        container.appendChild(group);
    }

    getContent() {
        return {
            html: this.canvas.innerHTML,
            css: this.customCSS,
            js: this.customJS
        };
    }

    setCustomCode(type, code) {
        if (type === 'css') this.customCSS = code;
        if (type === 'js') this.customJS = code;
    }

    setupSave() {
        document.getElementById('saveBtn').addEventListener('click', () => {
            const siteName = document.getElementById('siteName').value.trim();
            if (!siteName) {
                alert('Please enter a website name');
                return;
            }

            const content = this.getContent();
            const sites = JSON.parse(localStorage.getItem('sites') || '[]');
            sites.push([siteName, content]);
            localStorage.setItem('sites', JSON.stringify(sites));
            
            alert('Website saved successfully!');
        });
    }

    setupExport() {
        document.getElementById('exportBtn').addEventListener('click', () => {
            const siteName = document.getElementById('siteName').value.trim() || 'Exported Website';
            const content = this.getContent();
            
            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <style>
        /* Base styles */
        body { margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
        
        /* Custom styles */
        ${content.css}
    </style>
</head>
<body>
    ${content.html}
    <script>
        ${content.js}
    </script>
</body>
</html>`;

            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${siteName.toLowerCase().replace(/\s+/g, '-')}.html`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}