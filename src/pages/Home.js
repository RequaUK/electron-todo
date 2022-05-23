import { Button, List, Stack, TextField, ListItem, ListItemText } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTreeMenu } from "../app/slices/treeMenuSlice";
import ContentDisplay from "../contentdisplay/ContentDisplay";

function Home() {
    const treeMenu = useSelector((state) => state.treeMenu);
    const dispatch = useDispatch();
    const [val, setVal] = useState('');
    const [itemsToTrack, setItemsToTrack] = useState({
        items: []
    });

    const fs = window.require('fs/promises');

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     fs.readFile("test/treeMenu.json", 'utf8', (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }

    //         dispatch(setTreeMenu(JSON.parse(data)));
    //     });
    // }, []);

    return (
        <div className="h-screen bg-slate-500 p-6 overflow-y-auto">
            <Stack direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                spacing={2}
                className="h-full">
                <ContentDisplay>

                </ContentDisplay>

            </Stack>
        </div>
    );
}

export default Home;
