import { jest } from '@jest/globals';
import { upload, allFiles, getFile, deleteFile } from '../Application/media.js';
// import { gfs } from '../DB/db.js';
// import * as gfs from "../DB/db.js";
import mongoose from 'mongoose';
// import logger from '../utilities/loggers/generalLogger.js';
// import * as logger from '../utilities/loggers/generalLogger.js';

jest.mock('../DB/db.js', () => ({
    // __esModule: true, 
    gfs: {
      openUploadStream: jest.fn(),
      openDownloadStreamByName: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    },
}));
  
jest.mock('../utilities/loggers/generalLogger.js', () => ({
    info: jest.fn(),
}));

describe('Media Service', () => {
  let req, res, gfs;

  beforeEach(() => {
    // jest.mock('../DB/db.js', () => ({
    //     // __esModule: true, 
    //     gfs: {
    //       openUploadStream: jest.fn(),
    //       openDownloadStreamByName: jest.fn(),
    //       find: jest.fn(),
    //       delete: jest.fn(),
    //     },
    // }));
    gfs = {
        openUploadStream: jest.fn(),
        openDownloadStreamByName: jest.fn(),
        find: jest.fn(),
        delete: jest.fn(),
    };

    // console.log(gfs);
  
    req = {
      file: {
        originalname: 'testfile.txt',
        buffer: Buffer.from('Test file content'),
      },
      user: {
        _id: 8,
      },
      params: {
        filename: 'testfile.txt',
        id: '507f191e810c19729de860ea', // mock ObjectId
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should upload a file successfully', async() => {
//     // Mock the GridFS stream
//     console.log(gfs);
//     console.log("================");
//     console.log(gfs.openUploadStream);
    
//     // gfs = {
//     //     openUploadStream: jest.fn(),
//     //     openDownloadStreamByName: jest.fn(),
//     //     find: jest.fn(),
//     //     delete: jest.fn(),
//     // };
//     // const {gfs} = await import("../DB/db.js");
//     const mockUploadStream = {
//       filename: 'randomfilename.txt',
//       id: 'mockFileId',
//       on: jest.fn().mockImplementation((event, callback) => {
//         if (event === 'finish') {
//           callback(); // Simulate the "finish" event
//         }
//       }),
//       end: jest.fn(),
//     };
//     // console.log(gfs);
//     // console.log(gfs.openUploadStream);
//     // console.log(gfs.openUploadStream.mockReturnValue);
//     // gfs.openUploadStream.mockReturnValue(mockUploadStream);

//     upload(req, res);

//     // expect(gfs.openUploadStream).toHaveBeenCalledWith(expect.stringMatching(/^([a-f0-9]{32})\.txt$/), {
//     //   metadata: {
//         //     uploadedBy: 'user123',
//         //     originalname: 'testfile.txt',
//         //   },
//         // });
//     res.status == 200
//     // expect(mockUploadStream.end).toHaveBeenCalledWith(req.file.buffer);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       file: {
//         filename: 'randomfilename.txt',
//         id: 'mockFileId',
//         uploadDate: expect.any(Date),
//       },
//     });
//     // expect(logger.info).toHaveBeenCalledWith('File uploaded successfully:', expect.objectContaining({
//     //   filename: 'randomfilename.txt',
//     //   id: 'mockFileId',
//     // }));
//   });

  it('should return 400 if no file is uploaded', () => {
    req.file = null;

    upload(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('No file uploaded.');
  });

//   it('should retrieve all files', async () => {
//     const mockFiles = [{ filename: 'file1.txt', id: 'mockFileId1' }];
//     gfs.find.mockReturnValue({
//       toArray: jest.fn().mockResolvedValue(mockFiles),
//     });

//     await allFiles(req, res);

//     expect(gfs.find).toHaveBeenCalledWith({});
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockFiles);
//   });

//   it('should return 404 if no files are found', async () => {
//     gfs.find.mockReturnValue({
//       toArray: jest.fn().mockResolvedValue([]),
//     });

//     await allFiles(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'No files found' });
//   });

//   it('should download a file', () => {
//     const mockDownloadStream = {
//       on: jest.fn().mockImplementation((event, callback) => {
//         if (event === 'data') {
//           callback('chunk data');
//         }
//         if (event === 'end') {
//           callback();
//         }
//       }),
//     };

//     gfs.openDownloadStreamByName.mockReturnValue(mockDownloadStream);

//     getFile(req, res);

//     expect(gfs.openDownloadStreamByName).toHaveBeenCalledWith('testfile.txt');
//     expect(mockDownloadStream.on).toHaveBeenCalledWith('data', expect.any(Function));
//     expect(mockDownloadStream.on).toHaveBeenCalledWith('end', expect.any(Function));
//     expect(res.write).toHaveBeenCalledWith('chunk data');
//     expect(res.end).toHaveBeenCalled();
//   });

//   it('should return 404 if the file is not found', () => {
//     const mockDownloadStream = {
//       on: jest.fn().mockImplementation((event, callback) => {
//         if (event === 'error') {
//           callback(new Error('FileNotFound'));
//         }
//       }),
//     };

//     gfs.openDownloadStreamByName.mockReturnValue(mockDownloadStream);

//     getFile(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'File not found.',
//       err: expect.any(Error),
//     });
//   });

//   it('should delete a file successfully', async () => {
//     const mockObjectId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
//     gfs.delete = jest.fn().mockResolvedValue(true);

//     await deleteFile(req, res);

//     expect(gfs.delete).toHaveBeenCalledWith(mockObjectId);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'File deleted successfully.' });
//   });

  it('should return 400 if the file ID is invalid', async () => {
    req.params.id = 'invalidId';

    await deleteFile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid file ID.');
  });
});
