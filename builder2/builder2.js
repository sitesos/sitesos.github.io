class WebsiteBuilder {
    constructor() {
        this.canvas = document.querySelector('.canvas-content');
        this.selectedElement = null;
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupPropertyEditor();
        this.setupExport();
        this.setupSave();
    }

    setupDragAndDrop() {
        const elements = document.querySelectorAll('.element');
        elements.forEach(element => {
            element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.type);
            });
        });

        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('text/plain');
            this.createElement(type, e.clientX, e.clientY);
        });
    }

    createElement(type, x, y) {
        const element = document.createElement('div');
        element.className = 'draggable';
        element.draggable = true;
        
        switch(type) {
            case 'heading':
                element.innerHTML = '<h2>New Heading</h2>';
                break;
            case 'text':
                element.innerHTML = '<p>New text paragraph</p>';
                break;
            case 'button':
                element.innerHTML = '<button>New Button</button>';
                break;
            case 'image':
                element.innerHTML = '<img src="https://via.placeholder.com/150" alt="placeholder">';
                break;
            case 'link':
                element.innerHTML = '<a href="#" target="_blank">New Link</a>';
                break;
            case 'divider':
                element.innerHTML = '<hr class="divider">';
                break;
            case 'list':
                element.innerHTML = '<ul><li>List Item 1</li><li>List Item 2</li></ul>';
                break;
            case 'container':
                element.innerHTML = '<div class="container-element">Container</div>';
                break;
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

        if (!this.selectedElement) {
            return;
        }

        const element = this.selectedElement.children[0];
        const properties = this.createPropertyControls(element);
        editor.appendChild(properties);
    }

    createPropertyControls(element) {
        const container = document.createElement('div');

        // Text content
        if (element.tagName !== 'IMG' && element.tagName !== 'HR') {
            const textGroup = document.createElement('div');
            textGroup.className = 'property-group';
            textGroup.innerHTML = `
                <label>Text</label>
                <input type="text" value="${element.innerText}" />
            `;
            textGroup.querySelector('input').addEventListener('input', (e) => {
                element.innerText = e.target.value;
            });
            container.appendChild(textGroup);
        }

        // Link href
        if (element.tagName === 'A') {
            const hrefGroup = document.createElement('div');
            hrefGroup.className = 'property-group';
            hrefGroup.innerHTML = `
                <label>Link URL</label>
                <input type="text" value="${element.href}" />
            `;
            hrefGroup.querySelector('input').addEventListener('input', (e) => {
                element.href = e.target.value;
            });
            container.appendChild(hrefGroup);
        }

        // Color
        if (element.tagName !== 'IMG' && element.tagName !== 'HR') {
            const colorGroup = document.createElement('div');
            colorGroup.className = 'property-group';
            colorGroup.innerHTML = `
                <label>Color</label>
                <input type="color" value="#000000" />
            `;
            colorGroup.querySelector('input').addEventListener('input', (e) => {
                element.style.color = e.target.value;
            });
            container.appendChild(colorGroup);
        }

        // Image source
        if (element.tagName === 'IMG') {
            const srcGroup = document.createElement('div');
            srcGroup.className = 'property-group';
            srcGroup.innerHTML = `
                <label>Image URL</label>
                <input type="text" value="${element.src}" />
            `;
            srcGroup.querySelector('input').addEventListener('input', (e) => {
                element.src = e.target.value;
            });
            container.appendChild(srcGroup);
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Element';
        deleteBtn.style.backgroundColor = '#ff4444';
        deleteBtn.style.color = 'white';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = () => {
            this.selectedElement.remove();
            this.selectedElement = null;
            this.updatePropertyEditor();
        };
        container.appendChild(deleteBtn);

        return container;
    }

    setupSave() {
        document.getElementById('saveBtn').addEventListener('click', () => {
            const siteName = document.getElementById('siteName').value.trim();
            if (!siteName) {
                alert('Please enter a website name');
                return;
            }

            const content = this.canvas.cloneNode(true);
            content.querySelectorAll('.draggable').forEach(el => {
                el.classList.remove('draggable', 'selected');
                el.removeAttribute('draggable');
            });

            const sites = JSON.parse(localStorage.getItem('sites') || '[]');
            sites.push([siteName, content.innerHTML]);
            localStorage.setItem('sites', JSON.stringify(sites));
            
            alert('Website saved successfully!');
        });
    }

    setupExport() {
        document.getElementById('exportBtn').addEventListener('click', () => {
            const siteName = document.getElementById('siteName').value.trim() || 'Exported Website';
            const content = this.canvas.cloneNode(true);
            
            content.querySelectorAll('.draggable').forEach(el => {
                el.classList.remove('draggable', 'selected');
                el.removeAttribute('draggable');
            });

            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <style>
        body { margin: 0; padding: 20px; }
        .container-element {
            border: 1px solid #ccc;
            min-height: 100px;
            padding: 10px;
            margin: 10px 0;
        }
        .divider {
            border: none;
            border-top: 2px solid #ccc;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    ${content.innerHTML}
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

const builder = new WebsiteBuilder();