import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import { useEffect } from 'react';
import SideNav from './sidenav/SideNav';
import { useSelector, useDispatch } from 'react-redux';
import { setTreeMenuLoaded } from "./app/slices/treeMenuSlice";

function App() {
  const path = window.require('path');
  const fs = window.require('fs/promises');
  const dispatch = useDispatch();

  useEffect(() => {
    createBaseFiles("test/pages");
  }, []);

  var defaultData = [
    {
      id: 1,
      name: 'Root',
      parentId: 0
    }
  ];

  function createBaseFiles(filePath) {
    fs.mkdir(filePath, { recursive: true })
      .then(function () {
        return checkFileExists("test/settings.json");
      })
      .then(function (exists) {
        if (!exists) {
          return fs.writeFile("test/settings.json", "", err => { });
        }
      })
      .then(function () {
        return checkFileExists("test/treeMenu.json");
      })
      .then(function (exists) {
        if (!exists) {
          return fs.writeFile("test/treeMenu.json", JSON.stringify(defaultData)).then(function() {
            dispatch(setTreeMenuLoaded(true));
          });
        }
        
        dispatch(setTreeMenuLoaded(true));
        return;
      }).catch(console.error);
  }



  function checkFileExists(filePath) {
    return new Promise(function (resolve, reject) {
      fs.stat(filePath)
        .then(function (exists) {
          return resolve(true);
        })
        .catch(function () {
          return resolve(false);
        });
    });
  }

  return (
    <div className='flex flex-row'>
      <SideNav />
      <div className="grow">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
