// 目录名称映射
const directoryNames = {
    'root': '根目录',
    'folder1': '文件夹1',
    'folder2': '文件夹2',
    'folder3': '文件夹3'
};

// 模拟所有表的管理数据
const tableManagementData = {
    root: [
        { id: "table1", name: "表1", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "user_table", scheduleStatus: "已开启调度", updateTime: "2023-05-15 09:30" },
        { id: "table2", name: "表2", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "order_table", scheduleStatus: "未开启调度", updateTime: "2023-05-14 14:20" },
        { id: "table3", name: "表3", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "product_table", scheduleStatus: "未加入", updateTime: "2023-05-10 11:45" },
        { id: "table7", name: "表7", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "log_table", scheduleStatus: "已开启调度", updateTime: "2023-05-17 08:25" },
        { id: "table8", name: "表8", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "config_table", scheduleStatus: "未开启调度", updateTime: "2023-05-16 13:10" },
        { id: "table9", name: "表9", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "session_table", scheduleStatus: "未加入", updateTime: "2023-05-15 16:40" },
        { id: "table4", name: "表4", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_user", scheduleStatus: "已开启调度", updateTime: "2023-05-16 16:10" },
        { id: "table5", name: "表5", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_order", scheduleStatus: "未开启调度", updateTime: "2023-05-13 10:05" },
        { id: "table6", name: "表6", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_product", scheduleStatus: "未加入", updateTime: "2023-05-09 15:50" }
    ],
    folder1: [
        { id: "table1", name: "表1", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "user_table", scheduleStatus: "已开启调度", updateTime: "2023-05-15 09:30" },
        { id: "table2", name: "表2", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "order_table", scheduleStatus: "未开启调度", updateTime: "2023-05-14 14:20" },
        { id: "table3", name: "表3", directory: "文件夹1", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "product_table", scheduleStatus: "未加入", updateTime: "2023-05-10 11:45" },
        { id: "table7", name: "表7", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "log_table", scheduleStatus: "已开启调度", updateTime: "2023-05-17 08:25" },
        { id: "table8", name: "表8", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "config_table", scheduleStatus: "未开启调度", updateTime: "2023-05-16 13:10" },
        { id: "table9", name: "表9", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "session_table", scheduleStatus: "未加入", updateTime: "2023-05-15 16:40" }
    ],
    folder2: [
        { id: "table4", name: "表4", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_user", scheduleStatus: "已开启调度", updateTime: "2023-05-16 16:10" },
        { id: "table5", name: "表5", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_order", scheduleStatus: "未开启调度", updateTime: "2023-05-13 10:05" },
        { id: "table6", name: "表6", directory: "文件夹2", connectionName: "备用数据库", dataSourceType: "PostgreSQL", physicalTable: "backup_product", scheduleStatus: "未加入", updateTime: "2023-05-09 15:50" }
    ],
    folder3: [
        { id: "table7", name: "表7", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "log_table", scheduleStatus: "已开启调度", updateTime: "2023-05-17 08:25" },
        { id: "table8", name: "表8", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "config_table", scheduleStatus: "未开启调度", updateTime: "2023-05-16 13:10" },
        { id: "table9", name: "表9", directory: "文件夹1/文件夹3", connectionName: "主数据库", dataSourceType: "MySQL", physicalTable: "session_table", scheduleStatus: "未加入", updateTime: "2023-05-15 16:40" }
    ]
};

// 模拟表详情数据
const tableDetailData = {
    table1: [
        { id: 1, name: "项目A", status: "已完成", date: "2023-01-15" },
        { id: 2, name: "项目B", status: "进行中", date: "2023-02-20" },
        { id: 3, name: "项目C", status: "未开始", date: "2023-03-05" }
    ],
    table2: [
        { id: 1, product: "产品X", price: "¥199", stock: 25 },
        { id: 2, product: "产品Y", price: "¥299", stock: 10 },
        { id: 3, product: "产品Z", price: "¥399", stock: 5 }
    ],
    table3: [
        { id: 1, department: "技术部", count: 15, leader: "张三" },
        { id: 2, department: "市场部", count: 8, leader: "李四" },
        { id: 3, department: "人事部", count: 3, leader: "王五" }
    ],
    table4: [
        { id: 1, task: "需求分析", assignee: "赵六", progress: "80%" },
        { id: 2, task: "设计开发", assignee: "钱七", progress: "50%" },
        { id: 3, task: "测试验收", assignee: "孙八", progress: "20%" }
    ],
    table5: [
        { id: 1, customer: "客户A", level: "VIP", region: "华东" },
        { id: 2, customer: "客户B", level: "普通", region: "华北" },
        { id: 3, customer: "客户C", level: "高级", region: "华南" }
    ],
    table6: [
        { id: 1, order: "ORD-001", amount: "¥5000", date: "2023-01-10" },
        { id: 2, order: "ORD-002", amount: "¥8000", date: "2023-01-15" },
        { id: 3, order: "ORD-003", amount: "¥3000", date: "2023-01-20" }
    ],
    table7: [
        { id: 1, name: "员工A", position: "开发工程师", hireDate: "2022-03-15" },
        { id: 2, name: "员工B", position: "产品经理", hireDate: "2021-09-20" },
        { id: 3, name: "员工C", position: "测试工程师", hireDate: "2022-06-10" }
    ],
    table8: [
        { id: 1, name: "设备A", type: "服务器", status: "运行中" },
        { id: 2, name: "设备B", type: "网络交换机", status: "运行中" },
        { id: 3, name: "设备C", type: "存储设备", status: "维护中" }
    ],
    table9: [
        { id: 1, name: "版本1.0", releaseDate: "2023-01-15", status: "已发布" },
        { id: 2, name: "版本2.0", releaseDate: "2023-04-20", status: "已发布" },
        { id: 3, name: "版本3.0", releaseDate: "2023-07-05", status: "开发中" }
    ]
};

// 模拟物理表数据
const physicalTableData = [
    {
        id: 'physical-folder1',
        name: 'demo1',
        children: [
            { id: 'physical-table1', name: 'table1', directory: 'demo1' },
            { id: 'physical-table2', name: 'table2', directory: 'demo1' },
            { id: 'physical-table3', name: 'table3', directory: 'demo1' },
        ]
    },
    {
        id: 'physical-folder2',
        name: 'demo2',
        children: []
    },
    {
        id: 'physical-folder3',
        name: 'demo3',
        children: [
            { id: 'physical-table4', name: 'table4', directory: 'demo3' },
            { id: 'physical-table5', name: 'table5', directory: 'demo3' },
        ]
    }
];

// 采集计划管理数据
const planConnections = [
    { id: 'conn-1', name: '数据连接 A', type: 'MySQL', scheduleEnabled: true },
    { id: 'conn-2', name: '数据连接 B', type: 'PostgreSQL', scheduleEnabled: false },
    { id: 'conn-3', name: '数据连接 C', type: 'Oracle', scheduleEnabled: true },
    { id: 'conn-4', name: '数据连接 D', type: 'SQL Server', scheduleEnabled: false }
];

// 表配置数据 - 记录哪些表被添加到采集计划中
const tableConfigurations = {
    'conn-1': ['table1', 'table7'], // 数据连接A包含表1和表7
    'conn-2': ['table4', 'table5'], // 数据连接B包含表4和表5
    'conn-3': ['table2', 'table8'], // 数据连接C包含表2和表8
    'conn-4': [] // 数据连接D没有配置表
};

// 定时采集计划状态管理
const scheduleStatusManager = {
    // 获取表的定时采集计划状态
    getScheduleStatus: function(tableId) {
        // 查找表是否在某个数据连接的表配置中
        for (const [connId, tableIds] of Object.entries(tableConfigurations)) {
            if (tableIds.includes(tableId)) {
                const connection = planConnections.find(conn => conn.id === connId);
                return connection.scheduleEnabled ? '已开启调度' : '未开启调度';
            }
        }
        return '未加入';
    },
    
    // 更新数据连接的调度状态
    updateScheduleStatus: function(connId, enabled) {
        const connection = planConnections.find(conn => conn.id === connId);
        if (connection) {
            connection.scheduleEnabled = enabled;
            // 更新所有相关表的状态
            this.updateTableScheduleStatuses();
        }
    },
    
    // 更新所有表的调度状态
    updateTableScheduleStatuses: function() {
        // 更新所有目录中的表状态
        Object.keys(tableManagementData).forEach(directoryId => {
            tableManagementData[directoryId].forEach(table => {
                table.scheduleStatus = this.getScheduleStatus(table.id);
            });
        });
    },
    
    // 添加表到采集计划
    addTableToPlan: function(tableId, connId) {
        if (!tableConfigurations[connId]) {
            tableConfigurations[connId] = [];
        }
        if (!tableConfigurations[connId].includes(tableId)) {
            tableConfigurations[connId].push(tableId);
            this.updateTableScheduleStatuses();
        }
    },
    
    // 从采集计划中移除表
    removeTableFromPlan: function(tableId, connId) {
        if (tableConfigurations[connId]) {
            const index = tableConfigurations[connId].indexOf(tableId);
            if (index > -1) {
                tableConfigurations[connId].splice(index, 1);
                this.updateTableScheduleStatuses();
            }
        }
    }
};


