import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Markdown from 'markdown-to-jsx';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Fab, Stack } from "@mui/material";

const ContentDisplay = () => {
    const selectedNode = useSelector((state) => state.sideNav);
    const [content, setContent] = useState("");
    const [tempContent, setTempContent] = useState("");
    const [editingMode, setEditingMode] = useState(false);
    const fs = window.require('fs');

    useEffect(() => {
        if (!selectedNode.sideNav || !selectedNode.sideNav.id) {
            return;
        }

        getContentBySelectedNode();
    }, [selectedNode]);

    useEffect(() => {
        setTempContent(content);
    }, [content, editingMode]);

    const getContentBySelectedNode = () => {
        createFileIfDoesntExist();

        fs.readFile(`test/pages/${selectedNode.sideNav.id}.md`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            setContent(data);
        });

    };

    const createFileIfDoesntExist = () => {
        fs.stat(`test/pages/${selectedNode.sideNav.id}.md`, (error, stats) => {
            if (error) {
                fs.writeFile(`test/pages/${selectedNode.sideNav.id}.md`, "# Test markdown", err => {
                    if (err) {
                        console.error(error);
                    }
                });
            }
        });
    }

    const handleContentChange = (e) => {
        setTempContent(e.target.value);
    }

    const submit = (e) => {
        //-- Save
        setEditingMode(false);
        setContent(tempContent);
        save();
    }

    const save = () => {
        fs.writeFileSync(`test/pages/${selectedNode.sideNav.id}.md`, tempContent);
    }

    return (
        <div className="w-full h-[99%]">
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
                sx={{ height: "100%" }}
            >

                {!editingMode ? <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditingMode(!editingMode)} sx={{ width: "100px" }}>
                    Edit
                </Button> :
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={submit} sx={{ width: "100px" }}>
                            Save
                        </Button>

                        <Button variant="contained" startIcon={<SaveIcon />} onClick={() => setEditingMode(false)} sx={{ width: "100px" }}>
                            Cancel
                        </Button>
                    </Stack>
                }
                {!editingMode ?
                    <Markdown className='prose lg:prose-xl'>{content}</Markdown> :

                    <Card className="h-full">
                        <CardHeader className="bg-blue-400 text-white" title="Edit" />
                        <CardContent className="h-[85%]">

                            <textarea
                                aria-label="rules"
                                placeholder="Empty"
                                value={tempContent}
                                className="md:h-[100%] md:w-[100%] h-[90%] w-[90%] box-border"
                                onChange={handleContentChange}
                            />
                        </CardContent>
                    </Card>}
            </Stack>
        </div>
    );
}

export default ContentDisplay;