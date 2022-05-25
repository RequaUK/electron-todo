import React, { useState, useRef, useEffect } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { set } from "../app/slices/sideNavSlice";
import { Stack, TextField } from "@mui/material";
import ShowOnHover from "../app/utilities/ShowOnHover";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { setTreeMenu } from "../app/slices/treeMenuSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Row = ({ item, level, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [itemState, setItemState] = useState(item);
    const selectedNode = useSelector((state) => state.sideNav);
    const treeMenu = useSelector((state) => state.treeMenu);
    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
    const renameInputRef = useRef();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const clickRow = () => {
        setIsCollapsed(!isCollapsed);
        dispatch(set(item));
    };

    useEffect(() => {
        if (!renameInputRef || !renameInputRef.current) {
            return;
        }

        renameInputRef.current.focus();
    }, [isEditingName]);

    useEffect(() => {
        var newCategories = treeMenu.treeMenu.map((item) => {
            return item.id === itemState.id ? itemState : item;
        });

        dispatch(setTreeMenu(newCategories));
    }, [itemState]);

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

        setAnchorEl(null);
        dispatch(setTreeMenu(newCategories));
    }

    const handleNameChange = (e) => {
        let newState = { ...itemState, name: e.target.value };
        setItemState(newState);
    };

    const handleRenameClicked = (e) => {
        setIsEditingName(!isEditingName);
        setAnchorEl(null);
    }

    const handleRenameBlur = (e) => {
        setRenameDialogOpen(true);
    }

    const handleCloseDialog = () => {
        
        setRenameDialogOpen(false);
    };

    const handleCloseDialogResult = (save) => {
        setRenameDialogOpen(false);
        setIsEditingName(false);
        if(save) {
            submitNameChange();
            return;
        } 

        let newState = { ...itemState, name: item.name };
        setItemState(newState);
    };

    const handleDeactivation = (e) => {
        let newState = { ...itemState, isActive: false };
        setItemState(newState);
    };

    const submitNameChange = (e) => {
        var newCategories = treeMenu.treeMenu.map((item) => {
            return item.id === itemState.id ? itemState : item;
        });

        dispatch(setTreeMenu(newCategories));
        setIsEditingName(false);
    }

    const handleContextSelect = (e) => {
        setAnchorEl(e.currentTarget);

        e.stopPropagation();
    }

    const handleContextClose = (e) => {
        setAnchorEl(null);
        e.stopPropagation();
    }

    if (item.isActive === false) {
        return;
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
                    spacing={0.5}
                    className="text-sm"
                    onContextMenu={(e) => handleContextSelect(e)}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5}
                    >
                        {!item.hasChildren ? <DescriptionIcon /> : (
                            <span>{isCollapsed ? <ChevronRightIcon></ChevronRightIcon> : <ExpandMoreIcon> </ExpandMoreIcon>}</span>
                        )}
                        <form onSubmit={submitNameChange}>
                            <input className="sidenav-note-rename" disabled={!isEditingName} autoFocus value={itemState.name} type="text" onBlur={handleRenameBlur} ref={renameInputRef} onChange={handleNameChange} />
                        </form>
                    </Stack>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleContextClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleRenameClicked}>
                            <EditIcon /> Rename
                        </MenuItem>
                        <MenuItem onClick={handleDeactivation}>
                            <DeleteIcon />Delete
                        </MenuItem>
                        <MenuItem onClick={addChild}>
                            <AddIcon /> Add
                        </MenuItem>
                    </Menu>

                    <Dialog
                        open={renameDialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You have made changes. Are you sure you want to save them?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => {handleCloseDialogResult(false)}}>No</Button>
                            <Button onClick={(e) => {handleCloseDialogResult(true)}} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div className={`${isHovered ? "block" : "hidden"}`}>
                        <AddIcon onClick={addChild} />
                    </div>
                </Stack>
            </div>
            {isCollapsed ? null : <div className="ml-2">
                {children}
            </div>}
        </div>
    );

};

export default Row;