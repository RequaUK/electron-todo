import React, { useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { set } from "../app/slices/sideNavSlice";
import { Stack } from "@mui/material";
import ShowOnHover from "../app/utilities/ShowOnHover";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { setTreeMenu } from "../app/slices/treeMenuSlice";

const Row = ({ item, level, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const selectedNode = useSelector((state) => state.sideNav);
    const treeMenu = useSelector((state) => state.treeMenu);
    const dispatch = useDispatch();

    const entityIcon = (
        <DescriptionIcon />
    );

    const clickRow = () => {
        setIsCollapsed(!isCollapsed);
        dispatch(set(item));
    };

    const addChild = () => {
        var lastId = treeMenu.treeMenu.map(node => node.id).sort((a, b) => a - b)[
            treeMenu.treeMenu.length - 1
          ];
          
        var newCategories = [
            ...treeMenu.treeMenu, {
                name: "New Child",
                id: lastId + 1,
                parentId: item.id
            }
        ];

        dispatch(setTreeMenu(newCategories));
    }

    return (
        <div key={`section-${item.id}`}>
            <div
                onClick={() => clickRow()}
                className={`${selectedNode && selectedNode.sideNav && selectedNode.sideNav.id == item.id ? "bg-slate-400/50" : ""}`}
            >
                <Stack
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0.5}>
                    <div>

                        {!item.hasChildren ? null : (
                            <ChevronRightIcon
                            />
                        )}
                        {entityIcon}
                        <span>{item.name}</span>
                    </div>

                    <div className={`${isHovered ? "block" : "hidden"}`}>
                        <EditIcon />
                        <DeleteIcon />
                        <AddIcon onClick={addChild} />
                    </div>
                </Stack>
            </div>
            {isCollapsed ? null : <div className="ml-9">
                {children}
            </div>}
        </div>
    );

};

export default Row;