import config from '../../config'
import SaveFile from '../classes/SaveFile';
import Selection from '../classes/Selection';
import Color from '../classes/Color';
import Logging from '../classes/Logging';
import OpenFile from '../classes/OpenFile';

cutTramStop();

function cutTramStop() {
  const jobNumber = prompt('Job Number', '000000P01');
  const uri = `G33STORE/WIP/${jobNumber}/prep_art/${jobNumber}.tif`;
  openFile(uri, (fileInfo) => {
    createPanel(0, 0, 2400, 2538, jobNumber, `${jobNumber}hr1_A`);
    createPanel(2575, 0, 7375, 2538, jobNumber, `${jobNumber}hr1_B`);
    createPanel(10125, 0, 2400, 2538, jobNumber, `${jobNumber}hr1_C`);
    createPanel(0, 2712, 2400, 9813, jobNumber, `${jobNumber}hr1_D`);
    createPanel(2575, 2712, 3688, 9775, jobNumber, `${jobNumber}hr1_E1`);
    createPanel(6263, 2712, 3687, 9775, jobNumber, `${jobNumber}hr1_E2`);
    createPanel(10125, 2712, 2400, 9813, jobNumber, `${jobNumber}hr1_F`);
  });
}

function createPanel(x, y, width, height, job, name) {
  const selectedRegion = new Selection().selection(x, y, width, height);
  const workingDoc = app.activeDocument;
  const saveFile = File(`G33STORE/WIP/${job}/paint_files/${name}.tif`);
  workingDoc.selection.select(selectedRegion);
  workingDoc.selection.copy();

  const targetDoc = app.documents.add(`${width}px`, `${height}px`, 100, name, NewDocumentMode.CMYK);
  targetDoc.paste();
  targetDoc.flatten();
  savePanel(saveFile);
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  app.activeDocument = workingDoc;
}

function savePanel(file) {
  const saveFile = new SaveFile(file).saveTIF();
}

function openFile(uri, cb) {
  const workingFile = new OpenFile();
  const fileInfo = workingFile.open(uri);

  cb(fileInfo);
}
