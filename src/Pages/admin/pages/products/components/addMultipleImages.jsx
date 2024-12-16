import { Button } from '@mui/material';
import React from 'react';

const AddMultipleImages = ({
  files,
  handleFilesChange,
  handleClearFile,
  uploadLoading,
  imagePreview
}) => {
  return (
    <div>
      <div className='h-100 w-100 px-5 py-2 flex justify-center items-center flex-wrap'>
        <label
          className='my-3 d-flex mx-2 justify-content-center align-items-center'
          htmlFor='file-input'
        >
          <div
            style={{ width: '10rem', minHeight: '10rem' }}
            className='border text-[#7451f8] shadow p-3 cursor-pointer flex flex-col justify-between items-center'
          >
            <div
              className={'flex flex-col justify-center h-full'}
              // style={{ height: 70, width: 'fit-content' }}
            >
              <h1 className=''>+</h1>
            </div>
            <div>Upload Files</div>
          </div>
        </label>
        <input
          className='hidden'
          id='file-input'
          style={{ cursor: 'pointer' }}
          type='file'
          onChange={handleFilesChange}
          accept='image/*'
          multiple
        />
        {(files || []).map((file, index) => {
          return (
            <div className='my-3 mx-2' key={index}>
              <div
                style={{
                  width: '10rem',
                  minHeight: '10rem'
                }}
                className='border relative shadow p-3 flex flex-col justify-between items-center'
              >
                <div
                  className='absolute'
                  style={{ top: -25, right: -22, padding: 10 }}
                >
                  <button
                    onClick={(e) => handleClearFile(file, index)}
                    className='px-3 py-1 bg-[#7451f8] text-white hover:bg-[#7551f882] hover:text-black rounded-full'
                    // type={'button'}
                    // style={{ height: '40px' }}
                  >
                    X
                  </button>
                </div>
                <div
                  className={'d-flex flex-column justify-content-center h-100 '}
                  // style={{ height: 70, width: 'fit-content' }}
                >
                  <img
                    src={imagePreview[index]}
                    alt=''
                    className='border-2 rounded w-[5rem] h-[5rem] object-contain'
                    style={{ marginTop: 20, maxWidth: 350 }}
                  />
                </div>
                <div className='truncate w-full text-[#7451f8]'>{file.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddMultipleImages;
