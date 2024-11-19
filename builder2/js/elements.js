export const elements = {
    // Typography
    h1: {
        html: '<h1>Heading 1</h1>',
        className: 'text-4xl font-bold mb-4'
    },
    h2: {
        html: '<h2>Heading 2</h2>',
        className: 'text-3xl font-bold mb-3'
    },
    h3: {
        html: '<h3>Heading 3</h3>',
        className: 'text-2xl font-bold mb-2'
    },
    paragraph: {
        html: '<p>Enter your text here</p>',
        className: 'mb-4'
    },
    quote: {
        html: '<blockquote>Your quote here</blockquote>',
        className: 'border-l-4 border-gray-300 pl-4 italic my-4'
    },
    code: {
        html: '<pre><code>// Your code here</code></pre>',
        className: 'bg-gray-100 p-4 rounded'
    },

    // Layout
    section: {
        html: '<section><div class="container mx-auto px-4">Section content</div></section>',
        className: 'py-12'
    },
    container: {
        html: '<div>Container content</div>',
        className: 'container mx-auto px-4'
    },
    'grid-2': {
        html: '<div class="grid grid-cols-2 gap-4"><div>Column 1</div><div>Column 2</div></div>'
    },
    'grid-3': {
        html: '<div class="grid grid-cols-3 gap-4"><div>Column 1</div><div>Column 2</div><div>Column 3</div></div>'
    },
    'grid-4': {
        html: '<div class="grid grid-cols-4 gap-4"><div>Column 1</div><div>Column 2</div><div>Column 3</div><div>Column 4</div></div>'
    },
    divider: {
        html: '<hr>',
        className: 'my-4'
    },
    spacer: {
        html: '<div></div>',
        className: 'h-8'
    },

    // Components
    button: {
        html: '<button>Click me</button>',
        className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
    },
    card: {
        html: '<div><h3>Card Title</h3><p>Card content goes here</p></div>',
        className: 'p-4 bg-white shadow rounded'
    },
    alert: {
        html: '<div role="alert">Alert message</div>',
        className: 'p-4 bg-yellow-100 text-yellow-700 rounded'
    },
    badge: {
        html: '<span>Badge</span>',
        className: 'px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm'
    },
    progress: {
        html: '<progress value="50" max="100"></progress>',
        className: 'w-full'
    },

    // Forms
    input: {
        html: '<input type="text" placeholder="Enter text">',
        className: 'px-3 py-2 border rounded w-full'
    },
    textarea: {
        html: '<textarea placeholder="Enter long text"></textarea>',
        className: 'px-3 py-2 border rounded w-full'
    },
    checkbox: {
        html: '<label><input type="checkbox"> Checkbox label</label>',
        className: 'flex items-center gap-2'
    },
    radio: {
        html: '<label><input type="radio"> Radio label</label>',
        className: 'flex items-center gap-2'
    },
    select: {
        html: '<select><option>Option 1</option><option>Option 2</option></select>',
        className: 'px-3 py-2 border rounded w-full'
    },
    form: {
        html: `<form>
            <div class="mb-4">
                <label class="block mb-2">Name</label>
                <input type="text" class="px-3 py-2 border rounded w-full">
            </div>
            <div class="mb-4">
                <label class="block mb-2">Email</label>
                <input type="email" class="px-3 py-2 border rounded w-full">
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </form>`
    },

    // Media
    image: {
        html: '<img src="https://via.placeholder.com/300x200" alt="Image description">',
        className: 'max-w-full h-auto'
    },
    video: {
        html: '<video controls><source src="" type="video/mp4">Your browser does not support the video tag.</video>',
        className: 'w-full'
    },
    audio: {
        html: '<audio controls><source src="" type="audio/mpeg">Your browser does not support the audio tag.</audio>',
        className: 'w-full'
    },
    icon: {
        html: '<i class="fas fa-star"></i>',
        className: 'text-xl'
    },
    carousel: {
        html: `<div class="carousel">
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400" alt="Slide 1"></div>
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400" alt="Slide 2"></div>
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400" alt="Slide 3"></div>
        </div>`
    },

    // Navigation
    navbar: {
        html: `<nav>
            <div class="container mx-auto px-4 flex justify-between items-center">
                <a href="#" class="font-bold text-xl">Logo</a>
                <div class="flex gap-4">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </nav>`,
        className: 'bg-white shadow'
    },
    menu: {
        html: `<ul>
            <li><a href="#">Menu Item 1</a></li>
            <li><a href="#">Menu Item 2</a></li>
            <li><a href="#">Menu Item 3</a></li>
        </ul>`,
        className: 'space-y-2'
    },
    tabs: {
        html: `<div class="tabs">
            <div class="tab-buttons">
                <button class="active">Tab 1</button>
                <button>Tab 2</button>
                <button>Tab 3</button>
            </div>
            <div class="tab-content">
                <div class="tab-panel active">Content 1</div>
                <div class="tab-panel">Content 2</div>
                <div class="tab-panel">Content 3</div>
            </div>
        </div>`
    },
    breadcrumb: {
        html: `<nav>
            <ol class="flex">
                <li>Home</li>
                <li class="mx-2">/</li>
                <li>Category</li>
                <li class="mx-2">/</li>
                <li>Page</li>
            </ol>
        </nav>`
    },
    pagination: {
        html: `<div class="flex gap-2">
            <button>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
        </div>`,
        className: 'flex justify-center'
    }
};