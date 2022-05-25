import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from "@mui/lab";
import Stack from "@mui/material/Stack";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from "@mui/material";
import Tree from "./Tree";
import { setTreeMenu } from "../app/slices/treeMenuSlice";
import { useSelector, useDispatch } from 'react-redux';

function SideNav() {
    const treeMenu = useSelector((state) => state.treeMenu);
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [treeCategories, setTreeCategories] = useState([]);

    const fs = window.require('fs/promises');

    useEffect(() => {
        if (treeMenu.loaded) {
            setDataFromFile();
        }
    }, [treeMenu.loaded]);

    useEffect(() => {
        setTreeCategories(getTreeData());

        if (treeMenu.treeMenu.length == 0 || !treeMenu.loaded) {
            return;
        }

        fs.writeFile(`test/treeMenu.json`, JSON.stringify(treeMenu.treeMenu));
    }, [treeMenu]);

    var testData = [
        {
            id: 1,
            name: 'Root',
            parentId: 0
        }
    ];

    const setDataFromFile = () => {
        fs.readFile("test/treeMenu.json", 'utf8')
            .then(function (data) {
                dispatch(setTreeMenu(JSON.parse(data)));
            }).catch(console.error);
    }

    const getTreeData = () => {
        if (!treeMenu.treeMenu == null) return;

        var treeNodes = treeMenu.treeMenu.map((item) => ({
            ...item,
            hasChildren:
                treeMenu.treeMenu.filter((i) => i.parentId === item.id && i.isActive !== false).length > 0,
        }));

        return treeNodes;
    }

    const addCategory = (parent) => {
        var parentId = 0;
        if (parent) {
            parentId = parent.id;
        }

        var newCategories = [
            ...treeMenu, {
                name: "Test Child",
                id: 4,
                parentId: parentId
            }
        ];

        setTreeMenu(newCategories);

        dispatch(setTreeMenu(newCategories));
    }

    const displayTree = () => (
        <div className="text-white">
            <Tree treeData={treeCategories}></Tree>
        </div>
    );

    return (
        <div className="w-72 bg-slate-600">
            {displayTree()}
        </div>
    );
}

export default SideNav;