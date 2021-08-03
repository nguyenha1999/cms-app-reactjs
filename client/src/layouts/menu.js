import {
    FileOutlined,
    FolderOutlined,
    HomeOutlined,
    SettingOutlined
} from '@ant-design/icons';

var menu = [
    {
        title: "Trang Chủ",
        path: "/",
        icon: <HomeOutlined />,
    },
    {
        title: "Tài Liệu",
        path: "/document",
        icon: <FileOutlined />,
    },
    {
        title: "Quy Trình",
        path: "/procedure",
        icon: <FolderOutlined />,
    },
    {
        title: "Hồ sơ",
        path: "/profile",
        icon: <SettingOutlined />,
    },
]
export default menu;