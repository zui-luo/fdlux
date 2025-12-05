// 状态变量
let currentDirectoryId = 'root';
let lastDirectoryId = 'root';

document.addEventListener('DOMContentLoaded', function() {
    selectItem('root', 'directory');
    updateBreadcrumb('root');
    updateTableManagementContent('root');

    document.querySelectorAll('.toggle-btn').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFolder(this);
        });
    });

    document.querySelectorAll('[data-type="folder"]').forEach(folder => {
        folder.addEventListener('click', function() {
            const folderId = this.getAttribute('data-id');
            const toggleBtn = this.querySelector('.toggle-btn i');
            if (toggleBtn.classList.contains('fa-chevron-right')) {
                toggleFolder(this.querySelector('.toggle-btn'));
            }
            selectItem(folderId, 'folder');
            switchToTableManagementTab();
        });
    });

    document.getElementById('root-directory').addEventListener('click', function() {
        selectItem('root', 'directory');
        switchToTableManagementTab();
    });

    document.querySelectorAll('[data-type="table"]').forEach(table => {
        table.addEventListener('click', function() {
            const tableId = this.getAttribute('data-id');
            const tableName = this.querySelector('span').textContent;
            lastDirectoryId = currentDirectoryId;
            selectItem(tableId, 'table');
            openTableTab(tableId, tableName);
        });
    });

    document.querySelector('[data-tab="table-management"]').addEventListener('click', function() {
        switchToTableManagementTab();
        selectItem(lastDirectoryId, lastDirectoryId === 'root' ? 'directory' : 'folder');
    });

    const newBtn = document.getElementById('new-btn');
    const newMenu = document.getElementById('new-menu');
    const newTableMenu = document.getElementById('new-table-menu');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const generateBtn = document.getElementById('generate-btn');

    newBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        newMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
        if (!newBtn.contains(e.target) && !newMenu.contains(e.target)) {
            newMenu.classList.add('hidden');
        }
    });

    newTableMenu.addEventListener('click', function(e) {
        e.preventDefault();
        newMenu.classList.add('hidden');
        openModal();
    });

    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    generateBtn.addEventListener('click', function() {
        generateLogicalTables();
        closeModal();
    });

    renderPhysicalTableList();
});

function toggleFolder(toggleElement) {
    const folderElement = toggleElement.closest('[data-type="folder"]');
    const folderId = folderElement.getAttribute('data-id');
    const targetContent = document.getElementById(`${folderId}-content`);
    const icon = toggleElement.querySelector('i');

    targetContent.classList.toggle('hidden');

    if (targetContent.classList.contains('hidden')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
    } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-down');
    }
}

function updateBreadcrumb(directoryId) {
    const breadcrumbElement = document.getElementById('breadcrumb');
    let breadcrumbHtml = '';

    if (directoryId === 'root') {
        breadcrumbHtml = `
            <span class="breadcrumb-item-current">${directoryNames[directoryId]}</span>
        `;
    } else if (directoryId === 'folder3') {
        breadcrumbHtml = `
            <span class="breadcrumb-item" data-id="root">${directoryNames.root}</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item" data-id="folder1">${directoryNames.folder1}</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item-current">${directoryNames[directoryId]}</span>
        `;
    } else {
        breadcrumbHtml = `
            <span class="breadcrumb-item" data-id="root">${directoryNames.root}</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item-current">${directoryNames[directoryId]}</span>
        `;
    }

    breadcrumbElement.innerHTML = breadcrumbHtml;

    document.querySelectorAll('.breadcrumb-item').forEach(item => {
        item.addEventListener('click', function() {
            const dirId = this.getAttribute('data-id');
            selectItem(dirId, dirId === 'root' ? 'directory' : 'folder');
            switchToTableManagementTab();
        });
    });
}

function selectItem(itemId, itemType) {
    document.querySelectorAll('[data-type="folder"], [data-type="directory"], [data-type="table"]').forEach(item => {
        item.classList.remove('item-active');
    });

    let itemElement;
    if (itemType === 'directory' && itemId === 'root') {
        itemElement = document.getElementById('root-directory');
    } else {
        itemElement = document.querySelector(`[data-type="${itemType}"][data-id="${itemId}"]`);
    }

    if (itemElement) {
        itemElement.classList.add('item-active');
        if (itemType === 'folder' || itemType === 'directory') {
            currentDirectoryId = itemId;
        }
    }
}

function updateTableManagementContent(directoryId) {
    const contentElement = document.getElementById('directory-content');
    const tableData = tableManagementData[directoryId] || [];

    let tableHtml = `
        <table class="min-w-full border border-gray-300">
            <thead>
                <tr class="list-header">
                    <th class="px-4 py-2 border-b text-left">表名称</th>
                    <th class="px-4 py-2 border-b text-left">表目录</th>
                    <th class="px-4 py-2 border-b text-left">数据源类型</th>
                    <th class="px-4 py-2 border-b text-left">数据连接名称</th>
                    <th class="px-4 py-2 border-b text-left">物理表</th>
                    <th class="px-4 py-2 border-b text-left">定时采集计划</th>
                    <th class="px-4 py-2 border-b text-left">最近更新时间</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (tableData.length > 0) {
        tableData.forEach(row => {
            // 根据调度状态设置样式
            let scheduleStatusClass = '';
            switch(row.scheduleStatus) {
                case '已开启调度':
                    scheduleStatusClass = 'text-green-600 font-medium';
                    break;
                case '未开启调度':
                    scheduleStatusClass = 'text-orange-600 font-medium';
                    break;
                case '未加入':
                    scheduleStatusClass = 'text-gray-500';
                    break;
            }

            tableHtml += `
            <tr class="list-row">
                <td class="px-4 py-2 border-b">
                    <span class="table-cell-hover" data-table-id="${row.id}">${row.name}</span>
                </td>
                <td class="px-4 py-2 border-b">${row.directory}</td>
                <td class="px-4 py-2 border-b">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ${row.dataSourceType}
                    </span>
                </td>
                <td class="px-4 py-2 border-b">${row.connectionName}</td>
                <td class="px-4 py-2 border-b font-mono text-sm">${row.physicalTable}</td>
                <td class="px-4 py-2 border-b">
                    <span class="${scheduleStatusClass}">${row.scheduleStatus}</span>
                </td>
                <td class="px-4 py-2 border-b">${row.updateTime}</td>
            </tr>
            `;
        });
    } else {
        tableHtml += `
        <tr>
            <td colspan="7" class="px-4 py-2 text-center text-gray-500">
                该目录下没有表
            </td>
        </tr>
        `;
    }

    tableHtml += `
            </tbody>
        </table>
    `;

    contentElement.innerHTML = tableHtml;

    document.querySelectorAll('.table-cell-hover').forEach(cell => {
        cell.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table-id');
            const tableName = this.textContent;
            lastDirectoryId = currentDirectoryId;
            selectItem(tableId, 'table');
            openTableTab(tableId, tableName);
        });
    });
}

function switchToTableManagementTab() {
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('tab-active');
    });

    document.querySelector('[data-tab="table-management"]').classList.add('tab-active');

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById('table-management-tab').classList.remove('hidden');

    updateBreadcrumb(currentDirectoryId);
    updateTableManagementContent(currentDirectoryId);
}

function openTableTab(tableId, tableName) {
    let tabElement = document.querySelector(`[data-tab="${tableId}"]`);

    if (!tabElement) {
        const tabContainer = document.getElementById('tab-container');
        const contentContainer = document.getElementById('content-container');

        tabElement = document.createElement('div');
        tabElement.className = 'tab-item px-4 py-2 border border-b-0 cursor-pointer';
        tabElement.setAttribute('data-tab', tableId);
        tabElement.innerHTML = `
            ${tableName}
            <button class="ml-2 close-tab text-gray-500 hover:text-gray-700">×</button>
        `;
        tabContainer.appendChild(tabElement);

        tabElement.addEventListener('click', function(e) {
            if (!e.target.classList.contains('close-tab')) {
                switchToTab(tableId);
                selectItem(tableId, 'table');
            }
        });

        tabElement.querySelector('.close-tab').addEventListener('click', function(e) {
            e.stopPropagation();
            closeTab(tableId);
        });

        const contentElement = document.createElement('div');
        contentElement.id = `${tableId}-tab`;
        contentElement.className = 'tab-content hidden';
        contentElement.innerHTML = generateTableContent(tableId, tableName);
        contentContainer.appendChild(contentElement);
    }

    switchToTab(tableId);
}

function generateTableContent(tableId, tableName) {
    const data = tableDetailData[tableId];
    if (!data || data.length === 0) {
        return `
            <h2 class="text-lg font-bold mb-4">${tableName}</h2>
            <p>该表没有数据</p>
        `;
    }

    const headers = Object.keys(data[0]);

    let tableHtml = `
        <h2 class="text-lg font-bold mb-4">${tableName}</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-300">
                <thead>
                    <tr class="list-header">
    `;

    headers.forEach(header => {
        const formattedHeader = header.charAt(0).toUpperCase() + header.slice(1);
        tableHtml += `<th class="px-4 py-2 border-b">${formattedHeader}</th>`;
    });

    tableHtml += `
                    </tr>
                </thead>
                <tbody>
    `;

    data.forEach(row => {
        tableHtml += `<tr class="list-row">`;
        headers.forEach(header => {
            tableHtml += `<td class="px-4 py-2 border-b">${row[header]}</td>`;
        });
        tableHtml += `</tr>`;
    });

    tableHtml += `
                </tbody>
            </table>
        </div>
    `;

    return tableHtml;
}

function switchToTab(tabId) {
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('tab-active');
    });

    document.querySelector(`[data-tab="${tabId}"]`).classList.add('tab-active');

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(`${tabId}-tab`).classList.remove('hidden');
}

function closeTab(tabId) {
    const tabElement = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabElement) {
        tabElement.remove();
    }

    const contentElement = document.getElementById(`${tabId}-tab`);
    if (contentElement) {
        contentElement.remove();
    }

    if (tabElement && tabElement.classList.contains('tab-active')) {
        switchToTableManagementTab();
        selectItem(lastDirectoryId, lastDirectoryId === 'root' ? 'directory' : 'folder');
    }
}

function openModal() {
    const newTableModal = document.getElementById('new-table-modal');
    newTableModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    const newTableModal = document.getElementById('new-table-modal');
    newTableModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function renderPhysicalTableList() {
    const physicalTableList = document.getElementById('physical-table-list');
    physicalTableList.innerHTML = '';
    let html = '';

    function generateListHtml(data, indentLevel = 0) {
        data.forEach(item => {
            if (item.children) {
                const hasChildren = item.children.length > 0;
                const iconClass = hasChildren ? 'fa-chevron-down' : 'fa-chevron-right';
                html += `
                    <div class="flex items-center p-2 hover:bg-gray-100 cursor-pointer" style="padding-left: ${1.5 * indentLevel}rem;" data-type="physical-folder" data-id="${item.id}">
                        <span class="toggle-btn mr-1">
                            <i class="fa ${iconClass} text-gray-500"></i>
                        </span>
                        <i class="fa fa-folder text-yellow-500 mr-2"></i>
                        <span>${item.name}</span>
                    </div>
                    <div id="${item.id}-content" style="padding-left: ${1.5 * (indentLevel + 1)}rem;">
                `;
                generateListHtml(item.children, indentLevel + 1);
                html += `</div>`;
            } else {
                const tableName = item.name;
                html += `
                    <div class="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                        <input type="checkbox" class="form-checkbox text-primary rounded" data-table-id="${item.id}" data-table-name="${tableName}">
                        <i class="fa fa-table text-green-600 mr-2 ml-2"></i>
                        <span>${tableName}</span>
                    </div>
                `;
            }
        });
    }

    generateListHtml(physicalTableData);
    physicalTableList.innerHTML = html;

    const checkboxes = physicalTableList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateGenerateButtonText);
    });
}

function updateGenerateButtonText() {
    const selectedCount = document.querySelectorAll('#physical-table-list input[type="checkbox"]:checked').length;
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.textContent = `生成 ${selectedCount} 张逻辑表`;
}

function generateLogicalTables() {
    const selectedCheckboxes = document.querySelectorAll('#physical-table-list input[type="checkbox"]:checked');
    const logicalTablesContainer = document.getElementById('root-directory').parentElement;

    selectedCheckboxes.forEach(checkbox => {
        const physicalTableName = checkbox.getAttribute('data-table-name');
        const newTableId = `logical-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newTableName = `数据连接 A_${physicalTableName}`;

        const newTableHtml = `
            <div class="p-2 hover:bg-gray-100 cursor-pointer tree-indent" data-type="table" data-id="${newTableId}" data-parent="root">
                <i class="fa fa-table text-green-600 mr-3"></i>
                <span>${newTableName}</span>
            </div>
        `;
        logicalTablesContainer.insertAdjacentHTML('beforeend', newTableHtml);

        tableManagementData.root.push({
            id: newTableId,
            name: newTableName,
            directory: "根目录",
            connectionName: "数据连接 A",
            dataSourceType: "MySQL",
            physicalTable: physicalTableName,
            scheduleStatus: "未加入",
            updateTime: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') + ' ' + new Date().toLocaleTimeString('zh-CN', { hour12: false })
        });

        const newTableElement = logicalTablesContainer.querySelector(`[data-id="${newTableId}"]`);
        if (newTableElement) {
            newTableElement.addEventListener('click', function() {
                const tableId = this.getAttribute('data-id');
                const tableName = this.querySelector('span').textContent;
                lastDirectoryId = currentDirectoryId;
                selectItem(tableId, 'table');
                openTableTab(tableId, tableName);
            });
        }
    });

    selectedCheckboxes.forEach(checkbox => checkbox.checked = false);
    updateGenerateButtonText();
    switchToTableManagementTab();
    updateTableManagementContent(currentDirectoryId);
}


