import React from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const initialJsonDataState = {
  identifier: '',
  sheetName: [],
  data: []
};
const Upload = () => {
  const { page } = useParams();
  const [uploadedData, setUploadedData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const downloadTemplate = (type) => {
    const link = document.createElement('a');
    link.href = type === 2 ? '' : ''; // Update this with your actual file path
    link.download = 'Proportion_Template.xlsx';
    link.click();
    if (type === 2) {
    }
    // Replace with the correct template file path
  };

  const handleFileUpload = (file) => {
    if (!file || !file.name.endsWith('.xlsx')) {
      setError('Please upload a valid .xlsx file.');
      setUploadedData(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(workbook);
        console.log(jsonData);
        setUploadedData(jsonData);
        setError(null);
      } catch (err) {
        setError('Error reading the file. Please try again.');
        setUploadedData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const instructions = [
    '1. Download the format file and fill it with proper data.',
    '2. You can download the example file to understand how the data must be filled.',
    '3. Once you have downloaded and filled the format file, upload it in the form below and submit.',
    '4. You can get store id, module id, and unit id from their list; please input the right ids.',
    '5. For eCommerce items, available time start and end will be 00:00:00 and 23:59:59.',
    "6. You can upload your product images in the product folder from the gallery and copy the image's path."
  ];

  const steps = [
    { header: 'STEP 1', title: 'Download Excel File' },
    {
      header: 'STEP 2',
      title: 'Match Spreadsheet data according to instruction'
    },
    { header: 'STEP 3', title: 'Validate data and complete import' }
  ];

  function toCamelCaseKeys(obj) {
    // Helper function to convert a string to camel case
    const toCamelCase = (str) => {
      return str
        .split(' ') // Split string into words
        .map(
          (word, index) =>
            index === 0
              ? word.toLowerCase() // First word in lowercase
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize subsequent words
        )
        .join(''); // Join the words together
    };

    // Convert each key of the object
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key); // Convert key to camel case
      acc[camelCaseKey] = obj[key]; // Assign the value to the new key
      return acc;
    }, {});
  }

  const finalData = uploadedData?.map((item) => toCamelCaseKeys(item));

  const submitData = async () => {
    console.log(finalData);
  };

  return (
    <div>
      <div className='flex items-center my-3'>
        <p className='text-[#7451f8] font-bold text-xl'>
          {page.charAt(0).toUpperCase() + page.slice(1)} bulk import
        </p>
      </div>
      <div className='flex justify-around gap-5 px-5 my-5'>
        {steps.map((step) => (
          <Card {...step} />
        ))}
      </div>
      <div className='my-3 mx-5'>
        <p className='font-bold text-2xl'>Instructions</p>
        <ol className='px-5 mx-5 text-sm'>
          {instructions.map((ins) => (
            <li className='p-2  text-gray-500'>{ins}</li>
          ))}
        </ol>
      </div>
      <div className='flex flex-col justify-center items-center my-5'>
        <p className='text-lg font-bold'>Download spreadsheet template</p>
        <div className='flex gap-5 my-3'>
          <button className='bg-blue-800 text-white hover:bg-gray-800 text-sm px-5 py-2 rounded'>
            Template with existing data
          </button>
          <button className='bg-blue-800 text-white hover:bg-gray-800 text-sm px-5 py-2 rounded'>
            Template without data
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {/* <label className='flex justify-start items-center' htmlFor='file-input'>
          <span className='fw-bold'>
            {file?.name || 'Please Upload A File'}
          </span>
        </label> */}
        <input
          className='border w-full text-sm text-gray-400'
          id='file-input'
          style={{ cursor: 'pointer' }}
          type='file'
          accept={'.xlsx, .xls, .csv'}
          onChange={handleFileInput}
        />
        <div className='flex justify-end gap-5'>
          <button className='px-5 py-1 bg-slate-400 text-white rounded hover:bg-gray-800'>
            Reset
          </button>
          <button
            onClick={() => submitData()}
            className='px-5 py-1 bg-[#7451f8] text-white rounded hover:bg-gray-800'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    color: '#333'
  },
  instructions: {
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px 15px',
    margin: '10px 0',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  uploadArea: {
    border: '2px dashed #007bff',
    padding: '20px',
    textAlign: 'center',
    color: '#007bff',
    marginTop: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  },
  output: {
    marginTop: '20px',
    backgroundColor: '#e9f7df',
    padding: '10px',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    color: '#155724'
  }
};

export default Upload;

const Card = ({ header, title }) => {
  return (
    <div className='bg-gray-200 text-gray-500 p-3 w-full flex flex-col items-center'>
      <h3 className='font-bold'>{header}</h3>
      <p className='text-center'>{title}</p>
    </div>
  );
};
